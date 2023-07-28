var video;
var vScale = 10;
var song;
var amp;
var vol_hist = [];
var viz;
let mic;

function setup() {
    createCanvas(320, 240);
    pixelDensity(1);
    video = createCapture(VIDEO);
    video.size(320/vScale, 240/vScale);
    song = loadSound('example1.mp3', loaded);
    amp = new p5.Amplitude();
    fft = new p5.FFT();
    mic = new p5.AudioIn();
    mic.start();
    amp = new p5.Amplitude();
    amp.setInput(mic);

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

function draw() {
    background(51);
    var lev = amp.getLevel();
    vol_hist.push(lev);
    var freq = fft.analyze();

    loadPixels();
    video.loadPixels();
    for (var y = 0; y < video.height; y ++) {
        for (var x = 0; x < video.width; x ++) {
            var index = (x + y * video.width) * 4;

            var r = video.pixels[index + 0];
            var g = video.pixels[index + 1];
            var b = video.pixels[index + 2];

            var br = map(lev, 0, 1, 0, vScale);
            var bright = (r + g + b) / br+1;
            var w = map(bright, 0, 255,0, vScale);

            noStroke();
            fill(255,204,203);
            rectMode(CENTER);
            rect(x*vScale, y*vScale, w,w);

        }  
    }
}

// function draw() {
//     var vol = amp.getLevel();
//     vol_hist2.push(vol);

//     //flat amp graph
//     stroke(255,0,0);
//     translate(width / 2, height / 2);
//     beginShape();
//     for (var i = 0; i < vol_hist2.length(); i++) {
//         var y = map(vol_hist2[i], 0, 1,1,400)
//         vertex(i, y);
//     }
//     endShape();

//     if (vol_hist2.length > width - 50) {
//         vol_hist2.splice(0,1);
//     }

// }
