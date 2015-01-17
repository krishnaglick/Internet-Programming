function Submit() {
	var errorMessage = "";
	if(firstName.value == "") {
		errorMessage = "Please enter in a first name!";
	}
	
	if(lastName.value == "") {
		if(errorMessage != "") {
			errorMessage += "\nPlease enter in a last name!";
		}
		else {
			errorMessage = "Please enter in a last name!";
		}
	}
	if(	mon.checked == false &&
		tue.checked == false &&
		wed.checked == false &&
		thr.checked == false &&
		fri.checked == false &&
		sat.checked == false &&
		sun.checked == false) {
			if(errorMessage != "") {
				errorMessage += "\nPlease choose at least one day you can work!";
			}
			else {
				errorMessage = "Please choose at least one day you can work!";
			}
	}
	
	if(errorMessage != "") {
		alert(errorMessage);
		return;
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