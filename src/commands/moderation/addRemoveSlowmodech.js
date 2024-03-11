const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'slowmode',
    description: 'Add or remove slow mode to a channel.',
    options: [
        {
            name: 'action',
            description: 'Action to perform (add or remove)',
            type: 3,
            required: true,
            choices: [
                { name: 'Add', value: 'add' },
                { name: 'Remove', value: 'remove' }
            ]
        },
        {
            name: 'delay',
            description: 'Delay in seconds, minutes, or hours (required for add action)',
            type: 3, // Changed type to String
            required: false
        },
        {
            name: 'channel',
            description: 'Channel to apply slow mode to',
            type: 7,
            required: false
        }
    ],
    async callback(client, interaction) {
        const action = interaction.options.getString('action');
        const delayString = interaction.options.getString('delay');
        let channel = interaction.options.getChannel('channel');

        // If no channel is provided, default to the current channel
        if (!channel) {
            channel = interaction.channel;
        }

        // Check if the member has the necessary permissions to manage channels
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return interaction.reply({ content: 'You do not have permission to manage channels.', ephemeral: true });
        }

        try {
            switch (action) {
                case 'add':
                    if (!delayString) {
                        return interaction.reply({ content: 'Please specify the delay.', ephemeral: true });
                    }
                    const delayInSeconds = parseDelay(delayString);
                    await channel.setRateLimitPerUser(delayInSeconds);
                    return interaction.reply({ content: `Slow mode set to ${delayString} for ${channel}.`, ephemeral: false });

                case 'remove':
                    await channel.setRateLimitPerUser(0); // Set to 0 to remove slow mode
                    return interaction.reply({ content: `Slow mode removed for ${channel}.`, ephemeral: true });

                default:
                    return interaction.reply({ content: 'Invalid action specified.', ephemeral: true });
            }
        } catch (error) {
            console.error('Error setting slow mode:', error);
            return interaction.reply({ content: 'An error occurred while setting slow mode.', ephemeral: true });
        }
    }
};

// Function to parse delay string and convert it to seconds
function parseDelay(delayString) {
    const units = {
        's': 1,
        'm': 60,
        'h': 3600
    };

    const matches = delayString.match(/^(\d+)([smh])$/);
    if (!matches) {
        throw new Error('Invalid delay format. Please specify the delay in seconds, minutes, or hours (e.g., 10s, 5m, 2h).');
    }

    const value = parseInt(matches[1]);
    const unit = matches[2];

    if (!units[unit]) {
        throw new Error('Invalid time unit. Please specify the delay in seconds, minutes, or hours (e.g., 10s, 5m, 2h).');
    }

    return value * units[unit];
}

