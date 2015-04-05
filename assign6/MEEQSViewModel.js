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
			$('#restaurantLocations.dropdown').dropdown('restore defaults');
			this.clearRatings();
			return restaurantLocations;
		}
		else {
			return [];
		}
	}, this);
	this.selectedRestaurantLocation = ko.observable('');
	this.selectedRestaurantLocationID = ko.observable('');
	this.selectedRestaurantEthnicityID = ko.observable('');
	this.selectedRestaurantTypeID = ko.observable('');
	this.selectedRestaurantLocation.subscribe(function() {
		if(this.selectedRestaurantLocation() != '' && this.selectedRestaurant() != '') {
			this.restaurants()[this.selectedRestaurant()].forEach(function(restaurantLocation) {
				if(restaurantLocation.restaurantStreetAddress == this.selectedRestaurantLocation()) {
					this.selectedRestaurantLocationID(restaurantLocation.restaurantLocationID);
					this.selectedRestaurantEthnicityID(restaurantLocation.restaurantEthnicityID);
					this.selectedRestaurantTypeID(restaurantLocation.restaurantTypeID);
					this.clearRatings();
					this.getPreviousUserRating();
				}
			}.bind(this));
		}
	}, this);


	this.restaurantEthnicites = ko.observableArray([]);
	this.restaurantTypes = ko.observableArray([]);

	this.addRestaurantData = {
		restaurantName: ko.observable(''),
		restaurantEthnicity: ko.observable(''),
		restaurantType: ko.observable(''),
		restaurantCity: ko.observable(''),
		restaurantState: ko.observable(''),
		restaurantZip: ko.observable(''),
		restaurantStreetAddress: ko.observable('')
	};
	this.addRestaurantData.restaurantName.subscribe(function() {
		if(this.addRestaurantData.restaurantName() in this.restaurants()) {
			$('#restaurantEthnicities').prop('disabled', true);
			$('#restaurantTypes').prop('disabled', true);
		}
		else {
			$('#restaurantEthnicities').prop('disabled', false);
			$('#restaurantTypes').prop('disabled', false);
		}
	}, this);

	this.averageRestaurantRatings = ko.observableArray([]);
	this.restaurantAdminList = ko.observableArray([]);
}

MEEQSViewModel.prototype.loadRestaurants = function() {
	this.restaurants({});
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
				meeqs_view_model.restaurantEthnicites(data.reduce(function(ethnicities, ethnicity) {
					ethnicities[ethnicity.restaurantEthnicityName] = ethnicity.restaurantEthnicityID;
					return ethnicities;
				}, {}));
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
				meeqs_view_model.restaurantTypes(data.reduce(function(types, type) {
					types[type.restaurantTypeName] = type.restaurantTypeID;
					return types;
				}, {}));
			}
		},
		error: function(data) {
			showMessage(false, 'Error', 'There was a server error, please refresh the page!');
		}
	});
}

MEEQSViewModel.prototype.getAverageRestaurantRatings = function() {
	var that = this;
	return $.ajax({
		type: "POST",
		dataType: "JSON",
		contentType: "application/json",
		url: "assign6/MEEQSController.php",
		data: ko.toJSON({
			ajaxRoute: 'getAverageRestaurantRatings'
		}),
		success: function(data) {
			that.averageRestaurantRatings($.map(data, function(rating) {
				return {
					restaurantName: rating.restaurantName,
					menuRating: parseFloat(rating.menuRating).toFixed(2),
					environmentRating: parseFloat(rating.environmentRating).toFixed(2),
					costRating: parseFloat(rating.costRating).toFixed(2),
					qualityRating: parseFloat(rating.qualityRating).toFixed(2),
					serviceRating: parseFloat(rating.serviceRating).toFixed(2)
				}
			}));
		}
	});
}

MEEQSViewModel.prototype.loadAdminList = function() {
	var that = this;
	return $.ajax({
		type: "POST",
		dataType: "JSON",
		contentType: "application/json",
		url: "assign6/MEEQSController.php",
		data: ko.toJSON({
			ajaxRoute: 'loadAdminList',
			username: home_view_model.username
		}),
		success: function(data) {
			that.restaurantAdminList(data);
		}
	});
}

MEEQSViewModel.prototype.getPreviousUserRating = function() {
	if(!home_view_model.loggedIn()) {
		return;
	}
	var that = this;
	return $.ajax({
		type: "POST",
		dataType: "JSON",
		contentType: "application/json",
		url: "assign6/MEEQSController.php",
		data: ko.toJSON({
			ajaxRoute: 'getPreviousUserRating',
			username: home_view_model.username,
			restaurantLocationID: that.selectedRestaurantLocationID(),
		}),
		success: function(data) {
			//I am a bad, bad man.
			that.rating()[0].hardRating(data['menuRating']);
			that.rating()[1].hardRating(data['environmentRating']);
			that.rating()[2].hardRating(data['costRating']);
			that.rating()[3].hardRating(data['qualityRating']);
			that.rating()[4].hardRating(data['serviceRating']);
			that.comment(data['comment']);
		}
	});
}

