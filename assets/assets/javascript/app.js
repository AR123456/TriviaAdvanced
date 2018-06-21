//start game button
$("#start-game").on("click", function() {
  $("#start-game").remove();
  game.loadQuestion();
});
$(document).on("click", ".answer-button", function(event) {
  game.clicked(event);
});
$(document).on("click", "#reset", function() {
  game.reset();
});
const questions = [
  {
    question: "What is the main ingredient of a mince pie?",
    choices: ["Fruit", "Tofu", "Vegetables", "Potatoes"],
    correctAnswer: "Fruit",
    image: "assets/images/happydance.gif",
    imagew: "assets/images/urkel.gif"
  },
  {
    question: "How many different flavors of jelly beans exist?",
    choices: ["50", "190", "100", "30"],
    correctAnswer: "50",
    image: "assets/images/happydance.gif",
    imagew: "assets/images/urkel.gif"
  },
  {
    question: "What was the original flavor of the filling in Twinkies?",
    choices: ["Strawberry", "Banana Cream", "Cherry", "Lemon"],
    correctAnswer: "Banana Cream",
    image: "assets/images/bananadance.gif",
    imagew: "assets/images/urkel.gif"
  },
  {
    question: "What is the most popular spice in the world?",
    choices: ["Pepper", "Cinnamon", "Cumin", "Coriander"],
    correctAnswer: "Pepper",
    image: "assets/images/happydance.gif",
    imagew: "assets/images/urkel.gif"
  },
  {
    question: "What is bubble gum made of?",
    choices: ["Gum", "Latex", "Chicle", "Dough"],
    correctAnswer: "Chicle",
    image: "assets/images/happydance.gif",
    imagew: "assets/images/urkel.gif"
  },
  {
    question:
      "What is eaten traditionally in the UK the day before Ash Wednesday?",
    choices: ["Fish", "Wine", "Lentils", "Pancakes"],
    correctAnswer: "Pancakes",
    image: "assets/images/happydance.gif",
    imagew: "assets/images/urkel.gif"
  }
];
const game = {
  questions: questions,
  currentQuestion: 0,
  correct: 0,
  incorrect: 0,
  counter: 20,
  unanswered: 0,

  countdown: function() {
    game.counter--;
    $("#counter").html(game.counter);
    if (game.counter <= 0) {
      //  console.log("time up");
      game.timeUp();
    }
  },
  loadQuestion: function() {
    timer = setInterval(game.countdown, 1000);
    $("#game-action").html(
      "<h2>Time Remaining <span id='counter'>30</span> Seconds</h2>"
    );
    $("#game-action").append(
      "<h2>" + questions[game.currentQuestion].question + "</h2>"
    );
    for (var i = 0; i < questions[game.currentQuestion].choices.length; i++) {
      $("#game-action").append(
        '<button class="answer-button"  id="button-' +
          i +
          '"data-name="' +
          questions[game.currentQuestion].choices[i] +
          '">' +
          questions[game.currentQuestion].choices[i] +
          "</button>"
      );
    }
  },
  nextQuestion: function() {
    game.counter = 30;
    $("#counter").html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function() {
    clearInterval(timer);
    game.unanswered++;
    $("#game-action").html("<h2>Time is up </h2>");
    $("#game-action").append(
      "<h3>The correct answer is: " +
        questions[game.currentQuestion].correctAnswer +
        "</h3>"
    );
    if (game.currentQuestion == questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);
    $("#game-action").html("<h3>Game Over</h3>");
    $("#game-action").append("<h3>Correct: " + game.correct + "</h3>");
    $("#game-action").append("<h3>Incorrect: " + game.incorrect + "</h3>");
    $("#game-action").append("<h3>Unanswered: " + game.unanswered + "</h3>");
    $("#game-action").append("<button id='reset'>Play Again</button>");
    $("#game-action").append("<br/>");
    $("#game-action").append('<img src="assets/images/lovenome.gif"/>');
  },
  clicked: function(event) {
    clearInterval(timer);
    if (
      $(event.target).data("name") ==
      questions[game.currentQuestion].correctAnswer
    ) {
      game.answeredCorrectly();
    } else {
      game.answeredIncorrectly();
    }
  },
  answeredCorrectly: function() {
    // console.log("correct");
    clearInterval(timer);
    game.correct++;
    $("#game-action").html("<h2> You are correct!</h2>");
    $("#game-action").append(
      "<h3>The Correct Answer is: " +
        questions[game.currentQuestion].correctAnswer +
        "</h3>"
    );
    $("#game-action").append(
      '<img src="' + questions[game.currentQuestion].image + '"/>'
    );
    if (game.currentQuestion == questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  answeredIncorrectly: function() {
    // console.log("wrong");
    clearInterval(timer);
    game.incorrect++;
    $("#game-action").html("<h2> You got that one wrong</h2>");
    $("#game-action").append(
      "<h3>The Correct Answer is: " +
        questions[game.currentQuestion].correctAnswer +
        "</h3>"
    );
    $("#game-action").append(
      '<img src="' + questions[game.currentQuestion].imagew + '"/>'
    );
    if (game.currentQuestion == questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  reset: function() {
    game.currentQuestion = 0;
    game.counter = 0;
    game.correct = 0;
    game.incorrect = 0;
    game.unanswered = 0;
    game.loadQuestion();
  }
};
