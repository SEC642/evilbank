function isEmpty(obj, val) {	
	if (!obj) return false;
	if (val == null) val = '';
	var i;		
	if (obj.type != null) {
		if ( obj.type == "text" || obj.type == "textarea" || obj.type == "password" ) {
			if (obj.value == val) return true;
			return false;
		}	
		if (obj.type.indexOf("select") > -1) {	
			if (obj.options.length > 0) {					
				if (obj.options[obj.selectedIndex].value != val) return false;			
				return true;
			}
			else return true;
		}		
		if (obj.type == "checkbox") {
			if (obj.checked == true) return false;
			return true;
		}
	}	
	if (obj.length > 0)	{
		if (obj[0].type == "radio") {
			for (i=0;i<obj.length;i++) {
				if (obj[i].checked == true && obj[i].value != val) return false;
			}
			return true;
		}		
	}
	return false;
}

function isRadioListEmpty(id) {
	var f = document.forms[0];
	for (var i=0; i<f.length; i++) {
		if (f[i].id.indexOf(id) == 0) {
			if (f[i].checked && f[i].value != '') return false;
		}
	}
	return true;	
}

function isCheckboxListEmpty(id) {
	var f = document.forms[0];
	for (var i=0; i<f.length; i++) {
		if (f[i].id.indexOf(id) == 0) {
			if (f[i].checked) return false;
		}
	}
	return true;	
}

function isListBoxEmpty(obj) {
	if (!obj) return false;
	if (obj.options.length > 0) return false;
	return true;
}

function radioGroupClick(name, obj) {
	var f = document.forms[0];
	
	for (var i=0; i<f.length; i++) {
		if(f[i].type.toLowerCase() == 'radio' && f[i].name.indexOf(name) > 0) {
			if(f[i].id != obj.id) f[i].checked = false;
		}
	}
}

function setSelect(obj, val) {
	for (var i=0; i<obj.options.length; i++) {
		if (obj.options[i].value == val) obj.selectedIndex = i;
	}
}

function setError(cell, msg) {
	var td = MM_findObj(cell);
	if (td) td.className = "errmsg";
	return msg;
}

function clearError(cell) {
	var td = MM_findObj(cell);
	if (td) td.className = "";
}


function validateNumber(val, reqd, inputMode) {
	if (reqd == null) reqd = true;
	if ((reqd == false) && (val == '')) return true;
	else if ((reqd == true) && (val == '')) return false;
	
	if(inputMode == 'Formatted') return !isNaN(val.replace(/,/gi,''));
	else return !isNaN(val);
}

function formatPhone(obj) {
	var val = obj.value.replace(/[^0-9]/g, '');
	if (val.length != 10) {
		if (obj.className && obj.className.indexOf('errmsg') == -1) obj.className += ' errmsg';
		else obj.className = 'errmsg';
	}
	else {
		obj.value = val.substring(0,3) + '-' + val.substring(3,6) + '-' + val.substring(6,10);
		if (obj.className) obj.className = obj.className.replace(/\s*errmsg/gi, '');
	}
}

function validatePhone(obj0, obj1, obj2, reqd) {
	// assume that required validation will happen elsewhere
	if ((reqd == false) && (obj0.value == '' && obj1.value == '' && obj2.value == '')) return true;
	else if ((reqd == true) && (obj0.value == '' || obj1.value == '' && obj2.value == '')) return false;
	if (isNaN(parseInt(obj0.value))) return false;
	if (isNaN(parseInt(obj1.value))) return false;
	if (isNaN(parseInt(obj2.value))) return false;
	if (obj0.value.length < 3) return false;
	if (obj1.value.length < 3) return false;
	if (obj2.value.length < 4) return false;
	if (obj0.value.indexOf("0") == 0 || obj0.value.indexOf("1") == 0) return false;
	if (obj1.value.indexOf("0") == 0 || obj1.value.indexOf("1") == 0) return false;
	if (obj0.value == "911") return false;
	if (obj1.value == "911") return false;
	
	return true;
}

function isPhone(val, reqd) {
	if (reqd == null) reqd = true;
	if (reqd == false && (val=='' || val=='--')) return true;
	else if (reqd == true && (val=='' || val=='--')) return false;

	if(val.length != 12) return false;
	if(val.indexOf('-') != 3 || val.indexOf('-',5) != 7 || val.indexOf('-',8) != -1) return false;
	if(isNaN(val.replace(/-/gi,''))) return false;
	
	return true
}

