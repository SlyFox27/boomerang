const sound = require('play-sound')((opts = {}));
// Враг.

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
    sound.play('src/sounds/hit.wav');
    this.position = '?';
  }
}
module.exports = Enemy;
