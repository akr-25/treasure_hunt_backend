// var code = new Array(4).fill(0).map(() => new Array(4).fill(0)), // Color sequence the player needs to guess
//   guess = new Array(4).fill(0).map(() => new Array(4).fill(0)), // Color sequence of player's guesses
//   options = document.getElementsByClassName('option'),
//   inputRows = document.getElementsByClassName('guess'),
//   hintContainer = document.getElementsByClassName('hint'),
//   secretSockets = document.getElementsByClassName('secret socket'),
//   modalOverlay = document.getElementById('modalOverlay'),
//   modalMessage = document.getElementById('modalMessage'),
//   rowIncrement = 1,
//   hintIncrement = 1,
//   score = 0,
//   pegs = {
//     1: 'green_one',
//     2: 'green_two',
//     3: 'green_three',
//     4: 'purple_one',
//     5: 'purple_two',
//     6: 'purple_three',
//     7: 'red_one',
//     8: 'red_two',
//     9: 'red_three',
//     10: 'yellow_one',
//     11: 'yellow_two',
//     12: 'yellow_three',
//     13: 'blue_one',
//     14: 'blue_two',
//     15: 'blue_three',
//     16: 'brown_one',
//     17: 'brown_two',
//     18: 'brown_three',
//   };

// function gameSetup() {
//   generateSecretCode(1, 7);

//   // Add event listener to every code option button
//   for (var i = 0; i < options.length; i++)
//     options[i].addEventListener('click', insertGuess, false);

//   document.getElementById('newGame').onclick = newGame;
//   document.getElementById('delete').onclick = deleteLast;
// }
// var ii = 0;

// function insertGuess() {
//   var self = this;
//   var slots = inputRows[inputRows.length - rowIncrement].getElementsByClassName('socket');

//   slots[ii].className = slots[ii].className + ' peg ' + self.id; // Insert node into page

//   guess[ii][0] = (self.value - 1) / 3;
//   guess[ii][1] = (self.value-1) % 3;
//   ii++;
//   if (ii === 4) {
//     if (compare())
//       gameState('won');
//     else
//       rowIncrement += 1;
//   }
//   if (rowIncrement === inputRows.length + 1 && !compare())
//     gameState('lost');
// }

// function compare() {
//   var isMatch = true;
//   var codeCopy1 = [0, 0, 0, 0];
//   var codeCopy2 = [0, 0, 0, 0];
//   for (var i = 0; i < 4; i++){
//     if (guess[i][0] === code[i][0] && guess[i][1] === code[i][1]) {
//       insertPeg('hit');
//       codeCopy1[i] = -1;
//       codeCopy2[i] = -1;
//       score += (10*(inputRows.length-rowIncrement+1));
//     }
//     else {
//       isMatch = false;
//     }
//   }
//   for (var i = 0; i < 4; i++){
//     if (codeCopy1[i] === 0 && codeCopy2[i] === 0 && guess[i][0] === code[i][0]) {
//       insertPeg('almost');
//       codeCopy1[i] = -1;
//       score += (5 * (inputRows.length - rowIncrement+1));
//       codeCopy2[i] = -1;
//     }
//   }

//   for (var i = 0; i < 4; i++) {
//     if (codeCopy1[i] === 0 && codeCopy2[i] === 0 && guess[i][1] === code[i][1]) {
//       insertPeg('almost');
//       codeCopy1[i] = -1;
//       score += (5 * (inputRows.length - rowIncrement+1));
//       codeCopy2[i] = -1;
//     }
//   }


//   for (var i = 0; i < 4; i++) {
//     if (codeCopy2[i] === 0) {
//       for (var j = 0; j < 4; j++){
//         if (codeCopy1[j] === 0 && i != j && guess[i][0] === code[j][0] && guess[i][1] === code[j][1]) {
//           insertPeg('almost');
//           codeCopy1[j] = -1;
//           score += (5 * (inputRows.length - rowIncrement+1));
//           codeCopy2[i] = -1;
//         }
//       }
//     }
//   }

//   for (var i = 0; i < 4; i++) {
//     if (codeCopy2[i] === 0) {
//       for (var j = 0; j < 4; j++) {
//         if (codeCopy1[j] === 0 && i != j && guess[i][0] === code[j][0] && guess[i][1] !== code[j][1]) {
//           insertPeg('try');
//           codeCopy1[j] = -1;
//           score += (1 * (inputRows.length - rowIncrement+1));
//           codeCopy2[i] = -1;
//         }
//       }
//     }
//   }

