'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = 'abcd';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
let userGuess = ''
const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}



const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateHint = (guess) =>  {

  let solutionArrary = solution.split("")
  let guessArray = guess.split("")

  let correctLetterLocations = 0

  for(let i = 0; i < solutionArrary.length; i++){
    if(guessArray[i] == solutionArrary[i]){
      correctLetterLocations++
      solutionArrary[i] = null

      //solution array [null, b, c, d]
    }
  }

  let correctLetters = 0

  for(let j = 0; j < solutionArrary.length; j++){
    let targetIndex = solutionArrary.indexOf(guessArray[j])

    if(targetIndex >= 0){
      correctLetters++
      solutionArrary[targetIndex] = null
    }
  }
 //solution array [null, b, null, null] 

  return `${correctLetterLocations}-${correctLetters}`
}


const mastermind = (guess) => {
   userGuess = guess
  if(userGuess == solution){
    console.log("You guessed it!")
    return "You guessed it!"
  }
  else{
      let hint = generateHint(userGuess)
      board.push(userGuess + " " + hint)
      if(board.length == 10){
        console.log('You ran out of turns! The solution was ' + solution)
        return 'You ran out of turns! The solution was ' + solution
      }
      else{
        console.log('Guess again')
        return 'Guess again'
      }
  }

}


const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess) 
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}