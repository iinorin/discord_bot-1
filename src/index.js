// require('dotenv').config();
// const { Client, IntentsBitField } = require('discord.js');
'use strict';

const fs = require('fs');
const eventHandler = require('./handlers/eventHandler');

const dotenv = require('dotenv');
const { Client, IntentsBitField,Partials, Collection } = require('discord.js');
const { Player } = require('discord-player');
const express = require('express');
require('console-stamp')(console, { format: ':date(yyyy/mm/dd HH:MM:ss)' });

const registerPlayerEvents = require(`${__dirname}/musicCommands/events/discord-player/player`);

const cst = require(`${__dirname}/musicCommands/utils/constants`);


dotenv.config();
const ENV = process.env;


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
   partials: [Partials.Channel],
  disableMentions: 'everyone',

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

client.config = cst.config;
client.commands = new Collection();
client.player = new Player(client, {
    autoRegisterExtractor: false,
    ytdlOptions: cst.ytdlOptions
});


const player = client.player;




const setEnvironment = () => {
    return new Promise((resolve, reject) => {
        client.config.name = typeof (ENV.BOT_NAME) === 'undefined'
            ? client.config.name
            : ENV.BOT_NAME;

        client.config.prefix = typeof (ENV.PREFIX) === 'undefined'
            ? client.config.prefix
            : ENV.PREFIX;

        client.config.playing = typeof (ENV.PLAYING) === 'undefined'
            ? client.config.playing
            : ENV.PLAYING;

        client.config.defaultVolume = typeof (ENV.DEFAULT_VOLUME) === 'undefined'
            ? client.config.defaultVolume
            : Number(ENV.DEFAULT_VOLUME);

        client.config.maxVolume = typeof (ENV.MAX_VOLUME) === 'undefined'
            ? client.config.maxVolume
            : Number(ENV.MAX_VOLUME);

        client.config.autoLeave = typeof (ENV.AUTO_LEAVE) === 'undefined'
            ? client.config.autoLeave
            : (String(ENV.AUTO_LEAVE) === 'true' ? true : false);

        client.config.autoLeaveCooldown = typeof (ENV.AUTO_LEAVE_COOLDOWN) === 'undefined'
            ? client.config.autoLeaveCooldown
            : Number(ENV.AUTO_LEAVE_COOLDOWN);

        client.config.displayVoiceState = typeof (ENV.DISPLAY_VOICE_STATE) === 'undefined'
            ? client.config.displayVoiceState
            : (String(ENV.DISPLAY_VOICE_STATE) === 'true' ? true : false);

        client.config.port = typeof (ENV.PORT) === 'undefined'
            ? client.config.port
            : Number(ENV.PORT);

        client.config.textQuery = typeof (ENV.TEXT_QUERY_TYPE) === 'undefined'
            ? client.config.textQuery
            : ENV.TEXT_QUERY_TYPE

        client.config.urlQuery = typeof (ENV.URL_QUERY_TYPE) === 'undefined'
            ? client.config.urlQuery
            : ENV.URL_QUERY_TYPE;

        //console.log('setEnvironment: ', client.config);
        resolve();
    });
}


const loadFramework = () => {
    console.log(`-> loading Web Framework ......`);
    return new Promise((resolve, reject) => {
        const app = express();
        const port = client.config.port || 22222;

        app.get('/', function (req, res) {
            res.send('200 ok.')
        });

        app.listen(port, function () {
            console.log(`Server start listening port on ${port}`);
            resolve();
        });
    })
}


const loadEvents = () => {
    console.log(`-> loading Events ......`);
    return new Promise((resolve, reject) => {
        const files = fs.readdirSync(`${__dirname}/musicCommands/events/`).filter(file => file.endsWith('.js'));
        

        console.log(`+--------------------------------+`);
        for (const file of files) {
            try {
                const event = require(`${__dirname}/musicCommands/events/${file}`);
                console.log(`| Loaded event ${file.split('.')[0].padEnd(17, ' ')} |`);

                client.on(file.split('.')[0], event.bind(null, client));
                delete require.cache[require.resolve(`${__dirname}/musicCommands/events/${file}`)];
            } catch (error) {
                reject(error);
            }
        };
        console.log(`+--------------------------------+`);
        console.log(`${cst.color.grey}-- loading Events finished --${cst.color.white}`);
        resolve();
    })
}

const loadPlayer = () => {
    return new Promise(async (resolve, reject) => {
        try {
            await player.extractors.loadDefault();
            registerPlayerEvents(player, client);
        } catch (error) {
            reject(error);
        }
        console.log('-> loading Player Events finished');
        resolve();
    })
}


const loadCommands = () => {
    console.log(`-> loading Commands ......`);
    return new Promise((resolve, reject) => {
        const files = fs.readdirSync(`${__dirname}/musicCommands/commands/`).filter(file => file.endsWith('.js'));

        console.log(`+---------------------------+`);
        for (const file of files) {
            try {
                const command = require(`${__dirname}/musicCommands/commands/${file}`);

                console.log(`| Loaded Command ${command.name.toLowerCase().padEnd(10, ' ')} |`);

                client.commands.set(command.name.toLowerCase(), command);
                delete require.cache[require.resolve(`${__dirname}/musicCommands/commands/${file}`)];
            } catch (error) {
                reject(error);
            }
        };
        console.log(`+---------------------------+`);
        console.log(`${cst.color.grey}-- loading Commands finished --${cst.color.white}`);
        resolve();
    })
}


Promise.resolve()
    .then(() => setEnvironment())
    .then(() => loadFramework())
    .then(() => loadEvents())
    .then(() => loadPlayer()) 
    .then(() => loadCommands())
    .then(() => {
        console.log(`${cst.color.green}*** All loaded successfully ***${cst.color.white}`);
        client.login(ENV.TOKEN);
    });




process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});


module.exports = client;
client.login(process.env.TOKEN);
