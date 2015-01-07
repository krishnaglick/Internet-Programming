function Submit() {
	if(firstName.value == "") {
		alert("Please enter in a first name!");
	}
	
	if(lastName.value == "") {
		alert("Please enter in a last name!");
	}
	if(	mon.checked == false &&
		tue.checked == false &&
		wed.checked == false &&
		thr.checked == false &&
		fri.checked == false &&
		sat.checked == false &&
		sun.checked == false) {
			alert("Please choose at least one day you can work!");
	}
	
	alert("Your data has been submitted!");
	Reset();
}

function Reset() {
	timeOfDay.selectedIndex = 0;
	mon.checked = false;
	tue.checked = false;
	wed.checked = false;
	thr.checked = false;
	fri.checked = false;
	sat.checked = false;
	sun.checked = false;
	sexMale.checked = true;
	sexFemale.checked = false;
	firstName.value = "";
	lastName.value = "";
}