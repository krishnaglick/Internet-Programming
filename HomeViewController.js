$(function() {
	window.home_view_model = new HomeViewModel();
	window.intervalObjects = {};

	$('.navigationContent').load('NavigationContent.html', function() {
		SemanticSetup();
		NavigationSetup();
		SubscriptionSetup();
		
		if(typeof Cookies.get('username') !== 'undefined' && typeof Cookies.get('authTicket') !== 'undefined') {
			home_view_model.username(Cookies.get('username'));
			home_view_model.authTicket(Cookies.get('authTicket'));
			home_view_model.isAdministrator(Cookies.get('isAdministrator'));
			home_view_model.loggedIn(true);
		}

		ko.applyBindings(home_view_model, $('title')[0]);
		ko.applyBindings(home_view_model, $('.navigationContent')[0]);
	});
})

function SemanticSetup() {
	$('.ui.dropdown.item').dropdown();

	$('#navLogin').click(function() {
		$('#loginModal').modal({
			onHidden: function() {
				home_view_model.password('');
			}
		}).modal('show');
	});

	$('#navRegister').click(function() {
		$('#registerModal').modal({
			onHidden: function() {
				home_view_model.password('');
			}
		}).modal('show');
	});
}

function NavigationSetup() {
	$('.ui.dropdown.item a').click(function() {
		$('.ui.dropdown.item a i:not(".home")').addClass('thin');
		$(this).find('i').removeClass('thin');
	});

	$('#loginModal input, #registerModal input').keydown(function(e) {
		if(e.keyCode == 13) { //Enter
			//This is probably bad
			if(home_view_model.username() !== '' && home_view_model.password() !== '') {
				$(this).closest('.ui.small.modal').find('.ui.primary.button').click();
			}
		}
	});

	Router.registerRouting();
	function getRouteIfExists() {
		var url = window.location.href;
		var route = url.split('#')[1];
		if(route) {
			return route;
		}
		else {
			return false;
		}
	}
	var pageRoute = getRouteIfExists();
	if(pageRoute) {
		Router.loadContent(pageRoute);
	}
	else {
		Router.loadContent('home');
	}
}

function SubscriptionSetup() {
	var that = home_view_model;
	home_view_model.ajaxBodyMessage.subscribe(function() {
		if(that.ajaxBodyMessage() !== '') {
			if(that.messageType) {
				$('#errorMessage').addClass('success').removeClass('negative').slideDown();
			}
			else {
				$('#errorMessage').addClass('negative').removeClass('success').slideDown();
			}
		}
		else {
			$('#errorMessage').slideUp();
		}
	});
}

function showMessage(isSuccess, messageTitle, messageBody) {
	home_view_model.messageType = isSuccess;
	home_view_model.ajaxHeaderMessage(messageTitle);
	home_view_model.ajaxBodyMessage(messageBody);
}

function cleanUpArtifacts() {
	if(!'canvas' in window) {
		window.canvas.clear();
	}
	
	$.each(window.intervalObjects, function(index, obj) {
    	if(obj !== null) {
    		clearInterval(obj);
    	}
	});
	if(typeof Router.contentArea[0] === 'undefined') {
		Router.contentArea = $('.assignmentSpace');
	}

	if(!!ko.dataFor(Router.contentArea[0])) {
		ko.cleanNode(Router.contentArea[0]);
	}
}