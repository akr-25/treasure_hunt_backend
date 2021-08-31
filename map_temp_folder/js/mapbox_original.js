/**
 * Mapbox, the jQuery Map
 * jQuery Map Plugin
 * Version 0.6.0 beta
 * Author Abel Mohler
 * Released with the MIT License: http://www.opensource.org/licenses/mit-license.php
 */
(function($) {// jQuery.noConflict compliant
    $.fn.mapbox = function(o, callback) {
        var defaults = {
            zoom: true, // does map zoom?
            pan: true, // does map move side to side and up to down?
            defaultLayer: 0, // starting at 0, which layer shows up first
            layerSplit: 4, // how many times to split each layer as a zoom level
            mapContent: ".mapcontent", // the name of the class on the content inner layer
            defaultX: null, // default positioning on X-axis
            defaultY: null, // default positioning on Y-axis
            zoomToCursor: true, // if true, position on the map where the cursor is set will stay the same relative distance from the edge when zooming
            doubleClickZoom: false, // if true, double clicking zooms to mouse position
            clickZoom: false, // if true, clicking zooms to mouse position
            doubleClickZoomOut: false, // if true, double clicking zooms out to mouse position
            clickZoomOut: false, // if true, clicking zooms out to mouse position
            doubleClickMove: false, // if true, double clicking moves the map to the cursor position
            clickMove: false, // if true, clicking moves the map to the cursor position
            doubleClickDistance: 1, // number of positions (determined by layerSplit) to move on a double-click zoom event
            clickDistance: 1, // number of positions (determined by layerSplit) to move on a click zoom event
            callBefore: function(layer, xcoord, ycoord, viewport) {}, // this callback happens before dragging of map starts
            callAfter: function(layer, xcoord, ycoord, viewport) {}, // this callback happens at end of drag after map is released "mouseup"
            beforeZoom: function(layer, xcoord, ycoord, viewport) {}, // callback before a zoom happens
            afterZoom: function(layer, xcoord, ycoord, viewport) {}, // callback after zoom has completed
            mousewheel: false // requires mousewheel event plugin: http://plugins.jquery.com/project/mousewheel
        }
		var locs = [
			{x:285,y:379,h:8,w:13,id:"loc_cc",angle:0,radius:0,address:"Computer Center",pic:"cc",ext:".jpg",pw:250,ph:167},
			{x:274,y:379,h:8,w:10,id:"loc_library",angle:0,radius:0,address:"Library",pic:"library",ext:".jpg",pw:250,ph:188},
			{x:282,y:331,h:11,w:9,id:"loc_auditorium",angle:0,radius:0,address:"Auditorium",pic:"auditorium",ext:".jpg",pw:250,ph:167},
			{x:283,y:354,h:7,w:7,id:"loc_audi_circle",angle:0,radius:0,address:"Auditorium Circle",pic:"audi-circle",ext:".jpg",pw:250,ph:78},
			{x:263,y:392,h:12,w:16,id:"loc_a_lake",angle:0,radius:0,address:"Lake in front of Academic complex",pic:"a-lake",ext:".jpg",pw:250,ph:141},
			{x:244,y:384,h:12,w:12,id:"loc_lt",angle:0,radius:0,address:"Lecture Theaters",pic:"lt",ext:".jpg",pw:403,ph:167},
			{x:492,y:343,h:21,w:39,id:"loc_kameng",angle:0,radius:0,address:"Kameng Hostel",pic:"kameng",ext:".jpg",pw:250,ph:99},
			{x:492,y:368,h:21,w:39,id:"loc_barak",angle:0,radius:0,address:"Barak Hostel",pic:"barak",ext:".jpg",pw:250,ph:74},
			{x:492,y:395,h:21,w:39,id:"loc_umiam",angle:0,radius:0,address:"Umiam Hostel",pic:"umiam",ext:".jpg",pw:250,ph:75},
			{x:442,y:383,h:15,w:23,id:"loc_manas",angle:0,radius:0,address:"Manas Hostel",pic:"manas",ext:".jpg",pw:250,ph:133},
			{x:437,y:405,h:15,w:23,id:"loc_dihing",angle:0,radius:0,address:"Dihing Hostel",pic:"dihing",ext:".jpg",pw:250,ph:141},
			{x:363,y:422,h:21,w:39,id:"loc_dibang",angle:0,radius:0,address:"Dibang Hostel",pic:"dibang",ext:".jpg",pw:250,ph:188},
			{x:364,y:395,h:15,w:23,id:"loc_kapili",angle:0,radius:0,address:"Kapili Hostel",pic:"kapili",ext:".jpg",pw:250,ph:141},
			{x:371,y:373,h:15,w:23,id:"loc_siang",angle:0,radius:0,address:"Siang Hostel",pic:"siang",ext:".jpg",pw:250,ph:141},
			{x:420,y:432,h:50,w:29,id:"loc_brahmaputra",angle:40,radius:0,address:"Brahmmaputra Hostel",pic:"brahmaputra",ext:".jpg",pw:250,ph:141},
			{x:364,y:500,h:11,w:21,id:"loc_kv",angle:0,radius:0,address:"Kendriya Vidyalaya",pic:"kv",ext:".jpg",pw:250,ph:168},
			{x:258,y:504,h:8,w:25,id:"loc_CE",angle:0,radius:0,address:"Department of Civil Engineering",pic:"civil",ext:".jpg",pw:250,ph:167},
			{x:258,y:481,h:18,w:18,id:"loc_BT",angle:0,radius:0,address:"Department of Biotechnology",pic:"biotech",ext:".jpg",pw:250,ph:167},
			{x:258,y:468,h:9,w:28,id:"loc_CH",angle:0,radius:0,address:"Department of Chemistry",pic:"chemistry",ext:".jpg",pw:250,ph:167},
			{x:258,y:451,h:9,w:28,id:"loc_EEE",angle:0,radius:0,address:"Department of Electronics and Electrical Engineering",pic:"eee",ext:".jpg",pw:250,ph:167},
			{x:258,y:439,h:9,w:18,id:"loc_CSE",angle:0,radius:0,address:"Department of Computer Science and Engineering",pic:"cse",ext:".jpg",pw:250,ph:168},
			{x:258,y:429,h:7,w:24,id:"loc_CET",angle:0,radius:0,address:"Center for Educational Technology",pic:"cet",ext:".jpg",pw:250,ph:167},
			{x:258,y:415,h:10,w:21,id:"loc_DD",angle:0,radius:0,address:"Department of Design",pic:"DD",ext:".jpg",pw:250,ph:167},
			{x:288,y:412,h:12,w:12,id:"loc_AC_PLANT",angle:0,radius:0,address:"AC Plant",pic:"ac_plant",ext:".jpg",pw:250,ph:141},
			{x:233,y:415,h:11,w:11,id:"loc_ME",angle:0,radius:0,address:"Department of Mechanical Engineering",pic:"mech",ext:".jpg",pw:250,ph:167},
			{x:226,y:429,h:7,w:18,id:"loc_ME2",angle:0,radius:0,address:"Department of Mechanical Engineering",pic:"mech",ext:".jpg",pw:250,ph:167},
			{x:217,y:440,h:9,w:27,id:"loc_MA",angle:0,radius:0,address:"Department of Mathematics",pic:"maths",ext:".jpg",pw:250,ph:167},
			{x:222,y:452,h:8,w:22,id:"loc_HSS",angle:0,radius:0,address:"Department of Humanities &amp; Social Studies",pic:"hss",ext:".jpg",pw:250,ph:167},
			{x:233,y:468,h:9,w:11,id:"loc_C4",angle:0,radius:0,address:"Center for the Environment",pic:"env",ext:".jpg",pw:250,ph:167},
			{x:218,y:468,h:8,w:13,id:"loc_CIF",angle:0,radius:0,address:"Central Instruments Facility",pic:"cif",ext:".jpg",pw:250,ph:167},
			{x:227,y:481,h:8,w:17,id:"loc_C2_C3",angle:0,radius:0,address:"Centre for Nano Technology <br/>&amp;<br/> Centre for Energy",pic:"nano",ext:".jpg",pw:250,ph:167},
			{x:216,y:492,h:7,w:28,id:"loc_CL",angle:0,radius:0,address:"Department of Chemical Engineering",pic:"chemical",ext:".jpg",pw:250,ph:167},
			{x:218,y:504,h:8,w:26,id:"loc_PH",angle:0,radius:0,address:"Department of Physics",pic:"physics",ext:".jpg",pw:250,ph:167},
			{x:297,y:497,h:5,w:6,id:"loc_DEMO_EQ",angle:0,radius:0,address:"",pic:"",ext:".jpg",pw:0,ph:0},
			//{x:180,y:518,h:7,w:6,id:"loc_mandir",angle:0,radius:0,address:"",pic:"",ext:".jpg",pw:0,ph:0},
			{x:197,y:427,h:27,w:7,id:"loc_workshop",angle:0,radius:0,address:"Mechanical Workshop",pic:"workshop",ext:".jpg",pw:250,ph:175},
			{x:265,y:328,h:8,w:12,id:"loc_conference_hall",angle:0,radius:0,address:"Conference Hall",pic:"conference_hall",ext:".jpg",pw:250,ph:167},			
			{x:327,y:269,h:33,w:19,id:"loc_subansiri",angle:0,radius:0,address:"Subansiri Hostel",pic:"subansiri",ext:".jpg",pw:250,ph:141},
			{x:352,y:277,h:16,w:9,id:"loc_indoor_gym",angle:0,radius:0,address:"Students Activity Centre",pic:"sac",ext:".jpg",pw:250,ph:167},
            {x:323,y:304,h:13,w:31,id:"loc_tennis",angle:0,radius:0,address:"Students Activity Centre",pic:"sac",ext:".jpg",pw:250,ph:167},
			{x:364,y:301,h:11,w:21,id:"loc_hockey",angle:0,radius:0,address:"Students Activity Centre",pic:"sac",ext:".jpg",pw:250,ph:167},
			{x:370,y:271,h:24,w:16,id:"loc_football",angle:0,radius:0,address:"Students Activity Centre",pic:"sac",ext:".jpg",pw:250,ph:167},
			{x:390,y:307,h:5,w:6,id:"loc_volley",angle:0,radius:0,address:"Students Activity Centre",pic:"sac",ext:".jpg",pw:250,ph:167},
			{x:400,y:306,h:6,w:8,id:"loc_basket",angle:0,radius:0,address:"Students Activity Centre",pic:"sac",ext:".jpg",pw:250,ph:167},
			{x:394,y:265,h:35,w:25,id:"loc_athletic",angle:0,radius:0,address:"Students Activity Centre",pic:"sac",ext:".jpg",pw:250,ph:167},
			{x:364,y:329,h:36,w:20,id:"loc_cricket",angle:0,radius:0,address:"Students Activity Centre",pic:"sac",ext:".jpg",pw:250,ph:167},
			{x:401,y:205,h:38,w:21,id:"loc_married",angle:0,radius:0,address:"Married Scholars Hostel",pic:"married_scholars",ext:".jpg",pw:250,ph:167},
			{x:439,y:249,h:15,w:6,id:"loc_power_house",angle:0,radius:0,address:"Power House",pic:"power_house",ext:".jpg",pw:250,ph:167},
			{x:430,y:306,h:22,w:8,id:"loc_swimming",angle:0,radius:0,address:"Swimming Pool",pic:"swimming",ext:".jpg",pw:250,ph:188},
			{x:509,y:256,h:52,w:33,id:"loc_tcs",angle:0,radius:0,address:"Technology Complex",pic:"tc",ext:".jpg",pw:250,ph:167},
			{x:476,y:196,h:15,w:15,id:"loc_akshara",angle:0,radius:0,address:"Akshara Pre Primary School",pic:"akshara",ext:".jpg",pw:250,ph:167},
			{x:373,y:167,h:15,w:15,id:"loc_hospital",angle:0,radius:15,address:"Hospital",pic:"hospital",ext:".jpg",pw:250,ph:167},
			{x:326,y:196,h:26,w:22,id:"loc_guest_house",angle:0,radius:0,address:"Guest House",pic:"guest_house",ext:".jpg",pw:250,ph:167},
			//{x:550,y:351,h:25,w:11,id:"loc_sewage",angle:0,radius:0,address:"Sewage Treatment Plant",pic:"",ext:".jpg",pw:0,ph:0},
			{x:447,y:369,h:7,w:9,id:"loc_community_hall",angle:0,radius:0,address:"Community Hall",pic:"manas_community_hall",ext:".jpg",pw:250,ph:167},
			//{x:370,y:81.5,h:6,w:18,id:"loc_fac_A",angle:-40,radius:0,address:" A type Quarters",pic:"",ext:".jpg",pw:0,ph:0},
			{x:336,y:95,h:32,w:40,id:"loc_fac_B_1",angle:-39,radius:0,address:"B type Quarters",pic:"b-type",ext:".jpg",pw:250,ph:167},
			{x:255,y:95,h:40,w:40,id:"loc_fac_C",angle:52,radius:0,address:" C type Quarters",pic:"c-type",ext:".jpg",pw:250,ph:167},
			{x:212,y:148,h:25,w:37,id:"loc_fac_D_1",angle:0,radius:0,address:" D type Quarters",pic:"d-type",ext:".jpg",pw:250,ph:167},
			{x:210,y:193,h:20,w:20,id:"loc_fac_D_2",angle:40,radius:0,address:"D type Quarters",pic:"d-type",ext:".jpg",pw:250,ph:167},
			{x:182,y:236,h:7,w:17,id:"loc_fac_D_3",angle:53,radius:0,address:"D type Quarters",pic:"d-type",ext:".jpg",pw:250,ph:167},
			{x:117,y:279,h:19,w:28,id:"loc_fac_E_1",angle:-45,radius:0,address:"E type Quarters",pic:"e-type",ext:".jpg",pw:250,ph:167},
			{x:196,y:208,h:17,w:6,id:"loc_fac_E_2",angle:-20,radius:0,address:"E type Quarters",pic:"e-type",ext:".jpg",pw:250,ph:167},
			{x:258,y:174,h:16,w:23,id:"loc_fac_F_1",angle:-21,radius:0,address:" F type Quarters",pic:"f-type",ext:".jpg",pw:250,ph:167},
			{x:291,y:172,h:17,w:6,id:"loc_fac_F_2",angle:-53,radius:0,address:" F type Quarters",pic:"f-type",ext:".jpg",pw:250,ph:167},
			{x:305,y:193,h:17,w:6,id:"loc_fac_F_3",angle:-13,radius:0,address:" F type Quarters",pic:"f-type",ext:".jpg",pw:250,ph:167},
			{x:307,y:222,h:27,w:6,id:"loc_fac_F_4",angle:0,radius:0,address:" F type Quarters",pic:"f-type",ext:".jpg",pw:250,ph:167},
			{x:307,y:260,h:27,w:6,id:"loc_fac_F_5",angle:0,radius:0,address:" F type Quarters",pic:"f-type",ext:".jpg",pw:250,ph:167},
			{x:320,y:110,h:11,w:8,id:"loc_fac_comm_hall",angle:0,radius:0,address:" Community Hall",pic:"faculty_hall",ext:".jpg",pw:250,ph:167},
			{x:259,y:348,h:15,w:8,id:"loc_admin",angle:0,radius:0,address:"Administrative Building",pic:"admin",ext:".jpg",pw:250,ph:107},
			{x:260,y:365,h:8,w:8,id:"loc_bank",angle:0,radius:0,address:"Banks &amp; ATM",pic:"banks",ext:".jpg",pw:250,ph:167},
			{x:480,y:158,h:8,w:12,id:"loc_aseb_gate",angle:0,radius:0,address:"ASEB Gate",pic:"aseb_gate",ext:".jpg",pw:250,ph:167},
			{x:135,y:173,h:9,w:6,id:"loc_main_gate",angle:18,radius:0,address:"Main Gate",pic:"main_gate",ext:".jpg",pw:250,ph:167},
			{x:151,y:197,h:12,w:6,id:"loc_market",angle:"-52",radius:0,address:"Market Complex",pic:"market_complex",ext:".jpg",pw:250,ph:167},
			{x:274,y:293,h:4,w:8,id:"loc_dbunglow",angle:0,radius:0,address:"Director Bunglow",pic:"",ext:".jpg",pw:0,ph:0},
            {x:333,y:497,h:17,w:18,id:"loc_water_plant",angle:0,radius:0,address:"Water Treatment Plant",pic:"water_plant",ext:".jpg",pw:250,ph:167}, 
            {x:304,y:138,h:37,w:31,id:"loc_serpentine_lake",angle:"-52",radius:0,address:"Serpentine Lake",pic:"serpentine_lake",ext:".jpg",pw:250,ph:151},
            {x:318,y:337,h:26,w:26,id:"loc_iitg_lake",angle:0,radius:0,address:"IITG Lake",pic:"iitg_lake",ext:".jpg",pw:250,ph:127},
            {x:365,y:220,h:37,w:19,id:"loc_guesthouse_lake",angle:"40",radius:0,address:"Lake in front of Guest House",pic:"guesthouse_lake",ext:".jpg",pw:250,ph:166},
            
		];
		
		
		var road_signs=[
			{x:542,y:277,h:24,w:24,id:"rsign_tc_back",address:"TC back road",pic:"road_tc_back",ext:".jpg",pw:250,ph:167},
			{x:485,y:266,h:24,w:24,id:"rsign_tc_front",address:"TC front road",pic:"road_tc_front",ext:".jpg",pw:250,ph:167},
			{x:402,y:197,h:24,w:24,id:"rsign_hospi_road",address:"Hospital road",pic:"road_hospi",ext:".jpg",pw:250,ph:143},
            {x:355,y:383,h:24,w:24,id:"rsign_sac_kapili",address:"Road from SAC to Kapili",pic:"road_sac-kapili",ext:".jpg",pw:250,ph:167},
            {x:180,y:207,h:24,w:24,id:"rsign_market",address:"Junction near market complex",pic:"road_market",ext:".jpg",pw:250,ph:167},            
            {x:507,y:329,h:24,w:24,id:"rsign_kameng_tc",address:"Road between Kameng &amp; TC",pic:"road_kameng-tc",ext:".jpg",pw:250,ph:167},
			{x:339,y:321,h:24,w:24,id:"rsign_sac_audi",address:"Road between SAC &amp; Auditorium",pic:"road_sac-audi",ext:".jpg",pw:250,ph:167},
			{x:308,y:335,h:24,w:24,id:"rsign_audi",address:"",pic:"road_audi",ext:".jpg",pw:250,ph:167},
			{x:252,y:464,h:24,w:24,id:"rsign_core2",address:"Core 2",pic:"core2",ext:".jpg",pw:250,ph:94},
			{x:252,y:478,h:24,w:24,id:"rsign_core3",address:"Core 3",pic:"core3",ext:".jpg",pw:250,ph:167},
			{x:354,y:223,h:24,w:24,id:"rsign_ghouse",address:"Surroundings of Guest House",pic:"road_guesthouse",ext:".jpg",pw:250,ph:167},
			{x:364,y:544,h:24,w:24,id:"rsign_kv_gate",address:"KV Gate Road",pic:"kv_gate",ext:".jpg",pw:250,ph:167},
			{x:252,y:426,h:24,w:24,id:"rsign_core1",address:"Core 1",pic:"core1",ext:".jpg",pw:250,ph:167},
			{x:252,y:502,h:24,w:24,id:"rsign_core4",address:"Core 4",pic:"core4",ext:".jpg",pw:250,ph:167},
			{x:276,y:234,h:24,w:24,id:"rsign_viewpoint",address:"View Point",pic:"viewpoint",ext:".jpg",pw:250,ph:167},
            {x:484,y:454,h:24,w:24,id:"rsign_faculty_gate",address:"Faculty Gate",pic:"faculty_gate",ext:".jpg",pw:250,ph:167},
            {x:254,y:596,h:24,w:24,id:"rsign_river",address:"Brahmaputra River view",pic:"river",ext:".jpg",pw:250,ph:167},                            
			{x:248,y:319,h:24,w:24,id:"rsign_admin_circle",address:"Circle near administrative building",pic:"admin_circle",ext:".jpg",pw:250,ph:167},
            //{x:465,y:295,h:24,w:24,id:"rsign_smallriver",address:"Ghorjan River",pic:"",ext:".jpg",pw:0,ph:0}
		];
		function create_divs(){
			for(var i = 0; i < locs.length; i++){
				var dv = locs[i];
				try{/*ondblclick='open_page(event,this);'*/
					var angle = dv.angle.toString();
					var degrees = "transform:rotate(" + angle + "deg);-ms-transform:rotate(" + angle
						+ "deg);-moz-transform:rotate(" + angle + "deg);-webkit-transform:rotate("
						+ angle + "deg);-o-transform:rotate(" + angle + "deg);";
					if(angle == 0){
						degrees = "";
					}
					$("#link_holder").append("<div id='" + dv.id + "' onclick='show_preview(\""+dv.id+"\");'"
					+ "onmouseover='showbox(this);' onmouseout='hidebox(this);' "
					+ "style = 'border-radius:5px;cursor:pointer;" + degrees + "'>"
					+ "<input type='hidden' name='address' value=\"" + dv.address + "\" />"
					+ "<input type='hidden' name='pic' value='" + dv.pic + "'/><input type='hidden' name='pw' value='" + dv.pw + "'/>"
					+ "<input type='hidden' name='ph' value='" + dv.ph + "'/>"
					+ "<input type='hidden' name='ext' value='" + dv.ext + "'/></div>");
				}
				catch(err){
					alert(err.message);
				}
			}
			
		}
		function create_rsigns(){
			for(var i = 0; i < road_signs.length; i++){
				var dv = road_signs[i];
				try{/*ondblclick='open_page(event,this);'*/
					$("#link_holder").append("<div id='" + dv.id + "' onmouseover='toggle_on(\""+dv.id+"\");' onmouseout='toggle_off(\""+dv.id+"\");' style='z-index:98;cursor:pointer;width:24px;height:24px;'>"
					+ "<img id='imge_"+dv.id+"' onclick='show_preview(\""+dv.id+"\");' style='width:100%;' src='images/map_pin2.png' />"
					+ "<input type='hidden' name='address' value=\"" + dv.address + "\" />"
					+ "<input type='hidden' name='pic' value='" + dv.pic + "'/><input type='hidden' name='pw' value='" + dv.pw + "'/>"
					+ "<input type='hidden' name='ph' value='" + dv.ph + "'/>"
					+ "<input type='hidden' name='ext' value='" + dv.ext + "'/><input type='hidden' name='road' value='1'/></div>");
					
				}
				catch(err){
					alert(err.message);
				}
			}

		}
		//create_divs.call(this);
        if(typeof callback == "function") {
            o.callAfter = callback;
        }
        var command, arg = arguments;
        if(typeof o == "string") {
            command = o;//command passes "methods" such as "zoom", "left", etc.
        }

        o = $.extend(defaults, o || {});//inherit properties

        $(this).css({
            overflow: "hidden",
            position: "relative"
        });
		function move_box(args){
			for(var i = 0; i < locs.length; i++){
				var dv = locs[i];
				try{
					boxHeight = Math.round(args.nH * dv.h/args.mH);
					boxWidth = Math.round(args.nW * dv.w /args.mW);
					boxX = Math.round(args.left + (dv.x * args.nW/args.mW));
					boxY = Math.round(args.top + (dv.y * args.nH/args.mH));
					var bobj = document.getElementById(dv.id);
					bobj.style.position = "absolute";
					bobj.style.top = boxY.toString()+"px";
					bobj.style.left = boxX.toString()+"px";
					bobj.style.height = boxHeight.toString()+"px";
					bobj.style.width = boxWidth.toString()+"px";
					if(dv.radius > 0){
						var r = $(bobj).width()*dv.radius/dv.width;
						$(bobj).css({
								"border-radius": r.toString()+"px",
								"-moz-border-radius": r.toString()+"px",
								"-webkit-border-radius": r.toString()+"px"
								});
					}
					//bobj.style.border = "1px solid black";
				}
				catch(err){
					//alert(err.message);
				}
			}
			for(var i = 0; i < road_signs.length; i++){
				var dv = road_signs[i];
				try{
					//boxHeight = Math.round(args.nH * dv.h/args.mH);
					//boxWidth = Math.round(args.nW * dv.w /args.mW);
					boxX = Math.round(args.left + (dv.x * args.nW/args.mW));
					boxY = Math.round(args.top + (dv.y * args.nH/args.mH));
					var bobj = document.getElementById(dv.id);
					bobj.style.position = "absolute";
					if(args.nW/args.mW > 2){
						bobj.style.top = (boxY - dv.h).toString()+"px";
						bobj.style.left = (boxX - /*11*/Math.round(dv.w/2)).toString()+"px";
						bobj.style.height = dv.h.toString()+"px";
						bobj.style.width = dv.w.toString()+"px";
					}
					else{
						bobj.style.top = (boxY - /*30*/Math.round(dv.h/2)).toString()+"px";
						bobj.style.left = (boxX - /*11*/Math.round(dv.w/4)).toString()+"px";
						bobj.style.height = (dv.h/2).toString()+"px";
						bobj.style.width = (dv.w/2).toString()+"px";
					}
					//bobj.style.border = "1px solid black";
				}
				catch(err){
					//alert(err.message);
				}
			}
		}
		function move_preview(){
			var dv = document.getElementById("previewer");
			try{
				var children = dv.childNodes;
				if(dv.innerHTML == "")
					return true;
				var target = "";
				for (var i=0; i < children.length; i++) {
					if(children[i].type == 'hidden' && children[i].name == 'target')
						target = children[i].value;
				}
				var vp_offset = $("#viewport").offset();
				var elem = document.getElementById(target);
				var offset = $(elem).offset();
				var preview = document.getElementById("previewer");
				var x = offset.left + ($(elem).width() - $("#previewer").width())/2;
				var y = offset.top - $("#previewer").height() - 10;
				preview.style.left = x.toString()+"px";
				preview.style.top = y.toString()+"px";
				var dup = document.getElementById("duplicate");
				if(vp_offset.left > (offset.left + $(elem).width()) || vp_offset.top > (offset.top + $(elem).height()) || 
						offset.left > (vp_offset.left + $("#viewport").width()) || offset.top > (vp_offset.top + $("#viewport").height())){
					preview.innerHTML = "";
					dup.style.display = "none";
					return true;
				}
				var old_css = elem.style.cssText;
				//st.setPropertyValue();
				elem.style.cssText = "position:absolute;left:"+$(elem).css("left")+";top:"+$(elem).css("top")+";border:"+$(elem).css("border")+";border-radius:"+$(elem).css("border-radius")+";cursor:pointer;height:"+$(elem).css("height")+";width:"+$(elem).css("width")+";";
				
				var offset1 = $(elem).offset();
				elem.style.cssText = old_css;
				dup.style.cssText = old_css;
				dup.style.left = offset1.left.toString()+"px";
				dup.style.top = offset1.top.toString()+"px";
				//dup.style.width = $(elem).width().toString()+"px";
				//dup.style.height = $(elem).height().toString()+"px";
				dup.style.border = "thin #F87431";
				$(dup).css("box-shadow","0px 0px 15px 5px #F87431");
				for(var i = 0; i < locs.length; i++){
					var dv = locs[i];
					if(dv.id == $(elem).attr("id")){
						if(dv.radius > 0){
							var r = $(elem).width()*dv.radius/dv.width;
							$(elem).css({
								"border-radius": r.toString()+"px",
								"-moz-border-radius": r.toString()+"px",
								"-webkit-border-radius": r.toString()+"px"
								});
							$(dup).css({
								"border-radius": r.toString()+"px",
								"-moz-border-radius": r.toString()+"px",
								"-webkit-border-radius": r.toString()+"px"
								});
						}
						break;
					}
				}
				//$(dup).css("border-radius","5px");
				dup.style.display = "block";
				/*dup.style.left = offset.left.toString()+"px";
				dup.style.top = offset.top.toString()+"px";
				dup.style.width = $(elem).width().toString()+"px";
				dup.style.height = $(elem).height().toString()+"px";
				//dup.style.border = "1px green dashed";
				//$(dup).css("border-radius","5px");
				dup.style.display = "block";*/
			}
			catch(err){
				alert(err.message);
			}
		}
        function _zoom(distance) {
            if(!o.zoom) return false;

            if(distance === 0) distance = 0;
                else distance = distance || 1;

            var layers = $(this).find(">div"), limit = layers.length - 1, current = $(this).find(".current-map-layer");
            if(typeof o.beforeZoom == "function") {
                o.beforeZoom(current[0], this.xPos, this.yPos, this);
            }

            var move = this.visible, eq = move;
            move += (distance / o.layerSplit);
            if(move < 0) move = 0;
            if(move > limit) move = limit;
            eq = Math.ceil(move);
            var movement = (this.visible == move) ? false : true;
            this.visible = move;

            var oldWidth = current.width(), oldHeight = current.height();
            var xPercent = (($(this).width() / 2) + this.xPos) / oldWidth,
            yPercent = (($(this).height() / 2) + this.yPos) / oldHeight;

            if ((o.layerSplit > 1 && eq > 0)) {
                var percent = move - (eq -1), thisX = layers.eq(eq)[0].defaultWidth, thisY = layers.eq(eq)[0].defaultHeight, lastX = layers.eq(eq - 1).width(), lastY = layers.eq(eq - 1).height();
                var differenceX = thisX - lastX, differenceY = thisY - lastY, totalWidth = lastX + (differenceX * percent), totalHeight = lastY + (differenceY * percent);
            }
            if(o.layerSplit > 1 && eq > 0) {
                layers.eq(eq).width(totalWidth).find(".map-layer-mask").width(totalWidth).height(totalHeight);
                layers.eq(eq).height(totalHeight).find(o.mapContent).width(totalWidth).height(totalHeight);
            }

            //left and top adjustment for new zoom level
            var newLeft = (layers.eq(eq).width() * xPercent) - ($(this).width() / 2),
            newTop = (layers.eq(eq).height() * yPercent) - ($(this).height() / 2);

            newLeft = 0 - newLeft;
            newTop = 0 - newTop;

            var limitX = $(this).width() - layers.eq(eq).width(),
            limitY = $(this).height() - layers.eq(eq).height();

            if(newLeft > 0) newLeft = 0;
            if(newTop > 0) newTop = 0;
            if(newLeft < limitX) newLeft = limitX;
            if(newTop < limitY) newTop = limitY;

            this.xPos = 0 - newLeft;
            this.yPos = 0 - newTop;

            function doCallback() {
                if(typeof o.afterZoom == "function") {
                    o.afterZoom(layers.eq(eq)[0], this.xPos, this.yPos, this);
                }
            }

            layers.removeClass("current-map-layer").hide();
            layers.eq(eq).css({
                left: newLeft + "px",
                top: newTop + "px",
                display: "block"
            }).addClass("current-map-layer");
            doCallback();
            //alert(movement.toString());
			_move.call(this,0,0);
            return movement;
        }
        function _zoom2() {
            if(!o.zoom) return false;

            var layers = $(this).find(">div"), limit = layers.length - 1, current = $(this).find(".current-map-layer");
            if(typeof o.beforeZoom == "function") {
                o.beforeZoom(current[0], this.xPos, this.yPos, this);
            }
            var move = this.visible, eq = move;
            move = limit;
			
            if(move < 0) move = 0;
            if(move > limit) move = limit;
            eq = Math.ceil(move);
            var movement = (this.visible == move) ? false : true;
            this.visible = move;

            var oldWidth = current.width(), oldHeight = current.height();
            var xPercent = (($(this).width() / 2) + this.xPos) / oldWidth,
            yPercent = (($(this).height() / 2) + this.yPos) / oldHeight;

            if ((o.layerSplit > 1 && eq > 0)) {
                var percent = move - (eq -1), thisX = layers.eq(eq)[0].defaultWidth, thisY = layers.eq(eq)[0].defaultHeight, lastX = layers.eq(eq - 1).width(), lastY = layers.eq(eq - 1).height();
                var differenceX = thisX - lastX, differenceY = thisY - lastY, totalWidth = lastX + (differenceX * percent), totalHeight = lastY + (differenceY * percent);
            }
            if(o.layerSplit > 1 && eq > 0) {
                layers.eq(eq).width(totalWidth).find(".map-layer-mask").width(totalWidth).height(totalHeight);
                layers.eq(eq).height(totalHeight).find(o.mapContent).width(totalWidth).height(totalHeight);
            }

            //left and top adjustment for new zoom level
            var newLeft = (layers.eq(eq).width() * xPercent) - ($(this).width() / 2),
            newTop = (layers.eq(eq).height() * yPercent) - ($(this).height() / 2);

            newLeft = 0 - newLeft;
            newTop = 0 - newTop;

            var limitX = $(this).width() - layers.eq(eq).width(),
            limitY = $(this).height() - layers.eq(eq).height();

            if(newLeft > 0) newLeft = 0;
            if(newTop > 0) newTop = 0;
            if(newLeft < limitX) newLeft = limitX;
            if(newTop < limitY) newTop = limitY;

            this.xPos = 0 - newLeft;
            this.yPos = 0 - newTop;

            function doCallback() {
                if(typeof o.afterZoom == "function") {
                    o.afterZoom(layers.eq(eq)[0], this.xPos, this.yPos, this);
                }
            }

            layers.removeClass("current-map-layer").hide();
            layers.eq(eq).css({
                left: newLeft + "px",
                top: newTop + "px",
                display: "block"
            }).addClass("current-map-layer");
            doCallback();
            //alert(movement.toString());
			_move.call(this,0,0);
            return movement;
        }
        function _move(x, y, node) {
            node = node || $(this).find(".current-map-layer");
            var limitX = 0, limitY = 0, mapWidth = $(this).width(), mapHeight = $(this).height(),
            nodeWidth = $(node).width(), nodeHeight = $(node).height();

            if(mapWidth < nodeWidth) limitX = mapWidth - nodeWidth;
            if(mapHeight < nodeHeight) limitY = mapHeight - nodeHeight;

            var left = 0 - (this.xPos + x), top = 0 - (this.yPos + y);

            left = (left > 0) ? 0 : left;
            left = (left < limitX) ? limitX : left;
            top = (top > 0) ? 0 : top;
            top = (top < limitY) ? limitY : top;

            this.xPos = 0 - left;
            this.yPos = 0 - top;

            $(node).css({
                left: left + "px",
                top: top + "px"
            });
			boxHeight = Math.round(mapHeight/nodeHeight * 253);
			boxWidth = Math.round(mapWidth/nodeWidth * 233);
			boxLeft = Math.round(- left/nodeWidth * 233);
			boxTop = Math.round(- top/nodeHeight * 253);
			var bobj = document.getElementById("box_id");
			//bobj.style.cssText = "position:relative;border:2px solid;display:block;height:"+boxHeight.toString()+"px;width:"+boxWidth.toString()+"px;top:"+boxTop.toString()+"px;left:"+boxLeft.toString()+"px;";
			//bobj.style.position = 'relative';
			//bobj.style.border = '2px solid';
			//bobj.style.display = 'block';
			bobj.style.top = boxTop.toString()+"px";
			bobj.style.left = boxLeft.toString()+"px";
			bobj.style.height = boxHeight.toString()+"px";
			bobj.style.width = boxWidth.toString()+"px";
			//move boxes
			move_box.call(this,{nH:nodeHeight,nW:nodeWidth,mH:mapHeight,mW:mapWidth,left:left,top:top});
			move_preview.call(this);
        }
		
        function _position(x, y, node) {
            node = node || $(this).find(".current-map-layer");

            x = 0 - x;
            y = 0 - y;

            var limitX = 0 - ($(node).width() - $(this).width());
            var limitY = 0 - ($(node).height() - $(this).height());

            if(x > 0) x = 0;
            if(y > 0) y = 0;
            if(x < limitX) x = limitX;
            if(y < limitY) y = limitY;

            this.xPos = 0 - x;
            this.yPos = 0 - y;

            $(node).css({
                left: x + "px",
                top: y + "px"
            });
			_move.call(this,0,0);
        }
		
        function _position2(x, y, node) {
            node = node || $(this).find(".current-map-layer");

            x = 0 - x;
            y = 0 - y;

            var limitX = 0 - ($(node).width() - $(this).width());
            var limitY = 0 - ($(node).height() - $(this).height());

            if(x > 0) x = 0;
            if(y > 0) y = 0;
            if(x < limitX) x = limitX;
            if(y < limitY) y = limitY;

            this.xPos = 0 - x;
            this.yPos = 0 - y;

            $(node).css({
                left: x + "px",
                top: y + "px"
            });
			//_move.call(this,0,0);
        }

        function _makeCoords(s) {
            s = s.replace(/px/, "");
            s = 0 - s;
            return s;
        }

        var method = {//public methods
            zoom: function(distance) {
                distance = distance || 1;
                _zoom.call(this, distance);
            },
            back: function(distance) {
                distance = distance || 1;
                _zoom.call(this, 0 - distance);
				_move.call(this,0,0);
            },
			legend_zoom: function(){
				_zoom2.call(this);
			},
            left: function(amount) {
                amount = amount || 10;
                _move.call(this, 0 - amount, 0);
            },
            right: function(amount) {
                amount = amount || 10;
                _move.call(this, amount, 0);
            },
            up: function(amount) {
                amount = amount || 10;
                _move.call(this, 0, 0 - amount);
            },
            down: function(amount) {
                amount = amount || 10;
               _move.call(this, 0, amount);
            },
            center: function(coords) {
                coords = coords || {
                    x: $(this).find(".current-map-layer").width() / 2,
                    y: $(this).find(".current-map-layer").height() / 2
                }
                var node = $(this).find(".current-map-layer");
                var newX = coords.x - ($(this).width() / 2), newY = coords.y - ($(this).height() / 2);
                _position.call(this, newX, newY, node[0]);
				//_move.call(this,0,0);
            },
            zoomTo: function(level) {
                var distance = Math.round((level - this.visible) / (1 / this.layerSplit));
                _zoom.call(this, distance);
				//_move.call(this,0,0);
            },
			move_to: function(coords){
				coords.x = coords.x * $(this).find(".current-map-layer").width() / coords.w;
				coords.y = coords.y * $(this).find(".current-map-layer").height() / coords.h;
                /*coords = coords || {
                    x: $(this).find(".current-map-layer").width() / 2,
                    y: $(this).find(".current-map-layer").height() / 2
                }*/
                var node = $(this).find(".current-map-layer");
                var newX = coords.x - ($(this).width() / 2), newY = coords.y - ($(this).height() / 2);
				if($.browser.mozilla)
					_position.call(this, newX, newY, node[0]);
				else
					_position2.call(this, newX, newY, node[0]);
			},
			move_to2: function(coords){
				_move.call(this,0,0);
			},
			createDivs: function(){
				create_divs.call(this);
				create_rsigns.call(this);
			}
        }

        return this.each(function() {
            if(typeof command == "string") {//execute public methods if called
                var execute = method[command];
                o.layerSplit = this.layerSplit || o.layerSplit;
                execute.call(this, callback);
            }
            else {
                this.visible = o.defaultLayer, this.layerSplit = o.layerSplit;//magic
                var viewport = this, layers = $(this).find(">div"), mapHeight = $(this).height(), mapWidth = $(this).width(), mapmove = false, first = true;
                layers.css({
                    position: "absolute"
                }).eq(o.defaultLayer).css({
                    display: "block",
                    left: "",
                    top: ""
                }).addClass("current-map-layer").find(o.mapContent).css({
                    position: "absolute",
                    left: "0",
                    top: "0",
                    height: mapHeight + "px",
                    width: "100%"
                });

                layers.each(function() {
                    this.defaultWidth = $(this).width();
                    this.defaultHeight = $(this).height();
                    $(this).find(o.mapContent).css({
                        position: "absolute",
                        top: "0",
                        left: "0"
                    });
                    if($(this).find(o.mapContent).length > 0) $(this).find(">img").css({
                        width: "100%",
                        position: "absolute",
                        left: "0",
                        top: "0"
                    }).after('<div class="map-layer-mask"></div>')
                });

                $(this).find(".map-layer-mask").css({
                    position: "absolute",
                    left: "0",
                    top: "0",
                    background: "white",// omg, horrible hack,
                    opacity: "0",// but only way IE will not freak out when
                    filter: "alpha(opacity=0)"// mouseup over IMG tag occurs after mousemove event
                });

                if (o.defaultLayer > 0) {
                    layers.eq(o.defaultLayer).find(".map-layer-mask").width(layers.eq(o.defaultLayer).width()).height(layers.eq(o.defaultLayer).height());
                    layers.eq(o.defaultLayer).find(o.mapContent).width(layers.eq(o.defaultLayer).width()).height(layers.eq(o.defaultLayer).height());
                }

                $(this).find(">div:not(.current-map-layer)").hide();
                if(o.defaultX == null) {
                    o.defaultX = Math.floor((mapWidth / 2) - ($(this).find(".current-map-layer").width() / 2));
                    if(o.defaultX > 0) o.defaultX = 0;
                }
                if(o.defaultY == null) {
                    o.defaultY = Math.floor((mapHeight / 2) - ($(this).find(".current-map-layer").height() / 2));
                    if(o.defaultY > 0) o.defaultY = 0;
                }

                this.xPos = 0 - o.defaultX;
                this.yPos = 0 - o.defaultY;
                this.layerSplit = o.layerSplit;

                var mapStartX = o.defaultX;
                var mapStartY = o.defaultY;
                var clientStartX;
                var clientStartY;

                $(this).find(".current-map-layer").css({
                    left: o.defaultX + "px",
                    top: o.defaultY + "px"
                });

                /**
                 * Event Handling and Callbacks
                 */

                var weveMoved = false;

                $(this).mousedown(function() {
                    var layer = $(this).find(".current-map-layer");
                    var x = layer[0].style.left, y = layer[0].style.top;
                    x = _makeCoords(x);
                    y = _makeCoords(y);
                    o.callBefore(layer, x, y, viewport);
                    mapmove = true;
                    first = true;
                    return false;//otherwise dragging on IMG elements etc inside the map will cause problems
                });

                $(document).mouseup(function() {
                    var layer = $(viewport).find(".current-map-layer");
                    var x = layer[0].style.left, y = layer[0].style.top;
                    x = _makeCoords(x);
                    y = _makeCoords(y);
                    o.callAfter(layer, x, y, viewport);
                    mapmove = false;
                    if(weveMoved) {
                        clickDefault = false;
                    }
                    weveMoved = false;
                    return false;
                });

                $(document).mousemove(function(e) {
                    var layer = $(viewport).find(".current-map-layer");
                    if(mapmove && o.pan) {
                        if(first) {
                            clientStartX = e.clientX;
                            clientStartY = e.clientY;
                            mapStartX = layer[0].style.left.replace(/px/, "");
                            mapStartY = layer[0].style.top.replace(/px/, "");
                            first = false;
                        }
                        else {
                            weveMoved = true;
                        }
                        var limitX = 0, limitY = 0;
                        if(mapWidth < layer.width()) limitX = mapWidth - layer.width();
                        if(mapHeight < layer.height()) limitY = mapHeight - layer.height();
                        var mapX = mapStartX - (clientStartX - e.clientX);
                        mapX = (mapX > 0) ? 0 : mapX;
                        mapX = (mapX < limitX) ? limitX : mapX;
                        var mapY = mapStartY - (clientStartY - e.clientY);
                        mapY = (mapY > 0) ? 0 : mapY;
                        mapY = (mapY < limitY) ? limitY : mapY;
                        layer.css({
                            left: mapX + "px",
                            top: mapY + "px"
                        });
                        viewport.xPos = _makeCoords(layer[0].style.left);
                        viewport.yPos = _makeCoords(layer[0].style.top);
						//_move.call(this,0,0);
						boxHeight = Math.round(mapHeight/layer.height() * 253);
						boxWidth = Math.round(mapWidth/layer.width() * 233);
						boxLeft = Math.round(-mapX/layer.width() * 233);
						boxTop = Math.round(-mapY/layer.height() * 253);
						var bobj = document.getElementById("box_id");
						//bobj.style.cssText = "position:relative;border:2px solid;display:block;height:"+boxHeight.toString()+"px;width:"+boxWidth.toString()+"px;top:"+boxTop.toString()+"px;left:"+boxLeft.toString()+"px;";
						//bobj.style.position = 'relative';
						//bobj.style.border = '2px solid';
						//bobj.style.display = 'block';
						bobj.style.left = boxLeft.toString()+"px";
						bobj.style.top = boxTop.toString()+"px";
						bobj.style.height = boxHeight.toString()+"px";
						bobj.style.width = boxWidth.toString()+"px";
						//move boxes
						move_box.call(this,{nH:layer.height(),nW:layer.width(),mH:mapHeight,mW:mapWidth,left:mapX,top:mapY});
						move_preview.call(this);
                    }
                });

                if(o.mousewheel && typeof $.fn.mousewheel != "undefined") {
                    $(viewport).mousewheel(function(e, distance) {
                        if(o.zoomToCursor) {
                            //should probably DRY this.
                            var layer = $(this).find('.current-map-layer'),
                            positionTop = e.pageY - layer.offset().top,//jQuery normalizes pageX and pageY for us.
                            positionLeft = e.pageX - layer.offset().left,
                            //recalculate this position on current layer as a percentage
                            relativeTop = e.pageY - $(this).offset().top,
                            relativeLeft = e.pageX - $(this).offset().left,
                            percentTop = positionTop / layer.height(),
                            percentLeft = positionLeft / layer.width();
                        }
                        if(_zoom.call(this, distance) && o.zoomToCursor/* && distance > 0*/) {
                            //only center when zooming in, since it feels weird on out.  Don't center if we've reached the floor
                            //convert percentage to pixels on new layer
                            layer = $(this).find('.current-map-layer');
                            var x = layer.width() * percentLeft,
                            y = layer.height() * percentTop;
                            //and set position
                            _position.call(this, x - relativeLeft, y - relativeTop, layer[0]);
                        }
                        return false;//don't scroll the window
                    });
                }

                var clickTimeoutId = setTimeout(function(){},0), clickDefault = true;

                if(o.doubleClickZoom || o.doubleClickZoomOut || o.doubleClickMove) {
                    $(viewport).dblclick(function(e) {
                        //TODO: DRY this
                        //prevent single-click default
                        clearTimeout(clickTimeoutId);
                        clickDefault = false;
                        var layer = $(this).find('.current-map-layer'),
                        positionTop = e.pageY - layer.offset().top,//jQuery normalizes pageX and pageY for us.
                        positionLeft = e.pageX - layer.offset().left,
                        //recalculate this position on current layer as a percentage
                        percentTop = positionTop / layer.height(),
                        percentLeft = positionLeft / layer.width();
                        if(o.doubleClickZoom) {
                            distance = o.doubleClickDistance;
                        }
                        else if (o.doubleClickZoomOut) {
                            distance = 0 - o.doubleClickDistance;
                        }
                        else {
                            distance = 0;
                        }
                        _zoom.call(this, distance);
                        //convert percentage to pixels on new layer
                        layer = $(this).find('.current-map-layer');
                        var x = layer.width() * percentLeft,
                        y = layer.height() * percentTop;
                        //and center
                        method.center.call(this,{x: x, y: y});
                        return false;
                    });
                }

                if(o.clickZoom || o.clickZoomOut || o.clickMove) {
                    $(viewport).click(function(e) {
                        function clickAction() {
                            if(clickDefault) {
                                //TODO: DRY this
                                var layer = $(this).find('.current-map-layer'),
                                positionTop = e.pageY - layer.offset().top,//jQuery normalizes pageX and pageY for us.
                                positionLeft = e.pageX - layer.offset().left,
                                //recalculate this position on current layer as a percentage
                                percentTop = positionTop / layer.height(),
                                percentLeft = positionLeft / layer.width();
                                var distance;
                                if(o.clickZoom) {
                                    distance = o.clickDistance;
                                }
                                else if (o.clickZoomOut) {
                                    distance = 0 - o.clickDistance;
                                }
                                else {
                                    distance = 0;
                                }
                                _zoom.call(this, distance);
                                //convert percentage to pixels on new layer
                                layer = $(this).find('.current-map-layer');
                                var x = layer.width() * percentLeft,
                                y = layer.height() * percentTop;
                                //and center
                                method.center.call(this,{x: x, y: y});
                            }
                            clickDefault = true;
                        }
                        if(o.doubleClickZoom || o.doubleClickZoomOut || o.doubleClickMove) {
                            //if either of these are registered we need to set the clickAction
                            //into a timeout so that a double click clears it
                            clickTimeoutId = setTimeout(function(){clickAction.call(viewport)}, 400);
                        }
                        else {
                            clickAction.call(this);
                        }
                    });
                }

                /**
                 *  End Event Handling and Callbacks
                 */

                //deferred, load images in hidden layers
                $(window).load(function() {
                    layers.each(function() {
                        var img = $(this).find("img")[0];
                        if(typeof img == "object") $("<img>").attr("src", img.src);
                    });
                });
            }
        });
    }
})(jQuery);