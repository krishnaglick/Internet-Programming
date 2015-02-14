function HomeViewModel() {
	this.username = ko.observable('');

	this.pageRoute = ko.observable('Home');
	this.pageTitle = ko.computed(function() {
		return self.pageRoute() + ' - COP 4813: Internet Programming';
	});
}

HomeViewModel.prototype.login = function() {

}

HomeViewModel.prototype.register = function() {

}

HomeViewModel.prototype.logout = function() {
	
}