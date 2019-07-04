const MAX_ITERATIONS = 100;
const magnificationFactor = 300;
const panX = 2;
const panY = 1.5;

function createMandelbrot(width, height) {
  // Create Canvas
  let myCanvas = document.createElement("canvas");
  myCanvas.width = width;
  myCanvas.height = height;
  document.querySelector(".content").appendChild(myCanvas);
  let ctx = myCanvas.getContext("2d");

  // Draws canvas
  for (let x = 0; x < myCanvas.width; x++) {
    for (let y = 0; y < myCanvas.height; y++) {
      let belongsToSet = checkIfBelongsToMandelbrotSet(
        x / magnificationFactor - panX,
        y / magnificationFactor - panY
      );
      if (belongsToSet == 0) {
        ctx.fillStyle = "#000";
        ctx.fillRect(x, y, 1, 1); // Draw a black pixel
      } else {
        ctx.fillStyle = "hsl(240, 50%, " + belongsToSet + "%)"; // https://www.w3schools.com/cssref/func_hsl.asp
        ctx.fillRect(x, y, 1, 1); // Draw a colorful pixel
      }
    }
  }
}

function checkIfBelongsToMandelbrotSet(x, y) {
  let realComponentOfResult = x;
  let imaginaryComponentOfResult = y;

  for (let iteration = 0; iteration < MAX_ITERATIONS; iteration++) {
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
      return (iteration / MAX_ITERATIONS) * 100;
    }
  }
  return 0; // in Mandelbrot set
}

createMandelbrot(800, 800);
