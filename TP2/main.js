var nbrRepetion = 50;
for(var i=0; i<nbrRepetion; i++){
	var list = "<tr><td> " + faker.name.firstName() + " </td><td> Last Name </td><td> E-mail </td><td> Age </td><td> Address </td><td> City </td><td> Country </td><td> Jobs </td><td> Phone Number </td></tr>";
	var t = document.getElementById("tst");
	t.innerHTML += list;
}