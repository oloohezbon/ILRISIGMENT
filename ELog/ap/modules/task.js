jQuery(function () {
            
            
            
            //jQuery(".gantt2").gantt({
               // source: data
            //});

			//window.localStorage.setItem( 'gantt_data', JSON.stringify(gantt_data) );	


			/**
				jQuery(function () {
            jQuery(".gantt1").gantt({
                source: "<url-to-data.json>"
            });
            
            
        });
			**/

			//var unixtime = Date.parse("24-Nov-2009 17:57:35").getTime()/1000
        });


$(function() {
	
   						
	function mTime(tm)
	{
		
		return new Date(tm).getTime();
	}

	function drawGantt()
	{
		"use strict";
		$(".pesronel_holder").gantt({
			source : JSON.parse( localStorage.getItem( 'gantt_data' ) ),
			navigate: "scroll",
			scale: "weeks",
			maxScale: "months",
			minScale: "days",
			itemsPerPage: 10,
			onItemClick: function(data) {
				alert("Item clicked - show some details");
			},
			onAddClick: function(dt, rowId) {
				alert("Empty space clicked - add an item!");
			},
			onRender: function() {
				if (window.console && typeof console.log === "function") {
					console.log("chart rendered");
				}
			}
		});

		$(".gantt").popover({
			selector: ".bar",
			title: "I'm a popover",
			content: "And I'm the content of said popover.",
			trigger: "hover"
		});

		prettyPrint();
	}

    var gantt_server = serverSync("read", {url: 'tickets'});

    gantt_server.done(function(response)
	{
		$(response).each(function(index, item)
			{
				window.localStorage.setItem('ordtnm', item.title);  //save order name
				window.localStorage.setItem('loop', 'on');
				

				var get_task = serverSync("read", {url: 'tasks', data: 
					{search : item.id, field : "ticket_id"}});

				get_task.done(function(response)
				{
					var count = 1;
					$(response).each(function(index, item)
					{
						
						 if (localStorage.getItem("gantt_data") === null) // check if data is set
						 {
						 	var gantt_data = [{
						 		"name"   : localStorage.getItem('ordtnm'),
						 		"desc"   : "JOb Type",
						 		"values" : 
						 		[{
						 			"id"   : item.id,
						 			"from" : "/Date("+mTime(item.start_time)+")/",
						 			"to"   : "/Date("+mTime(item.end_time)+")/",
						 			"desc" : item.description,
						 			"label": "testing"
						 		}]
						 	}]
						 	window.localStorage.setItem( 'gantt_data', JSON.stringify(gantt_data) );
						 	count = count + 1;	
						 }
						 else
						 {

							if (count < 2)
							{
								var data = JSON.parse( localStorage.getItem( 'gantt_data' ) );
								

									var gantt_data = {
							 		"name"   : localStorage.getItem('ordtnm'),
							 		"desc"   : "JOb Type",
							 		"values" : 
							 		[{
							 			"id"   : item.id,
							 			"from" : "/Date("+mTime(item.start_time)+")/",
							 			"to"   : "/Date("+mTime(item.end_time)+")/",
							 			"desc" : item.description,
							 			"label": "testing"
							 		}]
							 	};

							 	data.push(gantt_data);

							 	window.localStorage.setItem( 'gantt_data', JSON.stringify(data) );
						 		count = count + 1;	
							}
							else
							{
								var data = JSON.parse( localStorage.getItem( 'gantt_data' ) );

									var gantt_data = {
							 		"name"   : "",
							 		"desc"   : "JOb Type",
							 		"values" : 
							 		[{
							 			"id"   : item.id,
							 			"from" : "/Date("+mTime(item.start_time)+")/",
							 			"to"   : "/Date("+mTime(item.end_time)+")/",
							 			"desc" : item.description,
							 			"label": "testing"
							 		}]
							 	};

							 	data.push(gantt_data);
							 	
							 	window.localStorage.setItem( 'gantt_data', JSON.stringify(data) );
						 		count = count + 1;	
							}

						 }
					})
				})
				
				window.localStorage.setItem('loop', 'off');
				
			});
			
			  var refreshId = setInterval(function() {

			  drawGantt();
			  if (localStorage.getItem('loop') == "off") {
			    clearInterval(refreshId);
			    localStorage.removeItem('loop');
			    localStorage.removeItem('gantt_data');
			  }
			}, 1000);
			//
	});

	

});