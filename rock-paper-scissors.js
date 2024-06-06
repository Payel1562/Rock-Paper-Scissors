let score=JSON.parse(localStorage.getItem('score')) || {
  wins:0,//default operator
  losses:0,
  ties:0
};//keeping it outside the function or lese it will reloadn the score after every game
//json.parse convert it back to object
//changine from const to let(helps in reassigning the values)

updateScoreElement();
/*if(score===null){//null(!score)
score={
  wins:0,
  losses:0,
  ties:0
};null is when we intentionally want something to be empty
while undefined is 
}*/

let isAutoPlaying=false;
let intervalId;

//const autoPlay=()=>{

//};
function autoPlay(){
  if (!isAutoPlaying){
    intervalId=setInterval(()=>{
      const playerMove=pickComputerMove();
      playGame(playerMove);
    },1000)
  isAutoPlaying=true;
  }else{
    clearInterval(intervalId);
    isAutoPlaying=false;
  }
}
  
document.querySelector('.js-rock-button')
  .addEventListener('click',()=>{
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click',()=>{
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click',()=>{
    playGame('scissors');
  });

//keydown helps us play with the help of computer keyboard 

document.body.addEventListener('keydown',(event)=>{
  //console.log(event.key);//for which key we are pressing
  if(event.key==='r'){
    playGame('rock');
  }else if(event.key==='p'){
    playGame('paper');
  }else if(event.key==='s'){
    playGame('scissors');
  }
});


function playGame(playerMove){
const computerMove=pickComputerMove();//console shows return value as used in script

result='';

if (playerMove==='scissors'){
  if(computerMove==='rock'){
  result='You Lose.'
}else if(computerMove==='paper'){
  result='You Win.'
}else if(computerMove==='scissors'){
  result='Tie.';
}
}

else if(playerMove==='paper'){
  if(computerMove==='rock'){
    result='You Win.';
  }else if(computerMove==='paper'){
    result='Tie.';
  }else if(computerMove==='scissors'){
    result='You Lose.';
  }
  }

  else if(playerMove==='rock'){
    if(computerMove === 'rock'){
    result='Tie.';
  }else if(computerMove === 'paper'){
    result='You Lose.';
  }else if(computerMove ==='scissors'){
    result='You Win.';
  }
  }

  if(result==='You Win.'){//UPDATE THE SCORE
    score.wins++;//score.wins+=1;
  }else if(result==='You Lose.'){
    score.losses++;
  }else if(result==='Tie.'){
    score.ties++;
  }

  localStorage.setItem('score',JSON.stringify(score));
//json.stringify converts into string
//updation of score inside teh web page
updateMoves();
document.querySelector('.js-result').innerHTML = 
  `You <img src="images/${playerMove}-emoji.png">
  <img src="images/${computerMove}-emoji.png">
  Computer `;
updateScoreElement();

//alert(`You picked ${playerMove}, Computer picked ${computerMove}. ${result}

}
function updateScoreElement(){
  document.querySelector('.js-score').innerHTML=
  `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}
function updateMoves(){
  document.querySelector('.js-moves').innerHTML=
  result;
}
function pickComputerMove(){
  randomNumber=Math.random();
  let computerMove='';//global variable
  if(randomNumber>=0 && randomNumber<1/3){
    computerMove='rock';
  }else if(randomNumber>=1/3 && randomNumber<2/3){
    computerMove='paper';
  }else if(randomNumber>=2/3 && randomNumber<=1){
    computerMove='scissors';
  }
  return computerMove;//we can return a calculation,sting or any variable
}