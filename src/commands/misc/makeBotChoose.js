const { ApplicationCommandOptionType, MessageEmbed, EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'choose',
    description: "Let the bot choose between two or more options",
    options: [
        {
            name: 'options',
            description: 'List of options separated by commas',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],

    async callback(client, interaction) {
        const options = interaction.options.getString('options').split(',').map(option => option.trim());

        // Check if there are at least two options
        if (options.length < 2) {
            return interaction.reply({
                content: "Please provide at least two options separated by commas.",
                ephemeral: true
            });
        }

        // Choose a random option
        const chosenOption = options[Math.floor(Math.random() * options.length)];

        // Create embed to display the chosen option
        const embed = new EmbedBuilder()
            .setColor('#0088ff')
            // .setTitle("Bot's Choice")
            .setThumbnail(interaction.user.displayAvatarURL())
            .addFields({ name: '**You gave me:**', value: options.join('\n'), inline: false })
            .addFields({ name: '**I Chose:**', value: `**${chosenOption}**` })
            .setImage('https://i.pinimg.com/originals/a2/de/ee/a2deeee8251b64683f9eb3734f5cd712.gif')
            .setTimestamp();

        // Reply with the embed
        await interaction.reply({ embeds: [embed] });
    }
};
