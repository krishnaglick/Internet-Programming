function MEEQSViewModel() {
	this.numberOfStars = ko.observable(3);

	this.categoryTypes = ko.observableArray([
		'Menu',
		'Environment',
		'Cost Efficiency',
		'Food Quality',
		'Service'
	]);
	
	this.rating = ko.computed(function() {
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
	this.comment = ko.observable('');

	this.restaurants = ko.observable({});
	this.restaurantNames = ko.computed(function() {
		return Object.keys(this.restaurants());
	}, this);
	this.selectedRestaurant = ko.observable('');

	this.restaurantLocations = ko.computed(function() {
		if(this.selectedRestaurant() != '') {
			var restaurantLocations = $.map(this.restaurants()[this.selectedRestaurant()], function(restaurantLocation) {
				return restaurantLocation.restaurantStreetAddress;
			});
			if(restaurantLocations.length == 1) {
				this.selectedRestaurantLocation(restaurantLocations[0]);
			}
			else {
				this.selectedRestaurantLocation('');
			}
			return restaurantLocations;
		}
		else {
			return [];
		}
	}, this);
	this.selectedRestaurantLocation = ko.observable('');
	this.selectedRestaurantLocationID = ko.computed(function() {
		if(this.selectedRestaurantLocation() != '' && this.selectedRestaurant() != '') {
			var restaurantLocationID = '';
			this.restaurants()[this.selectedRestaurant()].forEach(function(restaurantLocation) {
				if(restaurantLocation.restaurantStreetAddress == this.selectedRestaurantLocation()) {
					restaurantLocationID = restaurantLocation.restaurantLocationID;
				}
			}.bind(this));
			return restaurantLocationID;
		}
		else {
			return '';
		}
	}, this);
	this.selectedRestaurantLocationID.subscribe(function() {
		if(this.selectedRestaurantLocationID() != '') {
			///TODO: Dynamically load old rating if it exists.
			debugger;
		}
	}, this);


	this.restaurantEthnicites = ko.observableArray([]);
	this.restaurantTypes = ko.observableArray([]);
}

MEEQSViewModel.prototype.loadRestaurants = function() {
	var that = this;
	return $.ajax({
		type: "POST",
		dataType: "JSON",
		contentType: "application/json",
		url: "assign6/MEEQSController.php",
		data: ko.toJSON({ ajaxRoute: 'getRestaurants' }),
		success: function(data) {
			if(data.length > 0) {
				data.forEach(function(restaurant) {
					if(!(restaurant.restaurantName in that.restaurants())) {
						that.restaurants()[restaurant.restaurantName] = [];
					}
					that.restaurants()[restaurant.restaurantName].push({
						restaurantStreetAddress: restaurant.restaurantStreetAddress,
						restaurantLocationID: restaurant.restaurantLocationID,
						restaurantTypeID: restaurant.restaurantTypeID,
						restaurantEthnicityID: restaurant.restaurantEthnicityID
					});
				});
				that.restaurants.valueHasMutated();
			}
		},
		error: function(data) {
			showMessage(false, 'Error', 'There was a server error, please refresh the page!');
		}
	});
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

MEEQSViewModel.prototype.getPreviousUserRating = function() {
	var that = this;
	return $.ajax({
		type: "POST",
		dataType: "JSON",
		contentType: "application/json",
		url: "assign6/MEEQSController.php",
		data: ko.toJSON({
			ajaxRoute: 'getPreviousUserRating',
			username: home_view_model.username,
			restaurantlocationID: that.restaurantLocationData().locationID,
		}),
		success: function(data) {
			//I am a bad, bad man.
			that.rating()[0].hardRating(data['Menu']);
			that.rating()[1].hardRating(data['Environment']);
			that.rating()[2].hardRating(data['Cost']);
			that.rating()[3].hardRating(data['Quality']);
			that.rating()[4].hardRating(data['Service']);
			that.comment(data['Comment']);
		},
		error: function(data) {
		}
	});
}

/*MEEQSViewModel.prototype.addRestaurant = function() {
	if(this.newRestaurant() !== '') {
		this.restaurants.push(this.newRestaurant());
		this.newRestaurant('');
	}
}*/

MEEQSViewModel.prototype.submitRating = function() {
	if(this.selectedRestaurant() !== '' && this.restaurantLocation() !== '') {
		return $.ajax({
			type: "POST",
			dataType: "JSON",
			contentType: "application/json",
			url: "assign6/MEEQSController.php",
			data: ko.toJSON({
				ajaxRoute: 'rateRestaurant',
				restaurantName: this.restaurantName,
				username: home_view_model.username,
				restaurantlocationID: this.restaurantLocationData().locationID,
				restaurantTypeID: this.restaurantLocationData().restaurantTypeID,
				restaurantEthnicityID: this.restaurantLocationData().restaurantEthnicityID,
				menuRating: this.rating()[0].hardRating,
				environmentRating: this.rating()[1].hardRating,
				costRating: this.rating()[2].hardRating,
				qualityRating: this.rating()[3].hardRating,
				serviceRating: this.rating()[4].hardRating,
				comment: this.restaurantComment
			}),
			success: function() {},
			error: function(data) {
				showMessage(false, 'Error', 'Please try submitting the rating again!');
			}
		});
	}
}

MEEQSViewModel.prototype.clearRatings = function() {
	this.rating().forEach(function(val) {
		val.hardRating(-1);
		val.softRating(-1);
	});
}

MEEQSViewModel.prototype.clearForm = function() {
	this.clearRatings();
	this.selectedRestaurant('');
	this.restaurantLocation('');
	$('#restaurants.dropdown').dropdown('restore defaults');
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
