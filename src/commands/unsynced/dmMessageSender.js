const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  devonly: Boolean,
  name: "senddm",
  description: "Send a direct message to a user",
  options: [
    {
      name: "message",
      description: "The message content",
      type: ApplicationCommandOptionType.String,
      required: true,
    },

    {
      name: "user",
      description: "The user to send the message to",
      type: ApplicationCommandOptionType.User,
      required: false,
    },

    {
      name: "user-id",
      description: 'The user ID to send the message to (overrides "user")',
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],

  async callback(client, interaction) {
    const targetUser =
      interaction.options.getUser("user") ||
      await client.users.fetch(interaction.options.getString("user-id"));

    if (!targetUser) {
      return interaction.reply({
        content: "Please specify a valid user to send the message to.",
        ephemeral: true,
      });
    }

    if (targetUser.bot) {
      return interaction.reply({
        content: "Bots cannot receive direct messages.",
        ephemeral: true,
      });
    }

    let messageContent = interaction.options.getString("message");

    if (!messageContent) {
      return interaction.reply({
        content: "Please specify a message to send.",
        ephemeral: true,
      });
    }

    try {
      await targetUser.send(messageContent);

      await interaction.reply({
        content: `The message has been sent to <@${targetUser.id}>.`,
        ephemeral: true,
      });
    } catch (error) {
      console.error(error);

      await interaction.reply({
        content: "There was an error while sending the message.",
        ephemeral: true,
      });
    }
  },
};
