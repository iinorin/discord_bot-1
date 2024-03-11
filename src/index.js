require('dotenv').config();
const { Client, IntentsBitField} = require('discord.js');
const eventHandler = require('./handlers/eventHandler');


require('./botPresence/botPresence.js');
const handleEmbeds = require('./embeds/embeds.js'); // Import the embeds function
// const slashCommandBuilder =
 require('./slashCommandsBuilder/slashCommandsBuilder.js');




const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

eventHandler(client);

client.on('messageCreate', async (message) => {
   handleEmbeds(message);
});


module.exports = client;
client.login(process.env.TOKEN);