//   for (var i = 0; i < 4; i++) {
//     if (codeCopy2[i] === 0) {
//       for (var j = 0; j < 4; j++) {
//         if (codeCopy1[j] === 0 && i != j && guess[i][0] !== code[j][0] && guess[i][1] === code[j][1]) {
//           insertPeg('try');
//           codeCopy1[j] = -1;
//           score += (1 * (inputRows.length - rowIncrement+1));
//           codeCopy2[i] = -1;
//         }
//       }
//     }
//   }
//   hintIncrement += 1; // Set the next row of hints as available
//   guess = new Array(4).fill(0).map(() => new Array(4).fill(0));         // Reset guess sequence
//   ii = 0;
//   return isMatch;
// }

// function insertPeg(type) {
//   if (hintIncrement == 21) {
//     var sockets = hintContainer[0].getElementsByClassName('js-hint-socket');
//     sockets[0].className = 'socket ' + type;
//   }
//   else {
//     var sockets = hintContainer[hintContainer.length - hintIncrement].getElementsByClassName('js-hint-socket');
//     sockets[0].className = 'socket ' + type;
//   }
// }

// function deleteLast() {
//   if (ii !== 0) {
//     var slots = inputRows[inputRows.length - rowIncrement].getElementsByClassName('socket');
//     slots[ii - 1].className = 'socket'; // Insert node into page
//     ii--;
//   }
// }

// function newGame() {
//   /*guess = new Array(4).fill(0).map(() => new Array(4).fill(0));        // Reset guess array
//   clearBoard();
//   rowIncrement = 1;  // Set the first row of sockets as available for guesses
//   hintIncrement = 1; // Set the first row of sockets as available for hints
//   hideModal();
//   gameSetup();           // Prepare the game*/
//   revealCode();
// }

// function hideModal() {
//   modalOverlay.className = '';
// }

// function clearBoard() {
//   // Clear the guess sockets
//   for (var i = 0; i < inputRows.length; i++) {
//     inputRows[i].innerHTML = '';
//     for (var j = 0; j < 4; j++) {
//       var socket = document.createElement('div');
//       socket.className = 'socket';
//       inputRows[i].appendChild(socket);
//     }
//   }

//   // Clear the hint sockets
//   for (var i = 0; i < hintContainer.length; i++) {
//     var socketCollection = hintContainer[i].getElementsByClassName('socket');
//     for (var j = 0; j < 4; j++) {
//       socketCollection[j].className = 'js-hint-socket socket';
//     }
//   }

//   // Reset secret code sockets
//   for (var i = 0; i < secretSockets.length; i++) {
//     secretSockets[i].className = 'secret socket';
//     secretSockets[i].innerHTML = '?';
//   }

//   document.getElementsByTagName('body')[0].className = ''; // Reset background
// }

// // Creates a color sequence that the player needs to guess
// function generateSecretCode(min, max) {
//   for (var i = 0; i < 4; i++) {
//     code[i][0] = Math.floor(Math.random() * ( 6 ));
//     code[i][1] = Math.floor(Math.random() * ( 3 ));
//     console.log(code[i][0]);
//     console.log(code[i][1]);
//   }
// }

// // Once the player runs out of guesses or crack the code - the sequence is revealed
// function revealCode() {
//   for (var i = 0; i < secretSockets.length; i++) {
//     secretSockets[i].className += ' ' + pegs[3 * code[i][0] + code[i][1] + 1];
//     console.log(3 * code[i][0] + code[i][1] + 1)
//     console.log("bab")
//     secretSockets[i].innerHTML = ''; // Remove "?" from the socket
//   }
// }

// function gameOver() {
//   // Disable color options
//   for (var i = 0; i < options.length; i++)
//     options[i].removeEventListener('click', insertGuess, false);

//   revealCode();
// }

// function gameState(state) {
//   gameOver();
//   document.getElementsByTagName('body')[0].className = state;
//   modalOverlay.className = state;

//   if (state === 'won') {
//     modalMessage.innerHTML = '<h2>You cracked the code!</h2> <p>Great! You are awesome! You should feel good now...</p> <button class="large" id="hideModal">OK</button> <button id="restartGame" class="large primary">Restart</button>';
//     document.getElementById('restartGame').onclick = newGame;
//     document.getElementById('hideModal').onclick = hideModal;
//   } else
//     modalMessage.innerHTML = '<h2>You failed...</h2> <p>What a shame... Look on the bright side - you weren\'t even close.</p> <button class="large" id="hideModal">OK</button> <button id="restartGame" class="large primary">Restart</button>';
//   document.getElementById('restartGame').onclick = newGame;
//   document.getElementById('hideModal').onclick = hideModal;
// }

