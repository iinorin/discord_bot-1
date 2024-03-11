module.exports = {
    name: 'purge',
    description: 'Delete messages based on various criteria.',
    testOnly: true,
  
    options: [
      {
        name: 'count',
        description: 'The number of messages to delete (1-100).',
        type: 4,
        required: true,
      },
      {
        name: 'bot',
        description: 'Whether to delete messages sent by bots.',
        type: 5,
        required: false,
      },
      {
        name: 'human',
        description: 'Whether to delete messages sent by humans.',
        type: 5,
        required: false,
      },
      {
        name: 'images',
        description: 'Whether to delete messages containing images.',
        type: 5,
        required: false,
      },
      {
        name: 'links',
        description: 'Whether to delete messages containing links.',
        type: 5,
        required: false,
      },
      {
        name: 'after',
        description: 'The ID of the message to start deleting after.',
        type: 3,
        required: false,
      },
      {
        name: 'contains',
        description: 'Text that the message should contain to be deleted.',
        type: 3,
        required: false,
      },
    ],
  
    async callback(client, interaction) {
      // Get options
      const deleteCount = interaction.options.getInteger('count');
      const deleteBotMessages = interaction.options.getBoolean('bot') ?? false;
      const deleteHumanMessages = interaction.options.getBoolean('human') ?? false;
      const deleteImages = interaction.options.getBoolean('images') ?? false;
      const deleteLinks = interaction.options.getBoolean('links') ?? false;
      const afterMessageId = interaction.options.getString('after');
      const containsText = interaction.options.getString('contains');
  
      // Check if the user has permission to manage messages
      if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
        return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
      }
  
      // Function to filter messages based on options
      const shouldDeleteMessage = (message) => {
        // Check if the message meets any of the conditions to be deleted
        if (
            (!deleteBotMessages && message.author.bot) || // Check if bot messages should be deleted and if the current message is from a bot
            (!deleteHumanMessages && !message.author.bot) || // Check if human messages should be deleted and if the current message is from a human
            (!deleteImages && message.attachments.size > 0) || // Check if messages with images should be deleted and if the current message has attachments
            (!deleteLinks && message.content.match(/https?:\/\/\S+/)) || // Check if messages with links should be deleted and if the current message contains links
            (afterMessageId && message.id <= afterMessageId) || // Check if messages after a certain ID should be deleted and if the current message meets the condition
            (containsText && message.content.includes(containsText)) // Check if messages containing specific text should be deleted and if the current message meets the condition
        ) {
            return true; // Return true if the message meets any of the conditions to be deleted
        }
        return false; // Otherwise, return false
      }; 
  
      try {
        // Delete the specified number of messages in the channel
        const messages = await interaction.channel.messages.fetch({ limit: deleteCount + 2});
        const filteredMessages = messages.filter(shouldDeleteMessage);
  
        if (filteredMessages.size > 0) {
          await interaction.channel.bulkDelete(filteredMessages);
          await interaction.reply({ content: `Successfully deleted ${filteredMessages.size} messages.`, ephemeral: true });
        } else {
          await interaction.reply({ content: 'No matching messages found.', ephemeral: true });
        }
      } catch (error) {
        console.error('Error purging messages:', error);
        await interaction.reply({ content: 'An error occurred while purging messages.', ephemeral: true });
      }
    },
  };
