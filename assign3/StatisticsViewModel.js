StatisticsViewModel = function() {
	var that = this;
	this.count = 0;
	
	this.numberList = ko.observable("");
	
	this.numberListParsed = ko.computed(function() {
		var numberSet = [];
		that.numberList().split(',').forEach(function(val) {
			val = parseFloat(val);
			if(!isNaN(val))
				numberSet.push(val);
		});
		
		return numberSet;
	});
	
	this.mean = ko.computed(function() {
		var total = 0;
		var count = 0;
		
		that.numberListParsed().forEach(function(val) {
			total += val;
			count++;
		});
		that.count = count;
		var mean = total/that.count;
		
		if(mean == 0 || isNaN(mean))
			return "N/A";
			
		return mean.toFixed(2);
	});
	
	this.sum = ko.computed(function() {
		var total = 0;
		
		that.numberListParsed().forEach(function(val) {
			total += val;
		});
		
		if(total == 0 || isNaN(total))
			return "N/A";
			
		return total.toFixed(2);
	});
	
	this.variance = ko.computed(function() {
		var variance = 0;
		var i = 0;
		that.numberListParsed().forEach(function(val) {
			variance += Math.pow(that.mean()-val, 2)
		});
		
		if(variance == 0)
			return "N/A";
		
		return (variance / that.count).toFixed(2);
	});
	
	this.numberListSorted = ko.computed(function() {
		if(that.numberListParsed().length == 0)
			return "N/A";
			
		return that.numberListParsed().sort(function(a, b) {
			return a - b;
		});
	});
	
	this.mode = ko.computed(function() {
		var modeSet = {0: 0};
		
		that.numberListParsed().forEach(function(val) {
			modeSet[val] = typeof modeSet[val] === 'undefined' ? 1 : modeSet[val] + 1;
		});
		
		var biggestKey = 0;
		Object.keys(modeSet).forEach(function(key) {
			biggestKey = modeSet[key] > modeSet[biggestKey] && modeSet[key] > 1 ? key : biggestKey;
		});
		
		if(biggestKey == 0)
			return "N/A";
		
		return parseFloat(biggestKey).toFixed(2);
	});
	
	
	this.median = ko.computed(function() {
		if(that.numberListParsed().length == 0)
			return "N/A";
			
		var median;
		if(that.count % 2 == 0) {
			var medIndex = that.count / 2;
			median = (that.numberListSorted()[medIndex] + that.numberListSorted()[medIndex - 1]) / 2;
		}
		else {
			median = that.numberListSorted()[Math.floor(that.count / 2)];
		}
		
		return median.toFixed(2);
	});
	
	this.standardDeviation = ko.computed(function() {
		var stdDev = Math.sqrt(that.variance());
		return isNaN(stdDev) ? "N/A" : stdDev.toFixed(2);
	});
}