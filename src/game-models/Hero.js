const Game = require('../Game');
const logPlayers = require('../../logPlayers');
const addPlayers = require('../../addPlayers');
const { draw, drawAsString } = require('terminal-img');
const sound = require('play-sound')((opts = {}));
const { EOL } = require('os');
// Наш герой.

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
    sound.play(
      '/Users/ilyabritvin/Documents/Elbrus Bootcamp/phase-1-repeat/week-3/day-5/core-async-boomerang/src/sounds/glitch-in-the-matrix.wav'
    );
    this.lives -= 1;

    // console.log('YOU ARE DEAD!💀');
  }

  addScores() {
    this.scores += 10;
  }

  async win() {
    sound.play(
      '/Users/ilyabritvin/Documents/Elbrus Bootcamp/phase-1-repeat/week-3/day-5/core-async-boomerang/src/sounds/congratulations.wav'
    );
    console.clear();
    console.log('YOU WIN!💰');
    console.log(`Your score: ${this.scores}`);
    console.log(EOL);
    await logPlayers();
    console.log(`${EOL}Created by "CD-Project Red" with love${EOL}`);
    process.exit();
  }

  async lose() {
    sound.play(
      '/Users/ilyabritvin/Documents/Elbrus Bootcamp/phase-1-repeat/week-3/day-5/core-async-boomerang/src/sounds/system-fault.wav'
    );
    await addPlayers(this.name, this.scores);
    console.clear();
    await draw('readme-assets/gameOver.png', { width: 80, height: 60 });
    this.skin = '💀';
    console.log(
      `Со смертью этого персонажа нить вашей судьбы обрывается.${EOL}Начните игру заново, чтобы восстановить течение судьбы, или живите дальше в проклятом мире, который сами и создали.${EOL}`
    );
    console.log(`Your score: ${this.scores}`);
    console.log(EOL);
    await logPlayers();
    console.log(`${EOL}Created by "CD-Project Red" with love${EOL}`);
    process.exit();
  }
}

module.exports = Hero;
