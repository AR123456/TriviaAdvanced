//gets page ready to play
// $(document).ready(function(){
//start game button 
$('#start-game').on('click',function(){
  $('#start-game').remove();
  game.loadQuestion();
});
// check for accuracy of answer with the on click event- pass the click as the event using document since answer button is dynamically loaded, have to check the whole document not just button since it does not exist at first.  
$(document).on('click','.answer-button',function(event){
  game.clicked(event);
});
//setting up the on click for the start new game 
 $(document).on('click','#reset',function(){
  game.reset();
 });
// object array of questions with choices array 
  var questions = [
    {
      question: "What is the main ingredient of a mince pie?",
      choices:["Fruit", "Tofu","Vegetables","Potatoes"],
      correctAnswer:"Fruit",
      image:"assets/images/happydance.gif",
      imagew:"assets/images/urkel.gif"
    },
    {
      question: "How many different flavors of jelly beans exist?",
      choices:["50", "190","100", "30"],
      correctAnswer:"50",
      image:"assets/images/happydance.gif",
      imagew:"assets/images/urkel.gif"
    },
    {
      question: "What was the original flavor of the filling in Twinkies?",
      choices:["Strawberry", "Banana Cream", "Cherry", "Lemon" ],
      correctAnswer:"Banana Cream",
      image:"assets/images/bananadance.gif",
      imagew:"assets/images/urkel.gif"
    },
    {
      question: "What is the most popular spice in the world?",
      choices:["Pepper", "Cinnamon", "Cumin", "Coriander" ],
      correctAnswer:"Pepper",
      image:"assets/images/happydance.gif",
      imagew:"assets/images/urkel.gif"
    },
    {
      question: "What is bubble gum made of?",
      choices:["Gum", "Latex", "Chicle", "Dough"],
      correctAnswer:"Chicle",
      image:"assets/images/happydance.gif",
      imagew:"assets/images/urkel.gif"
    },
    {
      question: "What is eaten traditionally in the UK the day before Ash Wednesday?",
      choices: ["Fish","Wine","Lentils","Pancakes"],
      correctAnswer:"Pancakes",
      image:"assets/images/happydance.gif",
      imagew:"assets/images/urkel.gif"
    }
  ];
  var game={
    questions:questions,
    //counters 
    currentQuestion:0,
    correct: 0,
    incorrect: 0,
    counter: 20,
    unanswered:0,
// functions to call later   
    //run the timers call timeUp 
    countdown: function(){
     game.counter--;
       $("#counter").html(game.counter);
       if(game.counter<=0){
        //  console.log("time up");
         game.timeUp();
       }
    },
    loadQuestion: function(){
      //this function puts the questions and answers on the page 
      //lower the time count 1 for each second 
      timer = setInterval(game.countdown,1000);
      //put timer in the page
      $('#game-action').html("<h2>Time Remaining <span id='counter'>30</span> Seconds</h2>");
      //post  question to page 
      $("#game-action").append('<h2>' + questions[game.currentQuestion].question + '</h2>');
      //post answers to page will loop as long as i is less than number of question 
      for (var i=0; i<questions[game.currentQuestion].choices.length; i++) {
    //create the button and write to it - store the answer at [i] withing the button will post to page when loadQuestion function is run
       $("#game-action").append('<button class="answer-button"  id="button-'+i+'"data-name="'+questions[game.currentQuestion].choices[i]+'">'+ questions[game.currentQuestion].choices[i]+'</button>');
          }
  },
    nextQuestion: function(){
      //so counter starts with a fresh 30 seconds for this question
      game.counter = 30;
      //put the counter back to the page, so last questions seconds don't show 
     $('#counter').html(game.counter);
     //increment current question 
     game.currentQuestion ++;
     //call loadquestion function 
     game.loadQuestion();

    },
    timeUp: function(){
      clearInterval(timer);
      game.unanswered++;
      $('#game-action').html('<h2>Time is up </h2>');
      $('#game-action').append('<h3>The correct answer is: '+questions[game.currentQuestion].correctAnswer+'</h3>');
      if(game.currentQuestion==questions.length-1){
        //wait 3 sec , then if last question go to results screen if not go to next question 
                setTimeout(game.results,3*1000);
              } else {
                setTimeout(game.nextQuestion,3*1000);
              }
    },
    results: function(){
      clearInterval(timer);
      $('#game-action').html("<h3>Game Over</h3>");
      $('#game-action').append("<h3>Correct: "+game.correct+"</h3>");
      $('#game-action').append("<h3>Incorrect: "+game.incorrect+"</h3>");
      $('#game-action').append("<h3>Unanswered: "+game.unanswered+"</h3>");
      $('#game-action').append("<button id='reset'>Play Again</button>");
      $('#game-action').append('<br/>');
      $('#game-action').append('<img src="assets/images/lovenome.gif"/>');
    },
    // use to clear the interval ,pass the button value for 'event'
    clicked: function(event){
      // clear the interval so timer stops when button is clicked
      clearInterval(timer);
      //click passes the value of the button clicked- name references  the data name that is the correct answer created above 
      if($(event.target).data("name")==questions[game.currentQuestion].correctAnswer){
       //then run the game answerorrectly and answeredIncorrectly to check answer. 
        game.answeredCorrectly();
      } else {
        game.answeredIncorrectly();
      } 

    },
    answeredCorrectly: function(){
      // console.log("correct");
      //stop timer
      clearInterval(timer);
      game.correct++;
      $('#game-action').html('<h2> You are correct!</h2>');
      $('#game-action').append('<h3>The Correct Answer is: '+questions[game.currentQuestion].correctAnswer+'</h3>');
      $('#game-action').append('<img src="'+questions[game.currentQuestion].image+ '"/>');
      // check where we are in the array of questions 
      if(game.currentQuestion==questions.length-1){
//wait 3 sec , then if last question go to results screen if not go to next question 
        setTimeout(game.results,3*1000);
      } else {
        setTimeout(game.nextQuestion,3*1000);
      }
      
    },
    answeredIncorrectly: function(){
      // console.log("wrong");
      clearInterval(timer);
      game.incorrect++;
      $('#game-action').html('<h2> You got that one wrong</h2>');
      $('#game-action').append('<h3>The Correct Answer is: '+questions[game.currentQuestion].correctAnswer+'</h3>');
      $('#game-action').append('<img src="'+questions[game.currentQuestion].imagew+ '"/>');
      // check where we are in the array of questions 
      if(game.currentQuestion==questions.length-1){
//wait 3 sec , then if last question go to results screen if not go to next question 
        setTimeout(game.results,3*1000);
      } else {
        setTimeout(game.nextQuestion,3*1000);
      }
    },
    reset: function(){
      game.currentQuestion =0;
      game.counter=0;
      game.correct =0;
      game.incorrect =0;
      game.unanswered=0;
      game.loadQuestion();


    }


  }