MEEQSViewModel.prototype.addRestaurant = function(addRestaurantData, viewModel) {
	function restaurantDataValid() {
		var dataValid = true;
		Object.keys(addRestaurantData).forEach(function(key) {
			if(this[key]() == '') {
				dataValid = false;
			}
		}.bind(addRestaurantData));
		return dataValid;
	}

	if(restaurantDataValid()) {
		var that = viewModel;
		return $.ajax({
			type: "POST",
			dataType: "JSON",
			contentType: "application/json",
			url: "assign6/MEEQSController.php",
			data: ko.toJSON({
				ajaxRoute: 'createRestaurant',
				username: home_view_model.username,
				newRestaurantData: that.addRestaurantData,
				newRestaurantEthnicityID: that.restaurantEthnicites()[that.addRestaurantData.restaurantEthnicity()] || '',
				newRestaurantTypeID: that.restaurantTypes()[that.addRestaurantData.restaurantType()] || ''
			}),
			success: function(data) {
				if(!(that.addRestaurantData.restaurantName() in that.restaurants())) {
					that.restaurants()[that.addRestaurantData.restaurantName()] = [];
				}
				that.restaurants()[that.addRestaurantData.restaurantName()].push({
					restaurantStreetAddress: that.addRestaurantData.restaurantStreetAddress(),
					restaurantLocationID: data.restaurantLocationID,
					restaurantTypeID: that.restaurantTypes()[that.addRestaurantData.restaurantType()],
					restaurantEthnicityID: that.restaurantEthnicites()[that.addRestaurantData.restaurantEthnicity()]
				});
				that.cancelAddRestaurant(addRestaurantData, viewModel);
				that.restaurants.valueHasMutated();
				showMessage(true, 'Success', 'Restaurant Added');
				that.loadAdminList();
			},
			error: function(data) {
				if(data.status) {
					showMessage(false, 'Error', data.responseJSON.error);
				}
				else {
					showMessage(false, 'Error', 'Please try submitting the rating again!');
				}
			}
		});
	}
	else {
		showMessage(false, 'Error', 'We need more information to add the restaurant.');
	}
}

MEEQSViewModel.prototype.cancelAddRestaurant = function(addRestaurantData, viewModel) {
	Object.keys(addRestaurantData).forEach(function(key) {
		this[key]('');
	}.bind(addRestaurantData));

	$('a.item[data-tab="Rate"]').click();
	viewModel.resetDropdowns();
}

MEEQSViewModel.prototype.submitRating = function() {
	if(this.selectedRestaurant() !== '' && this.selectedRestaurantLocation() !== '' && home_view_model.loggedIn()) {
		var that = this;
		return $.ajax({
			type: "POST",
			dataType: "JSON",
			contentType: "application/json",
			url: "assign6/MEEQSController.php",
			data: ko.toJSON({
				ajaxRoute: 'rateRestaurant',
				username: home_view_model.username,
				restaurantLocationID: that.selectedRestaurantLocationID,
				restaurantTypeID: that.selectedRestaurantTypeID,
				restaurantEthnicityID: that.selectedRestaurantEthnicityID,
				menuRating: that.rating()[0].hardRating,
				environmentRating: that.rating()[1].hardRating,
				costRating: that.rating()[2].hardRating,
				qualityRating: that.rating()[3].hardRating,
				serviceRating: that.rating()[4].hardRating,
				comment: this.comment
			}),
			success: function() {
				showMessage(true, 'Success', 'Rating Submitted');
				that.getAverageRestaurantRatings();
			},
			error: function(data) {
				showMessage(false, 'Error', 'Please try submitting the rating again!');
			}
		});
	}
}

MEEQSViewModel.prototype.deleteRestaurantLocation = function(restaurant, viewModel) {
	return $.ajax({
		type: "POST",
		dataType: "JSON",
		contentType: "application/json",
		url: "assign6/MEEQSController.php",
		data: ko.toJSON({
			ajaxRoute: 'deleteRestaurantLocation',
			username: home_view_model.username,
			restaurantName: restaurant.restaurantName,
			restaurantStreetAddress: restaurant.restaurantStreetAddress
		}),
		success: function() {
			viewModel.loadAdminList();
			viewModel.loadRestaurants();
			viewModel.getAverageRestaurantRatings();
		},
		error: function(data) {
			showMessage(false, 'Error', 'Please try deleting the restaurant again.');
		}
	});
}

MEEQSViewModel.prototype.approveRestaurant = function(restaurant, viewModel) {
	return $.ajax({
		type: "POST",
		dataType: "JSON",
		contentType: "application/json",
		url: "assign6/MEEQSController.php",
		data: ko.toJSON({
			ajaxRoute: 'approveRestaurant',
			username: home_view_model.username,
			restaurantName: restaurant.restaurantName
		}),
		success: function() {
			viewModel.loadAdminList();
			viewModel.loadRestaurants();
			viewModel.getAverageRestaurantRatings();
		},
		error: function(data) {
			showMessage(false, 'Error', 'Please try approving the restaurant again.');
		}
	});
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
	this.selectedRestaurantLocation('');
	this.resetDropdowns();
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

MEEQSViewModel.prototype.resetDropdowns = function() {
	$('#restaurants.dropdown').dropdown('restore defaults');
	$('#restaurantLocations.dropdown').dropdown('restore defaults');
	$('#restaurantEthnicities.dropdown').dropdown('restore defaults');
	$('#restaurantTypes.dropdown').dropdown('restore defaults');
	$('#states.dropdown').dropdown('restore defaults');
}