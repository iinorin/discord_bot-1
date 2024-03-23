const { Slots } = require("discord-gamecord");
module.exports = {
  name: "slot",
  description: "Play slot Machine",
  async callback(client, interaction) {
    const Game = new Slots({
      message: interaction,
      isSlashGame: false,
      embed: {
        title: "Slot Machine",
        color: "#5865F2",
      },
      slots: ["🍇", "🍊", "🍋", "🍌"],
    });

    Game.startGame();
    Game.on("gameOver", (result) => {
      console.log(result); // =>  { result... }
    });
  },
};
