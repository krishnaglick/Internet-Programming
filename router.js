Router = {};

Router.contentArea = $('.assignmentSpace');

Router.loadContent = function(route) {
	function setPageName(route) {
		home_view_model.pageName(Router.routes[route].name);
	}
	function loadRouteContent(route) {
		Router.contentArea.load(Router.routes[route].url);
	}

	cleanUpArtifacts();
	setPageName(route);
	loadRouteContent(route);
}

Router.registerRouting = function() {
	window.addEventListener('hashchange', function(e) {
		var route = window.location.href.split('#')[1];
		if(route) {
			Router.loadContent(route);
		}
		else {
			Router.loadContent('home');
		}
	});

	$('[data-route]').click(function(element) {
		function buildRouteUrl(baseUrl, route) {
			if(baseUrl.slice(-1) == '/') {
				return baseUrl + '#' + route;
			}
			else {
				return baseUrl + '/#' + route;
			}
		}
		var route = element.currentTarget.dataset.route;
		var baseUrl = window.location.href.split('#')[0];

		window.location = buildRouteUrl(baseUrl, route);
	});
}