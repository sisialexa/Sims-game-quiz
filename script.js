/* -------------------------
   MOBILE NAV
-------------------------- */
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

/* -------------------------
   QUIZ DATA
-------------------------- */
const questions = [
  {
    question: "It’s Saturday morning. What are you doing?",
    answers: [
      { text: "Sleeping in and taking it slow", points: ["cereal", "oatmeal"] },
      { text: "Being productive or working out", points: ["yogurt", "applesauce"] },
      { text: "Gaming or scrolling at home", points: ["chips", "popcorn"] },
      { text: "Running errands or multitasking", points: ["bagel", "chickennuggets", "peas"] }
    ]
  },
  {
    question: "Choose a vibe that matches your personality.",
    answers: [
      { text: "Cozy and comforting", points: ["oatmeal", "cereal"] },
      { text: "Soft but energetic", points: ["yogurt", "applesauce"] },
      { text: "Bold, chaotic, fun", points: ["chips", "popcorn"] },
      { text: "Efficient and no-nonsense", points: ["bagel", "chickennuggets", "peas"] }
    ]
  },
  {
    question: "What’s your ideal lunch break?",
    answers: [
      { text: "Something quick while watching a show", points: ["chips", "popcorn", "chickennuggets"] },
      { text: "Something wholesome but easy", points: ["peas", "applesauce", "yogurt"] },
      { text: "Something warm and grounding", points: ["oatmeal", "cereal"] },
      { text: "Grabbing a café bagel", points: ["bagel"] }
    ]
  },
  {
    question: "Pick a comfort activity.",
    answers: [
      { text: "Rewatching a familiar show", points: ["cereal", "oatmeal"] },
      { text: "Organizing or doing skincare", points: ["yogurt", "applesauce"] },
      { text: "Gaming night with friends", points: ["chips", "popcorn"] },
      { text: "Power-snacking before your next task", points: ["bagel", "chickennuggets", "peas"] }
    ]
  },
  {
    question: "Which word do you relate to most?",
    answers: [
      { text: "Nostalgic", points: ["cereal"] },
      { text: "Soft", points: ["yogurt"] },
      { text: "Quirky", points: ["peas"] },
      { text: "Rebellious", points: ["chips"] },
      { text: "Structured", points: ["bagel"] },
      { text: "Chaotic", points: ["popcorn"] },
      { text: "Sweet", points: ["applesauce"] },
      { text: "Bold", points: ["chickennuggets"] },
      { text: "Grounded", points: ["oatmeal"] }
    ]
  },
  {
    question: "You’re picking a movie snack. What’s the move?",
    answers: [
      { text: "Buttered popcorn", points: ["popcorn"] },
      { text: "Fruit or something light", points: ["applesauce", "yogurt"] },
      { text: "Something salty and crunchy", points: ["chips"] },
      { text: "Something warm and comforting", points: ["oatmeal", "chickennuggets"] },
      { text: "Something small + simple", points: ["cereal", "peas", "bagel"] }
    ]
  },
  {
    question: "Choose a color palette:",
    answers: [
      { text: "Warm neutrals", points: ["oatmeal", "bagel"] },
      { text: "Pastels", points: ["yogurt", "applesauce"] },
      { text: "Neons + darks", points: ["chips", "popcorn", "chickennuggets"] },
      { text: "Soft greens", points: ["peas", "cereal"] }
    ]
  }
];

/* -------------------------
   RESULT DESCRIPTIONS + IMAGES
-------------------------- */
const resultDescriptions = {
  cereal: {
    text: "🥣 Cereal: You are nostalgic, cozy, and effortlessly comforting.",
    img: "https://i.imgur.com/jKONw5u.png"
  },
  yogurt: {
    text: "🫐 Yogurt: Balanced, calm, and quietly put together.",
    img: "https://i.imgur.com/3vFhZyS.png"
  },
  peas: {
    text: "🟢 Peas: Quirky, unexpected, and extremely memorable.",
    img: "https://i.imgur.com/g2XRjhf.png"
  },
  chips: {
    text: "🍟 Chips: Bold, crunchy, and unapologetically fun.",
    img: "https://i.imgur.com/5F0CLcc.png"
  },
  bagel: {
    text: "🥯 Bagel: Structured, reliable, and low-key iconic.",
    img: "https://i.imgur.com/j8lJmC6.png"
  },
  popcorn: {
    text: "🍿 Popcorn: Chaotic, charming, and full of plot twists.",
    img: "https://i.imgur.com/V0SM4B7.png"
  },
  applesauce: {
    text: "🍎 Applesauce: Sweet, wholesome, and unexpectedly insightful.",
    img: "https://i.imgur.com/LKQbZFr.png"
  },
  chickennuggets: {
    text: "🍗 Chicken Nuggets: Bold, confident, and slightly unhinged.",
    img: "https://i.imgur.com/v5X9XUu.png"
  },
  oatmeal: {
    text: "🥣 Oatmeal: Grounded, warm, and quietly powerful.",
    img: "https://i.imgur.com/Fns0aTo.png"
  }
};

/* -------------------------
   QUIZ LOGIC
-------------------------- */
let currentQuestionIndex = 0;

let scores = {
  cereal: 0,
  yogurt: 0,
  peas: 0,
  chips: 0,
  bagel: 0,
  popcorn: 0,
  applesauce: 0,
  chickennuggets: 0,
  oatmeal: 0
};

const quizContainer = document.getElementById("quiz");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const resultDiv = document.getElementById("result");
const progressBar = document.getElementById("progress");

showQuestion();
updateProgress();

function showQuestion() {
  nextBtn.classList.add("hidden");
  const q = questions[currentQuestionIndex];

  quizContainer.innerHTML = `
    <h2>${q.question}</h2>
    <div class="answers"></div>
  `;

  const answersDiv = quizContainer.querySelector(".answers");

  q.answers.forEach(answer => {
    const btn = document.createElement("div");
    btn.classList.add("answer-option");
    btn.textContent = answer.text;

    btn.addEventListener("click", () => {
      answer.points.forEach(p => scores[p]++);
      document.querySelectorAll(".answer-option").forEach(o => o.classList.remove("selected"));
      btn.classList.add("selected");
      nextBtn.classList.remove("hidden");

      // Auto scroll for mobile
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    answersDiv.appendChild(btn);
  });
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  updateProgress();

  if (currentQuestionIndex >= questions.length) {
    showResult();
  } else {
    showQuestion();
  }
});

/* Progress Bar */
function updateProgress() {
  const percent = ((currentQuestionIndex) / questions.length) * 100;
  progressBar.style.width = percent + "%";
}

/* Display Result */
function showResult() {
  quizContainer.innerHTML = "";
  nextBtn.classList.add("hidden");

  const highest = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  const r = resultDescriptions[highest];

  resultDiv.innerHTML = `
    <img src="${r.img}" class="result-img">
    <h2>Your Result:</h2>
    <p>${r.text}</p>
  `;
  resultDiv.classList.remove("hidden");

  restartBtn.classList.remove("hidden");
}

/* Restart */
restartBtn.addEventListener("click", () => {
  currentQuestionIndex = 0;
  Object.keys(scores).forEach(k => scores[k] = 0);

  restartBtn.classList.add("hidden");
  resultDiv.classList.add("hidden");

  updateProgress();
  showQuestion();
});
