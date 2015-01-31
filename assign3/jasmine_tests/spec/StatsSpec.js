describe("Statistics Test Suite", function() {
	var TestDataSet1 = "37,13,56,25,2,37";
	var TestDataSet2 = "4,25,65,32";
	var TestDataSet3 = "1,2,99,100,2000,1000,45";
	
	it("should have a new stats view model", function() {
		var stats_view_model = new StatisticsViewModel();
		expect(stats_view_model).toBeDefined();
		expect(stats_view_model.count).toBe(0);
		expect(stats_view_model.sum()).toBe("N/A");
		expect(stats_view_model.variance()).toBe("N/A");
		expect(stats_view_model.numberList()).toBe("");
		expect(stats_view_model.mean()).toBe("N/A");
		expect(stats_view_model.median()).toBe("N/A");
		expect(stats_view_model.mode()).toBe("N/A");
		expect(stats_view_model.standardDeviation()).toBe("N/A");
		expect(stats_view_model.numberListSorted()).toBe("N/A");
		expect(stats_view_model.numberListParsed().length).toBe(0);
	});
	
	it("should calculate correct data for test set 1", function() {
		var stats_view_model = new StatisticsViewModel();
		stats_view_model.numberList(TestDataSet1);
		expect(stats_view_model.count).toBe(6);
		expect(stats_view_model.sum()).toEqual("170.00");
		expect(stats_view_model.variance()).toBe("309.22");
		expect(stats_view_model.mean()).toBe("28.33");
		expect(stats_view_model.median()).toBe("31.00");
		expect(stats_view_model.mode()).toBe("37.00");
		expect(stats_view_model.standardDeviation()).toBe("17.58");
		expect(stats_view_model.numberListSorted()).toEqual([2,13,25,37,37,56]);
	});
	
	it("should calculate correct data for test set 2", function() {
		var stats_view_model = new StatisticsViewModel();
		stats_view_model.numberList(TestDataSet2);
		expect(stats_view_model.count).toBe(4);
		expect(stats_view_model.sum()).toBe("126.00");
		expect(stats_view_model.variance()).toBe("480.25");
		expect(stats_view_model.mean()).toBe("31.50");
		expect(stats_view_model.median()).toBe("28.50");
		expect(stats_view_model.mode()).toBe("N/A");
		expect(stats_view_model.standardDeviation()).toBe("21.91");
		expect(stats_view_model.numberListSorted()).toEqual([4,25,32,65]);
	});
	
	it("should calculate correct data for test set 3", function() {
		var stats_view_model = new StatisticsViewModel();
		stats_view_model.numberList(TestDataSet3);
		expect(stats_view_model.count).toBe(7);
		expect(stats_view_model.sum()).toBe("3247.00");
		expect(stats_view_model.variance()).toBe("502240.98");
		expect(stats_view_model.mean()).toBe("463.86");
		expect(stats_view_model.median()).toBe("99.00");
		expect(stats_view_model.mode()).toBe("N/A");
		expect(stats_view_model.standardDeviation()).toBe("708.69");
		expect(stats_view_model.numberListSorted()).toEqual([1,2,45,99,100,1000,2000]);
	});
});