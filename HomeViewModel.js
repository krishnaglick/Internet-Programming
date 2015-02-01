function HomeViewModel() {
	var self = this;

	this.pageRoute = ko.observable('Home');
	this.pageTitle = ko.computed(function() {
		return self.pageRoute() + ' - COP 4813: Internet Programming';
	});
}