function StockPortfolioViewModel() {
	this.stocksList = ko.observableArray([]);
	this.myStocks = ko.observable({});

	this.myStocksListing = ko.computed(function() {
		var out = [];
		var that = this;
		Object.keys(this.myStocks()).forEach(function(key) {
			out.push({
				key: key,
				values: that.myStocks()[key]
			});
		});
		return out;
	}, this);

	this.chartStocks = ko.observableArray([]);

	this.myMoney = ko.observable(500);
}

StockPortfolioViewModel.prototype.addToChart = function(data, element, viewModel) {
	var key = data.key;
	var stockName = data.Symbol
	var chartData = {
	}
	if($(element).hasClass('active')) {
		viewModel.chartStocks.remove(key);
	}
	else {
		viewModel.chartStocks.push(key);
	}
	$(element).toggleClass('active');
}

StockPortfolioViewModel.prototype.decrement = function(data, viewModel) {
	var currentFunds = viewModel.myMoney();
	var currentHoldings = data.Amount();

	if(currentHoldings > 0) {
		var stockValue = viewModel.myStocks()[data.Symbol].pop();
		viewModel.myStocks.valueHasMutated();
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
	}
	else {
		viewModel.myStocks()[data.Symbol].push(stockCost);
		viewModel.myStocks.valueHasMutated();
		viewModel.myMoney(currentFunds - stockCost);
		data.Amount(viewModel.myStocks()[data.Symbol].length);
	}
}