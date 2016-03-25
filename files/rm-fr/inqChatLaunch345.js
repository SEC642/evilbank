/* Timestamp: Tue Nov 08 13:58:31 PST 2011 */
if (window["v3Lander"]==null){
v3Lander={
	v3Frame:false,
	domState: "defer-failed",
	domReady: false,
	assignDomain:function(){
	try{
		if (window.location.href.indexOf("/inqChat.html") > -1){
			var domainName = document.domain;
			var temp = domainName.split('.');
			for (var i=0; i < temp.length; i++){
				try{
					var tempwindow = null; 
					if ((window.location.href.indexOf("/inqChat.html") > -1) && (window.location.search == ""))
						tempwindow = window.opener;
					else if ((window.location.href.indexOf("/inqChat.html") > -1) && (window.location.search == "?IFRAME" || window.location.search == "?IEXF"))
						tempwindow = window.parent;
					else if ((window.location.href.indexOf("/inqChat.html") > -1) && window.location.search == "?PRXY")
						tempwindow = window.parent.parent;						
					else return ;
					
					var isAssigned = false;
					
					if(tempwindow.document.domain){
						isAssigned = true;
						break;
  					} else{
  						isAssigned = false;
  					}
				}
				catch(ee){
					temp.shift();
					var finalVar = temp.join('.');
					document.domain = finalVar;
  				}
  			}
  			
  			if (!isAssigned) {
	  			var img=document.createElement("IMG");
				img.id="imgLog";
				var infoParam = "level=error&dbg=true&line="+encodeURIComponent("Error document domain values are not matching up for siteID "+345);
				img.src = "https://citizens.inq.com".replace(  /^HTTPS?:/i , document.location.protocol ) + "/tagserver/logging/logline?"+infoParam;
				document.body.appendChild(img);
			}	
  		}
	} catch(e){
	
	}
	return isAssigned;
	},	
	fixV3IFrames:function(div){
		var inqFrames = div.getElementsByTagName("IFRAME");
		div.style.cssText = "overflow:hidden;position:absolute;height:1px;width:1px;left:0px;top:0px;" 
					+"border-style: none;border-width: 0px;" ;
		for (var ix=0; ix < inqFrames.length; ix++)
		{
			inqFrame = inqFrames[ix] ;
			inqFrame.allowTransparency="true" ;
			inqFrame.border="0";
			inqFrame.frameBorder="no" ;
			inqFrame.frameSpacing=0;
			inqFrame.marginWidth=0;	
			inqFrame.style.cssText = 
				"z-index:19999;overflow:hidden;position:absolute;left:0px;top:0px;width:1px;height:1px;border-style: none;border-width: 0px;BACKGROUND-COLOR: Transparent;" ;
		}		
	},
	
	prepareBeforeUnload: function(atxt, ctxt, cancelFcn){
		window.onbeforeunload = function(evt){
			if(inqFrame.Inq.EC.update()){
				
				inqFrame.Inq.EC.fireBeforeUnloadEvent();
				if(atxt)
					alert(atxt);
				window.onbeforeunload = null; 
				
				
				
				setTimeout(cancelFcn, 200);
				return String(ctxt);
			}
		};
	},
	initV3Frame:function(){
		if (window.frameElement)
			window.clientwin = window.parent;
		else if (window.opener)
			window.clientwin = window.opener;
		if (window.clientwin)
			window.clientwin.inqFrame=window ;
		window.inqFrame = window ;
		if (opener) window.name = "_inqPersistentChat" ;
		else		window.name = "inqV3" ;
		v3Lander.insertLandingTag();		
	},
	
	reload: function(){
		self.setTimeout("v3Lander._reload()", 50);
	},
	_reload: function(){
		document.body.removeChild(document.getElementById("inqChatStage"));
		var corner=document.getElementById("inqDivResizeCorner");
		var title=document.getElementById("inqTitleBar");
		if (corner)document.body.removeChild(corner) ;
		if (title)document.body.removeChild(title) ;
		window.inqFrame = null;
				 
		this.v3Frame=false;
		this.createV3Frame();		
	},
	createV3Frame: function(){
		var div = document.createElement("div") ;	
		var port = (document.location.port=="")?"":(":"+document.location.port);	 
		var iframesrc=("/inqChat.html".indexOf("/")==0)
			? document.location.protocol+'//'+document.location.hostname+port+'/inqChat.html?IFRAME'
			: "/inqChat.html" ;		
		div.id = "inqChatStage";
		div.style.cssText = "z-index:19999;overflow:hidden;position:absolute;height:1px;width:1px;left:0px;top:0px;" 
						+"border-style: none;border-width: 0px;" ;	
		div.innerHTML = '<ifr'+'ame id="inqChatStage" name="345" src="'+iframesrc+'"'
					  + ' style="z-index:19999;overflow:hidden;position:absolute;height:1px;width:1px;left:0px;top:0px;border-style: none;border-width: 0px;display: BLOCK;"'			
					  + ' scrolling="NO"'
					  + ' frameborder=0'					  					  
					  + '></iframe>' 							
					  + '<div style="border-width: 0px; position: absolute; z-index: 19999; left: 0px; top: 0px; cursor: move; height: 55px; width: 410px; display: none;" id="inqTitleBar">'
					  + '<img />'					  					  
					  + '</div>'
					  + '<div style="border-width: 0px; position: absolute; z-index: 19999; left: 0px; top: 0px; display:none; height: 0px; width: 0px;" id="inqResizeBox">'
					  + '<div style="border-width: 0px; position: absolute; z-index: 19999; left: 424px; top: 284px; cursor: se-resize; height: 16px; width: 16px; display: none;" id="inqDivResizeCorner"></div>'  ;
		var bdy=document.getElementsByTagName("BODY");
		if (bdy && bdy[0]){
			var iframes = div.getElementsByTagName("IFRAME") ;
			var divs = div.getElementsByTagName("DIV");
			if (iframes) for (ix=iframes.length-1; ix >-1;--ix)	
				bdy[0].appendChild(iframes[ix]);
			if (divs&&divs.length>0)for (ix=divs.length-1; ix >-1;--ix)	
				bdy[0].appendChild(divs[ix]);
		}
		if (iframesrc=="/inqChat.html") {
			var stg = document.getElementById("inqChatStage");
			var doc =  (stg.contentDocument)?stg.contentDocument:stg.contentWindow.document ;
			if (typeof(doc)=="undefined"||doc==null) return ;
			doc.open("replace") ;
			doc.write(
				'<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">\n'
				+'<html><head><title></title>\n'
				+'<meta http-equiv=Content-Type content="text/html; charset=utf-8">\n'
				+'</head>\n'
				+'<body>\n'
				+'<script type="text\/javascript" language="javascript" charset="utf-8" \n'
				+'\t\tsrc="https://citizens.inq.com/chatskins/launch/inqChatLaunch345.js"><\/script>\n'
				+'</body>\n'
				+'</html>'.replace(/^HTTPS?:/i, document.location.protocol));
			doc.close();				
		}
		v3Lander.fixV3IFrames(div);
		v3Lander.v3Frame=(window.frameElement!=null&&typeof(window.frameElement)!="undefined"&& window.frameElement.id=="inqChatStage");
	},
      	
    insertLandingTag:function(){
        var bdy=document.body;
        
        var srctag=document.createElement("SC"+"RIPT");
        
        tagSourceArray=("https://citizens.inq.com".replace(  /^HTTPS?:/i , document.location.protocol ) + "/chatskins/launch/tcFramework345.js").split(":");
        tagSourceArray.shift();
        srctag.src=window.location.protocol+tagSourceArray.join(":");		
        srctag.type="text/javascript";
        srctag.charset="utf-8";
        srctag.language="javascript";
        bdy.appendChild(srctag);   
    },
	onDomReady:function(){
		if (v3Lander.domReady)return;
		
		try {
			if (document["_inqEvLoad"]!=null){
				removeEventListener("load", document._inqEvLoad, false);
				document._inqEvLoad = null ;
				delete document._inqEvLoad;
			}
		} catch (e){}
		try {
			if (document["_inqEvDOMContentLoaded"]!=null){
				removeEventListener("DOMContentLoaded", document._inqEvDOMContentLoaded, false); 
				document._inqEvDOMContentLoaded = null;
				delete document._inqEvDOMContentLoaded;
			}
		} catch (e){}		
		v3Lander.domReady=true;
		if(!v3Lander.v3Frame) v3Lander.createV3Frame();
		else v3Lander.initV3Frame();
	},
	testReady:function(){	
        		
		if (window["inqDOMReady"]){	
			v3Lander.onDomReady();	return;	}		
		if (typeof document.readyState == "undefined") {
			if (document.addEventListener){
				
				if (document["_inqEvLoad"]==null)
					document.addEventListener("load", document._inqEvLoad=function(){setTimeout("v3Lander.onDomReady();", 0);}, false);
				if (document["_inqEvDOMContentLoaded"]==null)
					document.addEventListener("DOMContentLoaded", document._inqEvDOMContentLoaded=function(){setTimeout("v3Lander.onDomReady();", 0);},false);
			}										
			setTimeout("v3Lander.onDomReady()", 100);
		} else {
			if (document.readyState=="complete")
				setTimeout("v3Lander.onDomReady();", 0);			
			else if (document.all && !window.opera){
				  
				var jssrc = ("HTTPS:"==location.protocol.toUpperCase())? "https://citizens.inq.com".replace(  /^HTTPS?:/i , document.location.protocol ) + "/tagserver/v3/defertest.js" : "javascript:''" ;
				try {
					document.write('<sc'+'ript type="text/javascript" id="v3ContentLoadTag" defer="defer" '
								  +'src="'+jssrc+'"></sc'+'ript>');
					if(false)	
					document.write('<iframe id="tcBBFrame" src="https://citizens.inq.com".replace(  /^HTTPS?:/i , document.location.protocol ) + "/tagserver/v3/blank.html" frameborder="0" style="height:0px;width:0px;visibility:hidden" onload="window.v3Lander._tcBBFrameOnload()"></iframe>');
				} catch (e){}
				var v3ContentLoadTag=document.getElementById("v3ContentLoadTag");
				if (v3ContentLoadTag){
					v3ContentLoadTag.onreadystatechange=function(){
						v3Lander.domState=this.readyState;
						if (this.readyState=="complete"){
							setTimeout("v3Lander.onDomReady()", 100);
						}
					};
				}
				else {
					this.uponError(); 
				}
			}			
			else if (document.addEventListener){
				if(/loaded|complete/.test(document.readyState)) 
					setTimeout("v3Lander.onDomReady();", 0);		
				else {
					
					if (document["_inqEvLoad"]==null)
						document.addEventListener("load",			 	document._inqEvLoad=function(){setTimeout("v3Lander.onDomReady();", 0);}, false);
					if (document["_inqEvDOMContentLoaded"]==null)
						document.addEventListener("DOMContentLoaded", 	document._inqEvDOMContentLoaded=function(){setTimeout("v3Lander.onDomReady();", 0);}, false);					
					
					setTimeout(arguments.callee,333);
					return ;
				}
			}
		}
	},	
	uponError:function(){
		  
		if (document.readyState == "complete") {
			setTimeout("v3Lander.onDomReady()", 1);
		}
		else {
			document.attachEvent("onreadystatechange", function(){
				if (document.readyState === "complete") {
					document.detachEvent("onreadystatechange", arguments.callee);
					setTimeout("v3Lander.onDomReady()", 1);
					}
				});
		}
	},	
	prepBBDetect: function(){
		var blankURL = "https://citizens.inq.com".replace(  /^HTTPS?:/i , document.location.protocol ) + "/tagserver/v3/blank.html";
		function _tcBBLoader() {
			setTimeout('document.getElementById("tcBBFrame").src = "'+blankURL+'?tc=1";', 100);
		}
		
		function _tcBBFrameOnload() {
			var tcBBFrame = window.document.getElementById("tcBBFrame");
			if(!tc_iframe_loaded_flag && tcBBFrame.src.indexOf("?tc=1") == -1) {
				if(isIE) {
					window.attachEvent("onload", _tcBBLoader);
				} else {
					window.addEventListener("load", _tcBBLoader, true);
				}
			} else if(!tc_iframe_loaded_flag && tcBBFrame.src.indexOf("?tc=1") != -1) {
				tc_iframe_loaded_flag = true;
			} else if(tc_iframe_loaded_flag) {
				if(!!window.inqFrame)
					window.inqFrame.Inq.EC.setEnabled(false);
				history.back();
			}
		}
		v3Lander._tcBBFrameOnload = _tcBBFrameOnload;
		var tc_iframe_loaded_flag = false;
		var isIE = navigator.userAgent.toLowerCase().indexOf("msie")>-1;

		if(!isIE){
			var iframe=window.document.createElement('iframe');
			iframe.style.position = "absolute";
			iframe.style.width = "10px";
			iframe.style.height = "10px";
			iframe.style.left = 0;
			iframe.style.top = 0;
			iframe.style.zIndex = 0;
			iframe.style.display = "none";
			iframe.style.padding = 0;
			iframe.style.margin = 0;
			iframe.id = "tcBBFrame";
			iframe.name = "tcBBFrame";
			iframe.src = blankURL;
			iframe.onload = v3Lander._tcBBFrameOnload;
			window.document.body.appendChild(iframe);
		}
	},
     	
    removeNode:function(id){
		try {
			var tempID = document.getElementById(id);
			var tag = null;
			if (!!tempID)
        		tag = parent.parent.tempID;
        	if (tag) {
            tag = tag.parentNode ;
            var p = tag.parentNode ;
            var grandparent = parent.parent;
            if (grandparent["Inq"]==null) return;
            if (grandparent.Inq["removeProxyNode"]==null)
                grandparent.Inq["removeProxyNode"]= new grandparent.Function( "id",
                'var node=document.getElementById(id);\n'  
              + 'try{\n'
			  + 'if(!!node) {\n'
              + 'var p=node.parentNode;\n'             
              + 'p.removeChild(node);\n'
              + 'node=p;\n'           
			  + 'if(!!node) {\n'	
              + 'p=node.parentNode;\n'   
              + 'p.removeChild(node);\n'
			  + '}\n'	                
			  + '}\n'	                
              + '}catch(e){}\n'
              );
             grandparent.setTimeout('Inq.removeProxyNode("'+id+'")', 100);
        }
	} catch(ee){
		
	}
    },
      
     postReturnsIE:function(){
        var items = name.split("||");
        var data = decodeURIComponent(items[1]);
        var grandParent = window.parent;  
        try {grandParent.eval(data);} 
        catch (e) {}
        v3Lander.removeNode(items[0]);   
    },     
        
    postReturns:function(){
        var items = name.split("||");
        var data = decodeURIComponent(items[1]);
        var grandParent = window.parent.parent;
        try {grandParent.eval(data);} 
        catch (e) {}
        v3Lander.removeNode(items[0]);
    },	
	main:function(){
		if(navigator.userAgent.indexOf("Opera") >= 0) 
			return;
		try {
			this.assignDomain();
			v3Lander.v3Frame=(window.frameElement!=null&&typeof(window.frameElement)!="undefined"&& window.frameElement.id=="inqChatStage");
		
		} catch(e){v3Lander.v3Frame=false}
		
		
		if(false)
			this.prepBBDetect();

		v3Lander.testReady();
	}
}
     	
	if (window.location.href.indexOf("?IEXF")!=-1) {
		v3Lander.assignDomain();
		v3Lander.postReturnsIE();
	}	
    else if (window.name.indexOf("||")!=-1) { 
		
		v3Lander.assignDomain(); 
		v3Lander.postReturns() ; 
	}
    else v3Lander.main();
}	
/* Timestamp: Tue Nov 08 13:58:31 PST 2011 */
