<?php
$result = mail("hewitt@tpi.edu.my", "Test", "This is a test email");
echo $result ? "Mail sent!" : "Mail failed!";
?>