const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'role',
    description: 'Create or delete a role',
    testOnly: true, // Set this to false when deploying to a production environment

    options: [
        {
            name: 'action',
            description: 'Action to perform (create, delete)',
            type: 3,
            required: true,
            choices: [
                { name: 'Create', value: 'create' },
                { name: 'Delete', value: 'delete' },
            ]
        },
        {
            name: 'role_name',
            description: 'Name of the role to create or delete',
            type: 3,
            required: true,
        },
        {
            name: 'role_color',
            description: 'Color of the role (optional)',
            type: 3,
            required: false,
        },
    ],

    async callback(client, interaction) {
        const action = interaction.options.getString('action');
        const roleName = interaction.options.getString('role_name');
        const roleColor = interaction.options.getString('role_color');

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
         
            return interaction.reply({ content: 'You do not have permission to manage roles.', ephemeral: true });
        }

        try {
            if (action === 'create') {
                // Create role
                let roleOptions = { name: roleName };
                if (roleColor) {
                    roleOptions.color = roleColor.toUpperCase();
                }
                const role = await interaction.guild.roles.create({
                    ...roleOptions,
                    reason: 'Role creation requested by user.',
                });

                const embed = new EmbedBuilder()
                    .setColor('#00FF00')
                    .setTitle(`Role Created`)
                    .setDescription(`Role "${role.name}" created successfully!`)
                    .addFields({name: 'Role ID', value: role.id})
                    

                return interaction.reply({ embeds: [embed], ephemeral:false });
            } else if (action === 'delete') {
                // Delete role
                const role = interaction.guild.roles.cache.find(r => r.name === roleName);
                if (!role) {
                    return interaction.reply({ content: `Role "${roleName}" not found.`, ephemeral: true });
                }

                await role.delete();
                const embed = new EmbedBuilder()
                    .setColor('#FF0000')
                    .setTitle(`Role Deleted`)
                    .setDescription(`Role "${role.name}" deleted successfully!`);

                return interaction.reply({ embeds: [embed], ephemeral: false });
            }
        } catch (error) {
            console.error('Error:', error);
            return interaction.reply({ content: 'An error occurred while processing the command.', ephemeral: true });
        }
    },
};
 