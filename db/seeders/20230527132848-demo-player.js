'use strict';

const { Scoreboard } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up() {
    await Scoreboard.bulkCreate([
      {
        Name: 'Billy Herrington',
        Score: 10,
      },
      {
        Name: 'Van Darkholme',
        Score: 20,
      },
      {
        Name: 'Steve Rambo',
        Score: 30,
      },
      {
        Name: 'Boss of the Gym',
        Score: 10,
      },
      {
        Name: 'Dungeon Master',
        Score: 10,
      },
    ]);
  },

  async down() {
    await Scoreboard.destroy({ truncate: true, cascade: true });
  },
};
