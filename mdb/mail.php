<?php 
$name = $_POST['formName'];
$email = $_POST['formEmail'];
$phone = $_POST['formPhone'];
$organisation = $_POST['formOrg'];
$message = $_POST['formDescription'];

header('Content-Type: application/json');
if ($name === ''){
    print json_encode(array('message' => 'Name cannot be empty', 'code' => 0));
    exit();
}
if ($email === ''){
    print json_encode(array('message' => 'Email cannot be empty', 'code' => 0));
    exit();
} else {
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)){
        print json_encode(array('message' => 'Email format invalid.', 'code' => 0));
        exit();
    }
}
if ($phone === ''){
    print json_encode(array('message' => 'Phone cannot be empty', 'code' => 0));
    exit();
}
if ($message === ''){
    print json_encode(array('message' => 'Description cannot be empty', 'code' => 0));
    exit();
}

$subject = "Booking Request $name, $organisation";

$content="From: $name \n Email: $email \n Phone: $phone \n Organisation: $organisation \n Message: $message";
$recipient = "elias.coudenys@gmail.com";
$mailheader = "From: $email \r\n";
mail($recipient, $subject, $content, $mailheader) or die("Error!");
print json_encode(array('message' => 'Email successfully sent!', 'code' => 1));
exit();
?>