$(function() {
	window.stock_portfolio_view_model = new StockPortfolioViewModel();

	loadStockData();

	var activeOption = $('.active.green.item');

	$('.ui.vertical.menu > a').click(function() {
		//Basic Menu Selection !!Works
		$('.ui.vertical.menu > a').removeClass('active');
		$(this).addClass('active');
		$(activeOption.data('selection')).hide();
		$($(this).data('selection')).show();
		activeOption = $('.active.green.item');

		
		/*$('.ui.vertical.menu > a').removeClass('active');
		$(this).addClass('active');
		$(activeOption.data('selection')).transition({ //Untested
			animation: 'fade left',
			onComplete: function() {
				$($(this).data('selection')).transition('fade right');
				activeOption = $('.active.green.item');
			}
		});*/
	});

	activeOption.click();
})

function loadStockData() {
	var loadedStockData = {};
	function processStockData(data) {
		data.query.results.quote.forEach(function(val, i) {
			val.LastTradePriceOnly = parseFloat(val.LastTradePriceOnly).toFixed(2);
			stock_portfolio_view_model.stocksList()[i] = val;
			stock_portfolio_view_model.stocksList()[val.symbol] = i;
			if(typeof loadedStockData[val.symbol] !== 'undefined') {
				stock_portfolio_view_model.stocksList()[i].myOwnedStocks = ko.observableArray(loadedStockData[val.symbol]);
			}
			else {
				stock_portfolio_view_model.stocksList()[i].myOwnedStocks = ko.observableArray([]);
			}
			stock_portfolio_view_model.stocksList()[i].myOwnedStocks().active = ko.observable(false);
		});
	}
	function generateStockUrlFromList() {
		var stockUrl = 'http://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.quote where symbol in (';
		getStockList().forEach(function (val, i) {
			stockUrl += "'" + val + "',";
		});
		return stockUrl.substring(stockUrl, stockUrl.length - 1) + ')&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';
	}
	function loadStockDataIfUserLoggedIn() {
		if(home_view_model.loggedIn()) {
			home_view_model.ajaxRoute = 'loadStocks';

			$.ajax({
				type: "POST",
				dataType: "JSON",
				contentType: "application/json",
				url: "assign5/StockPortfolioController.php",
				data: ko.toJSON(home_view_model),
				success: function(data) {
					data = JSON.parse(data);
					stock_portfolio_view_model.myMoney(data.myMoney);
					loadedStockData = data.stocksList;
				},
				error: function(data) {
					if(data.status == 401) {
						home_view_model.clearCredentials();
						showMessage(false, 'Session Expired', 'Your session has expired, please log in again');
					}
				}
			});
		}
		else {
			stock_portfolio_view_model.myMoney(500);
		}
	}

	loadStockDataIfUserLoggedIn();

	$.ajax({
		type: 'GET',
		url: generateStockUrlFromList(),
		dataType: 'json'
	})
	.success(function(data) {
		processStockData(data);
	})
	.error(function() {
		processStockData(backupStockData);
	})
	.complete(function() {
		stock_portfolio_view_model.stocksList.valueHasMutated();
		if(!ko.dataFor($('.assignmentSpace')[0])) {
			ko.applyBindings(stock_portfolio_view_model, $('.assignmentSpace')[0]);
		}
		$('#loader').hide();
		$('.ui.green.vertical.segment').show();
		$('#buySell .ui.table').tablesorter();
	});
}

function updateStockChart() {
	$("#stockChart").CanvasJSChart({
      title:{
        text: "Stock Value (Current vs Yours)"    
      },
      animationEnabled: true,
      axisY: {
        title: "Stock Value"
      },
      legend: {
        verticalAlign: "bottom",
        horizontalAlign: "center"
      },
      theme: "theme2",
      data: [
      {        
        type: "column",
		toolTipContent: "{label}<br/><span style='\"'color: {color};'\"'><strong>{name}</strong></span>: ${y}",
        showInLegend: true,
        legendMarkerColor: "blue",
        name: "My Stocks' Value",
        dataPoints: stock_portfolio_view_model.chartStocksUser()
      },
      {
        type: "column",
		toolTipContent: "{label}<br/><span style='\"'color: {color};'\"'><strong>{name}</strong></span>: ${y}",
		axisYType: "secondary",
        showInLegend: true,
        legendMarkerColor: "red",
        name: "Market Stocks' Value",
        dataPoints: stock_portfolio_view_model.chartStocksMarket()
      }
      ]
    });
}