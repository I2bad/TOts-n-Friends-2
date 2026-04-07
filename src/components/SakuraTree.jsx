import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'

/* ── Deterministic PRNG (mulberry32) ── */
function prng(seed) {
  let s = seed | 0
  return () => {
    s = s + 0x6D2B79F5 | 0
    let t = Math.imul(s ^ s >>> 15, 1 | s)
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t
    return ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}

const PINKS = [0xf4a0b5, 0xfde8ef, 0xe87ba4, 0xffb7c5, 0xfadadd]

/* ── Tree generation — combines both reference images ──
   - Clear Y-fork trunk with visible branching hierarchy
   - Multiple sub-branches visible before blossoms appear
   - Blossoms only at outermost branch tips
   - Main canopy leans LEFT (flipped image 2)
   - Wider base trunk that tapers */
function generateTree(rand, mobile) {
  const branches = []
  const blossomPts = []

  function curveThrough(points, wobble = 0) {
    const pts = points.map((p, i) => {
      const v = p.clone()
      if (i > 0 && i < points.length - 1 && wobble > 0) {
        v.x += (rand() - 0.5) * wobble
        v.z += (rand() - 0.5) * wobble
      }
      return v
    })
    return new THREE.CatmullRomCurve3(pts)
  }

  // Place blossom cluster — ONLY called at outermost tips
  function addBlossomCluster(center, radius, count) {
    for (let i = 0; i < count; i++) {
      blossomPts.push(center.clone().add(new THREE.Vector3(
        (rand() - 0.5) * radius * 2,
        (rand() - 0.5) * radius * 1.6,
        (rand() - 0.5) * radius * 2,
      )))
    }
  }

  // Build a small twig from a point in a direction, return its tip
  function addTwig(base, dir, length, radius) {
    const pts = [base.clone()]
    const d = dir.clone().normalize()
    const step = length / 4
    let p = base.clone()
    for (let i = 1; i <= 4; i++) {
      d.x += (rand() - 0.5) * 0.15
      d.y += (rand() - 0.5) * 0.08
      d.z += (rand() - 0.5) * 0.15
      d.normalize()
      p = p.clone().addScaledVector(d, step)
      pts.push(p)
    }
    const curve = new THREE.CatmullRomCurve3(pts)
    branches.push({ curve, r: Math.max(radius, 0.015), tSeg: 6, rSeg: 5 })
    return { tip: p.clone(), curve }
  }

  // Add small flowering twigs at the end of a branch
  function addFloweringTwigs(base, mainDir, count, twigLen, twigR, blossomsPerTwig) {
    const mob = mobile ? Math.max(2, Math.floor(count * 0.6)) : count
    for (let i = 0; i < mob; i++) {
      const angle = (i / mob) * Math.PI * 1.8 - Math.PI * 0.4 + (rand() - 0.5) * 0.5
      const upBias = 0.2 + rand() * 0.3
      const dir = new THREE.Vector3(
        mainDir.x * 0.3 + Math.cos(angle) * 0.7,
        upBias,
        mainDir.z * 0.3 + Math.sin(angle) * 0.7
      ).normalize()
      const { tip } = addTwig(base, dir, twigLen + rand() * 0.4, twigR)
      addBlossomCluster(tip, 0.28 + rand() * 0.15, mobile ? 4 : blossomsPerTwig)
    }
  }

  // ═══════════════════════════════════════════════
  // TRUNK — wide base, tapers, slight lean right then straightens
  // ═══════════════════════════════════════════════
  const trunkCurve = curveThrough([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.05, 0.8, 0.02),
    new THREE.Vector3(0.12, 1.8, 0.04),
    new THREE.Vector3(0.18, 2.8, 0.02),
    new THREE.Vector3(0.15, 3.8, -0.02),
    new THREE.Vector3(0.08, 4.8, 0),
    new THREE.Vector3(0.0, 5.6, 0),
  ], 0.05)
  // Wider base radius
  branches.push({ curve: trunkCurve, r: 0.32, tSeg: 30, rSeg: 10 })

  // ═══════════════════════════════════════════════
  // BRANCH A — medium branch going RIGHT from 38% trunk
  // Has 2-3 visible sub-branches before blossoms
  // ═══════════════════════════════════════════════
  const brA_base = trunkCurve.getPoint(0.38)
  const brA = curveThrough([
    brA_base,
    brA_base.clone().add(new THREE.Vector3(0.7, 0.4, 0.1)),
    brA_base.clone().add(new THREE.Vector3(1.6, 0.7, 0.05)),
    brA_base.clone().add(new THREE.Vector3(2.4, 0.5, -0.05)),
  ], 0.08)
  branches.push({ curve: brA, r: 0.11, tSeg: 14, rSeg: 6 })

  // Sub-branches off branch A (visible before blossoms)
  const brA_mid = brA.getPoint(0.55)
  const brA_tip = brA.getPoint(0.95)
  const brA_tang = brA.getTangent(0.55)
  addFloweringTwigs(brA_mid, brA_tang, 2, 0.6, 0.04, 6)
  addFloweringTwigs(brA_tip, new THREE.Vector3(1, 0.2, 0), 3, 0.5, 0.035, 7)

  // ═══════════════════════════════════════════════
  // BRANCH B — small branch going LEFT-DOWN from 48% trunk
  // ═══════════════════════════════════════════════
  const brB_base = trunkCurve.getPoint(0.48)
  const brB = curveThrough([
    brB_base,
    brB_base.clone().add(new THREE.Vector3(-0.5, 0.15, 0.1)),
    brB_base.clone().add(new THREE.Vector3(-1.3, -0.1, 0.08)),
    brB_base.clone().add(new THREE.Vector3(-2.0, -0.3, 0.0)),
  ], 0.1)
  branches.push({ curve: brB, r: 0.07, tSeg: 12, rSeg: 5 })

  const brB_tip = brB.getPoint(0.95)
  addFloweringTwigs(brB_tip, new THREE.Vector3(-1, 0.1, 0), 3, 0.5, 0.03, 6)

  // ═══════════════════════════════════════════════
  // MAJOR FORK at ~62% trunk — splits into LEFT and RIGHT
  // This creates the clear Y-shape from the reference images
  // ═══════════════════════════════════════════════
  const forkPt = trunkCurve.getPoint(0.62)

  // ── FORK-LEFT (dominant — leans far left, like image 2 flipped) ──
  const forkL = curveThrough([
    forkPt,
    forkPt.clone().add(new THREE.Vector3(-0.4, 0.8, 0.08)),
    forkPt.clone().add(new THREE.Vector3(-1.2, 1.6, 0.1)),
    forkPt.clone().add(new THREE.Vector3(-2.0, 2.2, 0.05)),
    forkPt.clone().add(new THREE.Vector3(-2.8, 2.5, -0.02)),
  ], 0.08)
  branches.push({ curve: forkL, r: 0.16, tSeg: 18, rSeg: 7 })

  // Secondary branches off left fork
  const fL1_base = forkL.getPoint(0.45)
  const fL1 = curveThrough([
    fL1_base,
    fL1_base.clone().add(new THREE.Vector3(-0.6, 0.5, 0.1)),
    fL1_base.clone().add(new THREE.Vector3(-1.5, 0.8, 0.15)),
    fL1_base.clone().add(new THREE.Vector3(-2.3, 0.6, 0.05)),
  ], 0.1)
  branches.push({ curve: fL1, r: 0.06, tSeg: 10, rSeg: 5 })
  addFloweringTwigs(fL1.getPoint(0.9), new THREE.Vector3(-1, 0.3, 0), 3, 0.55, 0.03, 7)

  const fL2_base = forkL.getPoint(0.7)
  const fL2 = curveThrough([
    fL2_base,
    fL2_base.clone().add(new THREE.Vector3(-0.3, 0.7, -0.1)),
    fL2_base.clone().add(new THREE.Vector3(-0.8, 1.4, -0.05)),
  ], 0.08)
  branches.push({ curve: fL2, r: 0.05, tSeg: 8, rSeg: 5 })
  addFloweringTwigs(fL2.getPoint(0.9), new THREE.Vector3(-0.5, 1, 0), 3, 0.5, 0.03, 7)

  // Left fork tip — flowering twigs
  const fL_tip = forkL.getPoint(0.95)
  addFloweringTwigs(fL_tip, new THREE.Vector3(-1, 0.4, 0), 4, 0.55, 0.035, 8)

  // Small downward sub-branch from left fork
  const fL3_base = forkL.getPoint(0.55)
  const fL3 = curveThrough([
    fL3_base,
    fL3_base.clone().add(new THREE.Vector3(-0.4, -0.2, 0.12)),
    fL3_base.clone().add(new THREE.Vector3(-1.0, -0.5, 0.08)),
  ], 0.1)
  branches.push({ curve: fL3, r: 0.04, tSeg: 8, rSeg: 5 })
  addFloweringTwigs(fL3.getPoint(0.9), new THREE.Vector3(-0.8, -0.3, 0), 2, 0.4, 0.025, 5)

  // ── FORK-RIGHT (secondary — extends up-right) ──
  const forkR = curveThrough([
    forkPt,
    forkPt.clone().add(new THREE.Vector3(0.5, 0.9, -0.05)),
    forkPt.clone().add(new THREE.Vector3(1.2, 1.8, -0.08)),
    forkPt.clone().add(new THREE.Vector3(1.8, 2.5, -0.02)),
  ], 0.08)
  branches.push({ curve: forkR, r: 0.12, tSeg: 14, rSeg: 6 })

  // Sub-branches off right fork
  const fR1_base = forkR.getPoint(0.5)
  const fR1 = curveThrough([
    fR1_base,
    fR1_base.clone().add(new THREE.Vector3(0.6, 0.3, 0.1)),
    fR1_base.clone().add(new THREE.Vector3(1.4, 0.5, 0.05)),
  ], 0.1)
  branches.push({ curve: fR1, r: 0.05, tSeg: 8, rSeg: 5 })
  addFloweringTwigs(fR1.getPoint(0.9), new THREE.Vector3(1, 0.3, 0), 3, 0.5, 0.03, 6)

  // Right fork tip
  addFloweringTwigs(forkR.getPoint(0.95), new THREE.Vector3(0.6, 0.8, 0), 3, 0.5, 0.035, 7)

  // ═══════════════════════════════════════════════
  // CROWN — trunk continues above fork, with branches
  // ═══════════════════════════════════════════════
  const crownBase = trunkCurve.getPoint(0.78)
  const crownBr = curveThrough([
    crownBase,
    crownBase.clone().add(new THREE.Vector3(0.1, 0.6, 0.05)),
    crownBase.clone().add(new THREE.Vector3(-0.2, 1.2, 0.02)),
    crownBase.clone().add(new THREE.Vector3(-0.5, 1.6, -0.02)),
  ], 0.08)
  branches.push({ curve: crownBr, r: 0.08, tSeg: 10, rSeg: 5 })
  addFloweringTwigs(crownBr.getPoint(0.9), new THREE.Vector3(-0.3, 1, 0), 4, 0.5, 0.035, 7)

  // Top of trunk — small upward branches
  const topPt = trunkCurve.getPoint(0.92)
  addFloweringTwigs(topPt, new THREE.Vector3(0, 1, 0), 3, 0.5, 0.04, 6)

  // ═══════════════════════════════════════════════
  // Extra small branch from ~55% going slightly right-up
  // (fills gap between branch A and the fork)
  // ═══════════════════════════════════════════════
  const brE_base = trunkCurve.getPoint(0.55)
  const brE = curveThrough([
    brE_base,
    brE_base.clone().add(new THREE.Vector3(0.4, 0.5, -0.08)),
    brE_base.clone().add(new THREE.Vector3(0.9, 1.0, -0.05)),
  ], 0.08)
  branches.push({ curve: brE, r: 0.05, tSeg: 8, rSeg: 5 })
  addFloweringTwigs(brE.getPoint(0.9), new THREE.Vector3(0.6, 0.6, 0), 2, 0.45, 0.03, 6)

  return { branches, blossomPts }
}