function validateUsZip(obj0, obj1, reqd) {
	// assume that required validation will happen elsewhere
	if ((reqd == false) && (obj0.value == '')) return true;
	else if ((reqd == true) && (obj0.value == '')) return false;
	if (isNaN(parseInt(obj0.value))) return false;
	if (obj0.value.length < 5) return false;
	if (obj1.value.length > 0) {
		if (isNaN(parseInt(obj1.value))) return false;
		if (!isUSZip(obj0.value + '-' + obj1.value, reqd)) return false;
	} else
		if (!isUSZip(obj0.value, reqd)) return false;
	
	return true;
}


function validateCurrency(val, reqd, min, max) {
	
	if (reqd == null) reqd = true;
	if ((reqd == false) && (val == '')) return true;
	else if ((reqd == true) && (val == '')) return false;
	
	var minval = (validateCurrency.arguments.length > 1) ? validateCurrency.arguments[1] : 0;	
	val = val.replace(/\$/g,'').replace(/,/g,'');	
	for (var i=0;i<val.length;i++) {		
		if (val.charCodeAt(i) != 46 && (val.charCodeAt(i) < 48 || val.charCodeAt(i) > 57)) return false;
	}
	if(min != null){
		if(parseFloat(val) < min) return false;
	}
	else if (parseFloat(val) < minval) return false;
	if(max != null && parseFloat(val) > max) return false;
	return true;
}

function formatDate(obj) {
	/*if (obj.value == '') return;
	var dt = new Date(obj.value);
	if (isNaN(dt)) {
		if (obj.className && obj.className.indexOf('errmsg') == -1) obj.className += ' errmsg';
		else obj.className = 'errmsg';
	}
	else {		
		obj.value = (dt.getMonth() + 1) + '/' + dt.getDate() + '/' + dt.getFullYear();
		if (obj.className) obj.className = obj.className.replace(/\s*errmsg/gi, '');
	}*/
}

function validateDate(dt, reqd){

	// -- BEGIN -- code from previous version of validateDate()
	// replace any "-" with "/"
	dt = dt.replace(/-/gi, "/");
	
	if (reqd == null) reqd = true;
	if ((reqd == false) && ((dt == '') || (dt == '--') || (dt == '//')) ) return true;
	else if ((reqd == true) && (dt == '')) return false;
	// -- END -- code from previous version of validateDate()
	
	var PDate = new String(dt);
	
	var regex = /(^\d{1,2})\/(\d{1,2})\/(\d{4,4})|(^\d{1,2})\/(\d{1,2})\/(\d{2,2})/;
	
	if( regex.test(PDate) )
	{
		var month = new String(RegExp.$1);
		var day = new String(RegExp.$2);
		var year = new String(RegExp.$3);
		if( month.length == 0 )
		{
			month = new String(RegExp.$4);
			day = new String(RegExp.$5);
			year = new String(RegExp.$6);
		}
		
		var today = new Date();
		var thisYear = new String(today.getFullYear());
		
		if( year.length == 2 )
		{	
			return false;
			
			/*				
			if( year > 50 )
			{
				year = String(Number(thisYear.substring(0,2))-1) + year;
			}
			else
			{
				year = thisYear.substring(0,2) + year;
			}
			*/			
		}
		
		if( month < 1 || month > 12 ) { return false; }

		if( day < 1 || day > 31 ) { return false; }

		if ((month==4 || month==6 || month==9 || month==11) && day>30) { return false; }

		if (month == 2) // check for february 29th
		{ 
			var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
			if (day>29 || (day==29 && !isleap)) 
			{
				return false;
			}
		}		
		
		if( (Number(year) < Number(thisYear) - 250) ||
			(Number(year) > Number(thisYear) + 250) )
			{ return false; }
			
		return true;
	}
	return false;
}


function validateEmail(email, reqd) {
	if (reqd == null) reqd = true;
	if ((reqd == false) && (email == '')) return true;
	else if ((reqd == true) && (email == '')) return false;

	if (email.indexOf('@') == -1) return false;
	if (email.indexOf('@') != email.lastIndexOf('@')) return false;
	if (email.split('@')[0].length == 0 || email.split('@')[1].length == 0) return false;
	if (email.indexOf('.@') != -1 || email.indexOf('@.') != -1) return false;
	if (email.indexOf('.') == -1) return false;	
	if (email.indexOf(' ') != -1) return false;
	var tArr = email.split('.');
	for (var i=0;i<tArr.length;i++) {
		if (tArr[i].length == 0) return false;
	}	
	return true;
}

