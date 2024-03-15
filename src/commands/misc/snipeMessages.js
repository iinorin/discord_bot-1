const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');
const client = new Client({ intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent] });

const snipedMessages = new Map();

function isMessageTooOld(message) {
  const now = Date.now();
  const messageAge = now - message.timestamp;
  return messageAge > 30000; // 30 seconds in milliseconds
}

module.exports = {
  name: 'snipe',
  description: 'Snipe the last deleted message in the channel.',
  testOnly: true, // Just for testing, remove it for actual usage

  callback: async (client, interaction) => {
    const channelId = interaction.channelId;
    const snipedMessage = snipedMessages.get(channelId);

    if (!snipedMessage || isMessageTooOld(snipedMessage)) {
      console.log('No message found in snipedMessages map or message is too old.');
      await interaction.reply('There are no recent deleted messages to snipe!');
      return;
    }

    const { content, author, timestamp } = snipedMessage;

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Sniped Message')
      .setDescription(content)
      .setFooter({ text: `Deleted by ${author.tag} | ${timestamp.toLocaleString()}` });

    await interaction.reply({ embeds: [embed] });
  },
};

// Listen for message create event
client.on('messageCreate', (message) => {
  const { content, member } = message;
  const command = content.toLowerCase();

  if (command === 'ino snipe' && !member.user.bot) {
    module.exports.callback(client,message); // Call the snipe command callback
  }
});

// Listen for message delete event
client.on('messageDelete', (message) => {
  const { guild, channel, content, author, createdAt } = message;

  if (!guild || !channel || !content || !author || !createdAt) return;

  console.log(`Message deleted in channel ${channel.id}.`);
  console.log(`Message content: ${content}`);
  console.log(`Author: ${author.tag}`);
  console.log(`Timestamp: ${createdAt}`);

  console.log(`Adding message to snipedMessages map.`);
  snipedMessages.set(channel.id, {
    content,
    author,
    timestamp: createdAt,
  });
});

client.login(process.env.TOKEN);
