$(function() {
	window.stock_portfolio_view_model = new StockPortfolioViewModel();
})

function test() {
	$.ajax({
		type: "POST",
		dataType: "json",
		url: "assign5/index.php",
		data: {
				'action' : 'test',
				'thing2' : 'asdf'
		},
		success: function(data) {
			console.log(JSON.parse(data));
			console.log('s');
		},
		failure: function(data) {
			console.log(data);
			console.log('f');
		},
		complete: function() {
			console.log('done');
		}
	});
}