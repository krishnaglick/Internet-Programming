function StockPortfolioViewModel() {
	this.stocksList = ko.observableArray([]);

	this.chartStocksUser = ko.observableArray([]);
	this.chartStocksMarket = ko.observableArray([]);

	this.myMoney = ko.observable(500);
}

StockPortfolioViewModel.prototype.addStockToChart = function(myStocks, stockInfo, viewModel) {
	var stockXPosition = viewModel.stocksList()[stockInfo.symbol];
	var chartDataUser = {
		x: stockXPosition,
		y: eval(myStocks.join('+')),
		label: stockInfo.Name
	}
	var chartDataMarket = {
		x: stockXPosition,
		y: myStocks.length * stockInfo.LastTradePriceOnly,
		label: stockInfo.Name
	}

	viewModel.chartStocksUser.push(chartDataUser);
	viewModel.chartStocksMarket.push(chartDataMarket);
}

StockPortfolioViewModel.prototype.removeStockFromChart = function(stockInfo, viewModel) {
	viewModel.chartStocksUser.remove(function(stockData) {
		return stockData.label == stockInfo.Name;
	});

	viewModel.chartStocksMarket.remove(function(stockData) {
		return stockData.label == stockInfo.Name;
	});
}

StockPortfolioViewModel.prototype.addOrRemoveStockFromChart = function(myStocks, stockInfo, viewModel) {
	myStocks.active(!myStocks.active());
	var addingStock = myStocks.active();

	if(addingStock) {
		viewModel.addStockToChart(myStocks, stockInfo, viewModel);
	}
	else {
		viewModel.removeStockFromChart(stockInfo, viewModel);
	}
	updateStockChart();
}

StockPortfolioViewModel.prototype.decrement = function(stockSymbol, viewModel) {
	var currentFunds = viewModel.myMoney;
	var stockIndexInList = viewModel.stocksList()[stockSymbol];
	var currentHoldings = viewModel.stocksList()[stockIndexInList].myOwnedStocks;

	if(currentHoldings().length > 0) {
		var stockValue = parseFloat(viewModel.stocksList()[stockIndexInList].LastTradePriceOnly);
		currentHoldings.pop();
		currentHoldings.valueHasMutated();
		currentFunds(currentFunds() + stockValue);

		if(currentHoldings().active()) {
			viewModel.removeStockFromChart(viewModel.stocksList()[stockIndexInList], viewModel);
			viewModel.addStockToChart(currentHoldings(), viewModel.stocksList()[stockIndexInList], viewModel);
			updateStockChart();
		}
	}
}

StockPortfolioViewModel.prototype.increment = function(stockSymbol, viewModel) {
	var currentFunds = viewModel.myMoney;
	var stockIndexInList = viewModel.stocksList()[stockSymbol];
	var currentHoldings = viewModel.stocksList()[stockIndexInList].myOwnedStocks;
	var stockValue = parseFloat(viewModel.stocksList()[stockIndexInList].LastTradePriceOnly);

	if(currentFunds() < stockValue) {
		showMessage(false, 'Error', 'You lack the funds for this purchase.');
	}
	else {
		currentHoldings.push(stockValue);
		currentHoldings.sort(function(a, b) {
			//Sort Largest First
			return a < b;
		});
		currentHoldings.valueHasMutated();
		currentFunds(currentFunds() - stockValue);

		if(currentHoldings().active()) {
			viewModel.removeStockFromChart(viewModel.stocksList()[stockIndexInList], viewModel);
			viewModel.addStockToChart(currentHoldings(), viewModel.stocksList()[stockIndexInList], viewModel);
			updateStockChart();
		}
	}
}