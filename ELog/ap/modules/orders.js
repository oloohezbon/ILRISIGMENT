/*
*@title			: orders module file
*@author  		: reviloera      website   reviloera.ziliax.com
*@description   : handle orders page
*/

var Orders = function()
{
	

	function clearCheckbox()
	{
		$('input:checkbox').removeAttr('checked');
	}
	return {
		checkBx : clearCheckbox,
		_orGetUser : function ()  //pulling data from the sever
						{
							
							$(document).delegate('.user_id', 'click', function()
								{

									
									var data = serverSync("read", {url: 'tickets', data : {date_range : 'm', from : '2013-02-01'}});

										data.done(function(response)
											{
												$(response).each(function(index,item)
													{	
														console.log(item.title);
													});
											});
								});//end event

							//-------------------------------    		PULL EQUIPMENTS FROM THE SERVER
							/**var order_equipments = serverSync("read", {url: 'equipment'});

								order_equipments.done(function(response)
									{
										$('#ord_equipment').html('');
										$(response).each(function(index, item)
											{
												$('#ord_equipment').append('<option value = '+item.id+'>'+item.name+'</option>')
											})
									})//done pulling the equipments**/

						},
		_creationChkbx : function()
					{
						$(document).delegate('#create_order_frm input[type=checkbox]', 'change', function()
							{
								if (this.checked)
								{
									switch ($(this).attr('id'))
									{
										case 'repeatOrder':
											$('#myModal').modal('hide');
											$('#repeat_order').modal('show');
										break;

										case 'createTask':
											$('#myModal').modal('hide');
											$('#create_task').modal('show');
										break;
									}
								}
							});//end event on the checkboxes

						//create new uses or clients
						$(document).delegate('#create_order_frm select', 'change', function()
							{

								if ($(this).val() == 'new_item')
								{
									switch($(this).attr('id'))
									{
										case 'inputClients':
											$('#myModal').modal('hide');
											$('#new_client').modal('show');
											break
										case 'inputJob':
											$('#myModal').modal('hide');
											$('#new_job').modal('show');
											break
									}
								}
							});//end select event for creating new users and clients

						//create new personel or equipment
						$(document).delegate('#create_task select', 'change', function()
							{
								if ($(this).val() == 'new_item')
								{
									$('#create_task').modal('hide');
									switch ($(this).attr('id'))
									{
										case 'inputPersonel':
												$('#new_personel').modal('show');
											break;
										case 'inputEquipment':
												$('#new_equip').modal('show');
											break;
									}
								}
							});//end event on create new personel or equipment
					},
		_orPopulateClient : function()
					{
						var order_clients = serverSync("read", {url: 'clients'});						

						order_clients.done(function(response)
							{
								$('#ord_client').html('');
								$(response).each(function(index, item)
									{
										$('#ord_client').append('<option value ="'+item.id+'">'+item.name+'</option>');
									});//end each loop
							});//end loading list of clients

						//------------------------------------------  LOAD JOB TYPE 
						var job_type_list = serverSync("read", {url: 'ticketTypes'});						

						job_type_list.done(function(response)
							{
								$('#ord_jobs').html('');

								$(response).each(function(index, item)
									{
										$('#ord_jobs').append('<option value ="'+item.id+'">'+item.description+'</option>');
									});
							});//
						job_type_list.fail(function(response)
							{
								alert('failed to load top types .. reload the webpage');
							});

						//-----------------------------------------  LOAD PERSONEL
						var personel_list = serverSync("read", {url: 'personnel'});	

							personel_list.done(function(response)
								{
									$('#ord_personel').html('');
									$(response).each(function(index, item)
										{
											$('#ord_personel').append('<option value ="'+item.id+'">'+item.name+'</option>');
										})

									$('#tsk_personel').html('');
									$(response).each(function(index, item)
										{
											$('#tsk_personel').append('<option value ="'+item.id+'">'+item.name+'</option>');
										})
								})
						//___________________________________________  LOAD EQUIPMENTS
						var equipment_list = serverSync("read", {url: 'equipment'});

						equipment_list.done(function(response)
							{
								$('#ord_equipment').html('');
									$(response).each(function(index, item)
										{
											$('#ord_equipment').append('<option value ="'+item.id+'">'+item.name+'</option>');
										})

								$('#tsk_equipment').html('');
									$(response).each(function(index, item)
										{
											$('#tsk_equipment').append('<option value ="'+item.id+'">'+item.name+'</option>');
										})
							});
					},
		_orCloseBtn : function()
						{
							$(document).delegate('.to_parent', 'click', function()
								{
									var id = $('#'+$(this).find('span').attr('class'));
									id.modal('hide');
									$('#myModal').modal('show');
								});//end event to return to main modal

							//close modal on create tasks inner drill modals
							$(document).delegate('.createT_parent', 'click', function()
								{
									var id = $('#'+$(this).find('span').attr('class'));
									id.modal('hide');
									$('#create_task').modal('show');
								});
						},
		_orLocalStorage : function()
						{
							$(document).delegate('.save_local', 'click', function()
								{
									var store_id = $(this).attr('id');
									if (typeof (Storage) !== 'undefined')
									{
										//we have local storage


												switch (store_id)
												{
													case 'new_clientx':
															//---------------------------------   SAVE CLIENTS
															var ord_clients = {};
																ord_clients.name 		= $('#inputClientName').val();
																ord_clients.person 		= $('#inputContactPerson').val();
																ord_clients.telephone 	= $('#inputTelephone').val();
																ord_clients.emailx 		= $('#inputEmailClient').val();
																ord_clients.address 	= $('#inputPostal').val();											

																window.localStorage.setItem( 'ord_clients', JSON.stringify(ord_clients) );								

																$('#inputClients').append('<option value="new_item" selected="selected">'+ord_clients.name+'</option>');

																$('#new_client_frm input[type=text]').val('');

																$('#new_client').modal('hide');
																$('#myModal').modal('show');

														break;
													case 'new_jobx':
															//-------------------------------    CREATE NEW JOB TYPES DESCRIPTRIN
															var ord_jobd = $('#inputJobTypeDescription').val();

																var created_order = serverSync("create", {url: 'ticketTypes', data : 
																							{
																								description : ord_jobd
																							}});	
																created_order.done(function(response)
																	{
																		$(response).each(function(index, item)
																			{
																				$('#inputJob').append('<option value="'+item.id+'" selected="selected">'+item.description+'</option>');
																			})

																		$('#new_job_frm input[type=text]').val('');

																		$('#new_job').modal('hide');
																		$('#myModal').modal('show');

																	})

																created_order.fail(function(response)
																	{
																		alert('Job type not created check your fields');
																	});

																
														break;
													case 'repeat_orderX':
															//---------------------------        REPEATE ORDER
															var ord_repeate_or = '';

																$('#repeat_order_frm input[type=checkbox]').each(function()
																	{
																		if (this.checked)
																		{
																			var day = $(this).attr('id');
																			ord_repeate_or += day +',';

																			
																		}
																	});//end checkbox loop

																window.localStorage.setItem( 'ord_repeate_or', JSON.stringify(ord_repeate_or) );								

																$('#repeatOrder').prop('checked', true);

																$('#repeat_order_frm input[type=checkbox]').prop('checked', false);

																$('#repeat_order').modal('hide');
																$('#myModal').modal('show');

														break;
													case 'new_personelx':
															//-------------------------------------				CREATE NEW PERSONEL
															
																var state = true;
																$('#new_personel_frm input[type=text]').each(function()
																	{
																		if ($(this).val() == '')
																		{
																			state = false;
																			alert('You have empty fields');
																			return false;
																		}
																	})

																if (state)
																{
																	var save_personel  = serverSync("create", {url: 'personnel ', data : 
																		{
																			name 	: $('#inputPersName').val(),
																			status 	: $('#inputPerStatus').val(),
																			title 	: $('#inputPersTitle').val(),
																			active 	: $('#inputPerActive').val(),
																			phone 	: $('#inputPerTelephone').val(),
																			email 	: $('#inputPerEmail').val()
																		}});


																	//

																	save_personel.done(function(response)
																		{
																			$('#inputPersonel').append('<option value="'+response.id+'" selected="selected">'+response.name+'</option>');
																			$('#new_personel_frm input[type=text]').val('');																		

																			$('#new_personel').modal('hide');
																			$('#create_task').modal('show');																		
																		})

																	save_personel.fail(function(response)
																		{
																			alert('failed to save personel');
																		})
																	
																}

																
														break;
													case 'new_equipx':
															//---------------------------------				CREATE NEW EQUIPMENTS
															var ordr_newequip = {};

																ordr_newequip.name 			= $('#inputEquiName').val();
																ordr_newequip.purchase_dt 	= $('#inputEquiPerD').val();
																ordr_newequip.productioncap = $('#inputEquipCapacity').val();
																ordr_newequip.serial 		= $('#inputEqiSerial').val();
																ordr_newequip.lastservice 	= $('#inputEqiService').val();

																window.localStorage.setItem( 'ordr_newequip', JSON.stringify(ordr_newequip) );
																$('#inputEquipment').append('<option value="1" selected="selected">'+ordr_newequip.name+'</option>');
																$('#new_equip_frm input[type=text]').val('');

																$('#new_equip').modal('hide');
																$('#create_task').modal('show');
															break;
													case 'create_taskx':

															//------------------------------         		CREATE TASK (no validation done)
															var ordr_createTask = {};
																ordr_createTask.description = 	$('#inputTaskDescription').val();
																ordr_createTask.startT = 	$('#inputEndTime').val();
																ordr_createTask.endT = 		$('#inputEndTime').val();
																ordr_createTask.otheT = 	($('#can_other_tasks').prop('checked')) ? 1 : 0;
																ordr_createTask.personel = 	$('#inputPersonel').val();
																ordr_createTask.equipment = $('#inputEquipment').val();
																ordr_createTask.repeate = 	($('#task_repeat').prop('checked')) ? 1 : 0;
																ordr_createTask.repeateUnt = $('#inputRepeateUntil').val();

																window.localStorage.setItem( 'ordr_createTask', JSON.stringify(ordr_createTask) );

																$('#create_order_frm #createTask').prop('checked', true);
																$('#create_task_frm input[type=checkbox]').prop('checked', false);

																$('#create_task_frm input[type=text]').val('');

																$('#create_task').modal('hide');
																$('#myModal').modal('show');
															break;
												}

										
									}
									else
									{
									alert('your browser is outdated and cant support some features of this application consider upgrading your browser sorry!')
									}
								});//end local storage triggers
						},
		_saveOrder		: 	function()
					{
						$(document).delegate('#myModal .save_order', 'click', function()
							{
								
									$(this).html('Saving Please Wait...');

									if ($('#inputClients').val() == 'default')
									{
										alert('Invalid client');
									}
									if($('#inputClients').val() == 'new_item')
									{
										
										//save all related order data in local storage

										//--------------------------------   SAVE CLIENT DB
										var clients_data = JSON.parse( localStorage.getItem( 'ord_clients' ) );

										var orSaveClient = serverSync("create", {url: 'clients', data : 
												{
													name 			: clients_data.name,
													contact 		: clients_data.person,
													phone 			: clients_data.telephone,
													email 			: clients_data.emailx,
													postal_address 	: clients_data.address
												}});

											orSaveClient.done(function(response)
												{									
													

													$(response).each(function(index, item)  //save client id in localstore
														{
															//delete the stored client details
															window.localStorage.removeItem('ord_clients');
															window.localStorage.setItem('new_client_id', item.id);
														});
													

												});//end saving client to db
											orSaveClient.fail(function(response)
												{
													alert('sorry something went wrong Client was not succesfully saved check your clients details');
												});//end fail object									

									}


									//-------------------------------------------------    SAVE ORDER TO THE DATABASE

											/*--- when creating related data update this table ie repeate dates and other more information
												  affecting this order I have just provided the basic at this point room for updates --*/


									var state = true;
									var ordr_name = $('#inputDescription').val(); 
									var ordr_stop_d = $('#order_stop_date').val();

									var order_TP = $('#inputJob').val(); //job type

									if (ordr_name == ''){state = false}
									if (order_TP == 'not' || order_TP == 'new_item') {state = false;}
									if (ordr_stop_d == ''){state = false}

									if ($('#inputClients').val() == 'new_item')
									{
										var client_id = window.localStorage.getItem('new_client_id');
									}
									else
									{
										var client_id = $('#inputClients').val();
									}

									if (state)
									{
										var create_order = serverSync("create", {url: 'tickets', data: 
																				{
																					title 		: ordr_name, 
																					client_id	: parseInt(client_id),
																					job_type	: order_TP, 
																					start 		: window.localStorage.getItem('order_start_time'),
																					end 		: ordr_stop_d, 
																					repeat 		:  0,
																					repeat_until : ordr_stop_d
																				}});
										create_order.done(function(response)
											{
												window.localStorage.setItem('clicked_order_id', response.id);
												window.localStorage.removeItem('order_start_time');
												$('#myModal .save_order').html('Wait Adding Order to Calender ...');

												

												
												 //----------------------------- ADD ORDER TO THE CALENDER
												 var myCalendar = $('#calendar'); 
												 
												 	var item = response;

												 		 var my_event = {
												 		 	id : item.id,
												 		 	title : item.title,
												 		 	start : item.start,
												 		 	end :  item.end,
												 		 	allDay: false,
												 		 	color : '#27AE60'
												 		 };
												 		 $('#calendar').fullCalendar('renderEvent', my_event);

												//-------------------------------- SAVE REPEATE DATES FOR THIS ORDER
												    if ($('#create_order_frm #repeatOrder').prop('checked'))
												    {
												    	
												    	var repeat_d =  JSON.parse(window.localStorage.getItem('ord_repeate_or'));

												    	 //-------- update tickets table
												    	 var ticket_update = serverSync("update", {url: 'tickets/'+item.id, data : 
												    	 		{
												    	 			repeat : repeat_d

												    	 		}});
												    	
												    }


												//----------------------------------  	SAVE TASK FOR THESE ORDER

													if ($('#create_order_frm #createTask').prop('checked'))
													{
														var task_data = JSON.parse(window.localStorage.getItem('ordr_createTask'));

														var save_task = serverSync("create", {url : 'tasks', data : 
															{
																description 		: task_data.description,
																ticket_id 			: window.localStorage.getItem('clicked_order_id'),
																start_time 			: task_data.startT,
																end_time 			: task_data.endT,
																can_do_with_other_jobs : task_data.otheT,
																personnel_id 		: task_data.personel,
																equipment_id 		: task_data.equipment,
																repeat 				: task_data.repeate,
																repeat_until 		: task_data.repeateUnt
															}})

														save_task.done(function(response)
														{
															window.localStorage.removeItem('ordr_createTask')
														})

													}

												 	
												 
												$('#myModal .save_order').html('Save Changes');
												$('#myModal input[type=text]').val('');
												clearCheckbox();
												$('#myModal').modal('hide');

											});

										create_order.fail(function(response)
											{
												alert('Sorry failed to save new order!');
											})
									}
									else
									{
										alert('You have empty field')
									}

							});//end click event on saving new order
						
					},
		_loadOrders : function()
					{
						var oders_data = serverSync("read", {url: 'tickets'});

						oders_data.done(function(response)
							{
								$(response).each(function(index, item)
									{
										var my_event = {
												 		 	id : item.id,
												 		 	title : item.title,
												 		 	start : item.start,
												 		 	end :  item.end,
												 		 	allDay: false												 		 	
												 		 };
												 		 $('#calendar').fullCalendar('renderEvent', my_event);

									});//end orders loop

								$('#calendar .fc-event-inner').contextMenu('context-menu-2', {
						            'Add Notes': {
						                click: function(element) {  // element is the jquery obj clicked on when context menu launched
						                   
						                    var order_id = window.localStorage.getItem('clicked_order_id');

						                    $('#add_more_notes').modal('show');

						                }
						                
						            },
						            'Add Tasks': {
						            	click: function(element)
						            	{
						            		var order_id = window.localStorage.getItem('clicked_order_id');
						                    $('#add_more_tasks').modal('show');
						            	}
						                
						            },
						            'More Details': {
						            	click: function(element)
						            	{
						            		var order_id = window.localStorage.getItem('clicked_order_id');
						                    $('#view_more_details').modal('show');

						                    var more_details = serverSync("read", {url: 'tickets/'+order_id});
											more_details.done(function(response)
												{
													$('#mod_dtb').html('<tr></tr>')
																											
													$('#mod_dtb tr').append('<td>'+response.title+'</td>')
													$('#mod_dtb tr').append('<td>'+response.client_id+'</td>')
													$('#mod_dtb tr').append('<td>'+response.job_type+'</td>')
													$('#mod_dtb tr').append('<td>'+response.start+'</td>')
													$('#mod_dtb tr').append('<td>'+response.end+'</td>')
													$('#mod_dtb tr').append('<td>'+response.repeat+'</td>')
													$('#mod_dtb tr').append('<td>'+response.repeat_until+'</td>')													
												});
						            	}
						               
						            },
						            'Delete Order': {
						                click: function(element)
						                { 
						                	//______________________________________________________ DELETE ORDER

						                	var order_id = window.localStorage.getItem('clicked_order_id');

						                	var delete_order = serverSync("delete", {url: 'tickets/'+order_id});

						                	delete_order.done(function(response)
						                	{
						                		$('#calendar').fullCalendar('removeEvents',order_id);
						                		alert('Order succesfully Deleted!');
						                	});

						                	delete_order.fail(function(response)
						                	{
						                		alert('problem deleting Order');
						                	})
						                }
						                
						            }

						        });

							});//end request to the API
						oders_data.fail(function(response)
						{
							alert('application failed to load orders');
						})

						$(document).delegate('.close_od_edt', 'click', function()
							{
								var id = $(this).find('span').prop('class');

								$('#'+id).modal('hide');

							});
							
					},
		_editOrder : function() //_________________________________  save details of the order edit 
					{
						// 1. ______________________  saving trigger


							$(document).delegate('.edt_od_ctx', 'click', function()
								{
									var id = $(this).prop('id');

									switch (id)
									{
										case 'edit_notes':

											//_______________________ save notes
											alert('Sorry the API backend not functioning');
											break;

										case 'edit_taskx': //____________ add tasks to order						
											
														
														var save_task = serverSync("create", {url : 'tasks', data : 
															{
																description 		: $('.addorfm #inputTaskDescription').val(),
																ticket_id 			: window.localStorage.getItem('clicked_order_id'),
																start_time 			: $('.addorfm #inputStartTimex').val()+':00',
																end_time 			: $('.addorfm #inputEndTimex').val()+':00',
																can_do_with_other_jobs : ($('.addorfm #can_other_tasks').prop('checked')) ? 1 : 0,
																personnel_id 		: $('.addorfm #inputPersonel').val(),
																equipment_id 		: $('.addorfm #inputEquipment').val(),
																repeat 				: ($('.addorfm #task_repeat').prop('checked')) ? 1 : 0,
																repeat_until 		: $('.addorfm #inputRepeateUntilx').val()
															}})

														save_task.done(function(response)
														{
															window.localStorage.removeItem('ordr_createTask');
															$('#add_more_tasks').modal('hide');
														})
														save_task.fail(function(response)
														{
															alert('Failed to save order');
														})											
											break;
									}
								}) //end trigger
						
					}
	}
};//end orders module
$(document).ready(function() {

	var orders_handler = new Orders()

	orders_handler._orGetUser();
	orders_handler._creationChkbx();
	orders_handler._orPopulateClient();
	orders_handler._orCloseBtn();
	orders_handler._orLocalStorage();
	orders_handler._saveOrder();
	orders_handler._loadOrders();
	orders_handler._editOrder();
	
		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();
		

		$('#myModal #order_stop_date').datetimepicker(
			{
				dateFormat : "yy-mm-dd",
				timeFormat : "hh:mm:ss"
			}); //

		$('#create_task #inputStartTime').datetimepicker({dateFormat : "yy-mm-dd"});
		$('#create_task #inputEndTime').datetimepicker({dateFormat : "yy-mm-dd"});
		$('#create_task #inputRepeateUntil').datetimepicker({dateFormat : "yy-mm-dd"});

		$('.addorfm #inputStartTimex').datetimepicker({dateFormat : "yy-mm-dd"});
		$('.addorfm #inputEndTimex').datetimepicker({dateFormat : "yy-mm-dd"});
		$('.addorfm #inputRepeateUntilx').datetimepicker({dateFormat : "yy-mm-dd"});

		$('#new_equip #inputEquiPerD').datetimepicker({dateFormat : "yy-mm-dd"});
		$('#new_equip #inputEqiService').datetimepicker({dateFormat : "yy-mm-dd"});

		$('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},

			editable: true,			
			
			dayClick : function(date, allDay, jsEvent, view)
				{
					if (typeof (Storage) !== 'undefined')
					{
						orders_handler.checkBx();	

						var current_date = new Date();

						var date_string = current_date.getHours() +':'+current_date.getMinutes() + ':'+ current_date.getSeconds();

						var str = date;

						window.localStorage.setItem('order_start_time', str.toString('yyyy-MM-dd') +' '+date_string);
						$('#myModal').modal('show');
					}
					else
					{
						alert('your browser doesnt support some features of this application consider upgrading..')
					}

					
				},
			eventRender : function(event, element)
				{
					element.bind('mousedown', function()
					{
						//alert();
						window.localStorage.setItem( 'clicked_order_id', event.id);								

					})
					//return false;
				}
		});
		
	});
