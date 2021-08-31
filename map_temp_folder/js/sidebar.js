		/**
		 * These functions are for the sidebar
		 */
		function toggle_visibility(id){
			for(var i = 1; i <= numdivs; i++){
				if(i == id && $('#writeup_' + i.toString()).css('display') == 'none')
					$('#writeup_' + i.toString()).show('slow');
				else
					$('#writeup_' + i.toString()).hide('slow');
			}
		}
		function show_more(id){
			$('#show_more_' + id.toString()).show('slow');
			$('#less_' + id.toString()).show();
			$('#more_' + id.toString()).hide();
		}
		function show_less(id){
			$('#show_more_' + id.toString()).hide('slow');
			$('#less_' + id.toString()).hide();
			$('#more_' + id.toString()).show();
		}
		$(function() {
		   $('.writeup').hover( function(){
			  $(this).css('background-color', 'rgb(174, 174, 170)');
		   },
		   function(){
			  $(this).css('background-color', '#eeeeea');
		   });
		});
		//--- >> end of sidebar functions