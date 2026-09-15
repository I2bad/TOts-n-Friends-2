<?php
require __DIR__ . '/phpmailer/Exception.php';
require __DIR__ . '/phpmailer/PHPMailer.php';
require __DIR__ . '/phpmailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

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

$name = trim(strip_tags($data['name'] ?? ''));
$email = trim($data['email'] ?? '');
$phone = trim(strip_tags($data['phone'] ?? ''));
$enquiry = trim(strip_tags($data['enquiry'] ?? ''));
$message = trim(strip_tags($data['message'] ?? ''));

if (!$name || !filter_var($email, FILTER_VALIDATE_EMAIL) || !$message) {
    http_response_code(400);
    echo json_encode(['error' => 'Please fill in all required fields.']);
    exit;
}

$mail = new PHPMailer(true);

// Log debug output to file instead of stdout (so it doesn't break JSON response)
$debugLog = __DIR__ . '/mail_debug.log';
$mail->SMTPDebug = SMTP::DEBUG_SERVER;
$mail->Debugoutput = function ($str, $level) use ($debugLog) {
    file_put_contents($debugLog, date('[Y-m-d H:i:s] ') . $str . PHP_EOL, FILE_APPEND);
};

try {
    $mail->isSMTP();
    $mail->Host = 'sp161.mschosting.cloud';
    $mail->SMTPAuth = true;
    $mail->Username = 'noreply@tnf.tpi.edu.my';
    $mail->Password = 'CdR3k9eJZ6!';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;
    $mail->CharSet = 'UTF-8';
    $mail->SMTPOptions = [
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true,
        ],
    ];

    $mail->setFrom('noreply@tnf.tpi.edu.my', 'Tots n Friends');
    $mail->addAddress('hewitt@tpi.edu.my');
    $mail->addReplyTo($email, $name);

    $mail->Subject = "New Enquiry from $name" . ($enquiry ? " — $enquiry" : '');
    $mail->Body =
        "New enquiry from the Tots & Friends website.\n\n"
        . "Name:    $name\n"
        . "Email:   $email\n"
        . "Phone:   " . ($phone ?: '—') . "\n"
        . "Type:    " . ($enquiry ?: '—') . "\n\n"
        . "Message:\n$message\n\n"
        . "---\n"
        . "Reply to this email to respond directly to $name.";

    $mail->send();

    // ── Auto-reply to customer ────────────────────────────────────────────────
    $mail->clearAddresses();
    $mail->clearReplyTos();
    $mail->setFrom('noreply@tnf.tpi.edu.my', 'Tots n Friends');
    $mail->addAddress($email, $name);
    $mail->Subject = "We've received your enquiry — Tots n Friends";
    $mail->Body =
        "Hi $name,\n\n"
        . "Thank you for reaching out to Tots n Friends!\n\n"
        . "We've received your enquiry and will get back to you as soon as possible, usually within 1–2 business days.\n\n"
        . "Warm regards,\n"
        . "The Tots n Friends Team";
    $mail->send();

    echo json_encode(['success' => true]);

} catch (Exception $e) {
    file_put_contents($debugLog, date('[Y-m-d H:i:s] ') . 'MAILER ERROR: ' . $mail->ErrorInfo . PHP_EOL, FILE_APPEND);
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send. Please email us at hello@tnf.tpi.edu.my']);
}
