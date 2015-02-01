function HomeViewModel() {
	this.pageRoute = ko.observable('Home');
	this.pageTitle = ko.computed(function() {
		return 'COP 4813: Internet Programming: ' + this.pageRoute;
	});
}