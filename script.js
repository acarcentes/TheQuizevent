  // Earth Quiz Application
var questionArr = [
    {
      q: "How many countries are in the world?",
      a: ["95", "100", "103", "193","201"],
      correctAnswer: "193",
    },
    {
      q:
        "Which is the most populated country in the world?",
      a: ["Russia", "USA", "Brasil", "India","Australia"],
      correctAnswer: "India",
    },
    {
      q: "Which is the shape of planet Earth?",
      a: ["Square", "Flat", "Elliptical", "Round","Cylindrical"],
      correctAnswer: "Elliptical",
    },
    {
      q: "How many continents are in the world?",
      a: ["4", "12", "8", "7","5"],
      correctAnswer: "5",
    },
    {
      q: "Which is the biggest country in the world by landmass?",
      a: ["China", "Russia", "USA", "Brasil","Canada"],
      correctAnswer: "Russia",
    },
    {
      q: "Which is the longest river by volume in the world?",
      a: ["Congo River", "Amazon River", "Nile River", "Yellow River","Parana River"],
      correctAnswer: "Amazon River",
    },
    {
      q: "How many Oceans are inthe world?",
      a: ["11", "13", "5", "7","9"],
      correctAnswer: "5",
    },
    {
      q: "Which is the largest mountain in the world?",
      a: ["Makalu","K1","K2","Mount Everest"],
      correctAnswer: "Mount Everest",
    },
    {
      q: "WWhich is the largest desert in the world?",
      a: ["Antarctica", "Sahara", "Arabian", "Gobi","Kalahari"],
      correctAnswer: "Antarctica",
    },
    {
      q: "Does it rains diamonds in Saturn?",
      a: ["Probably", "Let's find out", "No", "Maybe"],
      correctAnswer: "Let's find out",
    },
  ];

  var startBtn = document.querySelector("#startBtn");
  var gameContainer = document.querySelector(".container");
  
  var counter = 0;
  var score = 0;
  var timer = 100;
  var stopTimer = false;
  
  startBtn.addEventListener("click", function () {

    var timerOnScreen = document.createElement("h2");
    timerOnScreen.textContent = timer;
    document.querySelector(".time").appendChild(timerOnScreen);
  
    renderQuestions();
    gameTimer();
  });
  
  function renderQuestions() {
    gameContainer.innerHTML = "";
    var currentQuestions = questionArr[counter];
  
    var newQuestionH1 = document.createElement("h1");
    newQuestionH1.textContent = currentQuestions.q;
    gameContainer.appendChild(newQuestionH1);
  
    var ulEl = document.createElement("ul");
    gameContainer.appendChild(ulEl);
  
    for (var i = 0; i < currentQuestions.a.length; i++) {
      var newAnswer = document.createElement("button");
      var spacer = document.createElement("br");
      newAnswer.setAttribute("class", "btn btn-primary");
      newAnswer.setAttribute("data-answer", currentQuestions.a[i]);
      newAnswer.textContent = currentQuestions.a[i];
      newAnswer.addEventListener("click", answeringQuestion);
      ulEl.appendChild(newAnswer);
      ulEl.appendChild(spacer);
    }
  }
  
  function answeringQuestion(event) {
    var currentQuestions = questionArr[counter];
    var currentPressedButton = event.target;
    var valueOfButton = currentPressedButton.getAttribute("data-answer");
    console.log(valueOfButton);
  
    if (valueOfButton == currentQuestions.correctAnswer) {
      console.log("you are right");
      score++;
    } else {
      timer = timer - 5;
      console.log("you are wrong");
    }
  
    counter++;
  
    if (counter >= questionArr.length) {
      endgame();
    } else {
      renderQuestions();
    }
  }
  
  function endgame(text) {
    gameContainer.innerHTML = "";
    stopTimer = true;
    var scoreEl = document.createElement("h3");
    var form = document.createElement("form");
    var inputName = document.createElement("input");
    var submitBtn = document.createElement("button");
  
    inputName.setAttribute("placeholder", "Save your HighScore");
    inputName.setAttribute("name", "playerName");
    submitBtn.textContent = "SAVE";
    submitBtn.addEventListener("click", saveHighScore);
  
    scoreEl.textContent = "Your Score is : " + score;
    gameContainer.appendChild(scoreEl);
  
    form.appendChild(inputName);
    form.appendChild(submitBtn);
    gameContainer.appendChild(form);
  
    counter = 0;
    score = 0;
    timer = 100;
  }
  
  function gameTimer() {
    var gameT = setInterval(function () {
      timer--;
  
      var timerOnScreen = document.querySelector("h2");
      timerOnScreen.textContent = timer;
  
      if (timer == 0 || counter >= questionArr.length || stopTimer) {
        document.querySelector(".time").innerHTML = "";
        clearInterval(gameT);
        endgame();
      }
    }, 1000);
  }
  
  function saveHighScore(e) {
    event.preventDefault();
  
    var playerName = document.querySelector("input").value;
    var currentScores = localStorage.getItem("scores");
  
    if (currentScores !== null) {
      currentScores = JSON.parse(currentScores);
  
      gameResult = { player: playerName, score: score };
      currentScores.push(gameResult);
      currentScores.sort(function (a, b) {
        return b.score - a.score;
      });
  
      localStorage.setItem("scores", JSON.stringify(currentScores));
  
      console.log(currentScores);
    } else {
      currentScores = [];
      currentScores.push({ player: playerName, score: 100 });
  
      localStorage.setItem("scores", JSON.stringify(currentScores));
    }
  
    gameContainer.innerHTML = "";
  
    var listHs = document.createElement("ol");
  
    for (let i = 0; i < currentScores.length; i++) {
      var listEl = document.createElement("li");
      listEl.textContent =
        currentScores[i].player + ": " + currentScores[i].score;
  
      listHs.appendChild(listEl);
    }
  
    gameContainer.appendChild(listHs);
  }
  