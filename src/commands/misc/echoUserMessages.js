const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "echo",
  description: "Echo the Messages User Sends",
  // deleted: Boolean,

  options: [
    {
      name: "message",
      description: " The message to send",
      type: ApplicationCommandOptionType.String,
      requird: true,
    },
    {
      name: "channel",
      description: "The channel to send Mesages to",
      type: ApplicationCommandOptionType.Channel,
      required: false,
    },
  ],

  async callback(client, interaction) {
    const message = interaction.options.getString("message");
    const channel = interaction.options.getChannel('channel');

    await channel.send(message);
    await interaction.reply("Sent sucessfully");
  },
};
