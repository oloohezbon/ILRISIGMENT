var Personel = function ()
{

	return {
		ps_getList : function()
				{
					var personnel = serverSync("read", {url: 'personnel'});
					var p_dom = $('.pesronel_holder tbody');
					
					
					personnel.done(function(response)
					{
							$(response).each(function(index,item)
								{
										p_dom.append('<tr id = "'+item.id+'" class ="ps_content"></tr>');
										
										$('#'+item.id).append('<td>'+item.name+'</td>');
										$('#'+item.id).append('<td>'+item.status+'</td>');
										$('#'+item.id).append('<td>'+item.title+'</td>');
										$('#'+item.id).append('<td>'+item.active+'</td>');
										$('#'+item.id).append('<td>'+item.phone+'</td>');
										$('#'+item.id).append('<td>'+item.email+'</td>');								

										


											
								});
							//--------------------------		EVENTS

							$(document).delegate('table td', 'click', function()
								{
									var id = $(this).parent().attr('id');

									alert(id);
									
								})
					});

					personnel.fail(function(response)
					{
						alert(response.error);
					})
				}
	}
}


$(document).ready(function()
	{
		var Personnel = new Personel();

		Personnel.ps_getList();
		
	});