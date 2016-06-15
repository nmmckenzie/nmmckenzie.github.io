  var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
var scaleFactor = 25;


//move origin to center, make y ascend up
//window: -5 to 5
//ctx.translate(canvas.width / 2, canvas.height / 2);
//ctx.scale(scaleFactor, -scaleFactor);


var X_STEPS = 100;
var X_STEP = 10 / X_STEPS;
var XMIN = -10, XMAX = 10;
var XRANGE = XMAX - XMIN;

   function renderGrid(gridPixelSize)    {
        ctx.save();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = 'lightblue'; //color;

        // horizontal grid lines
        for(var i = 0; i <= canvas.height; i = i + gridPixelSize)
        {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(canvas.width, i);
            ctx.closePath();
            ctx.stroke();
        }

        // vertical grid lines
        for(var j = 0; j <= canvas.width; j = j + gridPixelSize)
        {
            ctx.beginPath();
            ctx.moveTo(j, 0);
            ctx.lineTo(j, canvas.height);
            ctx.closePath();
            ctx.stroke();
        }
//ctx.translate(-20,-20);
        ctx.restore();
    }

	


function clears() {
	ctx.save();
	ctx.setTransform(1,0,0,1,0,0);
	ctx.clearRect(XMIN, XMIN, XRANGE, XRANGE);
	//ctx.restore();
}

function clearsAll() {
	ctx.setTransform(1, 0, 0, 1, 0, 0);
 ctx.clearRect(0, 0, canvas.width, canvas.height);
 //$('.equation').remove();
 
}
function drawAxes() {
	ctx.save()
	ctx.translate(canvas.width / 2, canvas.height / 2);
ctx.scale(scaleFactor, -scaleFactor);
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

function resetGraph() {
	clears();
	renderGrid(25);
	drawAxes();

}


	
function drawLine(slope,intercept,color) {
 
  //document.write('slope');
  var m = parseInt(slope);
  var b = parseInt(intercept);
  ctx.strokeStyle = color;
  	ctx.lineWidth = 2 / scaleFactor;
  ctx.beginPath();
  ctx.moveTo(0,b);
  ctx.lineTo(XMIN,((m*XMIN)+b));
  ctx.lineTo(XMAX,((m*XMAX)+b));
  ctx.stroke();
}


	

$(document).ready(function() {
	$('#drawLine').click(function() {
		var slp = +document.getElementById("slope").value;
		var icept = +document.getElementById("intercept").value;
		var pretty = document.getElementById("linecolor").value;
	//	var eqn = $('<p> y = '+slp+'x + '+icept+'</p>');
		//$('.equation').after(eqn);
		//alert($('slp'));
		resetGraph();
		
	drawLine(slp,icept,pretty);
	
	
	});
		$('#clearGraph').click(function() {
		resetGraph();
		clearsAll();
	});
});