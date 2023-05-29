const { draw, drawAsString } = require('terminal-img');
const readlineSync = require('readline-sync');
const sound = require('play-sound')((opts = {}));
const { EOL } = require('os');
const logPlayers = require('../logPlayers');
const addPlayers = require('../addPlayers');
const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
const View = require('./View');
const Boomerang = require('./game-models/Boomerang');
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().

// Основной класс игры.
// Тут будут все настройки, проверки, запуск.
let playerName = '';

class Game {
  constructor({ trackLength }) {
    this.trackLength = trackLength;
    this.boomerang = new Boomerang(trackLength);
    this.hero = new Hero({
      name: playerName,
      position: 0,
      boomerang: this.boomerang,
    });
    this.enemy = new Enemy(trackLength);
    this.view = new View(this);
    this.track = [];
    this.regenerateTrack();
  }

  regenerateTrack() {
    // Сборка всего необходимого (герой, враг(и), оружие)
    // в единую структуру данных
    this.track = new Array(this.trackLength).fill('_ ').map((el, id) => {
      return id % 9 === 1 ? '🌲🏰🏔️' : el;
    });
    this.track[this.hero.position] = this.hero.skin;
    this.track[this.enemy.position] = this.enemy.skin; // Добавьте эту строку
    if (
      this.hero.boomerang.position >= 0 &&
      this.hero.boomerang.position < this.trackLength
    ) {
      this.track[this.hero.boomerang.position] = this.hero.boomerang.skin;
    }
  }

  check() {
    if (this.hero.position === this.enemy.position) {
      this.hero.die();
    }
  }

  async play() {
    await draw('src/images/logo.png', { width: 80, height: 40 });
    await draw('src/images/start.png', { width: 80, height: 40 });

    function registratePlayer() {
      playerName = readlineSync.question('Введите ваше имя: ');
      process.stdin.resume();

      return playerName;
    }

    this.hero.name = await registratePlayer();
    this.audio = sound.play('src/sounds/battle.wav');

    setInterval(() => {
      // Let's play!
      this.handleCollisions();
      this.regenerateTrack();

      // Добавьте логику движения врагов, например, двигаться влево
      this.enemy.moveLeft();

      // Если враг достиг края трека, перемещаем его в начало
      if (this.enemy.position < 0) {
        this.enemy.position = this.trackLength - 1;
      }

      this.view.render(this.track);
    }, 100); // Вы можете настроить частоту обновления игрового цикла
  }

  async win() {
    console.clear();

    this.audio.kill();
    sound.play('src/sounds/win.wav');

    await draw('src/images/victory.png', { width: 80, height: 40 });
    await addPlayers(this.hero.name, this.hero.scores);

    console.log(`На этот раз вы победили.${EOL}Cамое время сыграть в гвинт.`);
    console.log(`Ваш результат: ${this.hero.scores} / 100`);
    console.log(EOL);

    await logPlayers();

    console.log(`${EOL}Created by "CD Projekt Red" with love${EOL}`);

    process.exit();
  }

  async lose() {
    console.clear();

    sound.play('src/sounds/death.wav');
    this.audio.kill();

    await draw('src/images/defeat.png', { width: 80, height: 40 });
    await addPlayers(this.hero.name, this.hero.scores);

    console.log(
      `Со смертью этого персонажа нить вашей судьбы обрывается.${EOL}Начните игру заново, чтобы восстановить течение судьбы, или живите дальше в проклятом мире, который сами и создали.${EOL}`
    );
    console.log(`Ваш результат: ${this.hero.scores} / 100`);
    console.log(EOL);

    await logPlayers();

    console.log(`${EOL}Created by "CD Projekt Red" with love${EOL}`);

    process.exit();
  }

  handleCollisions() {
    if (this.hero.position === this.enemy.position) {
      this.hero.die();

      if (this.hero.lives <= 0) {
        this.hero.die();
        this.lose();
      }
    }

    if (
      this.boomerang.position === this.enemy.position ||
      this.boomerang.position === this.enemy.position + 1
    ) {
      this.enemy.die();
      this.boomerang.position = undefined;

      this.hero.addScores();
      if (this.hero.scores >= 100) {
        this.win();
      }
      // Обнуляем позицию бумеранга после столкновения с врагом
      this.boomerang.position = this.hero.position;
      this.enemy = new Enemy(this.trackLength); // Создаем нового врага
    }
  }
}

module.exports = Game;
