const { ApplicationCommandOptionType,EmbedBuilder} = require('discord.js');

module.exports = {
    name: 'poll',
    description: 'Create a poll with ',
    // deleted: Boolean,
    options: [
        {
            name: 'question',
            description: 'The question for the poll.',
            type:  ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'option1',
            description: 'Option 1 for the poll.',
            type:  ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'option2',
            description: 'Option 2 for the poll.',
            type:  ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'option3',
            description: 'Option 3 for the poll.',
            type:  ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: 'option4',
            description: 'Option 4 for the poll.',
            type:  ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: 'option5',
            description: 'Option 5 for the poll.',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: 'option6',
            description: 'Option 6 for the poll.',
            type:  ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: 'option7',
            description: 'Option 7 for the poll.',
            type:  ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: 'option8',
            description: 'Option 8 for the poll.',
            type:  ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: 'option9',
            description: 'Option 9 for the poll.',
            type: ApplicationCommandOptionType.String ,
            required: false,
        },
        {
            name: 'option10',
            description: 'Option 10 for the poll.',
            type: ApplicationCommandOptionType.String ,
            required: false,
        },
        {
            name: 'option11',
            description: 'Option 11 for the poll.',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: 'option12',
            description: 'Option 12 for the poll.',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
    ],
    callback: async (client, interaction) => {
        const question = interaction.options.getString('question');
        const options = [];

        // Collect options from command options
        for (let i = 1; i <= 10; i++) {
            const option = interaction.options.getString(`option${i}`);
            if (option) {
                options.push(option.trim());
            }
        }

        // Check if at least 2 options are provided
        if (options.length < 2) {
            await interaction.reply({ content: 'Please provide at least 2 options.', ephemeral: true });
            return;
        }

        // Create the poll embed
        const embed = new EmbedBuilder()
            .setTitle('Poll')
            .setDescription(question)
            .setColor('#0099ff')
            // .addFields(options.map((option, index) => ({ name: `Option ${index + 1}`, value: option })))
            // .addFields(options.map((option, index) => ({ name: `Option ${getNumberEmoji(index + 1)} ${option}` })))
            .addFields(options.map((option, index) => ({ name: `Option ${index + 1}`, value: `${getNumberEmoji(index + 1)} ${option}` })))
            .setFooter({ text: `• Created by ${interaction.user.tag} • ${new Date().toLocaleString()}` })
            .toJSON();
           

       // Send the embed message and store the message object
       const pollMessagePayload = await interaction.reply({ embeds: [embed], fetchReply: true });
       const pollMessage = pollMessagePayload instanceof Array ? pollMessagePayload[0] : pollMessagePayload;

       // Add reactions to the message for each option
       for (let i = 0; i < options.length; i++) {
           await pollMessage.react(getNumberEmoji(i+1));
    }
  }
};

// Function to get number emoji
function getNumberEmoji(number) {
    const numberEmojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
    return numberEmojis[number - 1];
}