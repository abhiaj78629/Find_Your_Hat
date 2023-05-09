const prompt = require("prompt-sync")({ sigint: true });

class Field {
  constructor(field) {
    this.field = field;
    this.currentPosition = [0, 0];
  }

  static generateField(height, width, percentage) {
    const totalTiles = height * width;
    const numHoles = Math.floor(totalTiles * (percentage / 100));
    const field = [];

    // Fill the field with background characters
    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        row.push("░");
      }
      field.push(row);
    }

    // Place the hat
    const hatPosition = [
      Math.floor(Math.random() * height),
      Math.floor(Math.random() * width),
    ];
    field[hatPosition[0]][hatPosition[1]] = "^";

    // Place the holes
    let holesPlaced = 0;
    while (holesPlaced < numHoles) {
      const row = Math.floor(Math.random() * height);
      const col = Math.floor(Math.random() * width);
      if (field[row][col] === "░") {
        field[row][col] = "O";
        holesPlaced++;
      }
    }

    // Place the player at the top left corner
    field[0][0] = "*";

    return field;
  }

  print() {
    for (let i = 0; i < this.field.length; i++) {
      console.log(this.field[i].join(""));
    }
  }

  move(direction) {
    switch (direction) {
      case "up":
        this.currentPosition[0]--;
        break;
      case "down":
        this.currentPosition[0]++;
        break;
      case "left":
        this.currentPosition[1]--;
        break;
      case "right":
        this.currentPosition[1]++;
        break;
      default:
        console.log("Invalid direction.");
        break;
    }

    if (
      this.currentPosition[0] < 0 ||
      this.currentPosition[0] >= this.field.length ||
      this.currentPosition[1] < 0 ||
      this.currentPosition[1] >= this.field[0].length
    ) {
      console.log("You went outside the field. Game over!");
      return false;
    }

    if (this.field[this.currentPosition[0]][this.currentPosition[1]] === "O") {
      console.log("You fell in a hole. Game over!");
      return false;
    }

    if (this.field[this.currentPosition[0]][this.currentPosition[1]] === "^") {
      console.log("Congratulations, you found your hat!");
      return false;
    }

    this.field[this.currentPosition[0]][this.currentPosition[1]] = "*";
    return true;
  }
}

// Set up the game
const myField = new Field(Field.generateField(10, 10, 20));
myField.print();

// Play the game
let playing = true;
while (playing) {
  const direction = prompt("Which way? ");
  playing = myField.move(direction);
  myField.print();
}