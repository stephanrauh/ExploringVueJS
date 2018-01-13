import { Grid, Cell } from './Grid';

export default class GameEngine {
  private static WIN = [
    [[1, 1, 1], [0, 0, 0], [0, 0, 0]],
    [[0, 0, 0], [1, 1, 1], [0, 0, 0]],
    [[0, 0, 0], [0, 0, 0], [1, 1, 1]],
    [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
    [[0, 0, 1], [0, 1, 0], [1, 0, 0]],
    [[1, 0, 0], [1, 0, 0], [1, 0, 0]],
    [[0, 1, 0], [0, 1, 0], [0, 1, 0]],
    [[0, 0, 1], [0, 0, 1], [0, 0, 1]]
  ];

  public activePlayer = 'X';

  public humanPlayer = 'X';

  public grid = new Grid();

  public gameOver = false;

  constructor() {}

  public changeSides(): void {
    if (this.humanPlayer === 'X') {
      this.humanPlayer = 'O';
    } else {
      this.humanPlayer = 'X';
    }
    if (this.humanPlayer !== this.activePlayer) {
      this.computerMove();
    }
  }

  private toggleActivePlayer() {
    if (this.activePlayer === 'X') {
      this.activePlayer = 'O';
    } else {
      this.activePlayer = 'X';
    }
  }

  public toggleCell(y: number, x: number): string {
    if (this.gameOver) {
      return 'The game is already over. Do you want to start a new game?';
    } else {
      if (this.grid.row[y].cell[x] !== Cell.EMPTY) {
        return 'You cannot occupy this field.';
      } else {
        const activePlayersPiece = this.activePlayer === 'X' ? Cell.X : Cell.O;
        this.grid.row[y].cell = [...this.grid.row[y].cell];
        this.grid.row[y].cell[x] = activePlayersPiece;
        if (this.hasWon(activePlayersPiece)) {
          this.gameOver = true;
          return "You've won. Game over";
        } else {
          this.toggleActivePlayer();
          this.computerMove();
          if (this.gameOver) {
            return "I've won!";
          } else {
            return "It's your turn";
          }
        }
      }
    }
  }

  public computerMove(): string {
    if (this.existsFreeCell()) {
      const activePlayersPiece = this.activePlayer === 'X' ? Cell.X : Cell.O;
      while (true) {
        const x = Math.floor(Math.random() * 3);
        const y = Math.floor(Math.random() * 3);
        if (this.grid.row[y].cell[x] === Cell.EMPTY) {
          this.grid.row[y].cell[x] = activePlayersPiece;
          break;
        }
      }
      if (this.hasWon(activePlayersPiece)) {
        const msg = 'I have won!';
        this.gameOver = true;
        return msg;
      } else {
        if (this.existsFreeCell()) {
          this.toggleActivePlayer();
          return "It's your turn";
        } else {
          return 'Draw!';
        }
      }
    } else {
      return 'Draw!';
    }
  }

  public existsFreeCell(): boolean {
    let result = false;
    this.grid.row.forEach(r => {
      r.cell.forEach(c => {
        if (c === Cell.EMPTY) {
          result = true;
        }
      });
    });
    return result;
  }

  public hasWon(player: Cell): boolean {
    let won = false;
    GameEngine.WIN.forEach(board => {
      won = won || this.matches(board, player);
    });

    return won;
  }

  public matches(board: number[][], player: Cell): boolean {
    let result = true;
    board.forEach((row, y) =>
      row.forEach((cell, x) => {
        if (cell === 1 && player !== this.grid.row[y].cell[x]) {
          result = false;
        }
      })
    );
    return result;
  }

  public newGame(): void {
    this.grid.reset();
    this.activePlayer = 'X';
    this.gameOver = false;
    this.changeSides();
  }
}
