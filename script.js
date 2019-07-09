// default settings
const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 700;

// document elements
const iterationsElement = document.getElementById("iterations");
const xPlaneElement = document.getElementById("xplane");
const yPlaneElement = document.getElementById("yplane");
const magnificationElement = document.getElementById("magnificationFactor");
const hueElement = document.getElementById("hue");

// create object for mandelbrot properties
const mandelbrotImage = {};
setMandelbrotImageSettings();

// create canvas
const myCanvas = document.createElement("canvas");
myCanvas.width = CANVAS_WIDTH;
myCanvas.height = CANVAS_HEIGHT;
myCanvas.addEventListener("mousedown", function(e) {
  getCursorPosition(myCanvas, e);
});
document.querySelector(".content").appendChild(myCanvas);
const ctx = myCanvas.getContext("2d");

function setMandelbrotImageSettings() {
  mandelbrotImage.MAX_ITERATIONS = iterationsElement.value;
  mandelbrotImage.magnificationFactor = magnificationElement.value;
  mandelbrotImage.panX = parseFloat(xPlaneElement.value);
  mandelbrotImage.panY = parseFloat(yPlaneElement.value);
  mandelbrotImage.hue = hueElement.value;
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

function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect(); //  size of an element and its position relative to the viewport
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  console.log("x: " + x + " y: " + y);
  mandelbrotImage.magnificationFactor =
    parseInt(mandelbrotImage.magnificationFactor) + 50;
  setUIElementsValue(x, y, mandelbrotImage.magnificationFactor);
  drawCanvas();
}

function setUIElementsValue(x, y, magnification) {
  const xNormalized = normalize(x, parseFloat(xPlaneElement.value));
  const yNormalized = normalize(y, parseFloat(yPlaneElement.value));
  xPlaneElement.value = xNormalized;
  mandelbrotImage.panX = xNormalized;
  yPlaneElement.value = yNormalized;
  mandelbrotImage.panY = yNormalized;
  magnificationElement.value = magnification;
}

function normalize(coordinate, value) {
  let newValue;
  const ratio = coordinate / CANVAS_WIDTH;
  if (ratio < 0.5) {
    newValue = value + 0.1;
  } else {
    newValue = value - 0.1;
  }

  return newValue;
}

function redrawCanvas() {
  setMandelbrotImageSettings();
  drawCanvas();
}
