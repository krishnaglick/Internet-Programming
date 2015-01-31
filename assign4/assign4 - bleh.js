$(function() {
	//Limitation of a single object on the canvas at a time. Bleh. Going with a library.
	var canvas = document.getElementById('beautifulCanvas');
	var context = canvas.getContext('2d');

	var newRect = function() {
		return {
			x: 0,
			y: 75,
			width: 100,
			height: 50
		};
	};
	
	var black = new AnimatedRect(newRect(), canvas, context, (new Date()).getTime(), "black");	
	setTimeout(function() {
		var grey = new AnimatedRect(newRect(), canvas, context, (new Date()).getTime(), "grey");
	}, 1000);
	//var white = new AnimatedRect(newRect(), canvas, context, (new Date()).getTime()-6000, "white");
});

function AnimatedRect(myRectangle, canvas, context, startTime, color) {
	this.rect = myRectangle;
	this.canvas = canvas;
	this.context = context;
	this.startTime = startTime;
	this.color = color;
	window.anim(this.animate.bind(this));
}

AnimatedRect.prototype.animate = function() {
	var self = this;
	var time = (new Date()).getTime() - self.startTime;
	var linearSpeed = 100;
	// pixels / second
	var newX = linearSpeed * time / 1000;
	if(newX < self.canvas.width - self.rect.width / 2) {
		self.rect.x = newX;
	}

	// clear
	self.context.clearRect(0, 0, self.canvas.width, self.canvas.height);
	self.draw();
	window.anim(self.animate.bind(self));
};

AnimatedRect.prototype.draw = function() {
	var rect = this.rect;
	this.context.beginPath();
	this.context.rect(rect.x, rect.y, rect.width, rect.height);
	this.context.fillStyle = this.color;
	this.context.fill();
};

window.anim = (function(callback) {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.	mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || 
	function(callback) {
		window.setTimeout(callback, 1000 / 60);
	};
})();