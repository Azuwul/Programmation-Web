var nbrRepetion = 50;
for(var i=0; i<nbrRepetion; i++){
	var list = "<tr><td> " + faker.name.firstName() + "</td><td>" + faker.name.lastName() + "</td><td>" + faker.internet.email() + "</td><td>" + (Math.floor(Math.random() * (67 - 19 + 1) ) + 19) + "</td><td>" + faker.address.streetAddress() + "</td><td>" + faker.name.jobTitle() + "</td><td>" + faker.phone.phoneNumberFormat() + "</td></tr>";
	var t = document.getElementById("tst");
	t.innerHTML += list;
}