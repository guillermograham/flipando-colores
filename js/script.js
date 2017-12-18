$(() => {

  const $startBtn = $('#start-button');
  const $screen = $('.screen');
  const $buttons = $('.color-buttons');
  const $scoreDisplay = $('.score-display');
  const $livesRemaining = $('.lives-remaining');
  const colorArray = ['red', 'blue', 'yellow', 'green', 'orange', 'purple'];
  let lives = 3;
  let score = null;
  let fontColor = null;

  function runGame(){
    $livesRemaining.text(lives);
    if (lives <= 0) {
      $screen.text('Game Over');
    } else {
      setScreen();
      colorWord();
      activateButtons();
    }
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
    $buttons.off('click', checkAnswer);
    const answer = $(e.target).attr('id');
    if (answer === fontColor){
      score += 10;
      $scoreDisplay.text(score);
      return runGame();
    } else {
      lives -= 1;
      $livesRemaining.text(lives);
      return runGame();
    }
  }

  $startBtn.on('click', runGame);
});
