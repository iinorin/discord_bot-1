const { Client, IntentsBitField, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

const client = new Client({ intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages] });

module.exports = {
    name: 'announce',
    description: 'Send an announcement to a specific role in a chosen channel.',
    options: [
        {
            name: 'role',
            description: 'The role to ping in the announcement.',
            type: ApplicationCommandOptionType.Role,
            required: true,
        },
        {
            name: 'channel',
            description: 'The channel to send the announcement to.',
            type: ApplicationCommandOptionType.Channel,
            required: true,
        },
        {
            name: 'announcement',
            description: 'The announcement message.',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    callback: async (client, interaction) => {
        // Get options from the interaction
        const role = interaction.options.getRole('role');
        const channel = interaction.options.getChannel('channel');
        const announcement = interaction.options.getString('announcement');

        // Create the embed for the announcement
        const embed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('Announcement')
            .setDescription(announcement)
            
            .addFields({name: 'Role:' , value: role.toString()})
            .setTimestamp();

        try {
            // Send the announcement to the specified channel
            await channel.send({ content: role.toString(), embeds: [embed] });
            await interaction.reply('Announcement sent successfully!');
        } catch (error) {
            console.error(`Error sending announcement: ${error}`);
            await interaction.reply('There was an error while sending the announcement.');
        }
    },
};