/* ── Component ── */
export default function SakuraTree({ onReady }) {
  const containerRef = useRef(null)
  const onReadyRef = useRef(onReady)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const mobile = window.innerWidth < 768
    let W = el.clientWidth, H = el.clientHeight
    const rand = prng(54321)

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !mobile, powerPreference: 'high-performance' })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    el.appendChild(renderer.domElement)

    // ── Scene ──
    const scene = new THREE.Scene()

    // ── Camera — starts close on the seed at bottom, zooms out to reveal tree ──
    const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 100)
    camera.position.set(1.0, -1.0, 4.5)
    const lookTarget = new THREE.Vector3(1.0, -1.2, 0)
    camera.lookAt(lookTarget)

    // ── Lights ──
    scene.add(new THREE.AmbientLight(0xfff8f0, 0.55))
    const sun = new THREE.DirectionalLight(0xffffff, 1.05)
    sun.position.set(-5, 8, 5)
    scene.add(sun)
    scene.add(new THREE.HemisphereLight(0xffc0cb, 0xf0e6d3, 0.3))

    // Canopy glow
    const canopyGlow = new THREE.PointLight(0xffb7c5, 0, 8)
    canopyGlow.position.set(0, 5, 0.5)
    scene.add(canopyGlow)

    // ── Tree group — positioned so trunk base is at very bottom of hero ──
    const treeGroup = new THREE.Group()
    // With start camera at y=-1, z=4.5, FOV 40: half-height = 4.5*tan(20°) ≈ 1.64
    // Bottom of viewport ≈ -1 - 1.64 = -2.64
    // Tree base at world y = -2.5 sits right at the bottom edge
    treeGroup.position.set(1.2, -2.5, 0)
    scene.add(treeGroup)

    // ── Generate tree data ──
    const { branches, blossomPts } = generateTree(rand, mobile)

    // ── Bark material with distance-based growth reveal ──
    const barkMat = new THREE.MeshStandardMaterial({ color: 0x4a3020, roughness: 0.85, metalness: 0.05 })
    let growthU = null

    barkMat.onBeforeCompile = (shader) => {
      shader.uniforms.uGrow = { value: 0 }
      growthU = shader.uniforms.uGrow

      shader.vertexShader = shader.vertexShader.replace(
        'void main() {',
        'varying float vGD;\nvoid main() {'
      )
      shader.vertexShader = shader.vertexShader.replace(
        '#include <project_vertex>',
        'vGD = length(transformed);\n#include <project_vertex>'
      )
      shader.fragmentShader = shader.fragmentShader.replace(
        'void main() {',
        'uniform float uGrow;\nvarying float vGD;\nvoid main() {'
      )
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <clipping_planes_fragment>',
        '#include <clipping_planes_fragment>\nif(vGD > uGrow) discard;'
      )
    }

    // ── Branch meshes ──
    const branchMeshes = branches.map(b => {
      const geo = new THREE.TubeGeometry(b.curve, b.tSeg, b.r, b.rSeg, false)
      const mesh = new THREE.Mesh(geo, barkMat)
      treeGroup.add(mesh)
      return mesh
    })

    renderer.compile(scene, camera)

    // ── Seed — small sprout at the base ──
    const seed = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 14, 10),
      new THREE.MeshStandardMaterial({ color: 0x8b6914, roughness: 0.35, metalness: 0.1 })
    )
    seed.position.set(0, 0.08, 0)
    treeGroup.add(seed)

    const seedLight = new THREE.PointLight(0xf5a623, 1.5, 3)
    seedLight.position.set(0, 0.18, 0)
    treeGroup.add(seedLight)

    // ── Blossoms (InstancedMesh) — larger, more flower-like ──
    const bCount = blossomPts.length
    const bGeo = new THREE.IcosahedronGeometry(0.15, 1)
    const bMat = new THREE.MeshStandardMaterial({
      color: 0xf4a0b5, roughness: 0.5, emissive: 0xffb7c5, emissiveIntensity: 0.12,
      transparent: true, opacity: 0.92,
    })
    const bMesh = new THREE.InstancedMesh(bGeo, bMat, bCount)

    const dummy = new THREE.Object3D()
    const tmpColor = new THREE.Color()
    const bDist = new Float32Array(bCount)
    const bTargetScale = new Float32Array(bCount)
    const bRotations = []

    blossomPts.forEach((pos, i) => {
      bDist[i] = pos.length()
      bTargetScale[i] = 0.7 + rand() * 0.7
      const r = { x: rand() * Math.PI * 2, y: rand() * Math.PI * 2, z: rand() * Math.PI * 2 }
      bRotations.push(r)

      dummy.position.copy(pos)
      dummy.scale.set(0.001, 0.001, 0.001)
      dummy.rotation.set(r.x, r.y, r.z)
      dummy.updateMatrix()
      bMesh.setMatrixAt(i, dummy.matrix)

      tmpColor.set(PINKS[Math.floor(rand() * PINKS.length)])
      bMesh.setColorAt(i, tmpColor)
    })
    bMesh.instanceMatrix.needsUpdate = true
    if (bMesh.instanceColor) bMesh.instanceColor.needsUpdate = true
    treeGroup.add(bMesh)

    // Max distance for timeline range
    let maxDist = 0
    for (let i = 0; i < bCount; i++) if (bDist[i] > maxDist) maxDist = bDist[i]
    maxDist += 1.0

    // ── Falling petals ──
    const pCount = mobile ? 25 : 50
    const pGeo = new THREE.PlaneGeometry(0.07, 0.05)
    const pMat = new THREE.MeshStandardMaterial({
      color: 0xfde8ef, side: THREE.DoubleSide, transparent: true, opacity: 0.8,
      emissive: 0xffb7c5, emissiveIntensity: 0.08,
    })
    const pMesh = new THREE.InstancedMesh(pGeo, pMat, pCount)
    pMesh.visible = false
    treeGroup.add(pMesh)

    const petals = Array.from({ length: pCount }, () => ({
      px: 0, py: 0, pz: 0,
      vx: 0, vy: 0, vz: 0,
      rx: 0, ry: 0, rz: 0,
      drx: 0, dry: 0, drz: 0,
      phase: rand() * Math.PI * 2,
    }))

    function spawnPetal(p) {
      p.px = (rand() - 0.5) * 7
      p.py = 3 + rand() * 5
      p.pz = (rand() - 0.5) * 4
      p.vx = (rand() - 0.5) * 0.35
      p.vy = -(0.18 + rand() * 0.3)
      p.vz = (rand() - 0.5) * 0.3
      p.rx = rand() * 6.28; p.ry = rand() * 6.28; p.rz = rand() * 6.28
      p.drx = (rand() - 0.5) * 2.5
      p.dry = (rand() - 0.5) * 2.5
      p.drz = (rand() - 0.5) * 1.5
      p.phase = rand() * 6.28
    }

    // ── Animation state ──
    const st = { grow: 0, seedS: 1, seedL: 1.5, petalsOn: false, t: 0 }
    let allBloomed = false

    // ── GSAP master timeline — 12s growth ──
    const tl = gsap.timeline({ paused: true })

    // Seed pulse + shrink
    tl.to(st, { seedS: 1.3, duration: 0.4, ease: 'power2.out' }, 0)
    tl.to(st, { seedS: 0, duration: 0.6, ease: 'power2.in' }, 0.5)
    tl.to(st, { seedL: 0, duration: 1.5, ease: 'power2.inOut' }, 0.4)

    // Tree growth — slow organic expansion
    tl.to(st, { grow: maxDist, duration: 10, ease: 'power2.inOut' }, 0.4)

    // Canopy glow fades in during bloom
    tl.to(canopyGlow, { intensity: 0.7, duration: 3, ease: 'power1.inOut' }, 7.5)

    // Petals start falling once canopy is full
    tl.call(() => {
      st.petalsOn = true
      pMesh.visible = true
      petals.forEach(spawnPetal)
    }, null, 10.5)

    // Camera zoom-out: starts close on seed at bottom, pulls way back to reveal full tree
    // End position shows entire tree with trunk base visible at bottom
    tl.to(camera.position, { x: -0.5, y: 3.0, z: 15, duration: 11, ease: 'power2.inOut' }, 0.5)
    tl.to(lookTarget, { x: 0, y: 2.5, duration: 11, ease: 'power2.inOut' }, 0.5)

    // ── Render loop ──
    const clock = new THREE.Clock()
    let frameId, isVisible = false

    function loop() {
      frameId = requestAnimationFrame(loop)
      if (!isVisible) { clock.getDelta(); return }

      const dt = Math.min(clock.getDelta(), 0.05)
      st.t += dt

      if (growthU) growthU.value = st.grow

      // Seed
      seed.scale.setScalar(Math.max(st.seedS, 0))
      seed.visible = st.seedS > 0.01
      seedLight.intensity = Math.max(st.seedL, 0)
      seedLight.visible = st.seedL > 0.01

      // Blossoms
      if (!allBloomed) {
        let done = true
        for (let i = 0; i < bCount; i++) {
          const bloom = THREE.MathUtils.clamp((st.grow - bDist[i] + 0.5) / 1.5, 0, 1)
          if (bloom < 0.999) done = false
          const e = bloom * bloom * (3 - 2 * bloom)
          const s = e * bTargetScale[i]
          dummy.position.copy(blossomPts[i])
          dummy.scale.set(s, s, s)
          dummy.rotation.set(bRotations[i].x, bRotations[i].y, bRotations[i].z)
          dummy.updateMatrix()
          bMesh.setMatrixAt(i, dummy.matrix)
        }
        bMesh.instanceMatrix.needsUpdate = true
        if (done) allBloomed = true
      }

      // Petals
      if (st.petalsOn) {
        for (let i = 0; i < pCount; i++) {
          const p = petals[i]
          p.px += p.vx * dt + Math.sin(st.t * 1.5 + p.phase) * 0.3 * dt
          p.py += p.vy * dt
          p.pz += p.vz * dt + Math.cos(st.t * 1.2 + p.phase * 1.3) * 0.2 * dt
          p.rx += p.drx * dt
          p.ry += p.dry * dt
          p.rz += p.drz * dt
          if (p.py < -1) spawnPetal(p)
          dummy.position.set(p.px, p.py, p.pz)
          dummy.rotation.set(p.rx, p.ry, p.rz)
          dummy.scale.set(1, 1, 1)
          dummy.updateMatrix()
          pMesh.setMatrixAt(i, dummy.matrix)
        }
        pMesh.instanceMatrix.needsUpdate = true
      }

      camera.lookAt(lookTarget)
      renderer.render(scene, camera)
    }
    loop()

    // ── IntersectionObserver ──
    let sceneReady = false
    function tryPlay() {
      const shouldRun = isVisible && sceneReady
      if (shouldRun) { tl.play(); clock.start() }
      else tl.pause()
    }

    const obs = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
      tryPlay()
    }, { threshold: 0.15 })
    obs.observe(el)

    // ── Resize ──
    function onResize() {
      W = el.clientWidth; H = el.clientHeight
      camera.aspect = W / H
      camera.updateProjectionMatrix()
      renderer.setSize(W, H)
    }
    window.addEventListener('resize', onResize)

    // ── Ready signal ──
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (onReadyRef.current) onReadyRef.current()
      setTimeout(() => { sceneReady = true; tryPlay() }, 650)
    }))

    // ── Cleanup ──
    return () => {
      cancelAnimationFrame(frameId)
      obs.disconnect()
      window.removeEventListener('resize', onResize)
      tl.kill()
      branchMeshes.forEach(m => m.geometry.dispose())
      barkMat.dispose()
      seed.geometry.dispose(); seed.material.dispose()
      bGeo.dispose(); bMat.dispose()
      pGeo.dispose(); pMat.dispose()
      renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return <div ref={containerRef} className="absolute inset-0 z-0" />
}
