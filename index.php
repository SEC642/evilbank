<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"><head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
	
<title>
	Evil Bank | Primary Applicant Information</title>
<link href="files/main.css" type="text/css" rel="stylesheet">
<script type="text/javascript" src="files/main.js"></script>
<script type="text/javascript" src="files/mmfunc.js"></script>
<script type="text/javascript" src="files/form.js"></script>
<script type="text/javascript" src="files/jquery-1.js"></script>


</head>
<body bgcolor="#ffffff">

<?php
require_once('utils.php');
$key = md5("lenovo");
if (isset($_GET['enc'])) {
    /* Decrypt encrypted value and validate content (for no good reason) */
    $iv = hex2bin(substr($_GET['enc'], 0, 16));
    $encval = hex2bin(substr($_GET['enc'], 16));

	list ($status, $plaintext) = decrypt($encval, $key, $iv);
    if ($status != 0) {
		print("ERROR: padding invalid.");
        exit;
	}
	$enc = $_GET['enc'];
} else {
    $textstr = randstring(9);
    $iv = randval(8);
    $cipher = encrypt($textstr, $key, $iv);
    $enc = bin2hex($iv) . bin2hex($cipher);
}
?>

<form method="GET" action="http://evilbank.sec642.org/captcha.php">


		<table class="wao" width="100%" border="0" cellpadding="0" cellspacing="0">
			<tbody><tr>
				<td>
					
<table width="100%" border="0" cellpadding="0" cellspacing="0">
	<tbody><tr class="branding">
		<td class="logo">
			<a href="http://evilbank.sec642.org/" target="main">
				<img src="files/logo.gif" border="0">
		</a></td>
	</tr>
</tbody></table>
<table width="760" align="center" border="0" cellpadding="0" cellspacing="0">
	<tbody><tr>
		<td>
			<br>
			<h1 class="app">
			Turn Over Your Personal Information</h1>
		</td>
</tr></tbody></table>
<br>

				</td>
			</tr>
			<tr>
				<td>
					<table width="760" align="center" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0">
						<tbody><tr>
							<td valign="top" width="570">
								
								
								
			<h1>Primary Applicant</h1>
	<table id="objForm_tblInfo" border="0" cellpadding="3" cellspacing="0">
	<tbody><tr>
		<td id="objForm_tdFirstName" width="150">
				First Name
			</td>
		<td>
				<input name="FirstName" maxlength="30" id="objForm_FirstName" type="text">
			</td>
	</tr>
	<tr>
		<td>
				Middle Initial
			</td>
		<td>
				<input name="MiddleInitial" maxlength="1" id="objForm_MiddleInitial" size="1" type="text">
			</td>
	</tr>
	<tr>
		<td id="objForm_tdLastName">
				Last Name
			</td>
		<td>
				<input name="LastName" maxlength="25" id="objForm_LastName" type="text">
			</td>
	</tr>
</tbody></table>

	<hr>
	<table border="0" cellpadding="3" cellspacing="0">
	<tbody><tr>
		<td colspan="2">
				<b>Current Address</b>
			</td>
	</tr>
	<tr>
		<td id="objForm_tdCurrentStreet1" width="150">
				Street Address
			</td>
		<td>
				<input name="CurrentStreet1" maxlength="60" id="objForm_CurrentStreet1" size="26" type="text">
			</td>
	</tr>
	<tr>
		<td>
				Unit/Apt #
			</td>
		<td>
				<input name="CurrentStreet2" maxlength="60" id="objForm_CurrentStreet2" type="text">
			</td>
	</tr>
	<tr>
		<td id="objForm_tdCurrentCity">
				City
			</td>
		<td>
				<input name="CurrentCity" maxlength="25" id="objForm_CurrentCity" type="text">
			</td>
	</tr>
	<tr>
		<td id="objForm_tdCurrentState">
				State
			</td>
		<td>
				<input name="CurrentState" maxlength="2" id="objForm_CurrentState" type="text" size="2">
			</td>
	</tr>
	<tr>
		<td id="objForm_tdZipCode">
				Zip Code
			</td>
		<td>
				<input name="CurrentZipCode" maxlength="10" id="objForm_CurrentZipCode" type="text" size="10">
			</td>
	</tr>
