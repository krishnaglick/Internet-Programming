function MEEQSViewModel() {
	this.rating = function() {
		this.hardRating = ko.observable(-1);
		this.softRating = ko.observable(-1);

		this.isStarSelected = function(index) {
			if(this.softRating() == -1) {
				return this.hardRating() < index;
			}
			else {
				return this.softRating() < index;
			}
		}
	}

	this.numberOfStars = ko.observable(3);

	this.categories = ko.observableArray([
		'Menu',
		'Enviroment',
		'Cost Efficiency',
		'Food Quality',
		'Service'
	]);

	this.restaurants = ko.observableArray([]);
	this.selectedRestaurant = ko.observable();
}

MEEQSViewModel.prototype.hoverHighlight = function(softRating, index) {
	softRating(index);
}

MEEQSViewModel.prototype.clickHighlight = function(hardRating, index) {
	hardRating(index);
}

MEEQSViewModel.prototype.removeHighlight = function(softRating) {
	softRating(-1);
}

MEEQSViewModel.prototype.loadRestaurants = function() {
	$.ajax({
		type: "POST",
		dataType: "JSON",
		contentType: "application/json",
		url: "assign6/MEEQSController.php",
		//WHY DO I HAVE TO POST TO DO GETS PHP, WHY.
		data: ko.toJSON({ ajaxRoute: 'getRestaurantNames' }),
		success: function(data) {
			meeqs_view_model.restaurants(data);
		},
		error: function(data) {
			if(data.status === 500) {
				showMessage(false, 'Error', 'There was a server error, please refresh the page!');
			}
		}
	});
}