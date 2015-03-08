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
	if(this.username() === '' || this.password() === '') {
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
			Cookies.set('username', that.username());
			Cookies.set('authTicket', that.authTicket());
		},
		error: function() {
			that.messageType = false;
			that.ajaxHeaderMessage('Failure');
			that.ajaxBodyMessage('Username or Password was incorrect');
		},
		complete: function() {
			that.password('');
		}
	});
}

HomeViewModel.prototype.register = function() {
	if(this.username() === '' || this.password() === '') {
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
			Cookies.set('username', that.username());
			Cookies.set('authTicket', that.authTicket());
		},
		error: function() {
			that.messageType = false;
			that.ajaxHeaderMessage('Failure');
			that.ajaxBodyMessage('Username already exists, please choose a different one');
			that.username('');
		},
		complete: function() {
			that.password('');
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
		complete: function() {
			that.messageType = true;
			that.ajaxHeaderMessage('Logged Out');
			that.ajaxBodyMessage('You were successfully logged out');
			that.authTicket('');
			that.username('');
			Cookies.expire('username');
			Cookies.expire('authTicket');
		}
	});
}