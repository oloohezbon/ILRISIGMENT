
$(document).ready(function()
{
	$(document).delegate('input[name=login_sub]', 'click', function (e)
		{
			

			if (!OAuth2.Session.authenticated())
			{
				var username = $('input[name=username]').val();
				var password = $('input[name=password]').val();

				var loginResp = OAuth2.Session.login(username, password);

				loginResp.done(function (response)
				{
					//redirect the user

					location.href = 'application.html';
					OAuth2.Session.save(response);

				});//end done

				/*
				* loggin might fail
				*/

				loginResp.fail(function(jqXHR, textStatus)
				{
					console.log(jqXHR, textStatus);
						response = jQuery.parseJSON(jqXHR.responseText);
						//Show login page
						if (response && response.error == 'invalid_request'){
							alert("Please enter your username and password");
						}

						if (response && response.error == 'invalid_grant'){
							alert('invalid username or password');
						}
				});//end logggin fail

				e.preventDefault();
			}
			else
			{
				location.href = 'application.html';
			}
		});//end event on the clickd button
});//end jquery initialization
