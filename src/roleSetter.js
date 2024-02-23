import dotenv from 'dotenv'
dotenv.config()

import { Client, GatewayIntentBits, IntentsBitField, EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder} from 'discord.js';
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ]
});

const roles = [
   {
        id:'1210550582667124777',
        label:'Miku-1'
    },
    {
      id:'1210550395588579378',
      label:'Inori-1'
    },
    {
      id:'1210550767438790767',
      label:'Esdeath-1'
    },
    {
      id:'1210550677546340374',
      label:'Miku-2'
    },
    {
      id:'1210550482574118983',
      label:'Inori-2'
    },
    // {
    //   id:'1210550896912637973',
    //   label:'Esdeath-2'
    // },
]

client.on('ready', async () => {
    try {
      console.log(`Logged in as ${client.user.tag}!`);
      const channel = await client.channels.cache.get(process.env.INOCHID);
   
      if(!channel) return;

      const row = new ActionRowBuilder();

      roles.forEach((role) => {
        row.components.push(
            new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary)
        )
    }) 
    await channel.send({
        content : 'Choose a Role',
        components : [row],
    })
    process.exit();

}      catch (error) {
          console.error('Error during bot initialization:', error);
    }
  });


client.login(process.env.TOKEN);
