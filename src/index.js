require("dotenv").config();
require("console-stamp")(console, { format: ":date(yyyy/mm/dd HH:MM:ss)" });

const { Client, IntentsBitField } = require("discord.js");

const eventHandler = require("./handlers/eventHandler");


require("./botPresence/botPresence.js");
const handleEmbeds = require("./embeds/embeds.js"); // Import the embeds function

require("./slashCommandsBuilder/slashCommandsBuilder.js");

const mongoose = require("mongoose");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.AutoModerationConfiguration
    
  ],
});

eventHandler(client);

client.on("messageCreate", async (message) => {
  handleEmbeds(message);
});

module.exports = client;
client.login(process.env.TOKEN);

