const app = () => {
  const song = document.querySelector('.song');
  const play = document.querySelector('.play');
  const outline = document.querySelector('.moving-outline circle');
  const video = document.querySelector('.vid-container video');

  const sounds = document.querySelectorAll('.sound-picker button');
  const timeDisplay = document.querySelector('.time-display');
  const timeSelect = document.querySelectorAll('.time-select button');
  const outlineLength = outline.getTotalLength();

  let fakeDuration = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  sounds.forEach(sound => {
    sound.addEventListener('click', function () {
      song.src = this.getAttribute('data-sound');
      video.src = this.getAttribute('data-video');
      checkPlaying(song);
    })
  })

  play.addEventListener('click', evt => {
    checkPlaying(song);
  });

  timeSelect.forEach(option => {
    option.addEventListener('click', function () {
      fakeDuration = this.getAttribute('data-time');
      let seconds = Math.floor(fakeDuration % 60);
      if(seconds < 10){
        seconds = "0" + seconds;
      }
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${seconds}`
    })
  })

  const checkPlaying = song => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = './assets/svg/pause.svg'
    } else {
      song.pause();
      video.pause();
      play.src = './assets/svg/play.svg'
    }
  };

  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    timeDisplay.textContent = `${minutes}:${seconds}`

    if(currentTime >= fakeDuration) {
      song.currentTime = 0;
      song.pause();
      play.src = './assets/svg/play.svg'
      video.pause();
    }
  }

}

app();
