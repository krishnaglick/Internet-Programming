function JobApplicationViewModel() {
	this.firstName = ko.observable('');
	this.lastName = ko.observable('');

	this.gender = ko.observable(false);

	this.mon = ko.observable(false);
	this.tue = ko.observable(false);
	this.wed = ko.observable(false);
	this.thr = ko.observable(false);
	this.fri = ko.observable(false);
	this.sat = ko.observable(false);
	this.sun = ko.observable(false);

	this.workDays = ko.computed(function() {
		var self = this;
		
		var numDaysAvail = 0;

		if(self.mon()) { numDaysAvail++; }
		if(self.tue()) { numDaysAvail++; }
		if(self.wed()) { numDaysAvail++; }
		if(self.thr()) { numDaysAvail++; }
		if(self.fri()) { numDaysAvail++; }
		if(self.sat()) { numDaysAvail++; }
		if(self.sun()) { numDaysAvail++; }

		return numDaysAvail;
	}, this);

	this.timeOfDay = ko.observableArray([
		"Morning",
		"Afternoon",
		"Night"
	]);
	this.prefTimeOfDay = ko.observable('Morning');

	this.alertTitle = ko.observable('');
	this.alertMessage = ko.observable('');
}

JobApplicationViewModel.prototype.submit = function() {
	var self = this;
	var error = '';

	if(self.firstName() === '') {
		error = "Please enter in a first name!";
	}

	if(self.lastName() === '') {
		error += error === '' ? "Please enter in a last name!" : "<br>Please enter in a last name!";
	}

	if(self.workDays() === 0){
		error += error === '' ? "Please choose at least one day you can work!" : "<br>Please choose at least one day you can work!";
	}

	if(error != '') {
		self.alertTitle('Please fill in required field(s)');
		self.alertMessage(error);
		$('#jobAppMessage').show();
		return;
	}
	else {
		self.alertTitle('Application Submitted');
		self.alertMessage('Your application has been submitted');
		$('#jobAppMessage').show();
		self.reset();
	}
}

JobApplicationViewModel.prototype.reset = function() {
	this.firstName('');
	this.lastName('');

	this.gender(false);

	this.mon(false);
	this.tue(false);
	this.wed(false);
	this.thr(false);
	this.fri(false);
	this.sat(false);
	this.sun(false);

	this.prefTimeOfDay('Morning');
}