let mic, recorder, soundFile;
let state = 0;
let capture;


function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.mousePressed(canvasPressed);
  background(0);
  textAlign(CENTER, CENTER);
  textSize(20);
  fill(200);
 

  // create an audio in
  mic = new p5.AudioIn();

  // prompts user to enable their browser mic
  mic.start();

  // create a sound recorder
  recorder = new p5.SoundRecorder();

  // connect the mic to the recorder
  recorder.setInput(mic);

  // this sound file will be used to
  // playback & save the recording
  soundFile = new p5.SoundFile();

  text('Κάντε κλικ εδώ για να καταχωρίσετε μια καταγραφή που ίσως χρησιμεύσει ως άσκηση μνήμης στο μέλλον', width/2, height*1.7/3);
 
  capture = createCapture(VIDEO);
  capture.hide();
  saveCanvas(cnv, 'myCanvas', 'jpg');

}

function canvasPressed() {
  // ensure audio is enabled
  userStartAudio();

  // make sure user enabled the mic
  if (state === 0 && mic.enabled) {

    // record to our p5.SoundFile
    recorder.record(soundFile);

    background(0);
    text('Καταγραφή...', width*1.6/3, height*1.7/3);
    state++;
  }
  else if (state === 1) {
    background(0);

    // stop recorder and
    // send result to soundFile
    recorder.stop();

    text('Καταγράφηκε. Κάντε κλικ εδώ για αποθήκευση', width*1.6/3, height*1.7/3);
    state++;
  }

  else if (state === 2) {
    soundFile.play(); // play the result!
    save(soundFile, 'mySound.wav');
    state++;
  }
}

function draw (){
  let volume = mic.getLevel();
  fill(127);
  stroke(0);
  image(capture,windowWidth*1.6/4,20,400,300);
  //image.filter(INVERT);
//capture.size(300,300);
//capture.position(windowWidth*1.6/4,0);


  //Draw an ellipse with height based on volume
  //let h = map(volume, 0, 1, height, 0);
  //ellipse(width / 2, h - 25, 50, 50);

}
