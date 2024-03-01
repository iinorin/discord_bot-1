// require('dotenv').config();
import dotenv from 'dotenv'
dotenv.config()

import { Client, GatewayIntentBits, IntentsBitField, EmbedBuilder } from 'discord.js';
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ]
});

client.on('ready', () => {
  console.log(`Logged in as a ${client.user.tag}!`);

});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  console.log(message.content);
  // message.reply({
        // content: "Misaka sees You"
        

  // });
});

client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  console.log(interaction.commandName);

  if (interaction.commandName === "ping") {
    interaction.reply("Why would u ping");
  }

  if (interaction.commandName === "misaka") {
    interaction.reply("Is love");
  }

  if (interaction.commandName === "love-finder") {
    let opt1 = interaction.options.getString('user1_name');
    let opt2 = interaction.options.getString('user2_name');


    if (!opt1 || !opt2) {
      return interaction.reply('Please provide both user names.');
    }
    // Array of possible replies
    const replies = ["Yes you Got Blessing", "Fck NO", "Hell Yes", "Hapyy wedding"];

    // Randomly select a reply from the array
    const randomReply = replies[Math.floor(Math.random() * replies.length)];

    interaction.reply(`The names you gave is  ${opt1}  ${opt2}. ${randomReply}`);
  }
  
  if (interaction.commandName === "about-me") {
  const embed = new EmbedBuilder()
  .setTitle('I am Inori')
  .setDescription('I work For Funeral Parlour')
  .setColor('Random')
  interaction.reply({embeds: [embed]})
  }
});

client.on("messageCreate", (message) => {

  if(message.content === "inori"){
    const embed = new EmbedBuilder()
    .setTitle('I am Inori')
    .setDescription('I work For Funeral Parlour')
    .setColor('Random')
    .setAuthor({ name: 'Invite Link', iconURL: process.env.INORITHUMB, url:process.env.BOTINVURL  })
    .setThumbnail(process.env.INORITHUMB)
    .setImage(process.env.INOCCGIF)
    .setURL(process.env.BOTINVURL)
    .setTimestamp()
	  .setFooter({ text: 'Made by Misaka', iconURL: process.env.INORITHUMV})
    .addFields(
      { name: 'Regular field title', value: 'Some value here' },
      { name: '\u200B', value: '\u200B' },
      { name: 'Inline field title', value: 'Some value here', inline: true },
      { name: 'Inline field title', value: 'Some value here', inline: true },
    )
    .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
    message.channel.send({embeds: [embed]})
    }
  });


client.login(process.env.TOKEN);


