function StockPortfolioViewModel() {
	this.stocksList = ko.observableArray([]);
	this.myStocks = ko.observableArray([]);
	this.chartStocks = ko.observableArray([]);

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