const { Scoreboard } = require('./db/models');

async function addPlayers(name, score) {
  await Scoreboard.create({ Name: name, Score: score });
}

module.exports = addPlayers;
