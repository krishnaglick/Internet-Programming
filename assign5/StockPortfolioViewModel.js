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
	if(viewModel.chartStocks.indexOf(data) == -1) {
		viewModel.chartStocks.push(data);
	}
	else {
		viewModel.chartStocks.remove(data);
	}
	$(element).toggleClass('active');
}

StockPortfolioViewModel.prototype.decrement = function(data, viewModel) {
	var currentFunds = viewModel.myMoney();
	var currentHoldings = data.Amount();
	var stockCost = parseFloat(data.LastTradePriceOnly);

	if(currentHoldings != 0) {
		data.Amount(currentHoldings -  1);
		viewModel.myStocks()[data.Index].Amount(data.Amount());
		viewModel.myMoney(currentFunds + stockCost);
	}
}

StockPortfolioViewModel.prototype.increment = function(data, viewModel) {
	var currentFunds = viewModel.myMoney();
	var currentHoldings = data.Amount();
	var stockCost = parseFloat(data.LastTradePriceOnly);

	if(currentFunds > stockCost) {
		data.Amount(currentHoldings + 1);
		viewModel.myStocks()[data.Index].Amount(data.Amount());
		viewModel.myMoney(currentFunds - stockCost);
	}
	else {
		home_view_model.messageType = false;
		home_view_model.ajaxHeaderMessage('Error');
		home_view_model.ajaxBodyMessage('You lack the funds for this purchase.');
	}
}