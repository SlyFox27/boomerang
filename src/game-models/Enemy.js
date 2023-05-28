const sound = require('play-sound')((opts = {}));
// Враг.
const Hero = require('./Hero');

class Enemy {
  constructor(trackLength) {
    this.generateSkin();
    this.position = trackLength - 1;
  }

  generateSkin() {
    const skins = [
      '🧌',
      '🧛',
      '👹',
      '👻',
      '🧛',
      '👿',
      '🧛',
      '🤺',
      '🧛',
      '🧟',
      '🎃',
    ];
    this.skin = skins[Math.floor(Math.random() * skins.length)];
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
  }

  die() {
    sound.play(
      '/Users/ilyabritvin/Documents/Elbrus Bootcamp/phase-1-repeat/week-3/day-5/core-async-boomerang/src/sounds/hold-your-horses.wav'
    );
    this.position = '?';
    console.log('Enemy is dead!');
  }
}
module.exports = Enemy;
