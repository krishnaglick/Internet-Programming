StatisticsViewModel = function() {
	var self = this;
	this.count = 0;

	this.numberList = ko.observable("").extend({
		rateLimit: 500
	});
	
	this.numberListParsed = ko.computed(function() {
		var numberSet = [];
		self.numberList().split(',').forEach(function(val) {
			val = parseFloat(val);
			if(!isNaN(val))
				numberSet.push(val);
		});
		
		return numberSet;
	});
	
	this.mean = ko.computed(function() {
		var total = 0;
		var count = 0;
		
		self.numberListParsed().forEach(function(val) {
			total += val;
			count++;
		});
		self.count = count;
		var mean = total/self.count;
		
		if(mean == 0 || isNaN(mean))
			return "";
			
		return mean.toFixed(2);
	});
	
	this.sum = ko.computed(function() {
		var total = 0;
		
		self.numberListParsed().forEach(function(val) {
			total += val;
		});
		
		if(total == 0 || isNaN(total))
			return "";
			
		return total;
	});
	
	this.variance = ko.computed(function() {
		var variance = 0;
		var i = 0;
		self.numberListParsed().forEach(function(val) {
			variance += Math.pow(self.mean()-val, 2)
		});
		
		if(variance == 0)
			return "";
		
		return (variance / self.count).toFixed(2);
	});
	
	this.numberListSorted = ko.computed(function() {
		if(self.numberListParsed().length == 0)
			return "";
			
		return self.numberListParsed().sort(function(a, b) {
			return a - b;
		});
	});
	
	this.mode = ko.computed(function() {
		var modeSet = {0: 0};
		
		self.numberListParsed().forEach(function(val) {
			modeSet[val] = typeof modeSet[val] === 'undefined' ? 1 : modeSet[val] + 1;
		});
		
		var biggestKey = 0;
		Object.keys(modeSet).forEach(function(key) {
			biggestKey = modeSet[key] > modeSet[biggestKey] ? key : biggestKey;
		});
		
		if(biggestKey == 0)
			return "";
		
		return biggestKey;
	});
	
	
	this.median = ko.computed(function() {
		if(self.numberListParsed().length == 0)
			return "";
		
		return self.numberListSorted()[Math.floor(self.count / 2)];
	});
	
	this.standardDeviation = ko.computed(function() {
		var stdDev = Math.sqrt(self.variance());
		return stdDev == "" ? "" : stdDev.toFixed(2);
	});
}