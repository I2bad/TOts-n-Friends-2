<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://tnf.tpi.edu.my');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request']);
    exit;
}

// strip CR/LF too, not just tags -- these values go into mail headers
$clean = fn($v) => trim(str_replace(["\r", "\n"], '', strip_tags($v ?? '')));

$name = $clean($data['name'] ?? '');
$email = trim(str_replace(["\r", "\n"], '', $data['email'] ?? ''));
$phone = $clean($data['phone'] ?? '');
$enquiry = $clean($data['enquiry'] ?? '');
$message = trim(strip_tags($data['message'] ?? ''));

if (!$name || !filter_var($email, FILTER_VALIDATE_EMAIL) || !$message) {
    http_response_code(400);
    echo json_encode(['error' => 'Please fill in all required fields.']);
    exit;
}

$from = 'noreply@tnf.tpi.edu.my';

$subject = "New Enquiry from $name" . ($enquiry ? " — $enquiry" : '');
$body =
    "New enquiry from the Tots & Friends website.\n\n"
    . "Name:    $name\n"
    . "Email:   $email\n"
    . "Phone:   " . ($phone ?: '—') . "\n"
    . "Type:    " . ($enquiry ?: '—') . "\n\n"
    . "Message:\n$message\n\n"
    . "---\n"
    . "Reply to this email to respond directly to $name.";

$headers =
    "From: Tots n Friends <$from>\r\n"
    . "Reply-To: $name <$email>\r\n"
    . "Content-Type: text/plain; charset=UTF-8";

$sent = mail('hewitt@tpi.edu.my', $subject, $body, $headers);

if ($sent) {
    // Auto-reply to customer -- best effort, doesn't affect success response
    $replySubject = "We've received your enquiry — Tots n Friends";
    $replyBody =
        "Hi $name,\n\n"
        . "Thank you for reaching out to Tots n Friends!\n\n"
        . "We've received your enquiry and will get back to you as soon as possible, usually within 1–2 business days.\n\n"
        . "Warm regards,\n"
        . "The Tots n Friends Team";
    $replyHeaders = "From: Tots n Friends <$from>\r\nContent-Type: text/plain; charset=UTF-8";
    mail($email, $replySubject, $replyBody, $replyHeaders);

    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send. Please email us at hello@tnf.tpi.edu.my']);
}
