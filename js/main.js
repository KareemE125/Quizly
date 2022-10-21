import Quiz from "./apiHandler.js";

// (async function(){
//     let res = await Quiz.getQuestions()
//     console.log(res)
//     console.log(Quiz.parseQuestion(res[0]))
// })()

function onInit() {
  $("h1").fadeIn(300, () => {
    $("main").slideDown(500);
  });
}

onInit();

const startQuizBtn = $("main div section").eq(0).find("button")[0];
const submitAnswerBtn = $("main div section").eq(1).find("button")[0];

startQuizBtn.addEventListener("click", () => {
  $("main").slideDown(500, function () {
    $(this).slideUp(500, () => {
      $("main div section").eq(0).css("display", "none");
      $("main div section").eq(1).css("display", "block");
      $(this).slideDown(500);
    });
  });
});

submitAnswerBtn.addEventListener("click", () => {
  let radios = $(".radioBtns");

  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked === true) {
      console.log(radios[i].nextElementSibling.innerHTML);
      return;
    }
  }

  $('#error-message').fadeIn(300,function(){
    setTimeout(()=>{
    $(this).fadeOut(300)
  },300)
  })
  

});
