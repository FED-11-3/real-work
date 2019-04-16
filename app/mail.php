<?php

    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        # FIX: Replace this email with recipient email
        $mail_to = "12345@gmail.com";
        
        # Sender Data
        $name = str_replace(array("\r","\n"),array(" "," ") , strip_tags(trim($_POST["name"])));
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $phone = trim($_POST["phone"]);
        $message = trim($_POST["message"]);
        
        if ( empty($name) OR !filter_var($email, FILTER_VALIDATE_EMAIL) OR empty($phone) OR empty($message)) {
            # Set a 400 (bad request) response code and exit.
            http_response_code(400);
            echo "Будь ласка, заповніть форму.";
            exit;
        }
        
        # Mail Content
        $content = "Name: $name\n";
        $content .= "Email: $email\n\n";
        $content .= "Phone: $phone\n";
        $content .= "Message:\n$message\n";

        # email headers.
        $headers = "From: $name <$email>";

        # Send the email.
        $success = mail($mail_to, $content, $headers);
        if ($success) {
            # Set a 200 (okay) response code.
            http_response_code(200);
            echo "Дякую. Ваше повідомлення відправлено!";
        } else {
            # Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "Помилка. Перевірте правильність заповнення форми!!!";
        }

    } else {
        # Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "Будь ласка, повторіть.";
    }

?>