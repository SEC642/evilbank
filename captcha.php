<?php
error_reporting('E_ALL');
require('utils.php');

function produceimage($text) {
    // constant values
    $backgroundSizeX = 1000;
    $backgroundSizeY = 350;
    $sizeX = 165;
    $sizeY = 100;
    $fontFile = "captcha/verdana.ttf";
    $textLength = strlen($text);

    // generate random security values
    $backgroundOffsetX = rand(0, $backgroundSizeX - $sizeX - 1);
    $backgroundOffsetY = rand(0, $backgroundSizeY - $sizeY - 1);
    $angle = rand(-5, 5);
    #$fontColorR = rand(0, 127);
    #$fontColorG = rand(0, 127);
    #$fontColorB = rand(0, 127);
    $fontColorR = 255;
    $fontColorG = 255;
    $fontColorB = 255;

    $fontSize = rand(14, 24);
    $textX = rand(0, (int)($sizeX - 0.9 * $textLength * $fontSize)); // these coefficients are empiric
    $textY = rand((int)(1.25 * $fontSize), (int)($sizeY - 0.2 * $fontSize)); // don't try to learn how they were taken out

    $gdInfoArray = gd_info();
    if (! $gdInfoArray['PNG Support'])
        return IMAGE_ERROR_GD_TYPE_NOT_SUPPORTED;

    // create image with background
    $src_im = imagecreatefrompng( "captcha/background.png");
    if (function_exists('imagecreatetruecolor')) {
        // this is more qualitative function, but it doesn't exist in old GD
        $dst_im = imagecreatetruecolor($sizeX, $sizeY);
        $resizeResult = imagecopyresampled($dst_im, $src_im, 0, 0, $backgroundOffsetX, $backgroundOffsetY, $sizeX, $sizeY, $sizeX, $sizeY);
    } else {
        // this is for old GD versions
        $dst_im = imagecreate( $sizeX, $sizeY );
        $resizeResult = imagecopyresized($dst_im, $src_im, 0, 0, $backgroundOffsetX, $backgroundOffsetY, $sizeX, $sizeY, $sizeX, $sizeY);
    }

    if (! $resizeResult)
        return IMAGE_ERROR_GD_RESIZE_ERROR;

    // write text on image
    if (! function_exists('imagettftext'))
        return IMAGE_ERROR_GD_TTF_NOT_SUPPORTED;
    $color = imagecolorallocate($dst_im, $fontColorR, $fontColorG, $fontColorB);
    imagettftext($dst_im, $fontSize, -$angle, $textX, $textY, $color, $fontFile, $text);

    // output header
    header("Content-Type: image/png");

    // output image
    imagepng($dst_im);

    // free memory
    imagedestroy($src_im);
    imagedestroy($dst_im);

    return IMAGE_ERROR_SUCCESS;
}


$key = md5("lenovo");

if (isset($_GET['enc']) and !isset($_GET['captcha'])) {
	// Decrypt enc, get the string and produce the image 
    $iv = hex2bin(substr($_GET['enc'], 0, 16));
    $enc = hex2bin(substr($_GET['enc'], 16));

	list ($status, $plaintext) = decrypt($enc, $key, $iv);
    if ($status == 0) {
	    produceimage($plaintext);
	} else {
		print("ERROR: padding invalid.");
	}
} else if (isset($_GET['enc']) and isset($_GET['captcha'])) {
    // Decrypt and validate string
    $iv = hex2bin(substr($_GET['enc'], 0, 16));
    $enc = hex2bin(substr($_GET['enc'], 16));

	list ($status, $plaintext) = decrypt($enc, $key, $iv);
    if ($status != 0) {
		print("ERROR: padding invalid.");
	}

    if ($plaintext == $_GET['captcha']) {

?>
<html>
<head>
<link rel="stylesheet" href="main.css" type="text/css" />
<title>You Passed the CAPTCSHA Test!</title>
</head>
<body>
<div class="captcha_example">
<h4>You truly are evil.</h4>
</div>
</body>
</html>

<?php

 	} else {
        /* Invalid CAPTCHA.  Send them back to the form. */
        $key = md5("lenovo");
        $textstr = randstring(9);
        $iv = randval(8);
        $cipher = encrypt($textstr, $key, $iv);
        $enc = bin2hex($iv) . bin2hex($cipher);
        header('Location: /index.php?enc='.$enc);
	}
}
