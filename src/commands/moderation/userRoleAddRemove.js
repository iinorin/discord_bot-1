const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');
const client = new Client({ intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages] });

module.exports = {
  name: 'updaterole',
  description: 'Give or remove a role from a user.',
  options: [
    {
      name: 'user',
      description: 'The user to give or remove the role from',
      type: 6, // User type
      required: true
    },
    {
      name: 'role',
      description: 'The role to give or remove',
      type: 8, // Role type
      required: true
    },
    {
      name: 'action',
      description: 'Action to perform (give or remove)',
      type: 3, // String type
      required: true,
      choices: [
        {
          name: 'Give',
          value: 'give'
        },
        {
          name: 'Remove',
          value: 'remove'
        }
      ]
    }
  ],

  async callback(client, interaction) {
    const user = interaction.options.getUser('user');
    const role = interaction.options.getRole('role');
    const action = interaction.options.getString('action');

    const member = interaction.guild.members.cache.get(user.id);
    if (!member) {
      return interaction.reply({ content: 'User not found in this server.', ephemeral: true });
    }

    if (action === 'give') {
      try {
        await member.roles.add(role);
        await interaction.reply({ content: `Successfully gave ${role.name} role to ${user.tag}.`, ephemeral: false });
      } catch (error) {
        console.error('Error giving role:', error);
        await interaction.reply({ content: 'An error occurred while giving the role.', ephemeral: true });
      }
    } else if (action === 'remove') {
      try {
        await member.roles.remove(role);
        await interaction.reply({ content: `Successfully removed ${role.name} role from ${user.tag}.`, ephemeral: false});
      } catch (error) {
        console.error('Error removing role:', error);
        await interaction.reply({ content: 'An error occurred while removing the role.', ephemeral: true });
      }
    } else {
      await interaction.reply({ content: 'Invalid action. Please choose "give" or "remove".', ephemeral: true });
    }
  }
};


