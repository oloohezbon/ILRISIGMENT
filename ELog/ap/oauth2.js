window.OAuth2 = {
	config : {
		client_id : '113ee767-e7f8-4294-a972-80a97a7f9926',
		client_secret : '36e79816-8ee1-4e4a-9f2a-8cf670861f05',
		server_url: 'http://localhost/fpro/'
	},

	lastRequestOptions : null,

	Session : {
		access_token : "0",
		refresh_token : "0",
		logged_in : false, // set depending on if session has expired or not after user has been issued an access token
		
		authenticated : function() { // checks if user has been authenticated before
			if (typeof(OAuth2.Session.access_token) == "string")
				return (OAuth2.Session.access_token != "0" && OAuth2.Session.access_token != "null");
			return (OAuth2.Session.access_token != null);
		},
		
		// Loads session information from local storage
		load : function() {
			OAuth2.Session.access_token = window.localStorage.getItem("access_token");
			OAuth2.Session.refresh_token = window.localStorage.getItem("refresh_token");
			OAuth2.Session.user_id = window.localStorage.getItem("user_id");
			OAuth2.Session.username = window.localStorage.getItem("username");
		},
		
		// Saves session information to local storage
		save : function(auth_hash) {
			window.localStorage.setItem("access_token", auth_hash.access_token);
			window.localStorage.setItem("refresh_token", auth_hash.refresh_token);
			window.localStorage.setItem("user_id", auth_hash.user_id);
			window.localStorage.setItem("username", auth_hash.username);
			OAuth2.Session.load();
		},
		
		// Logout and clear user session
		logout : function() {
			window.localStorage.setItem("access_token", "0");
			window.localStorage.setItem("refresh_token", "0");
			window.localStorage.setItem("user_id", "0");
			window.localStorage.setItem("username", "");
			OAuth2.Session.load();
			OAuth2.Session.logged_in = false;
		},
		
		// Login user
		login : function(username, password) {
			return OAuth2.init(username, password);
		},
		
	},

	init : function(username, password) {
		OAuth2.Session.load();
		var session = OAuth2.Session;
		return $.ajax({
			type : "POST",
			url : OAuth2.config.server_url + "endpoints/token",
			data : {
				client_id : OAuth2.config.client_id,
				client_secret : OAuth2.config.client_secret,
				grant_type : "password",
				username : username,
				password : password
			},
			dataType : "json"
		}).done(function(response) {
			console.log(response);
			session.save(response);
			session.logged_in = true;
		}).fail(function(jqXHR, textStatus) {
			console.log(jqXHR, textStatus);
			if (jqXHR.status != 500){
				response = jQuery.parseJSON(jqXHR.responseText);
				if (response && response.error == 'invalid_client') {
					alert("You MUST update this software before you can continue using it.");
				} else if (response && response.error == 'invalid_grant') {
					//alert(response.error_description);
					session.logged_in = false;
					//Show login page
				}else if (response && response.error == 'invalid_request'){
					//alert("Please enter your username and password");
				}
			}else{
				console.log("server error")
			}
		});
	},

	refreshToken : function() {
		var session = OAuth2.Session;
		$.ajax({
			type : "POST",
			url : OAuth2.config.server_url + "endpoints/token",
			data : {
				client_id : OAuth2.config.client_id,
				client_secret : OAuth2.config.client_secret,
				grant_type : "refresh_token",
				refresh_token : session.refresh_token//OAuth2.config.refresh_token
			},
			dataType : "json"
		}).done(function(response) {
			console.log(response);
			session.save(response);
			if (OAuth2.lastRequestOptions !== null) {
				// update access_token
				OAuth2.lastRequestOptions.data.access_token = session.access_token;
				// perform previous request
				$.ajax(OAuth2.lastRequestOptions);
				// clear previous request buffer
				OAuth2.lastRequestOptions = null;
			}
		}).fail(function(jqXHR, textStatus) {
			console.log(jqXHR, textStatus);
			if (jqXHR.status != 500){
				response = jQuery.parseJSON(jqXHR.responseText);
				console.log(response);
				if (response && response.error == 'invalid_client') {
					alert("You MUST update your app before you can use it.");
				} else if (response && (response.error == 'invalid_grant' || response.error == 'invalid_request')) {
					//alert(response.error_description);
					//Redirect user to login page
					session.logout();
				}
			}else{
				console.log("server error")
			}
		});
	}
}

window.serverSync = function(method, options) {
	var methodMap = {
		'create' : 'POST',
		'update' : 'PUT',
		'delete' : 'DELETE',
		'read' : 'GET'
	};

	var urlError = function() {
		throw new Error('A "url" endpoint must be specified');
	};
	var dataError = function() {
		throw new Error('You must pass data to a create/update operation');
	};
	
	var type = methodMap[method];
	options || ( options = {});
	
	var data = options.data || {};
	// hack for multipage app where this file's state gets reset between pages
	if (OAuth2.Session.access_token == '0' && !OAuth2.Session.logged_in)
		OAuth2.Session.load();
	data.access_token = OAuth2.Session.access_token;
	
	var params = {
		type : type,
		dataType : 'json', // expected format for response
		contentType: "application/json", // send as JSON
		data : data,
		cache: false,
		complete: function() {
			//called when complete
			console.log("hide loader")
		},
	};
	console.log($.extend(params, options));

	if (!options.url) {
		urlError();
	}else{
		if (params.type === 'DELETE'){
			options.url = OAuth2.config.server_url + 'api/' + options.url + '?access_token=' + OAuth2.Session.access_token;;
		}else{
			options.url = OAuth2.config.server_url + 'api/' + options.url;
		} 
	}

	if (!options.data && (method == 'create' || method == 'update')) {
		dataError();
	}else if (options.data && (method == 'create' || method == 'update')){
		options.data = JSON.stringify(data);
	}
	
	console.log(params.data);
	if (params.type !== 'GET' && params.type !== 'DELETE') {
		params.processData = false;
	}

	if (OAuth2.lastRequestOptions == null)
		OAuth2.lastRequestOptions = $.extend(params, options);
	console.log("show loader");
	return $.ajax($.extend(params, options)
		).done(function(response) {
			console.log("sync success");
			OAuth2.lastRequestOptions = null;
		}).fail(function(jqXHR, textStatus) {
			console.log(jqXHR, textStatus);
			if (jqXHR.status != 500){
				response = jQuery.parseJSON(jqXHR.responseText);
				console.log(response);
				if (response && response.error == 'invalid_token') {
					OAuth2.refreshToken();
				}
			}else{
				console.log("server error")
			}
		});
};
