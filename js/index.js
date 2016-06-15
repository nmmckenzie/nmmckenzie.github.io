  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');
  var scaleFactor = 20;

  var X_STEPS = 100;
  var X_STEP = 10 / X_STEPS;
  var XMIN = -30,
    XMAX = 30;
  var XRANGE = XMAX - XMIN;

  function renderGrid(gridPixelSize) {
    ctx.save();
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = 'lightblue';  

    // horizontal grid lines
    for (var i = 0; i <= canvas.height; i = i + gridPixelSize) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.closePath();
      ctx.stroke();
    }

    // vertical grid lines
    for (var j = 0; j <= canvas.width; j = j + gridPixelSize) {
      ctx.beginPath();
      ctx.moveTo(j, 0);
      ctx.lineTo(j, canvas.height);
      ctx.closePath();
      ctx.stroke();
    }
    ctx.restore();
  }

  function clears() {
    ctx.save(); //saves the grid lines
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(XMIN, XMIN, XRANGE, XRANGE);
  }

  function clearsAll() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function drawAxes() {
    ctx.save()
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(scaleFactor, -scaleFactor);
    ctx.strokeStyle = "rgba(0,0,0,.5)";
    ctx.lineWidth = 1 / scaleFactor;
    ctx.beginPath();
    ctx.moveTo(XMIN, 0);
    ctx.lineTo(XMAX, 0);
    ctx.moveTo(0, XMIN); 
    ctx.lineTo(0, XMAX);
    ctx.stroke();
    ctx.closePath();
  }

  function resetGraph() {
    clears();
    renderGrid(20);
    drawAxes();

  }

  function drawLine(slope, intercept, color) {
    var m = parseInt(slope);
    var b = parseInt(intercept);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2 / scaleFactor;
    ctx.beginPath();
    ctx.moveTo(0, b);
    ctx.lineTo(XMIN, ((m * XMIN) + b));
    ctx.lineTo(XMAX, ((m * XMAX) + b));
    ctx.stroke();
    ctx.closePath();
  }

  function drawCurve(f, color) {
    var a = parseInt(aval);
    var b = parseInt(bval);
    var c = parseInt(cval);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2 / scaleFactor;
    ctx.beginPath();
    ctx.moveTo(XMIN, f(XMIN));
    for (var x = XMIN; x <= XMAX; x += X_STEP) {
      ctx.lineTo(x, f(x));
    }
    ctx.stroke();
    ctx.closePath();
  }

  $(document).ready(function() {

    $('#drawCurve').click(function() {
	  var av = parseInt(document.getElementById("aval").value)+0 ;
      var bv = +document.getElementById("bval").value;
      var cv = +document.getElementById("cval").value;
      var pretty = document.getElementById("linecolor").value;
	  canvas.style.display="block";
      resetGraph();
      var f = function f(x) {
        return (av * Math.pow(x, 2) + bv * x + cv);
      };
      drawCurve(f, pretty);
    });
    $('#clearGraph').click(function() {
      resetGraph();
      clearsAll();
    });
  });