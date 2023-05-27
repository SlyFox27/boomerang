const { Scoreboard } = require('./db/models');

async function logPlayer() {
  const players = await Scoreboard.findAll({ raw: true, logging: false });
  const topFivePlayers = players.sort((a, b) => b.Score - a.Score);

  let result = '';

  for (let i = 0; i < 5; i += 1) {
    result += `${i + 1}. ${topFivePlayers[i].Name} - ${
      topFivePlayers[i].Score
    }\n`;
  }
  console.log(`TOP-5 players:\n\n${result}`);
}

module.exports = logPlayer;
