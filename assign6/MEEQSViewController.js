(function(window) {
	MEEQSViewController = {};

	MEEQSViewController.load = function() {
		window.meeqs_view_model = new MEEQSViewModel();

		ko.applyBindings(meeqs_view_model, $('.assignmentSpace')[0]);
	}

	MEEQSViewController.load();
})(window);