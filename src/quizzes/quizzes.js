document.addEventListener("DOMContentLoaded", function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const quizType = urlParams.get("quiz");

  const quizTitleElement = document.getElementById("quiz-title");
  const questionContainer = document.getElementById("question-container");
  const submitButton = document.getElementById("submit-btn");
  const resultContainer = document.getElementById("result-container");
  const resultElement = document.getElementById("result");
  const restartButton = document.getElementById("restart-btn");
  const randombtn = document.getElementById("random-btn");
  const quizList = ["movies", "music", "tech", "sports"];

  randombtn.addEventListener(
    "click",
    () =>
      (window.location.href = `/quizzes/?quiz=${
        quizList[Math.floor(Math.random() * 4)]
      }`)
  );
  let score = 0;

  const quizzes = {
    movies: [
      {
        question: "Who directed the movie 'The Godfather'?",
        options: [
          "Martin Scorsese",
          "Steven Spielberg",
          "Francis Ford Coppola",
          "Alfred Hitchcock",
        ],
        answer: "Francis Ford Coppola",
      },
      {
        question:
          "Which actor played the role of Neo in the movie 'The Matrix'?",
        options: ["Keanu Reeves", "Brad Pitt", "Tom Cruise", "Will Smith"],
        answer: "Keanu Reeves",
      },
      {
        question: "Who won the Best Actor award for the movie 'The Revenant'?",
        options: ["Leonardo DiCaprio", "Tom Hanks", "Brad Pitt", "Johnny Depp"],
        answer: "Leonardo DiCaprio",
      },
    ],
    music: [
      {
        question: "Who is known as the King of Pop?",
        options: ["Michael Jackson", "Elvis Presley", "Madonna", "Prince"],
        answer: "Michael Jackson",
      },
      {
        question: "Which band released the album 'Abbey Road'?",
        options: ["The Beatles", "The Rolling Stones", "Led Zeppelin", "Queen"],
        answer: "The Beatles",
      },
      {
        question: "Who sang the song 'Bohemian Rhapsody'?",
        options: ["Queen", "The Beatles", "Led Zeppelin", "Pink Floyd"],
        answer: "Queen",
      },
    ],
    tech: [
      {
        question: "Who is the founder of SpaceX?",
        options: ["Bill Gates", "Jeff Bezos", "Elon Musk", "Mark Zuckerberg"],
        answer: "Elon Musk",
      },
      {
        question:
          "Which programming language is commonly used for web development?",
        options: ["Python", "Java", "C++", "JavaScript"],
        answer: "JavaScript",
      },
      {
        question: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "Hyperlinks and Text Markup Language",
          "Home Tool Markup Language",
          "Hyper Tool Markup Language",
        ],
        answer: "Hyper Text Markup Language",
      },
    ],
    sports: [
      {
        question: "Which sport is known as the 'king of sports'?",
        options: ["Soccer", "Basketball", "Cricket", "Tennis"],
        answer: "Soccer",
      },
      {
        question:
          "In which year did the first modern Olympic Games take place?",
        options: ["1896", "1900", "1920", "1936"],
        answer: "1896",
      },
      {
        question: "Which country won the FIFA World Cup in 2018?",
        options: ["France", "Germany", "Brazil", "Argentina"],
        answer: "France",
      },
    ],
  };

  // Capitalizing function for quiz page titles
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function loadQuestions() {
    const currentQuiz = quizzes[quizType];

    quizTitleElement.textContent = `${capitalizeFirstLetter(quizType)} Quiz`;

    currentQuiz.forEach((question, index) => {
      const questionDiv = document.createElement("div");
      questionDiv.classList.add(
        "container",
        "border-2",
        "d-flex",
        "question",
        "flex-column",
        "mt-3"
      );

      questionDiv.innerHTML = `
              <h4>${index + 1}. ${question.question}</h4>
              <fieldset class="row gap-2  row-cols-1 row-cols-md-3 justify-content-center">
                  ${question.options
                    .map(
                      (option, optionIndex) => `
                          
                          <label class="btn btn-secondary btn-lg col" for="q${index}-option${optionIndex}">${option}
                          <input type="radio" id="q${index}-option${optionIndex}" name="q${index}" value="${option}">
                          </label>
                  `
                    )
                    .join("")}
              </fieldset>
          `;
      questionContainer.appendChild(questionDiv);
    });
  }

  function checkAnswers() {
    const currentQuiz = quizzes[quizType];
    const questions = document.querySelectorAll(".question");

    let tempScore = 0;

    questions.forEach((question, index) => {
      const selectedOption = question.querySelector("input:checked");
      if (selectedOption) {
        const userAnswer = selectedOption.value;
        const correctAnswer = currentQuiz[index].answer;
        if (userAnswer === correctAnswer) {
          tempScore++;
          selectedOption.parentElement.classList.remove("btn-secondary"); // highlight correct answer green
          selectedOption.parentElement.classList.add("btn-success");
          selectedOption.parentElement.parentElement.setAttribute(
            "disabled",
            ""
          ); // disable fieldset if answer is correct
        } else {
          // Deduct only 1 point if the selected option is incorrect
          tempScore = Math.max(0, tempScore--);
          selectedOption.parentElement.classList.remove("btn-secondary"); // highlight wrong answer red
          selectedOption.parentElement.classList.add("btn-danger");
        }
      }
    });

    score = Math.min(3, tempScore); // keep within the range of 0 to 3

    showResult();
  }

  function showResult() {
    resultElement.textContent = `You scored ${score} out of ${quizzes[quizType].length}`;
    resultContainer.style.display = "block";
    resultContainer.classList.add("alert", "alert-secondary");
  }

  function restartQuiz() {
    score = 0;
    resultContainer.style.display = "none";
    questionContainer.innerHTML = ""; // Clears the previous questions
    loadQuestions();
  }

  submitButton.addEventListener("click", checkAnswers);
  restartButton.addEventListener("click", restartQuiz);

  loadQuestions();
});
