// Variables
let sequence = [],
humanSequence = [];
let level = 0;
let tiles = ['red', 'green', 'blue', 'yellow'];
let strict = false;

// Functio to call when the document is loaded
$(document).ready(() => {
    $('.info').text("");
    $('.level').text(`Level 1 of 20`);
})

// Function to call when the start button is clicked
$('#start').on('click', () => {
    $('.info').text("Game Started");
    nextRound();
})

// Function to call when the strict button is clicked
$('#strict').on('click', ()=>{
    strict = !strict;
})

// Function to start the next round of the game
const nextRound = () => {
    level += 1;

    let nextSeq = [...sequence];
    nextSeq.push(nextStep());
    playRound(nextSeq);

    $('.level').text(`Level ${level} of 20`);

    sequence = [...nextSeq];
    setTimeout(() => {
        $('.tile-container').removeClass('unclickable')
    }, level * 600 + 1000);
}

// Function to get the next step of the game level
const nextStep = () => {
    let rdmIndex = tiles[Math.floor(Math.random() * tiles.length)];
    return rdmIndex;
}

// Function to start the button presses
const playRound = (arr) => {
    arr.forEach((color, index) => {
        setTimeout(() => {
            const sound = document.querySelector(`[data-sound=${color}]`);
            $(`div[data-tile=${color}]`).addClass('active');
            sound.play();

            setTimeout(() => {
                $(`[data-tile=${color}]`).removeClass('active')
            }, 300)
        }, (index+1)*600)
    })
}

// Function to get the dataset of the tile clicked
$('.tile-container').on('click', event => {
    const { tile } = event.target.dataset;
  
    if (tile) handleClick(tile);
});

// Function to handle the tile click and see if its correct
function handleClick(tile) {
    const index = humanSequence.push(tile) - 1;
    const sound = document.querySelector(`[data-sound='${tile}']`);
    sound.play();
  
    const remainingTaps = sequence.length - humanSequence.length;
  
    if (humanSequence[index] !== sequence[index]) {
      $('.info').text('Oops! Game over, you pressed the wrong tile');
      if(strict === true) {
        reset();
       }else { 
        $('.info').text(`Your turn: ${remainingTaps > -1 ? remainingTaps : 0} Tap${
            remainingTaps > -1 ? 's' : ''
        }`);
        playRound(sequence); 
       }
      return;
    }
  
    if (humanSequence.length === sequence.length) {
      if (humanSequence.length === 20) {
        $('.info').text("Congrats! You completed all the levels!");
        return
      }
      
      humanSequence = [];
      setTimeout(() => {
        nextRound();
      }, 1000);
      return;
    }
  
    $('.info').text(`Your turn: ${remainingTaps > -1 ? remainingTaps : 0} Tap${
        remainingTaps > -1 ? 's' : ''
    }`);
}
  
// Function to reset the game
const reset = () => {
    sequence = [];
    humanSequence = [];
    level = 0;
    strict = false;
    $('.info').text("");
    $('.level').text(`Level 1 of 20`);
    $('.tile-container').addClass('unclickable')
}

// Function to call when the reset button is clicked
$('#reset').on('click', function() {
    reset();
})