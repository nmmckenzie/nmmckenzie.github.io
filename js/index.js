

/*var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
ctx.beginPath();
ctx.moveTo(3,5);
ctx.lineTo(10,70);
ctx.stroke();
ctx.scale(50,10); */
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
