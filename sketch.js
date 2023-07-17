var song;
var fft;
let elipSize;
var pause_button;
var re_button;
var freq_hist = [];
let maxOpacity;
let opacity;
let circleColor;
let minOpacity;
var w;
var r;
var video;


function setup() {
  createCanvas(512, 512);
  song = loadSound('example1.mp3', loaded);
  fft = new p5.FFT(0, 256);
  angleMode(DEGREES);
  w = width / 256;
  colorMode(HSB);
  video = createCapture(VIDEO);
  video.size(512,512);
  video.hide();
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
  image(video, 0, 0);
  var freq = fft.analyze();
  noStroke();
  translate(width/2, height /2);
  beginShape();
  for (var i = 0; i < freq.length; i++) {
    var angle = map(i, 0, freq.length, 0, 360);
    f = freq[i]
    var r = map(f, 0, 256, 20, 100);
    fill(i, 255, 255);
    var x = r * cos(angle);
    var y = r * sin(angle);
    stroke(i, 255, 255);
    line(0,0,x,y);
  }
  endShape();
  
  
}



