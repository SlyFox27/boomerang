const sound = require('play-sound')((opts = {})); // Наш герой.

class Hero {
  constructor({ name = 'Geralt', lives = 3, scores = 0, position, boomerang }) {
    this.name = name;
    this.lives = lives;
    this.scores = scores;
    this.skin = '🧔';
    this.position = position;
    this.boomerang = boomerang;
  }

  moveLeft() {
    // Идём влево.
    if (this.position > 0) {
      this.position -= 1;
    }
  }

  moveRight() {
    // Идём вправо.
    this.position += 1;
  }

  attack() {
    // Атакуем.
    sound.play('src/sounds/attack.wav');
    this.boomerang.position = this.position + 1; // Устанавливаем начальную позицию бумеранга
    this.boomerang.fly();
  }

  die() {
    sound.play('src/sounds/hurt.wav');
    this.lives -= 1;
  }

  addScores() {
    this.scores += 10;
  }
}

module.exports = Hero;
