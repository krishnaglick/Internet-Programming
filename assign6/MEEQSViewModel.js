function MEEQSViewModel() {
	this.numberOfStars = ko.observable(3);

	this.categoryTypes = ko.observableArray([
		'Menu',
		'Enviroment',
		'Cost Efficiency',
		'Food Quality',
		'Service'
	]);
	
	this.categories = ko.computed(function() {
		return $.map(this.categoryTypes(), function(category) {
			return {
				hardRating: ko.observable(-1),
				softRating: ko.observable(-1),
				isStarSelected: function(index) {
					if(this.softRating() < 0) {
						return this.hardRating() < index;
					}
					else {
						return this.softRating() < index;
					}
				},
				isZeroSelected: function() {
					if(this.softRating() == 0) {
						return false;
					}
					else {
						return this.hardRating() != 0;
					}
				},
				categoryName: category
			};
		});
	}, this);

	this.restaurantData = ko.observable({
		a: [
			'123 st',
			'456 ave',
			'789 rd'
		],
		b: [
			'hodges lane',
			'qq ave'
		],
		c: [
			'zz rd'
		]
	});

	this.restaurants = ko.computed(function() {
		return Object.keys(this.restaurantData());
	}, this);

	this.selectedRestaurant = ko.observable('');

	this.restaurantEthnicites = ko.observableArray([]);
	this.restaurantTypes = ko.observableArray([]);

	this.restaurantLocation = ko.observable('');
	this.restaurantLocations = ko.computed(function() {
		if(this.selectedRestaurant() !== '') {
			$('#restaurantLocations.dropdown').dropdown('restore defaults');
			var restaurantLocations = this.restaurantData()[this.selectedRestaurant()];
			if(restaurantLocations.length == 1) {
				this.selectedRestaurant(restaurantLocations[0]);
			}
			return restaurantLocations;
		}
		else {
			return [];
		}
	}, this);
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

MEEQSViewModel.prototype.loadRestaurantEthnicities = function() {
	return $.ajax({
		type: "POST",
		dataType: "JSON",
		contentType: "application/json",
		url: "assign6/MEEQSController.php",
		data: ko.toJSON({ ajaxRoute: 'getRestaurantEthnicities' }),
		success: function(data) {
			if(data.length > 0) {
				meeqs_view_model.restaurantEthnicites($.map(data, function(val) {
					return val.RestaurantEthnicityName;
				}));
			}
		},
		error: function(data) {
			showMessage(false, 'Error', 'There was a server error, please refresh the page!');
		}
	});
}

MEEQSViewModel.prototype.loadRestaurantTypes = function() {
	return $.ajax({
		type: "POST",
		dataType: "JSON",
		contentType: "application/json",
		url: "assign6/MEEQSController.php",
		data: ko.toJSON({ ajaxRoute: 'getRestaurantTypes' }),
		success: function(data) {
			if(data.length > 0) {
				meeqs_view_model.restaurantTypes($.map(data, function(val) {
					return val.RestaurantTypeName;
				}));
			}
		},
		error: function(data) {
			showMessage(false, 'Error', 'There was a server error, please refresh the page!');
		}
	});
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
			showMessage(false, 'Error', 'There was a server error, please refresh the page!');
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