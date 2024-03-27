const { Interaction, EmbedBuilder } = require('discord.js');
const { RateLimiter } = require('discord.js-rate-limiter');
const  OpenAIApi = require('openai');

const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY,
});


const rateLimiter = new RateLimiter({
    points: 1, // 1 request per user
    duration: 1000, // 1 second per user
    clientId: (interaction) => interaction.user.id,
  });
  
  module.exports = {
    name: 'gpt',
    description: 'Send a message to a GPT model and get a response.',
    options: [
      {
        name: 'message',
        description: 'Message to send to the GPT model',
        type: 3, // String type
        required: true
      }
    ],
  
    async callback(client, interaction) {
      const user = interaction.user;
      const message = interaction.options.getString('message');
  
      // Check if the user is rate limited
      if (rateLimiter.take(interaction) > 0) {
        console.log(`User ${user.id} is rate limited`);
  
        // Send error message for rate limit
        const gptEmbed = new EmbedBuilder()
          .setColor('#0099ff')
          .setTitle('GPT Response')
          .setDescription('You are being rate limited. Try again later.')
          .setTimestamp();
  
        await interaction.reply({ embeds: [gptEmbed], ephemeral: false });
        return;
      } 

    try {
      // Send message to the GPT model
    //   const result = await openai.createChatCompletion({        //old
      const result = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
      });

      // Send embed message for GPT response
      const gptEmbed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('GPT Response')
        .setDescription('Here is a response from a GPT model.')
        .addFields(
          { name: 'Message', value: result.data.choices[0].message.content, inline: true },
        )
        .setTimestamp();

      await interaction.reply({ embeds: [gptEmbed], ephemeral: false });

    } catch (error) {
      console.log(`OPENAI ERR: ${error.stack}`);

      // Send error message for GPT response
      const gptEmbed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('GPT Response')
        .setDescription('An error occurred while processing your message.')
        .setTimestamp();

      await interaction.reply({ embeds: [gptEmbed], ephemeral: false });
    }
  }
};
