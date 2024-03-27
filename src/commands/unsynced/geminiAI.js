const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = {
  name: 'gemini',
  description: 'Send a message to a GPT model and get a response.',
  options: [
    {
      name: 'message',
      description: 'Message to send to the GPT model',
      type: ApplicationCommandOptionType.String,
      required: true
    }
  ],
  async callback(client, interaction) {
    // const { GoogleGenerativeAI } = require("@google/generative-ai");

    const genAI = new GoogleGenerativeAI(process.env.API_KEY);

    async function run() {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const chat = model.startChat({
        history: [],
        generationConfig: {
          maxOutputTokens: 100,
        },
      });

      const msg = interaction.options.getString("message");
      await interaction.deferReply();

      const result = await chat.sendMessage(msg);
      const response = await result.response;
      const text = response.text();
      console.log(text);


      const gptEmbed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('Gemeni Response')
        .setDescription(`**Question:** ${msg}\n**Answer:** ${text}`)
        .setTimestamp();

      await interaction.editReply({ embeds: [gptEmbed], ephemeral: false });
    }

    run().catch(console.error);
  }
}