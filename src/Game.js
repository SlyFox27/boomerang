// Импортируем всё необходимое.
const readlineSync = require('readline-sync');
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().

const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
// const Boomerang = require('./game-models/Boomerang');
const View = require('./View');
const Boomerang = require('./game-models/Boomerang');

// Основной класс игры.
// Тут будут все настройки, проверки, запуск.

class Game {
  constructor({ trackLength }) {
    this.trackLength = trackLength;
    this.boomerang = new Boomerang(trackLength);
    this.hero = new Hero({
      playerName: 'Player',
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

  play() {
    function registratePlayer() {
      const playerName = readlineSync.question(
        'Здравствуйте! Введите ваше имя: '
      );
      process.stdin.resume();

      return playerName;
    }

    this.hero.name = registratePlayer();

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
      // this.enemy.die();
      // this.hero.addScores();
      // this.hero.scores += 10;
      // if (this.hero.lives >= 20) {

      // }
      this.hero.addScores();
      if (this.hero.scores >= 20) {
        this.hero.win();
      }
      // Обнуляем позицию бумеранга после столкновения с врагом
      this.boomerang.position = -1;
      this.enemy = new Enemy(this.trackLength); // Создаем нового врага
    }
  }
}

module.exports = Game;
