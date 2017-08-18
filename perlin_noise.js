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
var inc = 0.05;
var scl = 10;
var cols, rows;

var zOffset = 0;

var fr;

var particles = [];

function setup() {
  createCanvas(400,400);
  pixelDensity(1);
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP(' ');

  for(var i = 0; i <100; i++){
    particles[i] = new Particle();
  }
}

function draw() {
  background(255);
  var yOffset = 0;
  for(var y = 0; y < rows; y++){
    var xOffset = 0;
    for(var x= 0; x < cols; x++){
      var index = (x + y * width) *4;
      var angle = noise(xOffset, yOffset, zOffset) * TWO_PI;
      var v = p5.Vector.fromAngle(angle);
      xOffset += inc;
      stroke(0);
      push();
      translate(x * scl, y * scl);
      rotate(v.heading());
    //  line(0,0, scl, 0);
      pop();
    }
    yOffset += inc;

    zOffset += inc/100;
  }
  for (var i = 0; i < particles.length; i ++){
    particles[i].show();
    particles[i].update();
    particles[i].edges();

  }

  fr.html(floor(frameRate()));
}
