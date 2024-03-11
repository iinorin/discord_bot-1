const { EmbedBuilder } = require('discord.js');


module.exports = {
    name: 'whois',
    description: 'Display information about a user.',
    // deleted: Boolean,


    options: [
        {
            name: 'user',
            description: 'The user to get information about.',
            type: 9,
            required: false,
        },
    ],

    async callback(client, interaction) {
        // Check if a user is mentioned
        const mentionedUser = interaction.options.getUser('user');

        // Get the user who executed the command or the mentioned user
        const user = mentionedUser || interaction.user;

        // Fetch additional information about the user
        const member = await interaction.guild.members.fetch(user.id);

        // Create a rich embed with the user information
        

      
        
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setDescription(`User Information: ${user.username}`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'Username', value: user.username, inline: true },
                { name: 'Discriminator', value: user.discriminator, inline: true },

                { name: 'Status', value: member?.presence?.status || 'Not available', inline: true },
                { name: 'Joined Discord', value: user.createdAt.toDateString(), inline: true },
                { name: 'Joined Server', value: member.joinedAt.toDateString(), inline: true },
                // { name: 'Roles', value: member.roles.cache.map(role => role.name).join(', '), inline: true }
            )
            .addFields(
                { name: 'Roles', value: member.roles.cache.map(role => role.toString()).join(' '), inline: false },
                { name: 'Key permissions', value: member.permissions.toArray().join(', '), inline: true }
            )
            .setFooter({ text: `UserID : ${user.id}` })
            .setTimestamp()


        // Send the user information as an embed
        await interaction.reply({ embeds: [embed] });
    },
};