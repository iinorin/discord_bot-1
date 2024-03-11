const { Interaction, EmbedBuilder } = require('discord.js');

// Map to store user AFK statuses and reasons
const afkUsers = new Map();

module.exports = {
    name: 'afk',
    description: 'Set or remove AFK status.',
    options: [
        {
            name: 'reason',
            description: 'Reason for going AFK',
            type: 3, // String type
            required: false
        }
    ],

    async callback(client, interaction) {
        const user = interaction.user;
        const reason = interaction.options.getString('reason') || 'No reason provided';

        // Store user in AFK list with reason
        afkUsers.set(user.id, { reason });
        console.log('afkUsers:', afkUsers);
      
        

        // Send confirmation message for setting AFK status
        const afkEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('AFK Status')
            .setDescription('Your AFK status has been set.')
            .addFields(
                { name: 'Status', value: 'AFK', inline: true },
                { name: 'Reason', value: reason, inline: true }
            )
            .setTimestamp();
        
        await interaction.reply({ embeds: [afkEmbed], ephemeral: false});
    }
}; 
