<?php

$response = array();
$errors = array();

if (!empty($_POST)) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    if (empty($name)) {
        $errors += ['name' => 'Please provide your name.'];
    }

    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors += ['email' => 'Please provide a valid e-mail.'];
    }

    if (empty($message)) {
        $errors += ['message' => 'Message is required.'];
    }

    if (empty($errors)) {
        $toEmail = 'info@7w.ai';
        $emailSubject = 'New email from your contact form';
        $headers = ['From' => $email, 'Reply-To' => $email, 'Content-type' => 'text/html; charset=iso-8859-1'];

        $bodyParagraphs = ["Name: {$name}", "Email: {$email}", "Message:", $message];
        $body = join(PHP_EOL, $bodyParagraphs);

        if (mail($toEmail, $emailSubject, $body, $headers)) {
            $response += ['success' => true];
        } else {
            $response += ['error' => 'Oops, something went wrong. Please try again later.'];
        }
    } else {
        $response += ['error' => $errors];
    }

    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($response);
}
