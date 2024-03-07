const { Client, ActivityType, IntentsBitField} = require('discord.js');

// const client = new Client({
//     intents: [
//         GatewayIntentBits.Flags.Guilds,         // Access guild information
//         GatewayIntentBits.Flags.GuildMessages   // Receive messages from guilds
//     ] });

const client = new Client({
    intents: [
      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMembers,
      IntentsBitField.Flags.GuildMessages,
      IntentsBitField.Flags.MessageContent,
    ],
  });

let status = [
        {
            name: 'I am Streaming',
            type: ActivityType.Streaming,
            url: 'https://www.twitch.tv/chilledcat_music'
        },
        {
            name: ' With Your Mom',
            type: ActivityType.Playing

        },
        {
            name: 'Over Servers',
            type: ActivityType.Watching,
        },
        {
            name: 'Perils of Misaka',
            type: ActivityType.Listening
        },
    ];
    client.login(process.env.TOKEN).then(() => {
        console.log('✅ Logged in successfully!');
      });
      
    client.on('ready', async (c) => {
        console.log(`✅ ${c.user.tag} is online.`);

        setInterval(() => {
            let random = Math.floor(Math.random() * status.length);
            client.user.setActivity(status[random]);
        }, 10000);
    });