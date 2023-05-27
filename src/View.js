const { EOL } = require('os');
// Сделаем отдельный класс для отображения игры в консоли.
class View {
  constructor(game) {
    this.game = game;
  }

  render() {
    if (!this.game.hero.name) {
      this.game.hero.name = 'Geralt';
    }
    const userName = `Name: ${this.game.hero.name}`;
    const scores = `Score: ${this.game.hero.scores}`;
    const livesCount = this.game.hero.lives;
    const liveIcon = '🐺  ';

    // Тут всё рисуем.
    console.clear();
    console.log(this.game.track.join(''));
    console.log(EOL);
    console.log(userName);
    if (!(livesCount <= 0)) {
      console.log(liveIcon.repeat(livesCount));
    }

    console.log(scores);
  }
}

module.exports = View;
