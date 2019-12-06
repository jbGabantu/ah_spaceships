"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var levelCounter = 0;
var level = document.getElementById("score");
var livesCounter = 0;
var lives = document.getElementById("lives");

var Sun = function Sun(x, y) {
  _classCallCheck(this, Sun);

  this.x = x;
  this.y = y;
};

var Enemy =
/*#__PURE__*/
function () {
  function Enemy(x, y, direction, style) {
    _classCallCheck(this, Enemy);

    this.x = x;
    this.y = y;
    this.direction = direction;
    this.style = style;
    this.speed = Math.random() * (300 - 100) + 100;
  }

  _createClass(Enemy, [{
    key: "update",
    value: function update(dt) {
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

      if (this.y < player.y + 75 && this.y + 75 > player.y && this.x < player.x + 75 && this.x + 75 > player.x) {
        player.y = 425;
        player.x = 400;
        livesCounter--;
        lives.firstElementChild.textContent = "".concat(livesCounter);
      }

      if (livesCounter === 0) {
        lives.firstElementChild.textContent = 3;
        livesCounter = 3;
      }
    }
  }]);

  return Enemy;
}();

var Player =
/*#__PURE__*/
function () {
  function Player(x, y) {
    _classCallCheck(this, Player);

    this.x = x;
    this.y = y;
  }

  _createClass(Player, [{
    key: "update",
    value: function update() {}
  }, {
    key: "handleInput",
    value: function handleInput(key) {
      if (key === "up") {
        this.y = this.y - 50;
      } else if (key === "down") {
        this.y = this.y + 50;
      } else if (key === "left") {
        this.x = this.x - 50;
      } else if (key === "right") {
        this.x = this.x + 50;
      }

      if (this.y < sun.y + 100 && this.x + 100 > sun.x && this.x < sun.x + 100) {
        this.y = 425;
        levelCounter++;
        level.firstElementChild.textContent = "".concat(levelCounter);
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
  }]);

  return Player;
}();

var allEnemies = [new Enemy(100, 50, "ltr", "enemy1"), new Enemy(100, 150, "ltr", "enemy2"), new Enemy(100, 250, "ltr", "enemy3")];
var player = new Player(400, 425);
var sun = new Sun(400, 10);
document.addEventListener("keyup", function (e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };
  player.handleInput(allowedKeys[e.keyCode]);
});