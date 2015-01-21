$(function() {
	var canvas = document.getElementById('beautifulCanvas');
	var context = canvas.getContext('2d');

	var newRect = function() {
		return {
			x: 0,
			y: 75,
			width: 100,
			height: 50
		}
	};
	
	var black = new animateRect(newRect(), canvas, context, (new Date()).getTime(), "black");
	black.animation = setTimeout(black.animate, 1000);
	
	var grey = new animateRect(newRect(), canvas, context, (new Date()).getTime(), "grey");
	//grey.animation = setTimeout(grey.animate, 1000);
	window.anim(grey.animate);
	
	//var white = new animateRect(newRect(), canvas, context, (new Date()).getTime(), "white");
	//white.animation = setTimeout(white.animate, 1000);
})

var animateRect = function(myRectangle, canvas, context, startTime, color) {
	var rect = myRectangle;
	var canvas = canvas;
	var context = context;
	var startTime = startTime;
	var color = color;
	
	this.animate = function() {
		time = (new Date()).getTime() - startTime;
		console.log(color);
		linearSpeed = 100;
		// pixels / second
		newX = linearSpeed * time / 1000;
		
		if(newX < canvas.width - rect.width - rect.borderWidth / 2) {
			rect.x = newX;
		}

		// clear
		context.clearRect(0, 0, canvas.width, canvas.height);

		context.beginPath();
		context.rect(rect.x, rect.y, rect.width, rect.height);
		context.fillStyle = color;
		context.fill();
	};
};

window.anim = (function(callback) {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	function(callback) {
		console.log("a");
		window.setTimeout(callback, 1000 / 60);
	};
})();