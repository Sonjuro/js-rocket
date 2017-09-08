var timer = null;
var countdownNumber = 10;
var imageCount = 0;

var changeState = function(state) {
	document.body.className = 'body-state' + state;
	clear();
	
	if (state == 1){
		document.getElementById("rocket").style.backgroundImage = "url('img/rocket-state1.png')";
		document.getElementById("ground").style.backgroundImage = "url('img/ground.png')";
	}
	else if (state == 2){
		document.getElementById("rocket").style.backgroundImage = "url('img/rocket-state3.gif')";
		document.getElementById("ground").style.backgroundImage = "url('img/ground-stage2.gif#" + imageCount + "')";
		timer = setInterval(function() {
			countdownNumber--;
			document.getElementById('countdown').innerHTML = countdownNumber;
			if (countdownNumber <= 0) {
				clearInterval(timer);
				changeState(3);
			}
		}, 300);
	}
	else if (state == 3){
		var success = setTimeout(function() {
			var randomNumber = Math.round(Math.random()*10);
			
			// success
			if (randomNumber < 4) {
				changeState(4);
			}
			else {
				changeState(5); // failure
			}
		}, 2200);
		var changeSmoke = setTimeout(function() {
			document.getElementById("ground").style.backgroundImage = "url('img/ground.png')";
		}, 800);
	}
	else if (state == 5){
		document.getElementById("rocket").style.backgroundImage = "url('img/explosion.gif#" + imageCount + "')";
		document.getElementById("rocket").style.marginLeft = "-108px";
		document.getElementById("rocket").style.marginBottom = "-115px";
		var explode = setTimeout(function() {
			document.getElementById("rocket").style.backgroundImage = "url('img/fire.gif#" + imageCount + "')";
			document.getElementById("rocket").style.marginLeft = "-43px";
			document.getElementById("rocket").style.marginBottom = "-84px";
		}, 560);
	}
}

var clear = function() {
	clearInterval(timer);
	countdownNumber = 10;
	document.getElementById('countdown').innerHTML = countdownNumber;
	document.getElementById('rocket').className = 'rocket';
	imageCount++;
	console.log(imageCount);
}