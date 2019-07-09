// default settings
const mandelbrotImage = {};
setMandelbrotImageSettings();
const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 700;

let myCanvas = document.createElement("canvas");
myCanvas.width = CANVAS_WIDTH;
myCanvas.height = CANVAS_HEIGHT;
document.querySelector(".content").appendChild(myCanvas);
const ctx = myCanvas.getContext("2d");

function setMandelbrotImageSettings() {
  mandelbrotImage.MAX_ITERATIONS = document.getElementById("iterations").value;
  mandelbrotImage.magnificationFactor = document.getElementById(
    "magnificationFactor"
  ).value;
  mandelbrotImage.panX = document.getElementById("xplane").value;
  mandelbrotImage.panY = document.getElementById("yplane").value;
  mandelbrotImage.hue = document.getElementById("hue").value;
}

function drawCanvas() {
  for (let x = 0; x < myCanvas.width; x++) {
    for (let y = 0; y < myCanvas.height; y++) {
      let belongsToSet = checkIfBelongsToMandelbrotSet(
        x / mandelbrotImage.magnificationFactor - mandelbrotImage.panX,
        y / mandelbrotImage.magnificationFactor - mandelbrotImage.panY
      );
      if (belongsToSet == 0) {
        ctx.fillStyle = "#000";
        ctx.fillRect(x, y, 1, 1); // Draw a black pixel
      } else {
        ctx.fillStyle = `hsl(${mandelbrotImage.hue}, 80%, ${belongsToSet}%)`; // https://www.w3schools.com/cssref/func_hsl.asp
        ctx.fillRect(x, y, 1, 1); // Draw a colorful pixel
      }
    }
  }
}

drawCanvas();

function checkIfBelongsToMandelbrotSet(x, y) {
  let realComponentOfResult = x;
  let imaginaryComponentOfResult = y;

  for (
    let iteration = 0;
    iteration < mandelbrotImage.MAX_ITERATIONS;
    iteration++
  ) {
    // Calculate the real and imaginary components of the result
    // separately
    let tempRealComponent =
      realComponentOfResult * realComponentOfResult -
      imaginaryComponentOfResult * imaginaryComponentOfResult +
      x;

    let tempImaginaryComponent =
      2 * realComponentOfResult * imaginaryComponentOfResult + y;

    realComponentOfResult = tempRealComponent;
    imaginaryComponentOfResult = tempImaginaryComponent;

    // not in Mandelbrot set
    if (realComponentOfResult * imaginaryComponentOfResult > 5) {
      return (iteration / mandelbrotImage.MAX_ITERATIONS) * 100;
    }
  }
  return 0; // in Mandelbrot set
}

function redrawCanvas() {
  setMandelbrotImageSettings();
  drawCanvas();
}
