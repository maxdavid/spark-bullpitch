const Scene = require('Scene');
const CameraInfo = require('CameraInfo');
const Animation = require('Animation');
const Time = require('Time');
const Reactive = require('Reactive');
const Audio = require('Audio');
// export const Diagnostics = require('Diagnostics');

import { shuffle } from './util.js';

let nouns = [];
let endings = [];

const planeLogger = (catalog, start, end) => {
  for (let i = start; i < end; i++) {
    let newPlane = { id: i };
    newPlane.plane = Scene.root.find(`plane${i}`);
    newPlane.plane.hidden = true;
    catalog.push(newPlane);
  }
};

// Add planes to arrays
planeLogger(nouns, 0, 47);
const shuffledNouns = shuffle(nouns);
planeLogger(endings, 47, 66);
const shuffledEndings = shuffle(endings);

const titleCard = Scene.root.find('title-card');
titleCard.hidden = false;

const nameBackground = Scene.root.find('bullname-bg');
nameBackground.hidden = true;

// EventSource to trigger when user starts recording
const recordingEvent = CameraInfo.isRecordingVideo.onOn();

const playbackController = Audio.getPlaybackController(
  'audioPlaybackController0'
);

recordingEvent.subscribe(() => {
  const randomRunner = () => {
    // This function is the meat of the program
    titleCard.hidden = true;
    nameBackground.hidden = false;

    let playing = Reactive.val(true);
    let lastRandomNoun = 0;
    let lastRandomEnding = 0;

    const shuffleRunner = () => {
      // Starts ticking sound
      playbackController.setLooping(playing.pinLastValue());
      playbackController.setPlaying(playing.pinLastValue());

      const shuffleImages = () => {
        // Shuffles through the images
        shuffledNouns[lastRandomNoun].plane.hidden = true;
        lastRandomNoun = lastRandomNoun + 1;
        if (lastRandomNoun >= shuffledNouns.length - 1) lastRandomNoun = 0;
        shuffledNouns[lastRandomNoun].plane.hidden = false;

        shuffledEndings[lastRandomEnding].plane.hidden = true;
        lastRandomEnding = lastRandomEnding + 1;
        if (lastRandomEnding >= shuffledEndings.length - 1)
          lastRandomEnding = 0;
        shuffledEndings[lastRandomEnding].plane.hidden = false;
      };

      // Swaps image every 80ms, stops after 5s
      const randomItems = Time.setInterval(shuffleImages, 80);
      Time.setTimeout(() => Time.clearInterval(randomItems), 5000);
    };

    const showInfo = () => {
      // Stops ticking sound
      playing = Reactive.val(false);
      playbackController.setPlaying(playing.pinLastValue());

      // Expands text information
      // const timeDriverParameters = {
      //   durationMilliseconds: 500,
      //   loopCount: 1,
      //   mirror: false
      // };
      // const timeDriver = Animation.timeDriver(timeDriverParameters);
      // const sampler = Animation.samplers.linear(0, 0.6);
      // const translationAnimation = Animation.animate(timeDriver, sampler);
      // const xScale = Reactive.val(4);
      // shuffledCatalog[lastRandom].text.hidden = false;
      // textContainer.transform.scaleY = translationAnimation;
      // textContainer.transform.scaleX = translationAnimation.mul(xScale);
      // timeDriver.start();
    };

    shuffleRunner();
    Time.setTimeout(showInfo, 5000);
  };

  // 1 second after recording starts, trigger the program
  Time.setTimeout(randomRunner, 2000);
});
