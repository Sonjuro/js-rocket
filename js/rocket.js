var timer = null;
var countdownNumber = 10;

var changeState = function(state) {
	document.body.className = 'body-state' + state;
	clear();
	
	if (state == 1){
		document.getElementById("rocket").style.backgroundImage = "url('img/rocket-state1.png')";
		document.getElementById("ground").style.backgroundImage = "url('img/ground.png')";
	}
	else if (state == 2){
		document.getElementById("rocket").style.backgroundImage = "url('img/rocket-state3.gif')";
		var randomNumber = Math.round(Math.random()*10);
		document.getElementById("ground").style.backgroundImage = "url('img/ground-stage2.gif#" + randomNumber + "')";
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
			if (randomNumber < 1) {
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
		var randomNumber = Math.round(Math.random()*10);
		document.getElementById("rocket").style.backgroundImage = "url('img/explosion.gif#" + randomNumber + "')";
		document.getElementById("rocket").style.marginLeft = "-108px";
		document.getElementById("rocket").style.marginBottom = "-115px";
		var explode = setTimeout(function() {
			var randomNumber2 = Math.round(Math.random()*10);
			document.getElementById("rocket").style.backgroundImage = "url('img/fire.gif#" + randomNumber2 + "')";
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
}

var resetHelperImages = {};

function restartAnimation(elem) {
  elem = $(elem);
  for (var i = 0; i < elem.length; i++) {
    var element = elem[i];
    // code part from: http://stackoverflow.com/a/14013171/1520422
    var style = element.currentStyle || window.getComputedStyle(element, false);
    // var bgImg = style.backgroundImage.slice(4, -1).replace(/"/g, '');
    var bgImg = style.backgroundImage.match(/url\(([^\)]+)\)/)[1].replace(/"/g, '');
    // edit: Suggestion from user71738 to handle background-images with additional settings

    var helper = resetHelperImages[bgImg]; // we cache our image instances
    if (!helper) {
      helper = $('<img>')
        .attr('src', bgImg)
        .css({
          position: 'absolute',
          left: '-5000px'
        }) // make it invisible, but still force the browser to render / load it
        .appendTo('body')[0];
      resetHelperImages[bgImg] = helper;
      setTimeout(function() {
        helper.src = bgImg;
      }, 10);
      // the first call does not seem to work immediately (like the rest, when called later)
      // i tried different delays: 0 & 1 don't work. With 10 or 100 it was ok.
      // But maybe it depends on the image download time.
    } else {
      // code part from: http://stackoverflow.com/a/21012986/1520422
      helper.src = bgImg;
    }
  }
  // force repaint - otherwise it has weird artefacts (in chrome at least)
  // code part from: http://stackoverflow.com/a/29946331/1520422
  elem.css("opacity", .99);
  setTimeout(function() {
    elem.css("opacity", 1);
  }, 20);
}