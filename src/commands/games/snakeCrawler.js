const { Snake } = require('discord-gamecord');


module.exports = {
  name: "snakecrawler",
  description: "Let u play snake game",

  async callback(client, interaction) {
    const Game = new Snake({
      message: interaction,
      isSlashGame: false,
      embed: {
        title: "Snake Game",
        overTitle: "Game Over",
        color: "#5865F2",
      },
      emojis: {
        board: "⬛",
        food: "🍎",
        up: "⬆️",
        down: "⬇️",
        left: "⬅️",
        right: "➡️",
      },
      snake: { head: "🟢", body: "🟩", tail: "🟢", skull: "💀" },
      foods: ["🍎", "🍇", "🍊", "🫐", "🥕", "🥝", "🌽"],
      stopButton: "Stop",
      timeoutTime: 60000,
      playerOnlyMessage: "Only {player} can use these buttons.",
    });

    Game.startGame();
    Game.on("gameOver", (result) => {
      console.log(result); // =>  { result... }
    });
  },
};
