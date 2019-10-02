<?php 
    
    // echo json_encode(Array('retrieved' => true,'email' => $_POST['email'], 'firstName' => $_POST['firstName'], 'lastName' => $_POST['lastName'], 'phoneNumber' => $_POST['phoneNumber']));
     // Check For Submit
    $member = $_POST['member'];
    $firstName = htmlspecialchars($_POST['firstName']);
    $lastName = htmlspecialchars($_POST['lastName']);
    $email = htmlspecialchars($_POST['email']);
    $phoneNumber = htmlspecialchars($_POST['phoneNumber']);
    $privacy = $_POST['privacy'];
       // Check Required Fields
         if(!empty($firstName) && !empty($lastName) && !empty($email) && !empty($phoneNumber) ) {
         
         //Recipient Email
        $toEmail = $email;
        $subject = 'GMB Southern London contact request'.' to '.$email;
        $content = file_get_contents('email.html');
        $body = $content;
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-Type: text/html;charset=UTF-8" . "
        \r\n";

        // Additional headers
        $headers .= "From "."<".$email.">". "\r\n";
        if(mail($toEmail, $subject, $body, $headers)) {
            // Email Sent
            echo json_encode(Array('retrieved' => true));
        } else {
        }
}
