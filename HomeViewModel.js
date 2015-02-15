function HomeViewModel() {
	var that = this;

	this.username = ko.observable('');
	this.password = ko.observable('');
	this.authTicket = ko.observable('');

	this.ajaxHeaderMessage = ko.observable('');
	this.ajaxBodyMessage = ko.observable('');

	this.pageRoute = ko.observable('Home');
	this.pageTitle = ko.computed(function() {
		return that.pageRoute() + ' - COP 4813: Internet Programming';
	});

	this.messageType = true;
	this.ajaxRoute = "";
}

HomeViewModel.prototype.login = function() {
	if(this.username() == '' || this.password() == '') {
		return;
	}

	var that = this;
	this.ajaxRoute = "login";

	$.ajax({
		type: "POST",
		dataType: "JSON",
		contentType: "application/json",
		url: "LoginController.php",
		data: ko.toJSON(this),
		success: function(data) {
			that.messageType = true;
			that.ajaxHeaderMessage('Success!');
			that.ajaxBodyMessage('Login was successful');
			that.authTicket(data.authTicket);
		},
		error: function() {
			that.messageType = false;
			that.ajaxHeaderMessage('Failure');
			that.ajaxBodyMessage('Username or Password was incorrect');
			that.username('');
		},
		complete: function(data) {
			if('responseJSON' in data && typeof data.responseJSON == "object") {
				if('error' in data.responseJSON) {
					that.messageType = false;
					that.ajaxHeaderMessage('Error');
					that.ajaxBodyMessage(data.responseJSON.error);
					that.username('');
				}
			}
		}
	});
}

HomeViewModel.prototype.register = function() {
	if(this.username() == '' || this.password() == '') {
		return;
	}

	var that = this;
	this.ajaxRoute = "register";

	$.ajax({
		type: "POST",
		dataType: "JSON",
		contentType: "application/json",
		url: "LoginController.php",
		data: ko.toJSON(this),
		success: function(data) {
			that.messageType = true;
			that.ajaxHeaderMessage('Success!');
			that.ajaxBodyMessage('Account was created, you are now logged in!');
			that.authTicket(data.authTicket);
		},
		error: function(data) {
			that.messageType = false;
			that.ajaxHeaderMessage('Failure');
			that.ajaxBodyMessage('Username already exists, please choose a different one');
			that.username('');
		},
		complete: function(data) {
			if('responseJSON' in data && typeof data.responseJSON == "object") {
				if('error' in data.responseJSON) {
					that.messageType = false;
					that.ajaxHeaderMessage('Error');
					that.ajaxBodyMessage(data.responseJSON.error);
					that.username('');
				}
			}
		}
	});
}

HomeViewModel.prototype.logout = function() {
	var that = this;
	this.ajaxRoute = "logout";

	$.ajax({
		type: "POST",
		dataType: "JSON",
		contentType: "application/json",
		url: "LoginController.php",
		data: ko.toJSON(this),
		success: function() {
			that.messageType = true;
			that.ajaxHeaderMessage('Logged Out');
			that.ajaxBodyMessage('You were successfully logged out');
			that.authTicket('');
			that.username('');
		},
		error: function(data) {
			that.messageType = false;
			that.ajaxHeaderMessage('Error');
			that.ajaxBodyMessage('Unknown error, please try again');
		},
		complete: function(data) {
			if('responseJSON' in data && typeof data.responseJSON == "object") {
				if('error' in data.responseJSON) {
					that.messageType = false;
					that.ajaxHeaderMessage('Error');
					that.ajaxBodyMessage(data.responseJSON.error);
				}
			}
		}
	});
}