// gameSetup(); // Run the game










/////////////////////////////////////////////////////////////////////////////////




var code = new Array(4).fill(0).map(() => new Array(4).fill(0)), // Color sequence the player needs to guess
  guess = new Array(4).fill(0).map(() => new Array(4).fill(0)), // Color sequence of player's guesses
  options = document.getElementsByClassName('option'),
  inputRows = document.getElementsByClassName('guess'),
  hintContainer = document.getElementsByClassName('hint'),
  secretSockets = document.getElementsByClassName('secret socket'),
  modalOverlay = document.getElementById('modalOverlay'),
  modalMessage = document.getElementById('modalMessage'),
  rowIncrement = 1,
  hintIncrement = 1,
  score = 0,
  pegs = {
    1: 'green_one',
    2: 'green_two',
    3: 'green_three',
    4: 'purple_one',
    5: 'purple_two',
    6: 'purple_three',
    7: 'red_one',
    8: 'red_two',
    9: 'red_three',
    10: 'yellow_one',
    11: 'yellow_two',
    12: 'yellow_three',
    13: 'blue_one',
    14: 'blue_two',
    15: 'blue_three',
    16: 'brown_one',
    17: 'brown_two',
    18: 'brown_three',
  };

function gameSetup() {
  generateSecretCode(1, 7);

  // Add event listener to every code option button
  for (var i = 0; i < options.length; i++)
    options[i].addEventListener('click', insertGuess, false);

  // document.getElementById("submit").onclick = newGame;
  document.getElementById('delete').onclick = deleteLast;
}
var ii = 0;

function insertGuess() {
  var self = this;
  var slots = inputRows[inputRows.length - rowIncrement].getElementsByClassName('socket');

  slots[ii].className = slots[ii].className + ' peg ' + self.id; // Insert node into page

  guess[ii][1] = (self.value - 1) % 3;
  guess[ii][0] = (((self.value - 1) - guess[ii][1])/ 3);
  ii++;
  if (ii === 4) {
    if (compare())
      gameState('won');
    else
      rowIncrement += 1;
  }
  if (rowIncrement === inputRows.length + 1)
    gameState('lost');
}

function compare() {
  var isMatch = true;
  var codeCopy1 = [0, 0, 0, 0];
  var codeCopy2 = [0, 0, 0, 0];
  for (var i = 0; i < 4; i++) {
    console.log(codeCopy1[i]);
    console.log(codeCopy2[i]);
    console.log(code[i][0]);
    console.log(code[i][1]);
    console.log(guess[i][0]);
    console.log(guess[i][1]);
    if (guess[i][0] === code[i][0] && guess[i][1] === code[i][1]) {
      insertPeg('hit');
      codeCopy1[i] = -1;
      codeCopy2[i] = -1;
      score += (10 * (inputRows.length - rowIncrement + 1));
    }
    else {
      isMatch = false;
    }
  }
  for (var i = 0; i < 4; i++) {
    if (codeCopy1[i] === 0 && codeCopy2[i] === 0 && guess[i][0] === code[i][0]) {
      insertPeg('almost');
      codeCopy1[i] = -1;
      score += (5 * (inputRows.length - rowIncrement + 1));
      codeCopy2[i] = -1;
    }
  }

  for (var i = 0; i < 4; i++) {
    if (codeCopy1[i] === 0 && codeCopy2[i] === 0 && guess[i][1] === code[i][1]) {
      insertPeg('almost');
      codeCopy1[i] = -1;
      score += (5 * (inputRows.length - rowIncrement + 1));
      codeCopy2[i] = -1;
    }
  }


  for (var i = 0; i < 4; i++) {
    if (codeCopy2[i] === 0) {
      for (var j = 0; j < 4; j++) {
        if (codeCopy1[j] === 0 && i != j && guess[i][0] === code[j][0] && guess[i][1] === code[j][1]) {
          insertPeg('almost');
          codeCopy1[j] = -1;
          score += (5 * (inputRows.length - rowIncrement + 1));
          codeCopy2[i] = -1;
        }
      }
    }
  }

  for (var i = 0; i < 4; i++) {
    if (codeCopy2[i] === 0) {
      for (var j = 0; j < 4; j++) {
        if (codeCopy1[j] === 0 && i != j && guess[i][0] === code[j][0] && guess[i][1] !== code[j][1]) {
          insertPeg('try');
          codeCopy1[j] = -1;
          score += (1 * (inputRows.length - rowIncrement + 1));
          codeCopy2[i] = -1;
        }
      }
    }
  }

  for (var i = 0; i < 4; i++) {
    if (codeCopy2[i] === 0) {
      for (var j = 0; j < 4; j++) {
        if (codeCopy1[j] === 0 && i != j && guess[i][0] !== code[j][0] && guess[i][1] === code[j][1]) {
          insertPeg('try');
          codeCopy1[j] = -1;
          score += (1 * (inputRows.length - rowIncrement + 1));
          codeCopy2[i] = -1;
        }
      }
    }
  }
  hintIncrement += 1; // Set the next row of hints as available
  guess = new Array(4).fill(0).map(() => new Array(4).fill(0));         // Reset guess sequence
  ii = 0;
  return isMatch;
}

