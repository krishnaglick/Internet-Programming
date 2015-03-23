function MEEQSViewModel() {
	this.rating = function() {
		this.hardRating = ko.observable(0);
		this.softRating = ko.observable(0);
	} 
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