function isUSZip(val, reqd) {
	if (reqd == null) reqd = true;
	if (reqd == false) {
		if (val=='') return true;
	}
	else if (reqd == true) {
		if (val=='') return false;
	}

	for (var i=0;i<val.length;i++) {
		if (i!=5) if (!isAlphaNumeric(val.charAt(i))) return false;
	}
	if (val.length==5) return !isNaN(parseInt(val));
	else if (val.length == 10 && val.indexOf('-') == 5) {		
		var tArr = val.split('-');
		if (tArr.length	== 2) return (!isNaN(parseInt(tArr[0])) && !isNaN(parseInt(tArr[1])));
	}
	return false;
}

function isUSState(val, reqd) {
	if (reqd == null) reqd = true;
	if (reqd == false) {
		if (val=='') return true;
	}
	else if (reqd == true) {
		if (val == '') return false;
	}
	if (val.length != 2) return false;
	for (var i=0;i<2;i++) {
		if (!isAlpha(val.charAt(i))) return false;
	}
	return true;
}

function isCanadianZip(val) {
	if (val=='') return false;
	if (val.length != 7 || val.indexOf(' ') != 3) return false;
	else {
		for (var i=0;i<7;i++) {
			if (i!=3) if (!isAlphaNumeric(val.charAt(i))) return false; 
		}
	}
	return true;	
}

function formatSSN(obj) {
	var val = obj.value.replace(/[^0-9]/g, '');
	if (val.length != 9) {
		if (obj.className && obj.className.indexOf('errmsg') == -1) obj.className += ' errmsg';
		else obj.className = 'errmsg';
	}
	else {
		obj.value = val.substring(0,3) + '-' + val.substring(3,5) + '-' + val.substring(5,9);
		if (obj.className) obj.className = obj.className.replace(/\s*errmsg/gi, '');
	}
}

function isPersonalTaxId(val, reqd) {
	if (reqd == null) reqd = true;
	if (reqd == false && (val=='' || val=='--')) return true;
	else if (reqd == true && (val=='' || val=='--')) return false;

	if(val.length != 11) return false;
	if(val.indexOf('-') != 3 || val.indexOf('-',4) != 6 || val.indexOf('-',7) != -1) return false;
	if(isNaN(val.replace(/-/gi,''))) return false;
	
	return true
}


function isEmployerTaxId(val, reqd) {
	if (reqd == null) reqd = true;
	if (reqd == false && (val=='' || val=='-')) return true;
	else if (reqd == true && (val=='' || val=='-')) return false;

	if(val.length != 10) return false;
	if(val.indexOf('-') != 2 ) return false;
	if(isNaN(val.replace(/-/gi,''))) return false;
	
	return true
}


function isAlphaNumeric(chr) {
	if (chr.charCodeAt(0) >= 65 && chr.charCodeAt(0) <= 90) return true; // A-Z
	if (chr.charCodeAt(0) >= 97 && chr.charCodeAt(0) <=122) return true; // a-z
	if (chr.charCodeAt(0) >= 48 && chr.charCodeAt(0) <= 57) return true; // 0-9
	return false; 	
}

function isNumeric(chr) {
	if (chr.charCodeAt(0) >= 48 && chr.charCodeAt(0) <= 57) return true; // 0-9
	return false; 
}

function isAlpha(chr) {
	if (chr.charCodeAt(0) >= 65 && chr.charCodeAt(0) <= 90) return true; // A-Z
	if (chr.charCodeAt(0) >= 97 && chr.charCodeAt(0) <=122) return true; // a-z
	return false;
}

function checkBox(obj) {
	for (i=0;i<document.forms.length;i++) {
		if (document.forms[i][obj]) {
			if (!document.forms[i][obj].disabled) document.forms[i][obj].click();				
			break;
		}
	}
}

function radioBtn(obj, idx) {
	for (i=0;i<document.forms.length;i++) {
		if (document.forms[i][obj]) {			
			if (!document.forms[i][obj][idx].disabled) document.forms[i][obj][idx].click();			
			break;
		}
	}
}

