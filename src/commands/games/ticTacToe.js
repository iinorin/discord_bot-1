const { TicTacToe } = require("discord-gamecord");
module.exports = {
  name: "tictactoe",
  description: "Play Tic Tac Toe with a user",

  async callback(client, intreaction) {
    const Game = new TicTacToe({
      message: interaction,
      isSlashGame: true,
    //   opponent: message.mentions.users.first(),/
    opponent: interaction.options.getUser('user'),
      embed: {
        title: "Tic Tac Toe",
        color: "#5865F2",
        statusTitle: "Status",
        overTitle: "Game Over",
      },
      emojis: {
        xButton: "❌",
        oButton: "🔵",
        blankButton: "➖",
      },
      mentionUser: true,
      timeoutTime: 60000,
      xButtonStyle: "DANGER",
      oButtonStyle: "PRIMARY",
      turnMessage: "{emoji} | Its turn of player **{player}**.",
      winMessage: "{emoji} | **{player}** won the TicTacToe Game.",
      tieMessage: "The Game tied! No one won the Game!",
      timeoutMessage: "The Game went unfinished! No one won the Game!",
      playerOnlyMessage: "Only {player} and {opponent} can use these buttons.",
    });

    Game.startGame();
    Game.on("gameOver", (result) => {
      console.log(result); // =>  { result... }
    });
  },
};
