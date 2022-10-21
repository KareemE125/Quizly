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

let questionsList = []
let currentQuestionNum = 0;

onInit();

function onInit() 
{
  $("h1").fadeIn(300, () => {
    $("main").slideDown(500);
  });

  $('h1').on('click',()=>{
    $("main").slideUp(500, function () {
        $("main div section").eq(0).css("display", "block");
        $("main div section").eq(1).css("display", "none");
        $(this).slideDown(500);
    });
  })
}

async function loadQuestions() 
{
  currentQuestionNum = 0;

  Quiz.category = categoryInput.value;
  Quiz.difficulty = difficultyInput.value;
  Quiz.amount = amountInput.value;


  questionsList = await Quiz.getQuestions()
  console.log(questionsList)
  loadQuestionUI();
}

function loadQuestionUI()
{
  if(currentQuestionNum >= questionsList.length )
  {
    //TODO: Run End Quiz Page
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

startQuizBtn.addEventListener("click", async function(){
    
  $(this).addClass('btn-disabled');
  this.innerHTML = "starting.....";

  await loadQuestions();

  $("main").slideUp(500, function () {
      $("main div section").eq(0).css("display", "none");
      $("main div section").eq(1).css("display", "block");
      $(this).slideDown(500);
  });
  
  $(this).removeClass('btn-disabled');
  this.innerHTML = "Start Quiz";

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
      if(answer !== corretAnswer){console.log("wrong")}
      else{console.log('right')}

      loadQuestionUI();
      return;
    }
  }

  $('#error-message').fadeIn(300,function(){
    setTimeout(()=> $(this).fadeOut(300) ,300)
  });
  
});