</tbody></table>

	<table border="0" cellpadding="3" cellspacing="0">
		<tbody><tr>
			<td>
				Have you lived at this address for two or more years?
			</td>
			<td>
				<table id="objForm_CurrentAddressTime" onclick="checkFormerAddress();">
	<tbody><tr>
		<td><input id="objForm_CurrentAddressTime_0" name="CurrentAddressTime" value="1" checked="checked" type="radio"><label for="objForm_CurrentAddressTime_0">Yes</label></td><td><input id="objForm_CurrentAddressTime_1" name="CurrentAddressTime" value="0" type="radio"><label for="objForm_CurrentAddressTime_1">No</label></td>
	</tr>
</tbody></table>
			</td>
		</tr>
	</tbody></table>
	<div style="display: none;" id="objForm_divFormerAddress0">
		<table border="0" cellpadding="3" cellspacing="0">
	<tbody><tr>
		<td colspan="2">
					<b>Former Address</b> <span class="hint">(may not contain a PO Box)</span>
				</td>
	</tr>
	<tr>
		<td id="objForm_tdFormerStreet1" width="150">
					Street Address
				</td>
		<td>
					<input name="FormerStreet1" maxlength="60" id="objForm_FormerStreet1" type="text">
				</td>
	</tr>
	<tr>
		<td id="objForm_tdFormerStreet2">
					Unit/Apt #
				</td>
		<td>
					<input name="FormerStreet2" maxlength="60" id="objForm_FormerStreet2" type="text">
				</td>
	</tr>
	<tr>
		<td id="objForm_tdFormerCity">
					City
				</td>
		<td>
					<input name="FormerCity" maxlength="25" id="objForm_FormerCity" type="text">
				</td>
	</tr>
	<tr>
		<td id="objForm_tdFormerState">
					State
				</td>
		<td>
					<input name="FormerState" maxlength="2" id="objForm_FormerState" size="2" onblur="this.value=this.value.toUpperCase();" type="text">
				</td>
	</tr>
	<tr>
		<td id="objForm_tdFormerZipCode">
					Zip Code
				</td>
		<td>
					<input name="FormerZipCode" maxlength="5" id="objForm_FormerZipCode" size="10" type="text">
				</td>
	</tr>
</tbody></table>

	</div>
	<table border="0" cellpadding="3" cellspacing="0">
		<tbody><tr>
			<td>
			</td>
		</tr>
	</tbody></table>
	<div style="display: none;" id="objForm_divMailingAddress0">
		<table border="0" cellpadding="3" cellspacing="0">
	<tbody><tr>
		<td colspan="2">
					<b>Mailing Address</b> <span class="hint">(may not contain a PO Box)</span>
				</td>
	</tr>
	<tr>
		<td id="objForm_tdMailingStreet1" width="150">
					Street Address
				</td>
		<td>
					<input name="MailingStreet1" maxlength="60" id="objForm_MailingStreet1" type="text">
				</td>
	</tr>
	<tr>
		<td id="objForm_tdMailingStreet2">
					Unit/Apt #
				</td>
		<td>
					<input name="MailingStreet2" maxlength="60" id="objForm_MailingStreet2" type="text">
				</td>
	</tr>
	<tr>
		<td id="objForm_tdMailingCity">
					City
				</td>
		<td>
					<input name="MailingCity" maxlength="25" id="objForm_MailingCity" type="text">
				</td>
	</tr>
	<tr>
		<td id="objForm_tdMailingState">
					State
				</td>
		<td>
					<input name="MailingState" maxlength="2" id="objForm_MailingState" size="2" onblur="this.value=this.value.toUpperCase();" type="text">
				</td>
	</tr>
	<tr>
		<td id="objForm_tdMailingZipCode">
					Zip Code
				</td>
		<td>
					<input name="MailingZipCode" maxlength="5" id="objForm_MailingZipCode" size="10" type="text">
				</td>
	</tr>
