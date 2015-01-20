describe("Statistics Test 1", function() {
	var stats_view_model = new StatisticsViewModel();
	
	it("should have a new stats view model", function() {
		expect(stats_view_model).toBeDefined();
		expect(stats_view_model.count).toBe(0);
		expect(stats_view_model.sum()).toBe("");
		expect(stats_view_model.variance()).toBe("");
		expect(stats_view_model.numberList()).toBe("");
		expect(stats_view_model.mean()).toBe("");
		expect(stats_view_model.median()).toBe("");
		expect(stats_view_model.mode()).toBe("");
		expect(stats_view_model.standardDeviation()).toBe("");
		expect(stats_view_model.numberListSorted()).toBe("");
		expect(stats_view_model.numberListParsed().length).toBe(0);
	});
});

describe("Statistics Test 2", function() {
	var stats_view_model = new StatisticsViewModel();
	var TestDataSet1 = "13,56,25,2,37,37";
	
	stats_view_model.numberList(TestDataSet1);
	it("should calculate correct data for test set 1", function() {
		expect(stats_view_model.count).toBe(6);
		expect(stats_view_model.sum()).toEqual("170.00");
		expect(stats_view_model.variance()).toBe("309.22");
		expect(stats_view_model.mean()).toBe("28.33");
		expect(stats_view_model.median()).toBe(31);
		expect(stats_view_model.mode()).toBe("37.00");
		expect(stats_view_model.standardDeviation()).toBe("17.58");
		expect(stats_view_model.numberListSorted()).toEqual([2,13,25,37,37,56]);
	});
});

describe("Statistics Test 3", function() {
	var stats_view_model = new StatisticsViewModel();
	var TestDataSet2 = "4,25,65,32";
	
	stats_view_model.numberList(TestDataSet2);
	it("should calculate correct data for test set 2", function() {
		expect(stats_view_model.count).toBe(4);
		expect(stats_view_model.sum()).toBe("126.00");
		expect(stats_view_model.variance()).toBe("480.25");
		expect(stats_view_model.mean()).toBe("31.50");
		expect(stats_view_model.median()).toBe(28.5);
		expect(stats_view_model.mode()).toBe("");
		expect(stats_view_model.standardDeviation()).toBe("21.91");
		expect(stats_view_model.numberListSorted()).toEqual([4,25,32,65]);
	});
});