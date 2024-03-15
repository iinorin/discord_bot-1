const { PermissionsBitField, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'nickset',
    description: 'Changes the nickname of a user.',
    // deleted:Boolean,
    options: [
        {
            name: 'user',
            description: 'The user whose nickname will be changed.',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: 'nickname',
            description: 'The new nickname for the user.',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    callback: async (client, interaction) => {
        // Check if the user has permission to manage nicknames
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageNicknames)) {
            return await interaction.reply({ content: 'You do not have permission to change nicknames.', ephemeral: true });
        }
        // Get the user to change their nickname
        const user = interaction.options.getMember('user');
        const previousNickname = user.displayName;
        const newNickname = interaction.options.getString('nickname');


        try {
            await user.setNickname(newNickname);
            const embed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle('Nickname Changed')
                // .setDescription(`Changed nickname for ${user.displayName} to ${newNickname}.`);
                .setDescription(`Changed nickname for user ID: ${user.user.tag} (previously known as ${previousNickname}) to ${newNickname}.`);
            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error changing nickname:', error);
            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('Error')
                .setDescription('An error occurred while changing the nickname.');
            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    },
};
