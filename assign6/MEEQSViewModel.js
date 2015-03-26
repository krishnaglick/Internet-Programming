function MEEQSViewModel() {
	this.numberOfStars = ko.observable(3);

	this.categorieTypes = ko.observableArray([
		'Menu',
		'Enviroment',
		'Cost Efficiency',
		'Food Quality',
		'Service'
	]);
	
	this.categories = ko.computed(function() {
		return $.map(this.categorieTypes(), function(category) {
			return {
				hardRating: ko.observable(-1),
				softRating: ko.observable(-1),
				isStarSelected: function(index) {
					if(this.softRating() == -1) {
						return this.hardRating() < index;
					}
					else {
						return this.softRating() < index;
					}
				},
				categoryName: category
			};
		});
	}, this);

	this.restaurants = ko.observableArray(['a', 'asdf', 'xcxz']);
	this.selectedRestaurant = ko.observable('');
	this.newRestaurant = ko.observable('');

	this.isAdministrator = ko.observable(true);
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
	return $.ajax({
		type: "POST",
		dataType: "JSON",
		contentType: "application/json",
		url: "assign6/MEEQSController.php",
		//WHY DO I HAVE TO POST TO DO GETS PHP, WHY.
		data: ko.toJSON({ ajaxRoute: 'getRestaurantNames' }),
		success: function(data) {
			if(data.length > 0) {
				meeqs_view_model.restaurants(data);
			}
		},
		error: function(data) {
			if(data.status === 500) {
				showMessage(false, 'Error', 'There was a server error, please refresh the page!');
			}
		}
	});
}

MEEQSViewModel.prototype.addRestaurant = function() {
	if(this.newRestaurant() !== '') {
		this.restaurants.push(this.newRestaurant());
		this.newRestaurant('');
	}
}

MEEQSViewModel.prototype.submitRating = function() {
	if(typeof this.selectedRestaurant() !== 'undefined' && this.selectedRestaurant() != '') {

	}
}

MEEQSViewModel.prototype.clearForm = function() {
	this.categories().forEach(function(val) {
		val.hardRating(-1);
		val.softRating(-1);
	});

	this.selectedRestaurant('');
	$('#restaurants.dropdown').dropdown('restore defaults');
}