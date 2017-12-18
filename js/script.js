$(() => {

  const $startBtn = $('#start-button');
  const $screen = $('.screen');
  const colorArray = ['red', 'blue', 'yellow', 'green', 'orange', 'purple'];
  let lives = 3;
  let score = null;

  function runGame(){
    setScreen();
    colorWord();
  }

  function setScreen(){
    const screenWord = colorArray[Math.floor(Math.random()*colorArray.length)];
    return $screen.text(screenWord);
  }

  function colorWord(){
    const fontColor = colorArray[Math.floor(Math.random()*colorArray.length)];
    return $screen.css('color', `${fontColor}`);
  }

  $startBtn.on('click', runGame);
});
