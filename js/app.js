let levelCounter = 0;
const level = document.getElementById("score");
let livesCounter = 0;
const lives = document.getElementById("lives");

class Sun {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Enemy {
  constructor(x, y, direction, style) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.style = style;
    this.speed = Math.random() * (300 - 100) + 100;
  }

  update(dt) {
    if (this.direction === "ltr") {
      this.x = this.x + this.speed * dt;
    } else {
      this.x = this.x - this.speed * dt;
    }
    if (this.x < 790 && this.direction === "ltr") {
      this.direction = "ltr";
    } else if (this.x > 90) {
      this.direction = "rtl";
    } else if (this.x > 790 && this.direction === "rtl") {
      this.direction = "rtl";
    } else if (this.x < 10) {
      this.direction = "ltr";
    }
    if (
      this.y < player.y + 75 &&
      this.y + 75 > player.y &&
      this.x < player.x + 75 &&
      this.x + 75 > player.x
    ) {
      player.y = 425;
      player.x = 400;
      livesCounter--;
      lives.firstElementChild.textContent = `${livesCounter}`;
    }
    if (livesCounter === 0) {
      lives.firstElementChild.textContent = 3;
      livesCounter = 3;
    }
  }
}

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  update() {}

  handleInput(key) {
    if (key === "up") {
      this.y = this.y - 50;
    } else if (key === "down") {
      this.y = this.y + 50;
    } else if (key === "left") {
      this.x = this.x - 50;
    } else if (key === "right") {
      this.x = this.x + 50;
    }

    if (
      this.y < sun.y + 100 && 
      this.x + 100 > sun.x && 
      this.x < sun.x + 100
      ) {
      this.y = 425;
      levelCounter++;
      level.firstElementChild.textContent = `${levelCounter}`;
    } else if (this.x < 10) {
      this.x = 10;
    } else if (this.x > 790) {
      this.x = 790;
    } else if (this.y < 10) {
      this.y = 10;
    } else if (this.y > 425) {
      this.y = 425;
    }
  }
}

const allEnemies = [
  new Enemy(100, 50, "ltr", "enemy1"),
  new Enemy(100, 150, "ltr", "enemy2"),
  new Enemy(100, 250, "ltr", "enemy3")
];
const player = new Player(400, 425);
const sun = new Sun(400, 10);

document.addEventListener("keyup", function(e) {
  const allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
