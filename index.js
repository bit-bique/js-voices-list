const voicesList = document.getElementById("voices-list");
const input = document.getElementById("input");
const fragment = document.createDocumentFragment();
const msg = new SpeechSynthesisUtterance();

let _speechSynthesis;
const debug = document.getElementById("debug");

function loadVoicesWhenAvailable(onComplete = () => {}) {
  _speechSynthesis = window.speechSynthesis;
  const voices = _speechSynthesis.getVoices();

  if (voices.length !== 0) {
    onComplete();
  } else {
    return setTimeout(function () {
      loadVoicesWhenAvailable(onComplete);
    }, 100);
  }
}

// window.speechSynthesis.onvoiceschanged = () => {
//   console.log("voices are ready");
//   const voices = _speechSynthesis.getVoices();
//   voices.sort((a, b) => a.lang.slice(0, 2).localeCompare(b.lang.slice(0, 2)));
//   generateVoiceItem(voices);
// };

const generateVoiceItem = (voices) => {
  voices.forEach((voice, index) => {
    const { name, lang } = voice;

    const li = document.createElement("li");
    const nameSpan = document.createElement("span");
    const div = document.createElement("div");
    const langSpan = document.createElement("span");
    const button = document.createElement("button");
    nameSpan.className = "name";
    nameSpan.innerText = `Name: ${name},`;
    langSpan.className = "lang";
    langSpan.innerText = `Language: ${lang}`;
    button.id = "voice-button";
    button.innerText = "Speak";
    button.addEventListener("click", () => speak(voice, index));
    div.className = "voice-details";
    li.appendChild(nameSpan);
    div.appendChild(langSpan);
    div.appendChild(button);
    li.appendChild(div);

    fragment.appendChild(li);
  });

  voicesList.appendChild(fragment);
};

const speak = (voice, index) => {
  speechSynthesis.cancel();

  msg.voice = voice;
  msg.lang = voice.lang;

  msg.text = input.value;
  speechSynthesis.speak(msg);
};

loadVoicesWhenAvailable(() => {
  console.log("voices are ready");
  const voices = _speechSynthesis.getVoices();

  voices.sort((a, b) => a.lang.slice(0, 2).localeCompare(b.lang.slice(0, 2)));
  generateVoiceItem(voices);
});
