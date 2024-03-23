const {
  CommandInteraction,
  ApplicationCommandOptionType,
  PermissionsBitField,
} = require("discord.js");
const { getAudioUrl } = require("google-tts-api");
const { createAudioResource } = require("@discordjs/voice"); // For creating audio stream
require("dotenv").config();

module.exports = {
  name: "speak",
  description:
    "Converts text to speech using Google Translate TTS and sends it to your voice channel.",
  options: [
    {
      name: "text",
      description: "The text you want the bot to speak.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  async callback(client, interaction = new CommandInteraction()) {
    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
      return await interaction.reply({
        content: "You need to be in a voice channel to use this command!",
        ephemeral: true,
      });
    }

    const textToSpeak = interaction.options.getString("text");
    if (!interaction.member.permissions.has(
        PermissionsBitField.Flags.SendTTSMessages
      )
    )
      return await interaction.reply({
        content: "You don't have permission to send TTS Messages in the server",
      });

      await interaction.reply({
        content: `${textToSpeak}`, tts: true
      });
  },
};
