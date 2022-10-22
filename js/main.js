import Quiz from "./apiHandler.js";

// (async function(){
//     let res = await Quiz.getQuestions()
//     console.log(res)
//     console.log(Quiz.parseQuestion(res[0]))
// })()
const categoryInput = $('#categories')[0];
const difficultyInput = $('#difficulties')[0];
const amountInput = $('#amount')[0];
const startQuizBtn = $("main div section").eq(0).find("button")[0];

const QuestionNumElement =  $('#questions .card-header h3')[0];
const QuestionTextElement =  $('#questions .card-body h3')[0];
const QuestionChoicesElement =  $('#questions .card-body #answers')[0];
const QuestionCategoryElement =  $('#questions .card-footer p span')[0];
const QuestionDifficultyElement =  $('#questions .card-footer p span')[1];
const submitAnswerBtn = $("main div section").eq(1).find("button")[0];

const finishOverlayElement = $('#overlay')[0];
const scoreElement = $('#overlay .card-body h3 span')[0];
const evaluationElement = $('#overlay .card-body h5 span')[0];
const doneQuizBtn = $('#overlay .card-body button')[0];


let questionsList = []
let currentQuestionNum = 0;
let userCorrectAnsNum = 0;

onInit();

function onInit() 
{
  $("h1").fadeIn(300, () => {
    $("main").slideDown(500);
  });

  $('h1').on('click',reset)
}

function reset()
{
  $("main").slideUp(500, function () {
    $("main div section").eq(0).css("display", "block");
    $("main div section").eq(1).css("display", "none");
    $("main").slideDown(500);
  });

  currentQuestionNum = 0;
  userCorrectAnsNum = 0;
}

async function loadQuestions() 
{
  currentQuestionNum = 0;

  Quiz.category = categoryInput.value;
  Quiz.difficulty = difficultyInput.value;
  Quiz.amount = parseInt(amountInput.value) > 30 ? "30":amountInput.value;


  questionsList = await Quiz.getQuestions()
  console.log(questionsList)
  loadQuestionUI();
}

function loadQuestionUI()
{
  if(currentQuestionNum >= questionsList.length )
  {
    finishOverlayElement.classList.add('d-flex');
    quizEvaluation();
    return;
  }

  const question = Quiz.parseQuestion(questionsList[currentQuestionNum]);

  QuestionNumElement.innerHTML = `Question #${currentQuestionNum+1}:`;
  QuestionTextElement.innerHTML = question.questionText;
  QuestionCategoryElement.innerHTML = question.category;
  QuestionDifficultyElement.innerHTML = question.difficulty;

  let choiceElements = ``;
  for (let i = 0; i < question.choices.length; i++) 
  {
    choiceElements += createChoice(question.choices[i]);  
  }
  QuestionChoicesElement.innerHTML = choiceElements;

  currentQuestionNum++;
}

function createChoice(choiceText)
{
  return `<input type="radio" name="answers" class="radioBtns fs-5">
          <label>${choiceText}</label>
          <br>`;
}

function quizEvaluation()
{
  scoreElement.innerHTML = `${userCorrectAnsNum}/${questionsList.length}`;
  if( userCorrectAnsNum >= (questionsList.length/2) )
  {
    evaluationElement.innerHTML = "PASS";
    evaluationElement.style.color = "var(--success-color)";
  }
  else
  {
    evaluationElement.innerHTML = "FAIL";
    evaluationElement.style.color = "var(--error-color)";
  }
  
}

startQuizBtn.addEventListener("click", async function(){
    
  $(this).addClass('btn-disabled');
  this.innerHTML = "starting.....";

  await loadQuestions();

  $("main").slideUp(500, function () {
      $("main div section").eq(0).css("display", "none");
      $("main div section").eq(1).css("display", "block");
      $(this).slideDown(500);
  });
  
  this.innerHTML = "Start Quiz";
  $(this).removeClass('btn-disabled');

});

submitAnswerBtn.addEventListener("click", () => {
  let radios = $(".radioBtns");

  for (let i = 0; i < radios.length; i++) 
  {
    if (radios[i].checked === true) 
    {
      const answer = radios[i].nextElementSibling.innerHTML;
      const corretAnswer = questionsList[currentQuestionNum-1].correct_answer;
      console.log(answer, corretAnswer, currentQuestionNum)
      if(answer === corretAnswer){ userCorrectAnsNum++; }
      else{console.log('WRONG ANSWER')}

      loadQuestionUI();
      return;
    }
  }

  $('#error-message').fadeIn(300,function(){
    setTimeout(()=> $(this).fadeOut(300) ,300)
  });
  
});

doneQuizBtn.addEventListener("click",()=>{
  finishOverlayElement.classList.remove("d-flex");
  reset();
});

