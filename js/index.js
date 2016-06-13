var canvas = document.getElementById("quadratic");
var ctx = canvas.getContext("2d");

var scaleFactor = 50;

//move origin to center, make y ascend up
//window: -5 to 5
ctx.translate(canvas.width / 2, canvas.height / 2);
ctx.scale(scaleFactor, -scaleFactor);

var X_STEPS = 75;
var X_STEP = 10 / X_STEPS;
var XMIN = -5, XMAX = 5;
var XRANGE = XMAX - XMIN;

//define functions and their derivatives
//curve is 'parametrization' (x, f(x))
var f = function f(x) {
	return 1/20 * (Math.pow(x,4) + Math.pow(x,3) - 13*Math.pow(x,2) - x);
};

var df = function df(x) {
	return 1/20 * (4*Math.pow(x,3) + 3*Math.pow(x,2) - 26*x - 1);
};

var d2f = function d2f(x) {
	return 1/20 * (12*Math.pow(x,2) + 6*x -26);
};

//calculate curvature at a point
var curvature = function curvature(x) {
	return d2f(x) / Math.pow(1 + Math.pow(df(x),2), 1.5);
};

//variables representing current values, non-static
var cur_x = 0;
var cur_curv = curvature(cur_x);

function draw() {
	$("#cur_curv").text(cur_curv); //display current curvature
	drawAxes();
	plotF();
	drawPoint();
	drawOsculating();
}

function clear() {
	ctx.clearRect(XMIN, XMIN, XRANGE, XRANGE);
}

function drawAxes() {
	ctx.strokeStyle = "rgba(0,0,0,.5)";
	ctx.lineWidth = 1 / scaleFactor;
	ctx.beginPath();
	ctx.moveTo(XMIN,0);
	ctx.lineTo(XMAX,0);
	ctx.moveTo(0,XMIN); //y range is same as x range
	ctx.lineTo(0,XMAX);
	ctx.stroke();
	ctx.closePath();
}

function drawPoint() {
	var y = f(cur_x);
	ctx.fillStyle = "#FF0000";
	ctx.beginPath();
	ctx.arc(cur_x, y, .1, 0, 2*Math.PI, false);
	ctx.fill();
	ctx.closePath();
}

function plotF() {
	ctx.strokeStyle = "rgba(0,0,0,1)";
	ctx.beginPath();
	ctx.moveTo(XMIN, f(XMIN));
	for(var x = XMIN; x <= XMAX; x += X_STEP) {
		ctx.lineTo(x, f(x));
	}
	ctx.stroke();
	ctx.closePath();
}

//for explanation of functions for center and radius of circle, see
//http://mathworld.wolfram.com/OsculatingCircle.html
function drawOsculating() {
	var radius = 1 / Math.abs(cur_curv);
	//cx, cy use the fact that x(t) = t in this parameterization
	var cx = cur_x - (1 + Math.pow(df(cur_x),2))*df(cur_x)/d2f(cur_x); 
	var cy = f(cur_x) + (1 + Math.pow(df(cur_x),2))/d2f(cur_x);
	ctx.strokeStyle = "#0000FF";
	ctx.beginPath();
	ctx.arc(cx, cy, radius, 0, 2*Math.PI, false);
	ctx.stroke();
	ctx.closePath();
}

draw();

$("#xslide").slider({
	min: XMIN,
	max: XMAX,
	value: (XMAX + XMIN) / 2,
	step: X_STEP,
	animate: true,
	slide: function(event, ui) {
		cur_x = ui.value;
		cur_curv = curvature(cur_x);
		clear();
		draw();
	}
});

/* how does this work? */
$(document).ready(function () {
    var canvas = $("#myCanvas").get(0);
    var context = canvas.getContext("2d");

    function renderGrid(gridPixelSize, color)
    {
        context.save();
        context.lineWidth = 0.5;
        context.strokeStyle = color;

        // horizontal grid lines
        for(var i = 0; i <= canvas.height; i = i + gridPixelSize)
        {
            context.beginPath();
            context.moveTo(0, i);
            context.lineTo(canvas.width, i);
            context.closePath();
            context.stroke();
        }

        // vertical grid lines
        for(var j = 0; j <= canvas.width; j = j + gridPixelSize)
        {
            context.beginPath();
            context.moveTo(j, 0);
            context.lineTo(j, canvas.height);
            context.closePath();
            context.stroke();
        }

        context.restore();
    }

    renderGrid(50, "lightblue");
	
});

var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
ctx.beginPath();
//ctx.scale(50,10); 
ctx.moveTo(250,250);
//ctx.lineTo(10,70);
ctx.stroke();
// ctx.scale(50,10); 
