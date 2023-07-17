var song;
let amp;
let elipSize;
var pause_button;
var re_button;
var vol_hist = [];
let maxOpacity;
let opacity;
let circleColor;
let minOpacity;


function setup() {
  createCanvas(1000, 600);
  song = loadSound('example1.mp3', loaded);
  amplitude = new p5.Amplitude();
  amp = new p5.Amplitude();

}

function loaded(){
  song.play();
  pause_button = createButton("Pause");
  pause_button.mousePressed(togglePlaying);
  re_button = createButton("Reset");
  re_button.mousePressed(resetSong);
}

function togglePlaying(){
  if (song.isPlaying()){
    pause_button.html("Play");
    song.pause();
  } else {
    pause_button.html("Pause");
    song.play();
  }
}

function resetSong () {
  pause_button.html("Pause");
  song.stop();
  song.play();
}


function draw () {
  background('#E593A4');
  let lev = amp.getLevel();
  vol_hist.push(lev);
  angleMode(DEGREES);
  let minOpacity = 0; // Minimum opacity (fully transparent)
  let maxOpacity = 255; // Maximum opacity (fully opaque)
  let opacity = map(lev, 0, 1, minOpacity, maxOpacity);
  let circleColor = color('#BA1135');
  let circleColor2 = color('#C55D73');
  var centerX = width / 2;
  var centerY = height / 2;
  
    //setting ellipse
  var diam = map (lev, 0 , 0.3,10, 400);
  fill(circleColor);
  noStroke();
  ellipse(centerX, centerY,700,diam);
  
//   //radial graph
//   stroke(255);
//   fill(circleColor2);
//   translate(width / 2, height / 2);
//   beginShape();
//   for (var i = 0; i < 360; i++) {
//     var r = map(vol_hist[i], 0, 1,1,400)
//     var x = r * cos(i);
//     var y = r * sin(i);
//     vertex(x, y);
//   }
//   endShape();
  
 
  
  //graphing flat amp
  stroke(255);
  noFill();
  beginShape();
  for (var i = 0; i < vol_hist.length; i++) {
    var z = map(vol_hist[i], 0, 1, height/2, 0);
    vertex(i, z);
  }
  endShape();
  
  
  
  // if (vol_hist.length >= width - 200) {
  //   vol_hist.splice(0,1);
  // }
  
  //removing circle amp
  if (vol_hist.length > 360) {
    vol_hist.splice(0,1);
  }

}