</tbody></table>

	</div>
	<hr>
	<table border="0" cellpadding="3" cellspacing="0">
	<tbody><tr>
		<td id="objForm_tdPhoneNumber" width="150">
				Home Phone Number
			</td>
		<td>
				<input name="PhoneNumber" maxlength="12" id="objForm_PhoneNumber" type="text">
				<span class="hint">(Hint: ###-###-####)</span>
			</td>
	</tr>
</tbody></table>

	<table border="0" cellpadding="3" cellspacing="0">
		<tbody><tr>
			<td>
				Have you had your home phone number for more than 4 months?
			</td>
			<td>
				<table id="objForm_HomePhoneTime">
	<tbody><tr>
		<td><input id="objForm_HomePhoneTime_0" name="HomePhoneTime" value="1" checked="checked" type="radio"><label for="objForm_HomePhoneTime_0">Yes</label></td><td><input id="objForm_HomePhoneTime_1" name="HomePhoneTime" value="0" type="radio"><label for="objForm_HomePhoneTime_1">No</label></td>
	</tr>
</tbody></table>
			</td>
		</tr>
	</tbody></table>
	<table border="0" cellpadding="3" cellspacing="0">
		<tbody><tr>
			<td>
				Is your phone number listed?
			</td>
			<td>
				<table id="objForm_PhonePublished">
	<tbody><tr>
		<td><input id="objForm_PhonePublished_0" name="PhonePublished" value="1" checked="checked" type="radio"><label for="objForm_PhonePublished_0">Yes</label></td><td><input id="objForm_PhonePublished_1" name="PhonePublished" value="0" type="radio"><label for="objForm_PhonePublished_1">No</label></td>
	</tr>
</tbody></table>
			</td>
		</tr>
	</tbody></table>
	<table border="0" cellpadding="3" cellspacing="0">
	<tbody><tr>
		<td id="objForm_tdEmailAddress" width="150">
				Email Address
			</td>
		<td>
				<input name="EmailAddress" maxlength="100" id="objForm_EmailAddress" size="26" type="text">
			</td>
	</tr>
	<tr>
		<td id="objForm_tdEmailAddress2">
				Confirm Email
			</td>
		<td>
				<input name="EmailAddress2" maxlength="100" id="objForm_EmailAddress2" size="26" onpaste="disablePaste()" type="text">
			</td>
	</tr>
</tbody></table>



	<div style="display: none;" id="objForm_divLicenseAddress">
		<table border="0" cellpadding="3" cellspacing="0">
	<tbody><tr>
		<td colspan="2">
					<b>License Address</b> <span class="hint">(may not contain a PO Box)</span>
				</td>
	</tr>
	<tr>
		<td id="objForm_tdDriversStreet1" width="150">
					Street Address
				</td>
		<td width="277">
					<input name="DriversAddress" maxlength="60" id="objForm_DriversAddress" type="text">
				</td>
	</tr>
	<tr>
		<td id="objForm_tdDriversStreet2">
					Unit/Apt #
				</td>
		<td>
					<input name="DriversAddress2" maxlength="60" id="objForm_DriversAddress2" type="text">
				</td>
	</tr>
	<tr>
		<td id="objForm_tdDriversCity">
					City
				</td>
		<td>
					<input name="DriversCity" maxlength="25" id="objForm_DriversCity" type="text">
				</td>
	</tr>
	<tr>
		<td id="objForm_tdDriversState">
					State
				</td>
		<td>
					<input name="DriversState" maxlength="2" id="objForm_DriversState" size="5" onblur="this.value=this.value.toUpperCase();" type="text">
				</td>
	</tr>
	<tr>
		<td id="objForm_tdDriversZipCode">
					Zip Code
				</td>
		<td>
					<input name="DriversZipCode" maxlength="5" id="objForm_DriversZipCode" size="10" type="text">
				</td>
	</tr>
</tbody></table>

	</div>
	<hr>
	<table border="0" cellpadding="3" cellspacing="0">
	<tbody><tr>
		<td id="objForm_tdHaveAccount">
				Do you have an existing Evil Bank Account?
			</td>
		<td>
				<select name="AccountType" id="objForm_AccountType" onchange="checkAccountInfo()">
			<option selected="selected" value=""></option>
			<option value="1">Evil Account</option>
			<option value="2">Evil Gold Account</option>
			<option value="3">Other Evil Account</option>
			<option value="4">No Evil Account</option>

		</select>
			</td>
	</tr>
	<tr style="display: none;" id="objForm_trAccountNumber">
		<td id="objForm_tdAccountNumber">
				Account Number
			</td>
		<td>
				<input name="AccountNumber" maxlength="16" id="objForm_AccountNumber" type="text">
			</td>
	</tr>
	<tr id="objForm_trCoApplicant">
		<td id="objForm_tdCoApplicant">			    
				Will you be applying with a co-applicant?
			</td>
		<td>
				<table id="objForm_JointApp">
			<tbody><tr>
				<td><input id="objForm_JointApp_0" name="JointApp" value="1" type="radio"><label for="objForm_JointApp_0">Yes</label></td><td><input id="objForm_JointApp_1" name="JointApp" value="0" checked="checked" type="radio"><label for="objForm_JointApp_1">No</label></td>
			</tr>
		</tbody></table>
			</td>
	</tr>
	<tr id="objForm_trPromotionCode">
		<td id="objForm_tdPromotionCode">
				If you have a promotion code, please enter it here
			</td>
		<td>
				<input name="PromotionCode" maxlength="12" id="objForm_PromotionCode" type="text">
			</td>
	</tr>
	<tr>
		<td colspan="2">
			</td>
	</tr>
</tbody></table>

	<table width="100%" border="0">
		<tbody><tr>
			<td colspan="3">
				&nbsp;
			</td>
		</tr>
		<tr>
			<td width="50%">
			</td>
			<td width="50%" align="right">
				<input value="Submit" type="Submit">
			</td>
		</tr>
	</tbody></table>

 

							</td>
							<td width="5">
								<img src="files/spacer.gif" alt="" width="5" height="1">
							</td>
							<td class="right" valign="top" width="185">
								<div class="box">
									
	<div class="head"><div>Are you a person?</div></div>
	<ul>

		<li><img src="captcha.php?enc=<?php echo $enc; ?>"></li>
        <li><input type="text" name="captcha" value="" class="captcha" size="28"/></li>
        <li><input type="hidden" name="enc" value="<?php echo $enc; ?>" /></li>
	</ul>


									


<div class="head"><div>Do you need assistance?</div></div>
<div class="content">
	Call us at 401-524-2911
</div>



<div class="head"><div>Your Information is secure</div></div>
<div class="content" align="center">
	<img src="files/verisign.gif" alt="Your Information is Secure" border="0">
</div>
<div class="head"><div>Your privacy is protected</div></div>
<div class="content">
	<a href="http://evilbank.sec642.org/privacy.html">View Privacy Statement</a>
</div>


								</div>
							</td>
						</tr>
						<tr>
							<td>
								<img src="files/spacer.gif" alt="" width="570" height="1">
							</td>
							<td>
								<img src="files/spacer.gif" alt="" width="5" height="1">
							</td>
							<td>
								<img src="files/spacer.gif" alt="" width="185" height="1">
							</td>
						</tr>
						</table>
							</html>
