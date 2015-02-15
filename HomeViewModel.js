function HomeViewModel() {
	var that = this;

	this.username = ko.observable('');
	this.password = ko.observable('');
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
	var that = this;
	this.ajaxRoute = "test";

	$.ajax({
		type: "POST",
		dataType: "json",
		url: "assign5/StockPortfolioController.php",
		data: JSON.stringify(this),
		success: function(data) {
			this.messageType = true;
			this.ajaxHeaderMessage('Success!');
			this.ajaxBodyMessage('Login was successful');
		},
		failure: function(data) {
			this.messageType = false;
			this.ajaxHeaderMessage('Failure');
			this.ajaxBodyMessage('Username or Password was incorrect');
		},
		complete: function(data) {
			that.password('');
			console.log(data);
		}
	});
}

HomeViewModel.prototype.register = function() {

}

HomeViewModel.prototype.logout = function() {
	
}