const word = document.getElementById("word");
const text = document.getElementById("text");
const score_el = document.getElementById("score");
const time_el = document.getElementById("time");
const endgame_el = document.getElementById("end-game-container");
const settings_btn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settings_form = document.getElementById("settings-form");
const difficulty_select = document.getElementById("difficulty");

const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];

let difficulty = localStorage.getItem('difficulty') || 'medium';

difficulty_select.value = difficulty;

text.focus();

const timeInterval = setInterval(updateTime, 1000);

let random_word, score = 0, time = 10;

const getRandomWord = () => {
   return words[Math.floor(Math.random() * words.length)];
}

const addWordToDOM = () => {
   random_word = getRandomWord();
   word.innerHTML = random_word;
}

const updateScore = () => {
   score++;
   score_el.innerHTML = score;
}

const gameOver = () => {
   endgame_el.innerHTML = `
      <h1>Time ran out</h1>
      <p>Your final score is ${score}</p>
      <button onclick="location.reload()">Reload</button>
   `;
   endgame_el.style.display = "flex";
}
 function updateTime(){
   time--;
   time_el.innerHTML = time + 's';
   if(time === 0){
      clearInterval(timeInterval);
      gameOver();
   }
}
addWordToDOM();

text.addEventListener('input', e=>{
   const inserted_text = e.target.value;

   if(inserted_text === random_word){
      addWordToDOM();
      updateScore();
      e.target.value = '';

      switch (difficulty) {
         case 'hard':
            time += 2;
            break;
         case 'medium':
            time += 3;
            break;
         case 'easy':
            time += 5;
            break;
      }

      updateTime();
   }
});

settings_btn.addEventListener('click', () => {
   settings.classList.toggle('hide');
});

settings_form.addEventListener('change', e => {
   difficulty = e.target.value;
   localStorage.setItem('difficulty', difficulty);
});