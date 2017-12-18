$(() => {

  const $startBtn = $('#start-button');
  const $screen = $('.screen');
  const $buttons = $('.color-buttons');
  const colorArray = ['red', 'blue', 'yellow', 'green', 'orange', 'purple'];
  let lives = 3;
  let score = null;
  let fontColor = null;

  function runGame(){
    if (lives <= 0) {
      console.log('Game Over');
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
      console.log(`Score: ${score}`);
      return runGame();
    } else {
      lives -= 1;
      console.log(`Lives: ${lives}`);
      return runGame();
    }
  }

  $startBtn.on('click', runGame);
});
