// Наш герой.

class Hero {
  constructor({
    name, lives = 3, scores = 0, position, boomerang,
  }) {
    this.name = name;
    this.lives = lives;
    this.scores = scores;
    this.skin = '🧔';
    this.position = position;
    this.boomerang = boomerang;
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
  }

  moveRight() {
    // Идём вправо.
    this.position += 1;
  }

  attack() {
    // Атакуем.
    this.boomerang.position = this.position + 1; // Устанавливаем начальную позицию бумеранга
    this.boomerang.fly();
  }

  die() {
    this.lives -= 1;

    // console.log('YOU ARE DEAD!💀');
  }

  addScores() {
    this.scores += 10;
  }

  win() {
    console.clear();
    console.log('YOU WIN!💰');
    console.log(`Your score: ${this.scores}`);
    process.exit();
  }

  lose() {
    console.clear();
    this.skin = '💀';
    console.log('YOU ARE DEAD!💀');
    console.log(`Your score: ${this.scores}`);
    process.exit();
  }
}

module.exports = Hero;