function insertPeg(type) {
  if (hintIncrement == 21) {
    var sockets = hintContainer[0].getElementsByClassName('js-hint-socket');
    sockets[0].className = 'socket ' + type;
  }
  else {
    var sockets = hintContainer[hintContainer.length - hintIncrement].getElementsByClassName('js-hint-socket');
    sockets[0].className = 'socket ' + type;
  }
}

function deleteLast() {
  if (ii !== 0) {
    var slots = inputRows[inputRows.length - rowIncrement].getElementsByClassName('socket');
    slots[ii - 1].className = 'socket'; // Insert node into page
    ii--;
  }
}

function newGame() {
  /*guess = new Array(4).fill(0).map(() => new Array(4).fill(0));        // Reset guess array
  clearBoard();
  rowIncrement = 1;  // Set the first row of sockets as available for guesses
  hintIncrement = 1; // Set the first row of sockets as available for hints
  hideModal();
  gameSetup();           // Prepare the game*/
  revealCode();
}

function hideModal() {
  modalOverlay.className = '';
}

function clearBoard() {
  // Clear the guess sockets
  for (var i = 0; i < inputRows.length; i++) {
    inputRows[i].innerHTML = '';
    for (var j = 0; j < 4; j++) {
      var socket = document.createElement('div');
      socket.className = 'socket';
      inputRows[i].appendChild(socket);
    }
  }

  // Clear the hint sockets
  for (var i = 0; i < hintContainer.length; i++) {
    var socketCollection = hintContainer[i].getElementsByClassName('socket');
    for (var j = 0; j < 4; j++) {
      socketCollection[j].className = 'js-hint-socket socket';
    }
  }

  // Reset secret code sockets
  for (var i = 0; i < secretSockets.length; i++) {
    secretSockets[i].className = 'secret socket';
    secretSockets[i].innerHTML = '?';
  }

  document.getElementsByTagName('body')[0].className = ''; // Reset background
}

// Creates a color sequence that the player needs to guess
function generateSecretCode(min, max) {
  for (var i = 0; i < 4; i++) {
    code[i][0] = Math.floor(Math.random() * (6));
    code[i][1] = Math.floor(Math.random() * (3));
    console.log(code[i][0]);
    console.log(code[i][1]);
  }
}

// Once the player runs out of guesses or crack the code - the sequence is revealed
function revealCode() {
  for (var i = 0; i < secretSockets.length; i++) {
    secretSockets[i].className += ' ' + pegs[3 * code[i][0] + code[i][1] + 1];
    console.log(3 * code[i][0] + code[i][1] + 1)
    secretSockets[i].innerHTML = ''; // Remove "?" from the socket
  }
}

function gameOver() {
  // Disable color options
  for (var i = 0; i < options.length; i++)
    options[i].removeEventListener('click', insertGuess, false);

  revealCode();
}

function gameState(state) {
  gameOver();
  document.getElementsByTagName('body')[0].className = state;
  modalOverlay.className = state;

  if (state === 'won') {
    modalMessage.innerHTML = '<h2>You cracked the code!</h2> <p>Great! You are awesome! You should feel good now...</p> <button class="large" id="hideModal">OK</button> <button id="restartGame" class="large primary">Restart</button>';
    document.getElementById('restartGame').onclick = newGame;
    document.getElementById('hideModal').onclick = hideModal;
  } else
    modalMessage.innerHTML = '<h2>You failed...</h2> <p>What a shame... Look on the bright side - you weren\'t even close.</p> <button class="large" id="hideModal">OK</button> <button id="restartGame" class="large primary">Restart</button>';
  document.getElementById('restartGame').onclick = newGame;
  document.getElementById('hideModal').onclick = hideModal;
}

gameSetup(); // Run the game




//####################### code for timer ############################

var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
setInterval(setTime, 1000);

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

let submit = document.getElementById('submit')
submit.addEventListener('click',()=>{
  console.log(totalSeconds);
})
// console.log("score is", score);
