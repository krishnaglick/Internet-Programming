function MEEQSViewModel() {
	this.menuRating = ko.observable({
		hardRating: ko.observable(0),
		softRating: ko.observable(0)
	});
	this.stars = ko.observableArray([
		{
			highlighted: ko.observable(false)
		},
		{
			highlighted: ko.observable(false)
		},
		{
			highlighted: ko.observable(false)
		},
		{
			highlighted: ko.observable(false)
		}
	]);
}

MEEQSViewModel.prototype.hoverHighlight = function(softRating, index) {
	softRating(index);
}

MEEQSViewModel.prototype.clickHighlight = function(hardRating, index) {
	hardRating(index);
}

MEEQSViewModel.prototype.removeHighlight = function(softRating) {
	softRating(0);
}