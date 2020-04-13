<?php 
$name = $_POST['formName'];
$email = $_POST['formEmail'];
$phone = $_POST['formPhone'];
$organisation = $_POST['formOrg'];
$message = $_POST['formDescription'];

header('Content-Type: application/json');
if ($name === ''){
    print json_encode(array('message' => 'Error: Name cannot be empty', 'code' => 0));
    exit();
}
if ($email === ''){
    print json_encode(array('message' => 'Error: Email cannot be empty', 'code' => 0));
    exit();
} else {
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)){
        print json_encode(array('message' => 'Error: Email format invalid.', 'code' => 0));
        exit();
    }
}
if ($phone === ''){
    print json_encode(array('message' => 'Error: Phone cannot be empty', 'code' => 0));
    exit();
}
if ($message === ''){
    print json_encode(array('message' => 'Error: Description cannot be empty', 'code' => 0));
    exit();
}


// Mail to PJ
$subject = "Booking Request $name, $organisation";
$content = "
From: $name
Email: $email
Phone: $phone
Organisation: $organisation
Message: $message
";
$recipient = "obc.artistsmanagement@gmail.com";
$mailheader = "From: $email \r\n";
mail($recipient, $subject, wordwrap($content), $mailheader) or die("Error!");


// Mail to client
$subject = "Thank you for your booking request of Pieter-Jan Verhoyen";
$content = "Dear $name

Thank you for your booking request of Pieter-Jan Verhoyen, you can review your request details below. In case there would be any errors, please reply to this email.
We will contact you within 5 business days to discuss further details.

Booking request details: 
Name: $name
Email: $email
Phone: $phone
Organisation: $organisation
Description of your booking request: $message


Kind regards

Pieter-Jan Verhoyen
";
$recipient = $email;
$mailheader = "From: obc.artistsmanagement@gmail.com \r\n";
mail($recipient, $subject, wordwrap($content), $mailheader) or die("Error!");


print json_encode(array('message' => 'Thank you for your booking request! We will get in touch with you shortly. A Confirmation Email has been sent to you. Don’t forget to check your junk tab.', 'code' => 1));
exit();
?>