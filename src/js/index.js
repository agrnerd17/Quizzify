const app = document.getElementById("app");
const div = document.createElement("div");
div.innerHTML = "div text";
const btnStyles = "btn - btn-primary";
div.classList.add("btn", "btn-primary");

div.addEventListener("click", () => {
  const xd = document.createElement("div");
  xd.textContent = "xd div";
  xd.classList.add("btn", "btn-light");
  app.appendChild(xd);
});

const quizList = ["movies", "music", "tech", "sports"];

document.addEventListener("DOMContentLoaded", function () {
  const randombtn = document.getElementById("random-btn");
  randombtn.addEventListener(
    "click",
    () =>
      (window.location.href = `/quizzes/?quiz=${
        quizList[Math.floor(Math.random() * 4)]
      }`)
  );
  const quizButtons = document.querySelectorAll(".quiz-btn");

  quizButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const quizType = this.getAttribute("data-quiz-type");
      window.location.href = `/quizzes/?quiz=${quizType}`;
    });
  });
  console.log(quizButtons);
});
