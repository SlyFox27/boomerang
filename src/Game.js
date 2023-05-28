// Импортируем всё необходимое.
const { draw, drawAsString } = require('terminal-img');
const readlineSync = require('readline-sync');
const sound = require('play-sound')((opts = {}));
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().

const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
const View = require('./View');
const Boomerang = require('./game-models/Boomerang');

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
    this.track = new Array(this.trackLength).fill(' ');
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
    await draw('readme-assets/wolf.png', { width: 80, height: 60 });
    // process.stdin.resume();
    function registratePlayer() {
      playerName = readlineSync.question('Hello!!! Please enter your name: ');
      process.stdin.resume();

      return playerName;
    }

    this.hero.name = registratePlayer();
    this.audio = sound.play(
      '/Users/ilyabritvin/Documents/Elbrus Bootcamp/phase-1-repeat/week-3/day-5/core-async-boomerang/src/sounds/battleTheme.wav'
    );

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

  handleCollisions() {
    if (this.hero.position === this.enemy.position) {
      this.hero.die();

      if (this.hero.lives <= 0) {
        this.hero.die();
        this.hero.lose();
      }
    }

    if (this.boomerang.position === this.enemy.position) {
      this.enemy.die();

      this.hero.addScores();
      if (this.hero.scores >= 100) {
        this.hero.win();
      }
      // Обнуляем позицию бумеранга после столкновения с врагом
      this.boomerang.position = -1;
      this.enemy = new Enemy(this.trackLength); // Создаем нового врага
    }
  }
}

module.exports = Game;
