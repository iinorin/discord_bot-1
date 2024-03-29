const { ApplicationCommandOptionType, MessageEmbed, EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'coinflip',
    description: "Flips the desired number of coins",
    options: [
        {
            name: 'amount',
            description: 'Amount of coin to flip (up to 3)',
            type: ApplicationCommandOptionType.Integer,
            required: false,
            choices: [
                { name: '1', value: 1 },
                { name: '2', value: 2 },
                { name: '3', value: 3 }
            ]
        },
    ],

    async callback(client, interaction) {
        const amount = interaction.options.getInteger('amount') || 1;
        
        // Ensure amount is between 1 and 3
        const coinCount = Math.min(Math.max(amount, 1), 3);
        
        // Flip the coins
        const results = Array.from({ length: coinCount }, () => (Math.random() < 0.5 ? 'Heads' : 'Tails'));
        
        // Create embed to display results
        const embed = new EmbedBuilder()
            .setColor('#0088ff')
            .setTitle(`Coin Flip (${coinCount} coins)`)
            .setDescription(results.join('\n'))
            .setThumbnail('https://i.pinimg.com/originals/d7/49/06/d74906d39a1964e7d07555e7601b06ad.gif')
            .setTimestamp();
        
        // Reply with the embed
        await interaction.reply({ embeds: [embed], ephemeral: false });
    }
};
