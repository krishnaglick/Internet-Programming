function StockPortfolioViewModel() {
	this.stocksList = ko.observableArray([]);
	this.myStocks = ko.observableArray([]);
	this.chartStocks = ko.observable({
		categories: [],
		series: []
	});

	this.myMoney = ko.observable(500);
}

StockPortfolioViewModel.prototype.addToChart = function(data, element, viewModel) {
	/*if(viewModel.chartStocks.indexOf(data) == -1) {
		viewModel.chartStocks.push(data);
	}
	else {
		viewModel.chartStocks.remove(data);
	}*/
	$(element).toggleClass('active');
}

StockPortfolioViewModel.prototype.decrement = function(data, viewModel) {
	var currentFunds = viewModel.myMoney();
	var currentHoldings = data.Amount();
	if(currentHoldings > 0) {
		var stockValue = viewModel.myStocks()[data.Symbol].pop();
		data.Amount(viewModel.myStocks()[data.Symbol].length);
		viewModel.myMoney(currentFunds + stockValue);
	}
}

StockPortfolioViewModel.prototype.increment = function(data, viewModel) {
	var stockCost = parseFloat(data.LastTradePriceOnly);
	var currentFunds = viewModel.myMoney();

	if(currentFunds < stockCost) {
		home_view_model.messageType = false;
		home_view_model.ajaxHeaderMessage('Error');
		home_view_model.ajaxBodyMessage('You lack the funds for this purchase.');
		return;
	}

	viewModel.myStocks()[data.Symbol].push(stockCost);
	viewModel.myMoney(currentFunds - stockCost);

	data.Amount(viewModel.myStocks()[data.Symbol].length);
}