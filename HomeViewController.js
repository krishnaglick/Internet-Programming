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
		}

		ko.applyBindings(home_view_model, $('title')[0]);
		ko.applyBindings(home_view_model, $('.navigationContent')[0]);

		window.addEventListener('hashchange', function(e) {
			var route = e.newURL.split('#')[1];
			changePage(route);
		});

		var route = window.location.href.split('#')[1];
		if(typeof route === 'undefined') {
			route = "home";
			window.location.href = window.location.origin + "/#" + route;
		}
		else {
			changePage(route);
		}
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
	})
}

function changePage(targetPage) {
	var assignmentToLoad = $('a.item.' + targetPage).data('route');
	$('a.item.' + targetPage).click();

	cleanUp();

	if(!!ko.dataFor($('.assignmentSpace')[0])) {
		ko.cleanNode($('.assignmentSpace')[0]);
	}

	if(assignmentToLoad !== '') {
		$('.assignmentSpace').load(assignmentToLoad);
	}
	else {
		$('.assignmentSpace').html('');
	}

	home_view_model.pageRoute($('a.item.' + targetPage).find('span').text());
}

function cleanUp() {
	if(typeof window.canvas != 'undefined') {
		window.canvas.clear();
	}
	
	$.each(window.intervalObjects, function(index, obj) {
    	if(obj !== null) {
    		clearInterval(obj);
    	}
	});
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