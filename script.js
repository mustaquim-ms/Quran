const quranTextElement = document.getElementById('quran-text');
const playPauseButton = document.getElementById('play-pause-button');
const volumeSlider = document.getElementById('volume-slider');
const highlightButton = document.getElementById('highlight-button');
const highlightInput = document.getElementById('highlight-input');

let isPlaying = false;
let utterance = new SpeechSynthesisUtterance();

// Load Quran text
fetch('quran.txt')
  .then(response => response.text())
  .then(text => {
    quranTextElement.textContent = text;
    utterance.text = text;
  });

// Play/pause button
playPauseButton.addEventListener('click', () => {
  if (isPlaying) {
    speechSynthesis.pause();
    isPlaying = false;
    playPauseButton.textContent = 'Play';
  } else {
    speechSynthesis.resume();
    isPlaying = true;
    playPauseButton.textContent = 'Pause';
  }
});

// Volume slider
volumeSlider.addEventListener('input', () => {
  utterance.volume = volumeSlider.value;
});

// Highlight button
highlightButton.addEventListener('click', () => {
  const lineNumbers = highlightInput.value.split(',');
  const lines = quranTextElement.textContent.split('\n');

  lines.forEach((line, index) => {
    if (lineNumbers.includes(String(index + 1))) {
      line = `<span class="highlighted">${line}</span>`;
    }
    quranTextElement.innerHTML += line + '<br>';
  });
});

// Start speech on page load
speechSynthesis.speak(utterance);
