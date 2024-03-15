require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');


require('./botPresence/botPresence.js');
const handleEmbeds = require('./embeds/embeds.js'); // Import the embeds function

require('./slashCommandsBuilder/slashCommandsBuilder.js');

const mongoose = require('mongoose');


const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildVoiceStates
  ],
});

const connectToDB = async () => {
  try {
    const connectionString = process.env.MONGODB_URI;

    if (!connectionString) {
      throw new Error('MongoDB connection string (MONGODB_URI) not found.');
    }

    await mongoose.connect(connectionString);
    console.log('Connected to DB.');
    eventHandler(client);

  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
  }
};

// Call the connectToDB function
connectToDB();



client.on('messageCreate', async (message) => {
  handleEmbeds(message);
});


module.exports = client;
client.login(process.env.TOKEN);
