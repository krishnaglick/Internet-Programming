$(function() {
	window.stock_portfolio_view_model = new StockPortfolioViewModel();

	ko.applyBindings(stock_portfolio_view_model, $('.assignmentSpace')[0]);

	$('.ui.vertical.menu > a').click(function() {
		$('.ui.vertical.menu > a').removeClass('active');
		$(this).addClass('active');
		menuSelection($(this).data('selection'))
	});

	function menuSelection(option) {
		$('#myPortfolio, #buySell, #statistics').slideUp(function() {
			$(option).slideDown();
		});
	}
})