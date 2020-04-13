<?php 
$name = $_POST['formName'];
$email = $_POST['formEmail'];
$phone = $_POST['formPhone'];
$address = $_POST['formAddress'];
$cdData = $_POST['formCD'];

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
if ($address === ''){
    print json_encode(array('message' => 'Error: Description cannot be empty', 'code' => 0));
    exit();
}
if (count($cdData) < 1) {
    print json_encode(array('message' => 'Error: Order at least one item', 'code' => 0));
    exit();
}
$cdDataString = "";
foreach ($cdData as $key => $value) {
    $cdDataString .= "\tItem: " . $value['name'] . " -> Amount: " . $value['amount'] . "\n";
}

// Mail to PJ
$subject = "Order Request $name";
$content = "
From: $name
Email: $email
Phone: $phone
Address: $address
Order: 
$cdDataString
";
$recipient = "obc.artistsmanagement@gmail.com";
$mailheader = "From: $email \r\n";
mail($recipient, $subject, wordwrap($content), $mailheader) or die("Error!");

// Mail to client
$subject = "Thank you for your order at pieterjanverhoyen.be";
$content = "Dear $name

Thank you for your order at pieterjanverhoyen.be, you can review your order details below. In case there would be any errors in these order details, please reply to this email.
Payment details will be sent to you within 5 business days. The order will be shipped after payment has been received.

Order details: 
Name: $name
Email: $email
Phone: $phone
Address: $address
Order: 
$cdDataString


Kind regards

Pieter-Jan Verhoyen
";
$recipient = $email;
$mailheader = "From: obc.artistsmanagement@gmail.com \r\n";
mail($recipient, $subject, wordwrap($content), $mailheader) or die("Error!");

print json_encode(array('message' => 'Order successful! We will get in touch with you shortly. A Confirmation Email has been sent to you. Don’t forget to check your junk tab.', 'code' => 1));
exit();
?>