
function globalInit() {
	if (window.localInit) localInit();
	if (window.formInit) formInit();
	if (window.errorInit) errorInit();
	try {
		if (window.opener) window.opener.name = 'main';
	}
	catch(err) {}
}

function popupInit() {
	window.focus();
	if (window.localInit) localInit();
	if (window.formInit) formInit();
	if (window.errorInit) errorInit();
	if (getSearch('printthis') == '1') window.print();
}

function getCookie(name) {				
	var the_cookie = unescape(document.cookie);		
	if (the_cookie.indexOf(";") > -1 ) {
		var cArr = the_cookie.split("; ");
		for (var i=0;i<cArr.length;i++) {			
			if (cArr[i].indexOf(name + "=") == 0) return cArr[i].substr(name.length+1);
		}
	}
	else if (the_cookie.indexOf(name + "=") == 0) return the_cookie.substr(name.length+1);
	return "";
}

function getCookieSubKey(data, key) {
    var value = '';

    if (data != '') {
        var regex = new RegExp("(.*?)=(.*)");
        var arr = data.split('&');
        key = key.toLowerCase();

        for (var i = 0; i < arr.length; i++) {
            var match = regex.exec(arr[i]);

            if (match != null && match.length > 2) {
                if (match[1].toLowerCase() == key) {
                    value = match[2];
                    break;
                }
            }
        }
    }

    return value;
}

function CookieExists(name) {				
	var the_cookie = unescape(document.cookie);		
	if (the_cookie.indexOf(";") > -1 ) {
		var cArr = the_cookie.split("; ");
		for (var i=0;i<cArr.length;i++) {			
			if (cArr[i].indexOf(name + "=") == 0) return true;
		}
	}
	else if (the_cookie.indexOf(name + "=") == 0) return true;
	return false;
}

function getSearch(name) {
	var src = window.location.search;
	var sArr;
	if (src == '' || src.indexOf(name+'=') == -1) return null;
	if (src.indexOf('?') == 0) src = src.substr(1);
	if (src.indexOf('&') != -1) sArr = src.split('&');
	else sArr = new Array(src);
	for (var i=0;i<sArr.length;i++) {
		if (sArr[i].indexOf(name+'=') == 0) {
			return unescape(sArr[i].split(name+'=')[1]).replace(/\+/g,' ');
		}
	}
	return null;
}

function Guid() {
	return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4()).toUpperCase();
}

function S4() {
	return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

function popup(url,w,h) {
	if (!w) w = 660;
	if (!h) h = 480;
	var win = window.open(url,'popup','scrollbars,width='+w+',height='+h+',resizable,status=yes,location=yes');	
	if(win) win.focus();
}

function helpPopup(id, w, h) {
	if (!w) w = 660;
	if (!h) h = 480;
	var url = BASE_URL + '/help/message.aspx?MessageId=' + id;
	
	popup(url, w, h);
}

function swapTab(obj,cls) {
	if (obj) {
		if (obj.className) {
			obj.className = cls;
		}
	}
}

function clickTab(obj) {
	if (event) if (event.srcElement.tagName != 'TD') return;
	if (obj.children) {
		for (var i=0; i<obj.children.length; i++) {
			if (obj.children[i].tagName == 'A') {
				obj.children[i].click();
				break;
			}
		}
	}
}


function setTagStyle(tag, css, newCss) {		
	if (document.getElementsByTagName) {
		for (var i=0;i<document.getElementsByTagName(tag).length;i++) {
			var obj = document.getElementsByTagName(tag)[i];

			if(obj.className.indexOf(css) >= 0) {
				obj.className = newCss;
			}
			
		}
	}
}

function GetReferrer(cookieName) {
	var val = getCookie(cookieName);

	if(val == '') { 
		val = document.referrer;
		WaoSetCookie(cookieName, val);
	}
	return val;
}

function WaoSetCookie(name, value, days) {
    var expires = '';
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = '; expires=' + date.toGMTString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
}

function UpdateMetaTag(tagname, value, createIfNotFound) {
	var tags = document.getElementsByTagName("meta");
	var found = false;
	
	for(index = 0; index < tags.length; index++) {			    
		if(tags[index].getAttribute("name") == tagname) {
			found = true;
			tags[index].setAttribute("content", value);				    
		}
	}

	if (createIfNotFound && !found) {
		CreateMetaTag(tagname, value);
	}
}

function CreateMetaTag(tagname, value) {
	var meta;
	
	if (document.createElement && (meta = document.createElement('meta'))) {
		meta.name = tagname;
		meta.content = value;
	}

	document.getElementsByTagName("head").item(0).appendChild(meta);
}

function CreateHiddenField(id,value)
{
    	var hiddenField = document.createElement("input");
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("name", id);
		hiddenField.setAttribute("id",id);
		hiddenField.setAttribute("value", value);
        return hiddenField;
	
}


//Used to post CrossSell data to the CEP.
function post_to_url(path,ID_Prefix,TokenFieldID,DataFieldID)
{
	var method =  "post"; 
    var tokenQuery = ID_Prefix + TokenFieldID ;
    var dataQuery =  ID_Prefix + DataFieldID  ;
	
	var form = document.createElement("form");
	form.setAttribute("method", method);
	form.setAttribute("action", path);
	if (document.getElementById(tokenQuery))
	{
	    form.appendChild(CreateHiddenField(TokenFieldID,document.getElementById(tokenQuery).value));
	}
	if (document.getElementById(dataQuery))
	{
	    form.appendChild(CreateHiddenField(DataFieldID,document.getElementById(dataQuery).value));
	}
	document.body.appendChild(form);    
	form.submit();
}
function PrintDisclosure(name)
{
	window.frames[name].focus();
	window.frames[name].print();
}
function wait(ms) {
	ms += new Date().getTime();
	while (new Date() < ms) { }
} 

function ExecuteClearSaleing() {
	csAjaxTracking = true;
	csExecuteShoppingCart();
	csExecuteTracker();
	wait(250);
}

function GetDepositAmounts(query) {
	var amounts = "";
	var list = $(query);
	for (var i = 0; i < list.length; i++) {
		amounts = amounts + list.get(0).value + ";";
	}
	return amounts;
}