import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent implements OnInit {
  title = 'Tic Tac Toe';
  grid = [
    ['-', '-', '-'],
    ['-', '-', '-'],
    ['-', '-', '-']];
  buttonsDisabled = false;

  constructor() {
    let player_turn = 'player'; // alt: 'ai'

  }

  ngOnInit() {
  }

  onClick(event) {
    const target = event.currentTarget;
    const idAttr = target.attributes.id.value;

    // Tests to see the contents and properties of <idAttr>
    //console.log(idAttr);
    //console.log(typeof(idAttr));
    //this.logProperties(idAttr);

    const row = Number(idAttr.charAt(0));
    const column = Number(idAttr.charAt(1));

    const value = target.nodeValue;
    const content = target.childNodes[0].textContent;

    if (content === '-') {
      this.grid[row][column] = 'X';
      let winner = this.hasWinner();
      if (!winner) {
        this.aiTurn();
      } else {
        this.title = 'The winner is: ' + winner;
        this.buttonsDisabled = true;
      }
    } else {
      console.log('Invalid move!');
    }
  }

  private aiTurn() {
    let randomRow;
    let randomColumn;
    let turnDone = false;

    while (!turnDone) {
      randomRow = Math.floor(Math.random() * 3);
      randomColumn = Math.floor(Math.random() * 3);
      console.log(randomRow, randomColumn);
      if (this.grid[randomRow][randomColumn] === '-') {
        this.grid[randomRow][randomColumn] = 'O';
        turnDone = true;
      }
    }
    let winner = this.hasWinner();
    if (winner) {
      this.title = 'The winner is: ' + winner;
      this.buttonsDisabled = true;
    }
  }

  private logProperties(obj) {
    let propValue;
    for (let propName in obj) {
      propValue = obj[propName];
      console.log(propName, propValue);
    }
  }

  private hasWinner() {
    const winningCombinations = [
      ['00', '01', '02'],
      ['10', '11', '12'],
      ['20', '21', '22'],
      ['00', '10', '20'],
      ['01', '11', '21'],
      ['02', '12', '22'],
      ['00', '11', '22'],
      ['20', '11', '02'],
    ]
    for (var i in winningCombinations) {
      let combination = winningCombinations[i];
      console.log(combination);
      const a_row = Number(combination[0].charAt(0));
      const a_column = Number(combination[0].charAt(1));

      const b_row = Number(combination[1].charAt(0));
      const b_column = Number(combination[1].charAt(1));

      const c_row = Number(combination[2].charAt(0));
      const c_column = Number(combination[2].charAt(1));

      const a = this.grid[a_row][a_column];
      const b = this.grid[b_row][b_column];
      const c = this.grid[c_row][c_column];

      if (a === b && b === c && a !== '-') {
        return a;
      }

    }
    return '';
  }
}
