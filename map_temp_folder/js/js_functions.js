		function get_angle(elem){
			var st = window.getComputedStyle(elem, null);
	
			var tr = st.getPropertyValue("-webkit-transform") ||
				 st.getPropertyValue("-moz-transform") ||
				 st.getPropertyValue("-ms-transform") ||
				 st.getPropertyValue("-o-transform") ||
				 st.getPropertyValue("transform");
			
			var values = tr.split('(')[1];
				values = values.split(')')[0];
				values = values.split(',');
			var a = values[0];
			var b = values[1];
			var c = values[2];
			var d = values[3];
			
			var scale = Math.sqrt(a*a + b*b);
			
			// arc sin, convert from radians to degrees, round
			// DO NOT USE: see update below
			var sin = b/scale;
			var angle = Math.round(Math.asin(sin) * (180/Math.PI));
			return angle;
		}
		
		function disableSelection(target){
		
			if (typeof target.onselectstart!="undefined") //IE route
				target.onselectstart=function(){return false}
		
			else if (typeof target.style.MozUserSelect!="undefined") //Firefox route
				target.style.MozUserSelect="none"
		
			else //All other route (ie: Opera)
				target.onmousedown=function(){return false}
		
			target.style.cursor = "default"
		}
		/**
		 * These functions are for toggling the pin icons
		 */
		function toggle_on(id){
			$("#"+id+" img").attr('src','images/map_pin2_on.png');
		}
		function toggle_off(id){
			$("#"+id+" img").attr('src','images/map_pin2.png');
		}
		//--- >> end of pin icon functions
		/**
		 * This will zoom in the map and takes it to the desired position
		 */
		function go_legend(cx,cy){
			$("#viewport").mapbox("legend_zoom");
			//$("#viewport").mapbox("back",1);
			$("#viewport").mapbox("move_to",{x: cx,y: cy,w:644,h:700});
			//these are for putting the small box in mini map to the correct position
			$("#viewport").mapbox("left", 1);
			$("#viewport").mapbox("right", 1);
		}
		/**
		 * The following two function are for showing and hiding the clickable regions on the map
		 */
		function showbox(elem){
			elem.style.border = 'thin #D4A017';
			//elem.style.cursor = 'pointer';
			//$(elem).css("border-radius","5px");
			$(elem).css("box-shadow","0px 0px 15px 5px #D4A017");
		}
		function hidebox(elem){
			elem.style.border = '0px';
			$(elem).css("box-shadow","");
		}
		//--- >> end of two functions
		/**
		 * Executed on click. Passes the url to the function. Function opens the URL then
		 * the parseResponse function is called
		 */
		function grabFile(file) {
			var request = getHTTPObject();
			request.onreadystatechange = function() {
				if(request.readyState == 4){
				if(request.status == 200 || request.status == 304){
						$("#picture_text").html(request.responseText);
					}
				}
			}
			request.open("GET",file,true);
			request.send(null);
		}
		/**
		 * These functions are for the mini map portion
		 */
		function point_it(event){
			pos_x = event.offsetX?(event.offsetX):event.pageX-document.getElementById("pointer_div").offsetLeft;
			pos_y = event.offsetY?(event.offsetY):event.pageY-document.getElementById("pointer_div").offsetTop;
			$("#viewport").mapbox("move_to",{x: pos_x,y: pos_y,w:233,h:253});
		}
		function point_it1(event){
			if(document.getElementById("hid").value == "1"){
				pos_x = event.offsetX?(event.offsetX):event.pageX-document.getElementById("pointer_div").offsetLeft;
				pos_y = event.offsetY?(event.offsetY):event.pageY-document.getElementById("pointer_div").offsetTop;
				$("#viewport").mapbox("move_to",{x: pos_x,y: pos_y,w:233,h:253});
			}
		}
		function point_it2(event){
			pos_x = event.offsetX?(event.offsetX):event.pageX-document.getElementById("pointer_div").offsetLeft;
			pos_y = event.offsetY?(event.offsetY):event.pageY-document.getElementById("pointer_div").offsetTop;
			$("#viewport").mapbox("move_to",{x: pos_x,y: pos_y,w:233,h:253});
			/*$("#viewport").mapbox("left", 1);
			$("#viewport").mapbox("right", 1);*/
		}
		/**
		 * This function is for printing the map. It will open a new tab and shows the print dialogue
		 */
		function makepage(src){
		  // We break the closing script tag in half to prevent
		  // the HTML parser from seeing it as a part of
		  // the *main* page.

		  return "<html>\n" +
			"<head>\n" +
			"<title>Temporary Printing Window</title>\n" +
			"<script>\n" +
			"function step1() {\n" +
			"  setTimeout('step2()', 10);\n" +
			"}\n" +
			"function step2() {\n" +
			"  window.print();\n" +
			"  window.close();\n" +
			"}\n" +
			"</scr" + "ipt>\n" +
			"</head>\n" +
			"<body onLoad='step1()'>\n" +
			"<img src='" + src + "'/>\n" +
			"</body>\n" +
			"</html>\n";
		}
		function print_map(){
			link = "about:blank";
			var pw = window.open(link, "_new");
			pw.document.open();
			pw.document.write(makepage(document.getElementById("map_address").value));
			pw.document.close();
		}
		//--- >> end of printing map functions
		/*function open_page(e,elem)
		{
			if (parseInt(navigator.appVersion) > 3)
			{
				var evt = (navigator.appName == "Netscape" ? e : window.event);
		 
				//shiftPressed = evt.shiftKey;
				//altPressed   = evt.altKey;
				ctrlPressed  = evt.ctrlKey;
				if(true){
					var children = elem.childNodes;
					for (var i=0; i < children.length; i++) {
						if(children[i].type == 'hidden' && children[i].name == 'address')
							window.open(children[i].value);
					}
				}
			}
			//return true;
		}*/
		/**
		 * AJAX function for getting the gallery information
		 */
		function getPicInfo(code,ext){
			var xmlhttp;
			if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
				xmlhttp=new XMLHttpRequest();
			}
			else{// code for IE6, IE5
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			xmlhttp.onreadystatechange=function(){
				if (xmlhttp.readyState==4 && xmlhttp.status==200){
					$('#overlay_code').val(code);
					$("#mygallerytable").html(xmlhttp.responseText);
					update_galleria();
					/*Galleria.ready(function() {
					  var gallery = this; // galleria is ready and the gallery is assigned
					  //$('#fullscreen').click(function() {
						gallery.toggleFullscreen(); // toggles the fullscreen
					  //});
					});*/

					Galleria.run('#galleria',{
						debug: false,
						//showInfo: true,
						extend:function() {
							this.attachKeyboard({
								left: this.prev,
								right: this.next,
								up: function() {
									Galleria.log('up key pressed');
								}
							});
							//this._fullscreen();
						}
					});
					//$('#galleria').data('galleria').enterFullscreen();
				}
			}           
            xmlhttp.open("GET","gallery.php?code="+code,true);
			xmlhttp.send();
		}
		/**
		 * Resizes the gallery on window resize event or before creating the gallery
		 */
		function update_galleria(){
			var gheight = Math.floor($(window).height() * 0.9) < 400? 400: Math.floor($(window).height() * 0.9);
			var gwidth = Math.floor($(window).width() * 0.6) < 600 ? 600: Math.floor($(window).width() * 0.6);
			if($("#social_buttons").length == 0)
				gwidth = Math.floor($(window).width() * 0.8) < 600 ? 600: Math.floor($(window).width() * 0.8);
			/*if(gwidth * 9 > gheight * 16){
				gwidth = gheight * 16 / 9;
			}
			else{
				gheight = gwidth * 9 / 16;
			}*/
			$('#galleria').css({
				width: gwidth,
				height: gheight
			});
			$('.galleria-stage').css({
				width: gwidth - 20,
				height: gheight - 100
			});
			$('.galleria-container').width(gwidth);
			$('.galleria-container').height(gheight);
			var offset = $("#galleria").offset();
			if($("#social_buttons").length == 0){
				$("#mygallerytable").css({
					left:Math.round(($(window).width() - gwidth - 30)/2)
				});
				/*$('#picture_text').css({
					left: gwidth + 20,
					top: -10
					//left: offset.left + gwidth
				});*/
			}
			else{
				$("#mygallerytable").css({
					left:Math.round(($(window).width() - gwidth - $("#picture_text").width())/2)
				});
				$('#picture_text').css({
					height: gheight - 30
					//left: offset.left + gwidth
				});
			}
		}
		/**
		 * Shows the gallery and the sidebar
		 */
		var dhref = "";
		function overlay() {
			document.title = "IIT Guwahati Campus Map | " + $("#sidebar_heading").val();
			//getPicInfo($('#overlay_code').val(),".jpg");
			dhref = window.location;
			if($('#visit_by_hash').val() == "0"){
				if (typeof history.pushState === "function") {
					if(window.location.search == ""){
						dhref = window.location + "?gallery=" + $('#overlay_code').val();
						history.pushState("", document.title, window.location.pathname + "?gallery=" + $('#overlay_code').val());
					}
					else{
						dhref = window.location + "&gallery=" + $('#overlay_code').val();
						history.pushState("", document.title, window.location.pathname + window.location.search + "&gallery=" + $('#overlay_code').val());
					}
				}
				else{
					if(window.location.search == ""){
						dhref = window.location + "?gallery=" + $('#overlay_code').val();
					}
					else{
						dhref = window.location + "&gallery=" + $('#overlay_code').val();
					}
				}
			}
			$('#overlay').fadeIn('fast',function(){
				//window.location.hash = "!" + $('#overlay_code').val();
				//alert(window.location.search);
				$('#box').animate({'top':'20px'},500);
			});
			//alert(window.location);
			/*if(dhref === "")
				dhref = window.location;*/
			setTimeout(init_social() , 1500);
		}
		function init_social(){
			$("#social_buttons").html('<div style="overflow:visible;height:0px;width:0px;"><div style="position:relative;top:-8px;"><iframe src="//www.facebook.com/plugins/like.php?href='+encodeURIComponent(dhref)+'&amp;send=false&amp;layout=button_count&amp;width=100&amp;show_faces=true&amp;action=like&amp;colorscheme=light&amp;font&amp;height=80" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100px; height:26px;" allowTransparency="true"></iframe></div><div style="position:relative;left:100px;top:-40px;"><g:plusone size="medium" href="'+dhref+'"></g:plusone></div></div><br/>');
			gapi.plusone.go();
			$('meta[name=description]').attr('content', "Gallery of " + $("#sidebar_heading").val());
			/*$("#side_heading").html($("#sidebar_heading").val());*/
		}
		/**
		 * Shows a small pop up box containing a preview pic of the gallery and a small description of the area
		 */
		function show_preview(elem_id){
			var elem = document.getElementById(elem_id);
			var children = elem.childNodes;
			var desc = "";
			var thumbpic = "";
			var pic = "";
			var prepic = "";
			var ext = "";
			var road = false;
			var pwidth = 0;
			var pheight = 0;
			for (var i=0; i < children.length; i++) {
				if(children[i].type == 'hidden' && children[i].name == 'address')
					desc = children[i].value;
				if(children[i].type == 'hidden' && children[i].name == 'pic')
					pic = children[i].value;
				if(children[i].type == 'hidden' && children[i].name == 'pw')
					pwidth = parseInt(children[i].value);
				if(children[i].type == 'hidden' && children[i].name == 'ph')
					pheight = 73 + parseInt(children[i].value);
				if(children[i].type == 'hidden' && children[i].name == 'ext')
					ext = children[i].value;
				if(children[i].type == 'hidden' && children[i].name == 'road')
					road = true;
			}
			$("#sidebar_heading").val(desc);
			prepic = "images/campus/" + pic + "/small_" + pic + ext;
			thumbpic = "images/campus/" + pic + "/thumb_" + pic + ext;
			var preview = document.getElementById("previewer");
			var htmlText = "";
			htmlText = htmlText + "<input name='target' type='hidden' value='" + elem.id + "' /><table><tr><td align='right'>";
			htmlText = htmlText + "<a style='cursor:pointer;text-decoration:none;' onclick='document.getElementById(\"previewer\").innerHTML=\"\";";
			htmlText = htmlText + "$(\"#previewer\").css(\"box-shadow\",\"0px 0px 0px 0px #000\");";
			htmlText = htmlText + "document.getElementById(\"duplicate\").style.display = \"none\";'>x</a>&nbsp;</td></tr>";
			htmlText = htmlText +"<tr><td align='center'><img id='loading_img' src='images/loading.gif'/><a style='cursor:pointer' onclick='overlay();'><img src='" + thumbpic + "'' onload='$(\"#loading_img\").hide();' title='Click to show the Gallery'/></a></td></tr>";
			htmlText = htmlText + "<tr><td align='center' style='color:black;'><b>" + desc + "</b></td></tr>";
			htmlText = htmlText + "</table><div class='chat-bubble-arrow-border'></div>";
  			htmlText = htmlText + "<div class='chat-bubble-arrow'></div>";
			$("#previewer").html(htmlText);
			$("#loading_img").show();
			/*if(road){
				getPicInfo(pic+"&road=true",ext);
				$('#overlay_code').val(pic+"&road=true");
			}
			else*/{
				getPicInfo(pic,ext);
				$('#overlay_code').val(pic);
			}
			pic = "images/campus/" + pic + "/" + pic + ext;
			var offset = $(elem).offset();
			pwidth = $("#previewer").width() < pwidth ? pwidth : $("#previewer").width();
			pheight = $("#previewer").height() < pheight ? pheight : $("#previewer").height();
			var x = Math.round(offset.left + ($(elem).width() - pwidth)/2);
			var y = Math.round(offset.top - pheight - 10);
			preview.style.left = x.toString()+"px";
			preview.style.top = y.toString()+"px";
			preview.display = "block";
			//$(preview).width(pwidth);
			//$(preview).height(pheight);
			$(preview).css('box-shadow',"0px 0px 6px 6px #A1A1A1");
			$(preview).css('background','white');
			var dup = document.getElementById("duplicate");
			if(!road){
				//$(dup).css$(elem).css();

				var old_css = elem.style.cssText;
				//st.setPropertyValue();
				elem.style.cssText = "position:absolute;left:"+$(elem).css("left")+";top:"+$(elem).css("top")+";border:"+$(elem).css("border")+";border-radius:"+$(elem).css("border-radius")+";cursor:pointer;height:"+$(elem).css("height")+";width:"+$(elem).css("width")+";";
				
				var offset1 = $(elem).offset();
				elem.style.cssText = old_css;
				dup.style.cssText = old_css;
				dup.style.left = offset1.left.toString()+"px";
				dup.style.top = offset1.top.toString()+"px";
				/*dup.style.width = $(elem).width().toString()+"px";
				dup.style.height = $(elem).height().toString()+"px";*/
				dup.style.border = "thin #F87431";
				$(dup).css("box-shadow","0px 0px 15px 5px #F87431");
				dup.style.display = "block";
			}
			else{
				dup.style.border = "none";
				dup.style.display = "none";
			}
			if(document.getElementById("prepic") != null){
				document.getElementById("prepic").src = prepic;
				document.getElementById("prepic_target").href = pic;
			}
		}
		/**
		 * will check for events which lead to closing of the pop up box or the gallery
		 */
		$("html").click(function(e){
			var ev;
			if(e==null){
				// I.E.
				ev = event.srcElement;
			}
			else{
				// Firefox
				ev = e.target;
			}
			//alert(ev.val);
			if (ev.id.substring(0,4) === "loc_"/*|| ev.id == "viewport" || ev.id == "map_control" || ev.id == "mapwrapper"
					|| ev.id=="v1" || ev.id=="v2" || ev.id=="v3" || ev.id=="duplicate" || ev.id == "box" || ev.id=="boxclose" || ev.id=="prepic"
					|| ev.id=="v4" || ev.id=="bv2" || ev.id=="bv3" || ev.id=="bv4"*/){
				//do nothing
			}
			else if (ev.id.substring(0,6) === "rsign_"){
				//do nothing
			}
			else if (ev.id.substring(0,5) === "imge_"){
				//do nothing
			}
			else if(document.getElementById("previewer_on").value == "0"){
				document.getElementById("previewer").innerHTML = "";
				$('#previewer').css('box-shadow','0px 0px 0px 0px #000');
				document.getElementById("duplicate").style.display = "none";
			}
			if(ev.id == 'box' || ev.id == "mygalleryid"){
				close_overlay();
			}
		});
		/**
		 * safely closes the overlay, always call this function to close the overlay
		 */
		function close_overlay(){
			document.title = "IIT Guwahati Campus Map";
			$('meta[name=description]').attr('content', "This is an interactive Campus Map of IIT Guwahati with photos giving a virtual tour of the campus.");
			if($('#box').css('top') == '20px'){
				$('#box').animate({'top':'-2000px'},500,function(){
						$('#overlay').fadeOut('fast');
				});
				if($('#visit_by_hash').val() == "0"){
					if (typeof history.pushState === "function")
						history.go(-1);
				}
				else{
					var toput = "";
					$('#visit_by_hash').val("0");
					var nsearch = window.location.search;
					var items = nsearch.substring(1).split('&');
					var first = true;
					toput = "?";
					for(var i = 0; i < items.length; i++){
						var parts = items[i].split('=');
						if(!(parts[0] == "gallery")){
							if(!first)
								toput = toput + "&";
							else
								first = false;
							toput = toput + parts[0];
							if(parts.length > 1)
								toput = toput + "=" + parts[1];
						}
					}
					if (typeof history.pushState === "function") {
						if(toput == "?")
							toput = "";
						history.pushState("", document.title, window.location.pathname + toput);
					}
				}
			}
		}
        