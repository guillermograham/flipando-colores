$(() => {

  const $startBtn = $('#start-button');
  const $quit = $('#quit-button');
  const $screen = $('.screen');
  const $buttons = $('.color-buttons');
  const $scoreDisplay = $('.score-display');
  const $livesRemaining = $('.lives-remaining');
  const $timeRemaining = $('.time-display');
  const $red = $('#red');
  const $blue = $('#blue');
  const $yellow = $('#yellow');
  const $green = $('#green');
  const $orange = $('#orange');
  const $purple = $('#purple');
  const colorArray = ['red', 'blue', 'yellow', 'green', 'orange', 'purple'];
  let tempArray = ['red', 'blue', 'yellow', 'green', 'orange', 'purple'];
  let lives = 3;
  let score = 0;
  let fontColor = null;
  let clockTimer;
  let seconds = null;
  let levelCount = 5;

  function runGame(){
    resetClock();
    $startBtn.off('click', runGame);
    $scoreDisplay.animate({ 'font-size': '10'}, 100);
    $scoreDisplay.text(score);
    $timeRemaining.text(seconds);
    $livesRemaining.animate({ 'font-size': '10'}, 100);
    $livesRemaining.text(lives);
    if (lives <= 0) {
      $screen.css('color', 'black');
      $screen.text('Game Over');
      resetGame();
      resetClock();
    } else {
      if (levelCount < 4) shuffle(tempArray);
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
    $buttons.css('border', '1px solid black');
    levelCount = 5;
    $startBtn.on('click', runGame);
  }

  function resetClock(){
    clockTimer = null;
    seconds = levelCount;
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
      $scoreDisplay.animate({ 'font-size': '30'}, 100);
      // resetClock();
      if (score === 100){
        levelCount--;
        return runGame();
      } else if (score === 200) {
        levelCount--;
        return runGame();
      } else if (score === 300) {
        levelCount--;
        return runGame();
      } else {
        return runGame();
      }
    } else {
      lives -= 1;
      $livesRemaining.text(lives);
      $livesRemaining.animate({ 'font-size': '30'}, 100);
      // resetClock();
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
      $livesRemaining.text(lives);
      $livesRemaining.animate({ 'font-size': '30'}, 100);
      resetClock();
      return runGame();
    }
  }

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    assignBorders();
  }

  function assignBorders(){
    $red.css('border', `2px solid ${tempArray[0]}`);
    $blue.css('border', `2px solid ${tempArray[1]}`);
    $yellow.css('border', `2px solid ${tempArray[2]}`);
    $green.css('border', `2px solid ${tempArray[3]}`);
    $orange.css('border', `2px solid ${tempArray[4]}`);
    $purple.css('border', `2px solid ${tempArray[5]}`);
  }

  function quitGame(){
    location.reload();
  }

  $startBtn.on('click', runGame);
  $quit.on('click', quitGame);
});
