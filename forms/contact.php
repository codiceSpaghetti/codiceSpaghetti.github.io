<?php
/**
 * Contact Form Handler
 * Sends emails to alessio.ser29@gmail.com from the portfolio website
 */

// Enable CORS for local development and production
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=UTF-8');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

try {
    // Get POST data
    $input = json_decode(file_get_contents('php://input'), true);
    
    // If JSON decode fails, try regular POST
    if (!$input) {
        $input = $_POST;
    }
    
    // Validate required fields
    $name = trim($input['name'] ?? '');
    $email = trim($input['email'] ?? '');
    $subject = trim($input['subject'] ?? '');
    $message = trim($input['message'] ?? '');
    
    $errors = [];
    
    if (empty($name)) $errors[] = 'Name is required';
    if (empty($email)) $errors[] = 'Email is required';
    if (empty($subject)) $errors[] = 'Subject is required';
    if (empty($message)) $errors[] = 'Message is required';
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Please enter a valid email address';
    }
    
    if (!empty($errors)) {
        echo json_encode(['success' => false, 'message' => implode(', ', $errors)]);
        exit;
    }
    
    // Prepare email
    $to = 'alessio.ser29@gmail.com';
    $email_subject = '[Portfolio Website] ' . $subject;
    
    // Create headers
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: Portfolio Contact Form <noreply@' . ($_SERVER['HTTP_HOST'] ?? 'localhost') . '>',
        'Reply-To: ' . $email,
        'X-Mailer: PHP/' . phpversion()
    ];
    
    // Create email body
    $body = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <title>Contact Form Submission</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
            .content { background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; }
            .value { margin-top: 5px; }
            .message-content { background: #f8f9fa; padding: 15px; border-radius: 5px; white-space: pre-wrap; }
            .footer { margin-top: 20px; padding-top: 15px; border-top: 1px solid #eee; color: #666; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>New Contact Form Submission</h2>
                <p>You have received a new message from your portfolio website.</p>
            </div>
            
            <div class='content'>
                <div class='field'>
                    <div class='label'>Name:</div>
                    <div class='value'>" . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . "</div>
                </div>
                
                <div class='field'>
                    <div class='label'>Email:</div>
                    <div class='value'>" . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . "</div>
                </div>
                
                <div class='field'>
                    <div class='label'>Subject:</div>
                    <div class='value'>" . htmlspecialchars($subject, ENT_QUOTES, 'UTF-8') . "</div>
                </div>
                
                <div class='field'>
                    <div class='label'>Message:</div>
                    <div class='message-content'>" . htmlspecialchars($message, ENT_QUOTES, 'UTF-8') . "</div>
                </div>
            </div>
            
            <div class='footer'>
                <p>This email was automatically generated from your portfolio website contact form.</p>
                <p>Sent on: " . date('F j, Y \a\t g:i A T') . "</p>
                <p>Sender IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'Unknown') . "</p>
            </div>
        </div>
    </body>
    </html>";
    
    // Send email
    $mailSent = mail($to, $email_subject, $body, implode("\r\n", $headers));
    
    if ($mailSent) {
        echo json_encode([
            'success' => true, 
            'message' => 'Thank you for your message! I will get back to you soon.'
        ]);
    } else {
        echo json_encode([
            'success' => false, 
            'message' => 'Sorry, there was an error sending your message. Please try emailing me directly at alessio.ser29@gmail.com'
        ]);
    }
    
} catch (Exception $e) {
    error_log('Contact form error: ' . $e->getMessage());
    echo json_encode([
        'success' => false, 
        'message' => 'An unexpected error occurred. Please try again later.'
    ]);
}
?>
