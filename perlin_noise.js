// noise() --> Perlin noise in p5js, comes from Ken Perlin in the 80s working in the film TRON.
// Developed for procedural textures of objects.
//
// Perlin noise smooths the random generation processing.
//
// Cosine interpolation: "smooth" curve between values
//
// Perlin noise is calculated over a number of octaves which are essentially
// a series of random waveforms
// var xOff = 0;
// var yOff= 100;
var inc = 0.5;
var scl = 10;
var cols, rows;

var zOffset = 0;
var mousePos;

var fr;

var particles = [];

var flowField = [];
var printAngle;
function setup() {
  createCanvas(windowWidth,windowHeight);
  pixelDensity(5);
  cols = floor(width / scl);
  rows = floor(height / scl);

  noCursor();

  flowField = new Array(cols*rows);
  background(255);
  for(var i = 0; i <200; i++){
    particles[i] = new Particle();
  }

}

function draw() {
  background(255,10);
  var yOffset = 0;
  mousePos = mouseX+mouseY;
  for(var y = 0; y < rows; y++){
    var xOffset = 0;
    for(var x= 0; x < cols; x++){
      var index = (x + y * cols);
      var v = p5.Vector.fromAngle(angle);
      v.setMag(3);
      flowField[index] = v;
      var angle = noise(mousePos, mousePos, mousePos) * TWO_PI;
      xOffset +=inc;
      // stroke(0,50);
      // strokeWeight(1);
      // push();
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // line(0,0, scl, 0);
      // pop();
      printAngle = angle;
    }
    yOffset += inc;

    zOffset += inc/1000;
  }
  for (var i = 0; i < particles.length; i ++){
    var z = Math.floor(i*random(1));
    particles[i].edges();
    if (z%2 == 0) {
      particles[i].show(100,0,0,0,1);
    } else {
      particles[i].show(100,255,0,0,1);
    }
    particles[i].update();
    particles[i].follow(flowField);
   //fr.html(flowField.toString());
    //ft.html(floor(printAngle.toString()));
  }



  // for (var k = 0; k < mouseParticles.length; k++) {
  //   mouseParticles[k].edges();
  //   mouseParticles[k].show(255,255,255,255);
  //   mouseParticles[k].update();
  //   mouseParticles[k].follow(flowMouse);
  //
  // }


}
function mousePressed() {
  for (var i = 0; i < particles.length; i ++){
    particles[i].edges();
    particles[i].show(15,mouseX,mouseY,mouseX,40);

}
  mousePos *= 2;
}
