//getting all required elements
const start_btn = document.querySelector(".start-btn");
const info_box = document.querySelector(".info-box");
const  exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz-box");
const timecount = quiz_box.querySelector(".timer .timer-sec");
const timeLine = quiz_box.querySelector("header .time_line");
const timeoff = quiz_box.querySelector("header .time-text");


const option_list = document.querySelector(".option_list");

//if start quiz button clicked
start_btn.onclick = () =>{
    info_box.classList.add("activeInfo"); //show the info box
}

//if exit button clicked
exit_btn.onclick = () =>{
    info_box.classList.remove("activeInfo"); //hide the info box
}

//if continue button clicked
continue_btn.onclick = () =>{
    info_box.classList.remove("activeInfo"); //hide the info box
    quiz_box.classList.add("activeQuiz"); //show the quiz box
    showQuestions(0);
    queCounter(1);
    starttimer(15);
    starttimerline(0);
}

let que_count = 0;
let que_numb = 1;
let counter;
let counterline;
let timevalue = 15;
let widthvalue = 0;
let userScore = 0;


const next_btn = quiz_box.querySelector(".next-btn");
const result_box = document.querySelector(".result-box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = () =>{
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeresult");
    let que_count = 0;
    let que_numb = 1;
    let timevalue = 15;
    let widthvalue = 0;
    let userScore = 0;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    starttimer(timevalue);
    clearInterval(counterline);
    starttimerline(widthvalue);
    next_btn.style.display = "none";
}

quit_quiz.onclick = ()=>{
    window.location.reload();
}

//if next btn clicked
next_btn.onclick = ()=>{
  if( que_count < questions.length -1){
    que_count++;
    que_numb++;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    starttimer(timevalue);
    clearInterval(counterline);
    starttimerline(widthvalue);
    next_btn.style.display = "none";
    timeoff.textContent = "Time Left";

  }else{
    clearInterval(counter);
    clearInterval(counterline);
    console.log("Questions Completed");
    showResultbox()
  }
  
}

//getting ques/Ans from array
function showQuestions(index) {
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>'+  questions [index].numb + ". " + questions [index] .question +'</span>'
    let option_tag = ' <div class="option">' + questions [index].options[0] +'<span></span></div>'
                   + '<div class="option">'+ questions [index].options[1] +'<span></span></div>'
                   + '<div class="option">'+ questions [index].options[2] +'<span></span></div>'
                   + '<div class="option">'+ questions [index].options[3] +'<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML= option_tag;
    const option =  option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick","optionSelected(this)");
    }
}

let tickicon = ' <div class="icon tick"><i class="fa-solid fa-check"></i></div>';
let crossicon = '<div class="icon cross"><i class="fa-solid fa-xmark"></i></div>';


function optionSelected( answer) {
    clearInterval(counter);
    clearInterval(counterline);
    let userAns =  answer.textContent;
    let correctAns = questions[que_count].answer;
    let alloptions = option_list.children.length;
    if (userAns == correctAns) {
        userScore += 1;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("Answer is Correct"); 
        answer.insertAdjacentHTML("beforeend", tickicon);  
    }
    else{
        answer.classList.add("incorrect");
        console.log("Answer is Wrong"); 
        answer.insertAdjacentHTML("beforeend", crossicon);

//if answers is incorrect then automatically selected correct answer
for (let i = 0; i < alloptions; i++) {
   if( option_list.children[i].textContent == correctAns ){
    option_list.children[i].setAttribute("class", "option correct");
    option_list.children[i].insertAdjacentHTML("beforeend", tickicon); 
   }
}
    }

//once user selected disabled all options
for (let i = 0; i < alloptions; i++) {
    option_list.children[i].classList.add("disabled");   
}
next_btn.style.display = "block";
}

function showResultbox(){
    info_box.classList.remove("activeInfo"); //hide the info box
    quiz_box.classList.remove("activeQuiz"); //hide the quiz box 
    result_box.classList.add("activeresult"); //show the result box
    const scoretext = result_box.querySelector(".score-text");
    if(userScore > 7){
  let scoreTag = ' <span>and Congrats!, you got <p>'+ userScore  +'</p> out of <p>'+ questions.length +'</p> </span>';
  scoretext.innerHTML =  scoreTag;
    }

    else if(userScore > 5){
        let scoreTag = ' <span>and nice!, you got <p>'+ userScore  +'</p> out of <p>'+ questions.length +'</p> </span>';
        scoretext.innerHTML =  scoreTag;
          }

    else{
   let scoreTag = ' <span>and sorry, you got only <p>'+ userScore  +'</p> out of <p>'+ questions.length +'</p> </span>';
    scoretext.innerHTML =  scoreTag;
              }
}

function starttimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timecount.textContent = time;
time--;
if(time < 9 ){
    let addzero = timecount.textContent;
    timecount.textContent = "0" + addzero;
}
if(time < 0){
    clearInterval(counter);
    timecount.textContent = "00";
    timeoff.textContent = "Time Off";

    let userAns =  answer.textContent;
    let correctAns = questions[que_count].answer;

    for (let i = 0; i < alloptions; i++) {
        if( option_list.children[i].textContent == correctAns ){
         option_list.children[i].setAttribute("class", "option correct");
         option_list.children[i].insertAdjacentHTML("beforeend", tickicon); 
        }
     }

     for (let i = 0; i < alloptions; i++) {
        option_list.children[i].classList.add("disabled");   
    }
    next_btn.style.display = "block";
         }
}
    } 



function starttimerline(time) {
    counterline = setInterval(timer, 29);
    function timer() {
        time += 1;
        timeLine.style.width = time + "px";
if(time > 549){
    clearInterval(counterline);
}
    } 
}

function queCounter(index) {
    const bottom_ques_counter = quiz_box.querySelector('.total-quiz');
    let totalQuescounttag = ' <span><p>' + index + '</p> of <p>'+ questions.length  + '</p> Questions!</span>';
    bottom_ques_counter.innerHTML = totalQuescounttag;  
}














