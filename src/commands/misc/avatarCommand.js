const {
    Client,
    Interaction,
   
    ApplicationCommandOptionType,
    EmbedBuilder,
  } = require('discord.js');

  module.exports = {
    name: 'avatar',
    description: 'Shows the avatar of the mentioned user.',
  
    options: [
      {
        name: 'target-user',
        description: 'The user whose avatar you want to see (optional).',
        type: ApplicationCommandOptionType.Mentionable,
      },
    ],
  
    // async execute(client, interaction) {
    callback: async (client, interaction) => {
      await interaction.deferReply(); // Defer the initial response
  
      const targetUser = interaction.options.get('target-user')?.user || interaction.user; // Get target user (mentioned or self)
  
      try {
        const avatarURL = targetUser.displayAvatarURL({ dynamic: true, size: 4096 });  // Get dynamic avatar URL
  
        const embed = new EmbedBuilder()
          .setColor(0x00ffff)
          .setTitle(`${targetUser.username}'s Avatar`)
          .setImage(avatarURL)
          .setTimestamp();
  
        await interaction.editReply({ embeds: [embed] }); // Edit the deferred reply with the embed
      } catch (error) {
        console.error('Error fetching avatar:', error);
        interaction.editReply('An error occurred while fetching the avatar.'); // Edit the reply with an error message
      }
    },
  };
  

  