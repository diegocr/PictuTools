/* ***** BEGIN LICENSE BLOCK *****
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/
 * 
 * The Original Code is PictuTools Mozilla Extension.
 * 
 * The Initial Developer of the Original Code is
 * Copyright (C)2012 Diego Casorran <dcasorran@gmail.com>
 * All Rights Reserved.
 * 
 * ***** END LICENSE BLOCK ***** */

let {classes: Cc, interfaces: Ci, utils: Cu} = Components,tn,addon;
let { btoa } = Cu.import("resource://gre/modules/Services.jsm");

function rsc(n) 'resource://' + addon.tag + '/' + n;

let spec = [
	{e:'menu',d:{label:'Convert'},i:[
			{e:'menuitem',d:{label:'to BMP format',tooltiptext:'Convert your image to the BMP format with this free online image converter.',url:'http://www15.online-convert.com/init-image-conversion',ja:'external_url=##u&string_method=convert-to-gif',opt:1}},
			{e:'menuitem',d:{label:'to EPS format',tooltiptext:'Convert your image to the EPS format with this free online image converter.',url:'http://www15.online-convert.com/init-image-conversion',ja:'external_url=##u&string_method=convert-to-eps',opt:1}},
			{e:'menuitem',d:{label:'to GIF format',tooltiptext:'Convert your image to the GIF format with this free online image converter.',url:'http://www15.online-convert.com/init-image-conversion',ja:'external_url=##u&string_method=convert-to-gif',opt:1}},
			{e:'menuitem',d:{label:'to HDR format',tooltiptext:'Convert your image to the HDR/EXR format with this free online image converter.',url:'http://www15.online-convert.com/init-image-conversion',ja:'external_url=##u&string_method=convert-to-hdr-exr',opt:1}},
			{e:'menuitem',d:{label:'to ICO format',tooltiptext:'Convert your image to the ICO format with this free online image converter.',url:'http://www15.online-convert.com/init-image-conversion',ja:'external_url=##u&string_method=convert-to-ico',opt:1}},
			{e:'menuitem',d:{label:'to JPG format',tooltiptext:'Convert your image to the JPG format with this free online image converter.',url:'http://www15.online-convert.com/init-image-conversion',ja:'external_url=##u&string_method=convert-to-jpg',opt:1}},
			{e:'menuitem',d:{label:'to PDF format',tooltiptext:'Convert your image to the PDF format with this free online image converter.',url:'http://www15.online-convert.com/init-image-conversion',ja:'external_url=##u&string_method=convert-to-pdf',opt:1}},
			{e:'menuitem',d:{label:'to PNG format',tooltiptext:'Convert your image to the PNG format with this free online image converter.',url:'http://www15.online-convert.com/init-image-conversion',ja:'external_url=##u&string_method=convert-to-png',opt:1}},
			{e:'menuitem',d:{label:'to SVG format',tooltiptext:'Convert your image to the SVG format with this free online image converter.',url:'http://www15.online-convert.com/init-image-conversion',ja:'external_url=##u&string_method=convert-to-svg',opt:1}},
			{e:'menuitem',d:{label:'to TGA format',tooltiptext:'Convert your image to the TGA format with this free online image converter.',url:'http://www15.online-convert.com/init-image-conversion',ja:'external_url=##u&string_method=convert-to-tga',opt:1}},
			{e:'menuitem',d:{label:'to TIFF format',tooltiptext:'Convert your image to the TIFF format with this free online image converter.',url:'http://www15.online-convert.com/init-image-conversion',ja:'external_url=##u&string_method=convert-to-tiff',opt:1}},
			{e:'menuitem',d:{label:'to WBMP format',tooltiptext:'Convert your image to the WBMP format with this free online image converter.',url:'http://www15.online-convert.com/init-image-conversion',ja:'external_url=##u&string_method=convert-to-wbmp',opt:1}},
			{e:'menuitem',d:{label:'to WebP format',tooltiptext:'Convert your image to the WebP format with this free online image converter.',url:'http://www15.online-convert.com/init-image-conversion',ja:'external_url=##u&string_method=convert-to-webp',opt:1}},
			{e:'menuseparator'},
			{e:'menuitem',d:{label:'to Data URI',tooltiptext:'Convert your image to Base64 Data URI',url:'http://software.hixie.ch/utilities/cgi/data/data?base64=1&type=text%2Fhtml%3Bcharset%3Dutf-8&uri=##u'}},
		]},
	{e:'menu',d:{label:'Edit'},i:[
			// {e:'menuitem',d:{label:'Aviary',tooltiptext:'',url:'http://advanced.aviary.com/apps/xmlapi/receiver.aspx',ja:'url=##u'}},
			{e:'menuitem',d:{label:'BeFunky',tooltiptext:'BeFunky lets you apply photo effects, enhance, edit pictures and photos online. Cartoon, sketch, painting, pop art and more...',url:'http://www.befunky.com/create/?openurl=##u'}},
			{e:'menuitem',d:{label:'DrPic',tooltiptext:'Crop, Resize, Add Text, Special Effects, and Host your pictures online for free (with ads, in HTML/JS)',url:'http://drpic.com/?fetch=##u'}},
			{e:'menuitem',d:{label:'FotoFlexer',tooltiptext:'FotoFlexer lets you remove blemishes, change skin/hair color, morph photos and more! 100% free (with ads)',url:'http://fotoflexer.com/API/API_Loader_v1_01.php?ff_image_url=##u'}},
			{e:'menuitem',d:{label:'Iaza',tooltiptext:'Provides several conversion and effect tools by just clicking links',url:'http://www.iaza.com/xpages/xload.html',ja:'URL=##u'}},
			// {e:'menuitem',d:{label:'iPiccy',tooltiptext:'iPiccy allows you not only do basic edits: picture crop, rotate and resize but more advanced photo editing like facial touch-up, painting with custom brushes, overlay photos, stickers, add cool frames and apply stunning textures',url:'http://ipiccy.com/uploader/upTemp.php',ja:'f=##u'}},
			{e:'menuitem',d:{label:'LunaPic',tooltiptext:'Edit Your Pictures with this basic but powerful online editor (ads, HTML)',url:'http://www.lunapic.com/editor/index.php?action=url&url=##u'}},
			{e:'menuitem',d:{label:'Phixr',tooltiptext:'Online photo editor with no Flash required',url:'http://www.phixr.com/photo/photoupload?pictureurl=##u&picturename=##t'}},
			{e:'menuitem',d:{label:'PhotoCat',tooltiptext:'Retouch pictures, make photo collages, apply effects, filters, add frames, text, speech bubbles, etc',url:'http://web.photocat.com/edit/?imgURL=##u'}},
			{e:'menuitem',d:{label:'PicMonkey',tooltiptext:'Touch-up like teeth whitening, blemish fix, insta-thin. Effects like Orton, cross process, color boost (Adds WATERMARKs to photos)',url:'http://www.picmonkey.com/chrome_ext',opt:1}},
			{e:'menuitem',d:{label:'Pixenate',tooltiptext:'Edit photos online, fast and easily - No plugins required.',url:'http://pixenate.com/index.php?op=&image=##u'}},
			{e:'menuitem',d:{label:'PixLR',tooltiptext:'Flash-based online image editor.',url:'http://pixlr.com/editor/?s=c&image=##u&title=##t'}},
			{e:'menuitem',d:{label:'PixLR (express)',tooltiptext:'Flash-based online image editor, express/basic version',url:'http://pixlr.com/express/?s=c&image=##u&title=##t'}},
			{e:'menuitem',d:{label:'PixLR (o-matic)',tooltiptext:'Flash-based online image editor which lets you apply different effects easily',url:'http://pixlr.com/o-matic/?s=c&image=##u&title=##t'}},
			{e:'menuitem',d:{label:'SumoPainting',tooltiptext:'With SumoPaint you can Create, Share and Remix your Images.',url:'http://www.sumopaint.com/app/?url=##u'}},
			{e:'menuitem',d:{label:'Zygomatic',tooltiptext:'HTML-based editor. Resize, filters, sepia, crop, rotate, flip, effects',url:'http://www.freeonlinephotoeditor.com/',ja:'url=##u'}},
			{e:'menuseparator'},
			// {e:'menuitem',d:{label:'DeMotivational Poster',tooltiptext:'Meme Generator',url:'http://www.demotivationalpics.com/diy/autodemotivator.php?urlup=##u'}},
			// {e:'menuseparator'},
			{e:'menuitem',d:{label:'Ancient Look',tooltiptext:'Makes the image look like very old photographs',url:'http://labs.wanokoto.jp/olds#ended',ja:'data[Old][url]=##u'}},
			{e:'menuitem',d:{label:'DynamicDrive Optimizer',tooltiptext:'Lets you easily optimize your gifs, animated gifs, jpgs, and pngs, so they load as fast as possible on your site.',url:'http://tools.dynamicdrive.com/imageoptimizer/index.php',ja:'go=optimize&type=same%20as%20input%20type&url=##u'}},
			{e:'menuitem',d:{label:'pomf.me',tooltiptext:'Captioning tool',url:'http://pomf.me/api/upload_remote?embed&url=##u'}},
			// {e:'menuitem',d:{label:'SmushIt Optimizer',tooltiptext:'Smush.it uses optimization techniques specific to image format to remove unnecessary bytes from image files. It is a "lossless" tool, which means it optimizes the images without changing their look or visual quality.',url:'http://www.smushit.com/ysmush.it/',ja:'img=##u'}},
		]},
	{e:'menu',d:{label:'Host'},i:[
			{e:'menuitem',d:{label:'ImageShack',tooltiptext:'Host on ImageShack',url:'http://post.imageshack.us/transload.php',ja:'key=0ZP1WY24daee3499128782a3aa3fac083c0b089c&url=##u'}},
			{e:'menuitem',d:{label:'Imgur',tooltiptext:'Host on imgur.com image hosting',url:'http://imgur.com/api/upload/?url=##u'}},
			{e:'menuitem',d:{label:'OverPic',tooltiptext:'Host on overpic.het image hosting',url:'http://overpic.net/upload.php?url=1',ja:'filetitle[]=##t&userfile[]=##u&ittl=15552000'}},
			{e:'menuitem',d:{label:'PostImage',tooltiptext:'Host on postimage.org',url:'http://postimage.org/index.php?um=url',ja:'mode=local&um=url&url_list=##u&optsize=0&adult=no&submit=%C2%A1Subir%21'}},
			// {e:'menuitem',d:{label:'',tooltiptext:'',url:''}},
		]},
	{e:'menu',d:{label:'Information'},i:[
			{e:'menuitem',d:{label:'Exif viewer',tooltiptext:'View EXIF information for the image',url:'http://regex.info/exif.cgi?url=##u'}},
			{e:'menuitem',d:{label:'MetaPicZ',tooltiptext:'Metadata and exif viewer',url:'http://metapicz.com/#landing?imgsrc=##u'}},
			{e:'menuitem',d:{label:'HTTP Viewer',tooltiptext:'See exactly what an HTTP request returns to your browser',url:'http://www.rexswain.com/cgi-bin/httpview.cgi?req=Head&fwd=on&fmt=Auto&aen=&ver=1.1&url=##u'}},
		]},
	{e:'menu',d:{label:'Share'},i:[
			{e:'menuitem',d:{label:'AddThis',tooltiptext:'Share to any of the supported websites by AddThis',url:'http://www.addthis.com/bookmark.php?v=250&url=##u&title=##t'}},
			{e:'menuitem',d:{label:'Facebook',tooltiptext:'Share on Facebook',url:'http://www.facebook.com/sharer/sharer.php?u=##u'}},
			{e:'menuitem',d:{label:'Twitter',tooltiptext:'Tweet this image',url:'http://twitter.com/intent/tweet?text=##t&url=##u'}},
			{e:'menuseparator'},
			{e:'menuitem',d:{label:'QR Code',tooltiptext:'Obtain a QR code which point to this image.',url:'http://chart.apis.google.com/chart?cht=qr&chs=480x480&chl=##u'}},
		]},
	{e:'menu',d:{label:'Similar'},i:[
			{e:'menuitem',d:{label:'Baidu',tooltiptext:'Reverse image search using the Japanesse Baidu Service',url:'http://stu.baidu.com/i?rt=0&rn=10&ct=1&tn=baiduimage&objurl=##u'}},
			// {e:'menuitem',d:{label:'Cydral',tooltiptext:'Reverse image search using Cydral',url:'http://www.cydral.com/#url=##u'}},
			{e:'menuitem',d:{label:'Google',tooltiptext:'Reverse image search using Google Images',url:'http://www.google.com/searchbyimage?hl=en&safe=off&client=firefox-a&rls=org.mozilla:en-US:official&site=search&image_url=##u'}},
			{e:'menuitem',d:{label:'TinEye',tooltiptext:'Reverse image search using TinEye',url:'http://www.tineye.com/search?url=##u'}},
			{e:'menuitem',d:{label:'Yandex',tooltiptext:'Reverse image search using the Russian Yandex Service',url:'http://images.yandex.ru/yandsearch?rpt=imagedups&img_url=##u'}},
		]},
	{e:'menuseparator'},
	{e:'menu',d:{label:'Misc'},i:[
			{e:'menuitem',d:{label:'Decode QR Code',tooltiptext:'Lets you decode a 1D or 2D barcode',url:'http://zxing.org/w/decode?u=##u&full=true'}},
			{e:'menuitem',d:{label:'i2OCR',tooltiptext:'Free online OCR that converts images into editable text.',url:'http://www.i2ocr.com/?url=##u#i2ocr_form'}},
			{e:'menuitem',d:{label:'NewOCR',tooltiptext:'Free online OCR service that allows to convert images into editable text.',url:'http://www.newocr.com/',ja:'url=##u'}},
			{e:'menuitem',d:{label:'WhatFontIs',tooltiptext:'Send the image to whatfontis.com to identify the font used.',url:'http://www.whatfontis.com/',ja:'chkk=1&allfonts=3&reverse=0&p=1&file1=##u'}},
			{e:'menuitem',d:{label:'WhatTheFont',tooltiptext:'Find what the type of font is used on the image',url:'http://www.myfonts.com/WhatTheFont/upload?url=##u'}},
			{e:'menuitem',d:{label:'WhatsItsColor',tooltiptext:'Find the complementary and primary color of the image',url:'http://whatsitscolor.com/image-color-helper.php',ja:'quicksize=500&Submit=Upload+%26+Process&file1=&url=##u'}},
			// {e:'menuitem',d:{label:'',tooltiptext:'',url:''}},
			{e:'menuitem',d:{label:'ZoomIt',tooltiptext:'Converts your image to the Deep Zoom format, which lets you smoothly and efficiently explore the whole image, no matter how large.',url:'http://zoom.it/?url=##u'}},
		]}
];

