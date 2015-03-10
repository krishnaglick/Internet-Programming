function StockPortfolioViewModel() {
	this.stocksList = ko.observableArray([]);
	this.myStocks = ko.observable({});

	this.myStocksListing = ko.computed(function() {
		var out = [];
		var that = this;
		Object.keys(this.myStocks()).forEach(function(key, i) {
			if(that.myStocks()[key].length > 0) {
				out.push({
					key: key,
					value: eval(that.myStocks()[key].join('+')),
					name: that.myStocks()[key].Name,
					index: i
				});
			}
		});
		return out;
	}, this);

	this.chartStocks = ko.observableArray([]);

	this.myMoney = ko.observable(500);
}

StockPortfolioViewModel.prototype.addToChart = function(data, viewModel) {
	var key = data.key;
	var chartData = {
		x: data.index * 2,
		y: data.value,
		label: data.name
	}
	//I need to rewrite how this method is handled as relying on a DOM element is bad.
	viewModel.myStocks()[key].Active(!viewModel.myStocks()[key].Active());
	if(viewModel.myStocks()[key].Active()) {
		viewModel.chartStocks.push(chartData);
	}
	else {
		viewModel.chartStocks.remove(function(val) {
			return val.label === data.name;
		});
	}
}

StockPortfolioViewModel.prototype.decrement = function(data, viewModel) {
	var currentFunds = viewModel.myMoney();
	var currentHoldings = data.Amount();

	if(currentHoldings > 0) {
		var stockValue = viewModel.myStocks()[data.Symbol].pop();
		viewModel.myStocks.valueHasMutated();
		data.Amount(viewModel.myStocks()[data.Symbol].length);
		viewModel.myMoney(currentFunds + stockValue);
		if(viewModel.myStocks()[data.Symbol].Active()) {
			updateChartOnChange(data.Symbol);
		}
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
		viewModel.myStocks()[data.Symbol].Name = data.Name.substring(0, 8);
		if(typeof viewModel.myStocks()[data.Symbol].Active === 'undefined') {
			viewModel.myStocks()[data.Symbol].Active = ko.observable(false);
		}
		viewModel.myStocks.valueHasMutated();
		viewModel.myMoney(currentFunds - stockCost);
		data.Amount(viewModel.myStocks()[data.Symbol].length);

		if(viewModel.myStocks()[data.Symbol].Active()) {
			updateChartOnChange(data.Symbol);
		}
	}
}