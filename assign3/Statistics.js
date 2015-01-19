var stats_view_model;
$(function() {
	stats_view_model = new StatisticsViewModel();
	
	ko.applyBindings(stats_view_model, $('grid')[0]);
})