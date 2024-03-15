const { Client, IntentsBitField, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

const client = new Client({ intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages] });

// Set to store cooldowns (user ID as key, cooldown expiration timestamp as value)
const cooldowns = new Map();

// Function to check and handle cooldowns
const checkCooldown = (userId, cooldownDuration) => {
    const now = Date.now();
    if (cooldowns.has(userId)) {
        const expirationTime = cooldowns.get(userId);
        if (expirationTime > now) {
            const remainingTime = (expirationTime - now) / 1000;
            return `You're on cooldown! Please wait ${remainingTime.toFixed(1)} seconds before reporting another issue.`;
        }
    }

    // Add user to cooldown set if not already there
    const newExpirationTime = now + cooldownDuration * 1000;
    cooldowns.set(userId, newExpirationTime);
    setTimeout(() => cooldowns.delete(userId), cooldownDuration * 1000); // Remove from cooldown after duration

    return false; // No cooldown active
};



module.exports = {
    name: 'report',
    description: 'Report an issue with the bot.',
    options: [
        {
            name: 'issue',
            description: 'Description of the issue you encountered.',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],

    callback: async (client, interaction) => {
        const cooldownMessage = checkCooldown(interaction.user.id, 60 * 5); // 5 minutes cooldown
        if (cooldownMessage) {
            return await interaction.reply(cooldownMessage);
        }

        // Get the reported issue from the command options
        const issue = interaction.options.getString('issue');
        console.log('Reported issue:', issue); // checker

        if (!issue) return await interaction.reply('Please provide a description of the issue.');



        // Send issue report to bot developer 
        const developerId = process.env.DEVID; // For single developer
        const developer = await client.users.fetch(developerId);
        if (!developer) return await interaction.reply('Could not find the bot developer.');

        const reportEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('Issue Report')
            .setDescription(issue)
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

        try {
            await developer.send({ embeds: [reportEmbed] });
            console.log({ embeds: [reportEmbed] });
            await interaction.reply('Your issue has been reported to the bot developer. Thank you for your feedback!');
        } catch (error) {
            console.error(`Error sending issue report to developer: ${error}`);
            await interaction.reply('There was an error while reporting the issue. Please try again later.');
        }


    },
};
