$(function() {
	window.meeqs_view_model = new MEEQSViewModel();

	meeqs_view_model.loadRestaurants().complete(function() {
		$('#restaurants.dropdown').dropdown();
		$('#restaurantLocations.dropdown').dropdown();
		$('#clearButton').click(function() {
			$('#restaurants.dropdown').dropdown('restore defaults');
		});
		$('#meeqsTabs .item').tab();
		//meeqs_view_model.selectedRestaurant('Tijuana Flats');
		//meeqs_view_model.selectedRestaurantLocation(meeqs_view_model.restaurantLocations()[0]);
		ko.applyBindings(meeqs_view_model, $('.assignmentSpace')[0]);
	});
	meeqs_view_model.loadRestaurantTypes();
	meeqs_view_model.loadRestaurantEthnicities();

	/*home_view_model.loggedIn.subscribe(function() {
		if(home_view_model.loggedIn()) {
			if(this.restaurantLocationID() !== '') {
				this.getPreviousUserRating();
			}
		}
		else {
			this.clearForm();
		}
	}, meeqs_view_model);*/
});