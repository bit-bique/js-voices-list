const voicesList = document.getElementById("voices-list");
const input = document.getElementById("input");
const fragment = document.createDocumentFragment();
const msg = new SpeechSynthesisUtterance();

window.speechSynthesis.onvoiceschanged = () => {
  console.log("voices are ready");
  const voices = window.speechSynthesis.getVoices();
  voices.sort((a, b) => a.lang.slice(0, 2).localeCompare(b.lang.slice(0, 2)));
  generateVoiceItem(voices);
};

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
    button.addEventListener("click", () => speak(lang, voice));
    div.className = "voice-details";
    li.appendChild(nameSpan);
    div.appendChild(langSpan);
    div.appendChild(button);
    li.appendChild(div);

    fragment.appendChild(li);
  });

  voicesList.appendChild(fragment);
};

const speak = (lang, voice) => {
  speechSynthesis.cancel();
  msg.voice = voice;

  msg.text = input.value;
  speechSynthesis.speak(msg);
};
