const { EOL } = require('os');
// Сделаем отдельный класс для отображения игры в консоли.
class View {
  constructor(game) {
    this.game = game;
  }

  render() {
    if (!this.game.hero.name) {
      this.game.hero.name = 'Геральт';
    }
    const userName = `Имя: ${this.game.hero.name}`;
    const scores = `Счёт: ${this.game.hero.scores} / 100`;
    const livesCount = this.game.hero.lives;
    const liveIcon = '🐺  ';

    // Тут всё рисуем.
    console.clear();
    console.log(this.game.track.join(''));
    console.log(EOL);
    console.log(userName);
    if (!(livesCount <= 0)) {
      console.log(`Здоровье: ${liveIcon.repeat(livesCount)}`);
    }

    console.log(scores);
  }
}

module.exports = View;
