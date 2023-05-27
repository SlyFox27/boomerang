// Сделаем отдельный класс для отображения игры в консоли.
// const Hero = require('./game-models/Hero')
// const Game = require('./Game')
class View {
  constructor(game) {
    this.game = game;
   
  }

  render() {
    const yourTeamName = 'CD Project Red';
   // const userName =(`Имя: ${this.game.hero.name}`);
    const userName = this.game.hero.name ? (`Name: ${this.game.hero.name}`) : ('Name: Geralt');
    const scores =(`Score: ${this.game.hero.scores}`);
    const livesCount = this.game.hero.lives;
    const liveIcon = '🐺  ' 

    // Тут всё рисуем.
    console.clear();
    console.log(this.game.track.join(''));
    console.log('\n\n');
    console.log(userName);
    console.log(liveIcon.repeat(livesCount));
    
    console.log(scores); 
    console.log(`Created by "${yourTeamName}" with love`);
  }
}

module.exports = View;