//    
//     //puts timer int html and sets the clock at the number of seconds in the counter 
//     // this should also put one question with answers into the html with clock set to 30 sed.
//     //will need a check answer function that includes the timer, display correct, increment counters, a 3 sec counter before next question 
//  
  //  
//     //switch from start game to the list of questions and answers with radio buttons - this should be one question with answers 
//     $("#start-game").remove();
//     
//     //adds the done button 
//     $("#game-action").append('<br><button id="end">Done</button>');

//   },
// //checks answers increments score counters  
// //question one
//   done: function(){
//     $.each($("input[name='question-0']:checked"),function(){
//         if ($(this).val()==questions[0].correctAnswer) {
//           round.correctAnswers++;
//       }else{
//         round.incorrectAnswers++;
//       }
//     });
// //question two
//     $.each($("input[name='question-1']:checked"),function(){
//       if ($(this).val()==questions[1].correctAnswer) {
//         round.correctAnswers++;
//     }else{
//      round.incorrectAnswers++;
//     }
//   });
//   //question three 
//   $.each($("input[name='question-2']:checked"),function(){
//     if ($(this).val()== questions[2].correctAnswer) {
//      round.correctAnswers++;
//   }else{
//     round.incorrectAnswers++;
//   }
// });
// //question four
//   $.each($("input[name='question-3']:checked"),function(){
//     if ($(this).val()== questions[3].correctAnswer) {
//       round.correctAnswers++;
//   }else{
//     round.incorrectAnswers++;
//   }
// });
// //question five 
//   $.each($("input[name='question-4']:checked"),function(){
//     if ($(this).val()== questions[4].correctAnswer) {
//       round.correctAnswers++;
//   }else{
//     round.incorrectAnswers++;
//   }
// });
// //question six 
//   $.each($("input[name='question-5']:checked"),function(){
//     if($(this).val()== questions[5].correctAnswer){
//       round.correctAnswers++;
//     }else{
//       round.incorrectAnswers++;
//     }
//   });
//   // code to add a future 7th question if needed 
// //   $.each($("input[name='question-6']:checked"),function(){
// //     if ($(this).val()== questions[6].correctAnswer) {
// //       round.correctAnswers++;
// //   }else{
// //    round.incorrectAnswers++;
// //   }
// // });

// // writes results to HTML  
// //this will show after the last question is answered , clock will stop , start over option will be presented , click re starts game without reloadng page 
//   this.result();  
//   }, 
  
//   result: function(){
//     //clears the timer 
//     clearInterval(timer);
//     //removes game screen and shows you are done 
//     $('#game-action  h2').remove();
//     $('#game-action').html("<h2> You are done! </h2>");
//    //shows the count of answers 
//     $('#game-action').append("<h3>Correct Answers: " +this.correctAnswers+ "</h3>");
//     $('#game-action').append("<h3>Incorrect Answers: " +this.incorrectAnswers+ "</h3>");
//     $('#game-action').append("<h3>Unanswered: " +(questions.length-(this.incorrectAnswers+this.correctAnswers))+"</h3>");
//   }

// }



// NO CODE BELOW THIS LINE THIS IS END OF DOCUMENT READY 
// });