function ic(o,n) {
	try {
		let u = Services.io.newURI(n.substr(0,let (x = n.indexOf('##')) ++x || n.length),null,null);
		o.addEventListener('error',function() {
			this.setAttribute('image',u?u.prePath + '/favicon.ico':rsc('icon.png'));
			u = null;
		},false);
		o.setAttribute('image',u.resolve('favicon.ico'));
	} catch(e) {
		o.setAttribute('image',rsc('icon.png'));
	} finally {
		o=n= null;
	}
}

function lo(a,d,e,r) {
	a.addEventListener("load", function() {
		a.removeEventListener("load", arguments.callee, true);
		let wnd = a.contentWindow;
		if(~r.indexOf('online-convert.com/')) {
			wnd.scrollTo(0,4096);
		} else if(~r.indexOf('picmonkey.com/')) {
			xhr(e,function(data) {
				let mime = Cc["@mozilla.org/mime;1"].getService(Ci.nsIMIMEService);
				try {
					mime = mime.getTypeFromExtension(e.replace(/[\?#].*$/,'').replace(/.*\./,'.'));
				} catch(e) { mime = 'image/png'; }
				wnd = wnd.wrappedJSObject;
				let ev = wnd.document.createEvent('Event');
				ev.initEvent('LoadUrl', true, true);
				wnd.document.getElementById('editor_url')
					.innerText = 'data:'+mime+';base64,'+btoa(data);
				wnd.document.getElementById('editor').dispatchEvent(ev);
			});
		}
	}, true );
}

function handler(ev) {
	let o = ev.target, l = tn.src, d = tn.ownerDocument, u = o.getAttribute('url'), w = d.defaultView;
	
	if(!(/^http/i.test(l))) {
		w.alert(_('main.invalidfile') || 'Sorry, this is not a supported image file (ie. does not belong to the http protocol)');
	} else {
		let p = o.hasAttribute('ja'),s,j,fc = function(a,b) {
			switch(b) {
				case 'u': return encodeURIComponent(l);
				case 't': return encodeURIComponent(tn.title||tn.alt||d.title);
			}
		};
		
		u = u.replace(/##(\w)/g,fc);
		
		try {
			let b = Services.wm.getMostRecentWindow("navigator:browser").getBrowser(),
				t = b.selectedTab = b.addTab(rsc('loading.png'));
			if(p) {
				p = o.getAttribute('ja').replace(/##(\w)/g,fc);
				j = Cc["@mozilla.org/network/mime-input-stream;1"].createInstance(Ci.nsIMIMEInputStream);
				s = Cc["@mozilla.org/io/string-input-stream;1"].createInstance(Ci.nsIStringInputStream);
				s.setData(p,p.length);
				j.addHeader("Content-Type", "application/x-www-form-urlencoded");
				j.addContentLength = true;
				j.setData(s);
				d=function()b.loadURIWithFlags(u,0,null,null,j);
			} else {
				d=function()b.loadURI(u);
			}
			w.setTimeout(function()(d(),o.hasAttribute('opt') && lo(b.getBrowserForTab(t),o,l,u)||0),140);
		} catch(e) {
			w.alert(e);
		}
	}
}

function attachReady(window) {
	if(!window || window.location != 'chrome://browser/content/browser.xul')
		return;
	
	function c(n) window.document.createElement(n);
	function z(n) n.toLowerCase().replace(/[^\w]/g,'');
	function e(e,a) {
		if((e=c(e))&&a)
			for(let x in a)e.setAttribute(x,a[x]);
		return e;
	}
	let hserv = Services.prefs.getCharPref('extensions.pictutools.hserv');
	if(hserv) {
		try {
			hserv = new RegExp('^('+hserv.replace(',','|','g')+')$','i');
		} catch(e) {
			Cu.reportError(e);
			hserv = null;
		}
	}
	// let localeStrings = [];
	function u(i,m) {
		let o;
		if(i.d) {
			i.d.tag = z(i.d.label);
			i.d.id=i.d.id||((m.id.indexOf(addon.tag)==0?m.id:addon.tag)+'-'+i.d.tag);
			i.d['class'] = i.e + '-iconic';
			
			if(_) {
				let base = i.e + '.' + (m.hasAttribute('tag') ? m.getAttribute('tag') + '.' : '') + i.d.tag;
				// localeStrings.push(base + ': '+i.d.label);
				
				i.d.label = _(base) || i.d.label;
				// if(i.d.tooltiptext)
					// localeStrings.push(base + '.tooltiptext: '+i.d.tooltiptext);
				
				i.d.tooltiptext = _(base + '.tooltiptext') || i.d.tooltiptext;
				if(!i.d.tooltiptext) delete i.d.tooltiptext;
			}
			
			if(hserv && hserv.test(i.d.label))
				return null;
		}
		m.appendChild(o=e(i.e,i.d));
		switch(i.e) {
			case 'menu':
				let n = e('menupopup',i.d);
				o.appendChild(n);
				if(i.i) for each(let s in i.i) u(s,n);
				o.setAttribute('image',rsc('icons/'+i.d.tag+'.png'));
				return (n.removeAttribute('id'), n);
			case 'menuitem':
				o.addEventListener('command', handler, true);
				ic(o,i.d.url);
			default:
				break;
		}
		return o;
	}
	
	window.setTimeout(function() {
		let p = window.document.getElementById('contentAreaContextMenu');
		p.addEventListener('popupshown',lis,false);
		p=u({e:'menu',d:{label:addon.name,id:addon.tag}},p);
		for each(let i in spec)u(i,p);
		
		// window.alert(localeStrings.join("\n"));
	/* 	let desc = [];
		for each(let z in spec) {
			if(!z.i||z.d.label == 'Convert')continue;
			desc.push('&oplus; '+z.d.label+':<ol>');
			for each(let m in z.i) {
				if(!m.d)continue;
				desc.push('<li><b>'+m.d.label+'</b>: <em>'+m.d.tooltiptext+'</em></li>');
			}
			desc.push('</ol>');
		}
		let fmts = [];
		for each(let f in spec[0].i) if(f.d)fmts.push(f.d.label.replace(/to|format|\s/gi,''));
		desc.push('It also lets you convert images to the formats '+fmts.join(', '));
		window.alert(desc.join("\n")); */
	},901);
}
function attach(domWindow) {
	if(domWindow.document.readyState == "complete") {
		attachReady(domWindow);
	} else {
		domWindow.addEventListener('load', function(ev) {
			domWindow.removeEventListener(ev.type, arguments.callee, false);
			attachReady(domWindow);
		}, false);
	}
}

function xhr(url,cb) {
	let xhr = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"]
		.createInstance(Ci.nsIXMLHttpRequest);
	
	let handler = function(ev) {
		evf(function(m) xhr.removeEventListener( m, handler, false ));
		switch(ev.type) {
			case 'load':
				if(xhr.status == 200) {
					let ba = new Uint8Array(xhr.response),
						tmp = [];
					for(let i = 0, m = ba.byteLength ; i < m ; ++i ) {
						tmp.push(String.fromCharCode(ba[i]));
					}
					cb(tmp.join(""),xhr,ev);
					break;
				}
			default:
				cb('',xhr,ev);
				break;
		}
	};
	
	let evf = function(f) ['load','error','abort','timeout'].forEach(f);
		evf(function(m) xhr.addEventListener( m, handler, false ));
	
	xhr.mozBackgroundRequest = true;
	xhr.open('GET', url, true);
	xhr.responseType = "arraybuffer";
	xhr.send(null);
}

function detach(window) {
	let $ = function(n) window.document.getElementById(n),
		m = $('contentAreaContextMenu');
	m.removeEventListener('popupshown',lis,false);
	m.removeChild($(addon.tag));
}

let lis = {
	onOpenWindow: function(aWindow) {
		let domWindow = aWindow.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIDOMWindow);
		attach(domWindow);
	},
	onCloseWindow: function() {},
	onWindowTitleChange: function() {},
	handleEvent: function(ev) {
		switch(ev.type) {
			case 'popupshown':
				if(ev.target.id == 'contentAreaContextMenu') {
					ev.target.addEventListener('popuphidden',this,false);
					ev.target.ownerDocument.getElementById(addon.tag).hidden =
						!((tn = ev.originalTarget.triggerNode) instanceof Ci.nsIImageLoadingContent);
				}
				break;
			case 'popuphidden':
				if(ev.target.id == 'contentAreaContextMenu') {
					tn = null;
					ev.target.removeEventListener('popuphidden',this,false);
				}
			default:
				break;
		}
	}
};

function setwm(x) {
	let e,f = x ? attach : detach,wm = Services.wm;
	
	wm[x ? 'addListener' : 'removeListener'](lis);
	
	e = wm.getEnumerator("navigator:browser");
	while(e.hasMoreElements())
		f(e.getNext().QueryInterface(Ci.nsIDOMWindow));
}

(function(global) global.loadSubScript = function(file,scope)
	Services.scriptloader.loadSubScript(file,scope||global))(this);

function setup(data) {
	
	let io = Services.io;
	
	(addon = data).tag = data.name.toLowerCase().replace(/[^\w]/g,'');
	
	if(!Services.prefs.getPrefType('extensions.pictutools.hserv'))
		Services.prefs.setCharPref('extensions.pictutools.hserv','');
	
	io.getProtocolHandler("resource")
		.QueryInterface(Ci.nsIResProtocolHandler)
		.setSubstitution(addon.tag,
			io.newURI(__SCRIPT_URI_SPEC__+'/../',null,null));
	
	loadSubScript(rsc('locale.js'));
	setwm(1);
}

function startup(data) {
	let tmp = {};
	Cu.import("resource://gre/modules/AddonManager.jsm", tmp);
	tmp.AddonManager.getAddonByID(data.id,setup);
}

function shutdown(data, reason) {
	if(reason == APP_SHUTDOWN)
		return;
	
	setwm();
	Services.io.getProtocolHandler("resource")
		.QueryInterface(Ci.nsIResProtocolHandler)
		.setSubstitution(addon.tag,null);
}

function install(data, reason) {}
function uninstall(data, reason) {}
