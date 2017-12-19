$(() => {

  const $startBtn = $('#start-button');
  const $quit = $('#quit-button');
  const $screen = $('.screen');
  const $buttons = $('.color-buttons');
  const $scoreDisplay = $('.score-display');
  const $livesRemaining = $('.lives-remaining');
  const $timeRemaining = $('.time-display');
  const colorArray = ['red', 'blue', 'yellow', 'green', 'orange', 'purple'];
  let lives = 3;
  let score = 0;
  let fontColor = null;
  let clockTimer;
  let seconds = 5;

  function runGame(){
    $startBtn.off('click', runGame);
    $scoreDisplay.text(score);
    $timeRemaining.text(seconds);
    $livesRemaining.text(lives);
    if (lives <= 0) {
      $screen.css('color', 'black');
      $screen.text('Game Over');
      resetGame();
      resetClock();
    } else {
      startCountdownTimer();
      setScreen();
      colorWord();
      activateButtons();
    }
  }

  function resetGame(){
    lives = 3;
    score = 0;
    fontColor = null;
    $startBtn.on('click', runGame);
  }

  function resetClock(){
    clockTimer = null;
    seconds = 5;
  }

  function setScreen(){
    const screenWord = colorArray[Math.floor(Math.random()*colorArray.length)];
    return $screen.text(screenWord);
  }

  function colorWord(){
    fontColor = colorArray[Math.floor(Math.random()*colorArray.length)];
    return $screen.css('color', `${fontColor}`);
  }

  function activateButtons(){
    return $buttons.on('click', checkAnswer);
  }

  function checkAnswer(e){
    clearInterval(clockTimer);
    $buttons.off('click', checkAnswer);
    const answer = $(e.target).attr('id');
    if (answer === fontColor){
      score += 10;
      $scoreDisplay.text(score);
      resetClock();
      return runGame();
    } else {
      lives -= 1;
      $livesRemaining.text(lives);
      resetClock();
      return runGame();
    }
  }

  function startCountdownTimer(){
    clockTimer = setInterval(setCountdown, 1000);
  }

  function setCountdown(){
    seconds--;
    $timeRemaining.text(seconds);
    if (seconds === 0){
      $buttons.off('click', checkAnswer);
      clearInterval(clockTimer);
      lives -=1;
      resetClock();
      return runGame();
    }
  }

  function quitGame(){
    location.reload();
  }

  $startBtn.on('click', runGame);
  $quit.on('click', quitGame);
});
