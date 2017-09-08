setTimeout(function() {location.href="rocket.html"},1500);

var car = {
	make: 'VW',
	type: 'Polo',
	color: 'blue',
	fly: function() {alert("fly");}
};

var doCoolStuff = function() {
	var div = document.getElementById('cool');
	if (div.className == 'cool')
		div.className = 'cool red';
	else
		div.className = 'cool';
}