function formatPrice(val,decimals) {
	
	if (val=='') return val;
	if (decimals==null) decimals = true;
	var tVal, tArr;	
	val = val.replace(/\$/g,'').replace(/,/g,'');	
	
	if (val.indexOf(".") == -1) 
		val = val + ".00";
	else {
		tArr = val.split(".");
		if (tArr[1].length > 2) {		
			tArr[1] = tArr[1].substr(0,2) + "." + tArr[1].substr(2);		
			tVal = Math.round(parseFloat(tArr[1]));		
			if (tVal > 99) {
				tArr[0] = String(parseInt(tArr[0]) + 1);
				tVal = tVal - 100;
			}
			if (tVal < 10) 	val = tArr[0] + ".0" + String(tVal);			
			else val = tArr[0] + "." + String(tVal);
		}
		else if (tArr[1].length == 2) val = tArr[0] + "." + tArr[1];
		else val = tArr[0] + "." + tArr[1] + "0";
	}	
	
	tArr = val.split(".");
	tVal = "";
	var j = 0;
	for (i=tArr[0].length-1;i>-1;i--) {
		if (j % 3 == 0 && j!=0) tVal = ',' + tVal;
		tVal = tArr[0].substr(i,1) + tVal;		
		j++;
	}	
	tArr[0] = tVal;
	val = '$' + tArr[0] + ((decimals) ? '.' + tArr[1] : '');
	return val;
}

function formatNumber(val,decimals) {
	if (val=='') return val;
	val = val.replace(/,/g,'');
	if (val.indexOf('.') == -1)	val = val + '.0';
	tArr = val.split('.');
	var tVal = '';
	var j = 0;
	for (i=tArr[0].length-1;i>-1;i--) {
		if (j % 3 == 0 && j!=0) tVal = ',' + tVal;
		tVal = tArr[0].substr(i,1) + tVal;		
		j++;
	}
	tArr[0] = tVal;	
	val = tArr[0] + ((decimals == 0) ? '' : '.' + tArr[1]);
	return val;	
}

function maxlength(obj,len) {
	if (obj.value.length >= len) obj.value = obj.value.substr(0,len);
}

function formInit() {
	var f = document.forms[0];
	var b = 0;
	var bArr = new Array();	
	var c = (f.all) ? f.all.tags("input") : f.elements;
	for (var i=0; i<c.length; i++) {	
		if ((c[i].type == 'submit' || c[i].type == 'image' || c[i].type == 'button') && (c[i].id.indexOf('Back') == -1) && (c[i].id.indexOf('Save') == -1)) {
			bArr[b] = c[i];
			b++;
		}
	}
	b = 0;
	for (var i=0; i<c.length; i++) {
		if (c[i].type == 'text' || c[i].type == 'password' || c[i].type == 'file' && (c[i].id.indexOf('Back') == -1) && (c[i].id.indexOf('Save') == -1)) {
			if (c[i].button == null) c[i].button = bArr[b];
			c[i].onkeypress = trapKey;
		}
		else if (c[i].type == 'submit' || c[i].type == 'image' || c[i].type == 'button') b++;
	}
}

function trapKey(e) {	
	if (e != null) {
		if (e.which == 13) {
			if (e.target.button) e.target.button.click();
			return false;
		}
	}
	else if (event) {
		if (event.keyCode == 13) {
			event.cancelBubble = true;
			if (event.srcElement.button) event.srcElement.button.click();
			return false;
		}
	}	
}

function moveFocus(e) {	
	var src = '';
	return;
	if (e != null && e.which != null) {
		if (e.which != 16 && e.which != 9) {
			if (e.target.value.length == e.target.maxLength) {
				src = e.target.name;
			}
		}
	}
	else if (event) {
		if (event.keyCode == 16 || event.keyCode == 9) {
			// do nothing
			event.cancelBubble = true;
		}
		else if (event.srcElement.value.length == event.srcElement.maxLength) {
			src = event.srcElement.name;
		}
	}	
	if (src != '') {
		var f = document.forms[0];		
		var idx = parseInt(src.substr(src.lastIndexOf('_')+1))+1;
		var trg = src.substring(0,src.lastIndexOf('_')+1) + idx;
		f[trg].focus();
	}
}
