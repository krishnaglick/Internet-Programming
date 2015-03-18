function HomeViewModel() {
	this.username = ko.observable('');
	this.password = ko.observable('');
	this.authTicket = ko.observable('');
	this.loggedIn = ko.observable(false);

	this.ajaxHeaderMessage = ko.observable('');
	this.ajaxBodyMessage = ko.observable('');

	this.pageName = ko.observable('Home');
	this.pageTitle = ko.pureComputed(function() {
		return this.pageName() + ' - COP 4813: Internet Programming';
	}, this);

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
			showMessage(true, 'Success!', 'Login was successful');
			that.authTicket(data.authTicket);
			Cookies.set('username', that.username());
			Cookies.set('authTicket', that.authTicket());
			that.loggedIn(true);
			if('loadStockData' in window) {
				loadStockData();
			}
		},
		error: function() {
			showMessage(false, 'Failure', 'Username or Password was incorrect');
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
			showMessage(true, 'Success!', 'Account was created, you are now logged in!');
			that.authTicket(data.authTicket);
			Cookies.set('username', that.username());
			Cookies.set('authTicket', that.authTicket());
			that.loggedIn(true);
			if('loadStockData' in window) {
				stock_portfolio_view_model.saveStocks(stock_portfolio_view_model);
			}
		},
		error: function() {
			showMessage(false, 'Failure', 'Username already exists, please choose a different one');
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
			showMessage(true, 'Logged Out', 'You were successfully logged out');
			that.clearCredentials();
		}
	});
}

HomeViewModel.prototype.clearCredentials = function() {
	this.authTicket('');
	this.username('');
	Cookies.expire('username');
	Cookies.expire('authTicket');
	this.loggedIn(false);
	if('loadStockData' in window) {
		loadStockData();
	}
}