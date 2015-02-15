$(function() {
	window.canvas = new fabric.Canvas('beautifulCanvas');
	var technicolor = "Technicolor";
	var colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
	
	var q = 3;
	var z = 200;
	for(var i = 0; i < technicolor.length; i++) {
		canvas.add(
			new fabric.Text(technicolor[i], {
				left: z,
				top: 140,
				fill: colors[q++]
			})
		);
		q = q > colors.length-1 ? 0 : q;
		z += 20;
	}
	
	function newRect(color) {
		return new fabric.Rect({
			left: 0,
			top: 0,
			width: 50,
			height: 400,
			fill: color
		});
	};
	
	i = 0;
	window.intervalObjects.movingRectanglesOne = setInterval(function() {
		rectMoving(canvas, newRect(colors[i++]), fabric.util.ease.easeOutExpo, 2500);
		i = i > colors.length ? 0 : i;
	}, 1000);
	
	//Commented because it made things laggy
	/*q = 5;
	setInterval(function() {
		rectMoving(canvas, newRect(colors[q++]), fabric.util.ease.easeInExpo, 3000);
		q = q > colors.length ? 0 : q;
	}, 1000);*/
});

function rectMoving(canvas, rekt, easing, duration) {
	canvas.add(rekt);
	rekt.animate('left', '600', {
		onChange: canvas.renderAll.bind(canvas),
		duration: duration,
		easing: easing
	});
	setTimeout(function() { canvas.remove(rekt); }, duration);
}