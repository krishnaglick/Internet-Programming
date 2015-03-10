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

	stock_portfolio_view_model.chartStocks.subscribe(function() {
		$("#stockChart").CanvasJSChart({
	      title:{
	        text: "Stocks Cost (Current vs Yours)"    
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
	      data: [{        
		        type: "column",  
		        showInLegend: true, 
		        legendMarkerColor: "grey",
		        legendText: "Stock",
		        dataPoints: stock_portfolio_view_model.chartStocks()
	      }]
	    });
	});
})

function loadStockData() {
	var stockUrl = 'http://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.quote where symbol in (';
	getStockList().forEach(function (val, i) {
		stockUrl += "'" + val + "',";
	});
	stockUrl = stockUrl.substring(stockUrl, stockUrl.length - 1) + ')&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';
	$.ajax({
		type: 'GET',
		url: stockUrl,
		dataType: 'json'
	})
	.success(function(data) {
		stock_portfolio_view_model.stocksList($.map(data.query.results.quote, function(val, i) {
			val.LastTradePriceOnly = parseFloat(val.LastTradePriceOnly).toFixed(2);

			//Need to add support for loading old user data if logged in
			if(typeof stock_portfolio_view_model.myStocks()[val.Symbol] == 'undefined') {
				stock_portfolio_view_model.myStocks()[val.Symbol] = [];
			}
			val.Amount = ko.observable(stock_portfolio_view_model.myStocks()[val.Symbol].length);
			
			val.Index = i;
			return val;
		}));
	})
	.error(function() {
		stock_portfolio_view_model.stocksList($.map(backupStockData, function(val, i) {
			val.LastTradePriceOnly = parseFloat(val.LastTradePriceOnly).toFixed(2);

			//Need to add support for loading old user data if logged in
			if(typeof stock_portfolio_view_model.myStocks()[val.Symbol] == 'undefined') {
				stock_portfolio_view_model.myStocks()[val.Symbol] = [];
			}
			val.Amount = ko.observable(stock_portfolio_view_model.myStocks()[val.Symbol].length);
			
			val.Index = i;
			return val;
		}));
	})
	.complete(function() {
		ko.applyBindings(stock_portfolio_view_model, $('.assignmentSpace')[0]);
		$('#loader').hide();
		$('.ui.green.vertical.segment').show();
	});
}

function updateChartOnChange(key) {
	//I am a bad, bad man
	$('div.fluid.ui.toggle.button > span:contains(' + key + ')').click();
	$('div.fluid.ui.toggle.button > span:contains(' + key + ')').click();
}