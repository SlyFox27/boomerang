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
        Name: 'Aysen Kolesov',
        Score: 10,
      },
      {
        Name: 'Artem Berezkin',
        Score: 10,
      },
    ]);
  },

  async down() {
    await Scoreboard.destroy({ truncate: true, cascade: true });
  },
};
