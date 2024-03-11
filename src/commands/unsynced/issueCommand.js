const { Client, IntentsBitField, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
// const { callback } = require('./ping');

const client = new Client({ intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages] });

// Map to store users who reported issues and their timestamps
const reportCooldowns = new Map();

module.exports = {
    name: 'report',
    description: 'Report an issue with the bot.',

    options: [
        {
            name: 'issue',
            description: 'Description of the issue you encountered.',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    callback: async (client, interaction) => {
        // Check if user is on cooldown
        if (reportCooldowns.has(interaction.user.id)) {
            const cooldownExpiration = reportCooldowns.get(interaction.user.id);
            const remainingTime = (cooldownExpiration - Date.now()) / 1000;
            return await interaction.reply(`You're on cooldown! Please wait ${remainingTime.toFixed(1)} seconds before reporting another issue.`);
        }

        // Add user to cooldown
        const cooldownDuration = 60 * 5; // 5 minutes
        const cooldownExpiration = Date.now() + cooldownDuration * 1000;
        reportCooldowns.set(interaction.user.id, cooldownExpiration);

        // Get the reported issue from the command options
        const issue = interaction.options.getString('issue');
        console.log('Reported issue:', issue); // checker

        if (!issue) return await interaction.reply('Please provide a description of the issue.');

        

        // Send issue report to bot developers
      
               const developerId = process.env.DEVID; //For single
               const developer = await client.users.fetch(developerId); //For single
            if (!developer) return await interaction.reply('Could not find the bot developer.');
        
            const reportEmbed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('Issue Report')
                .setDescription(issue)
                .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })

                .setTimestamp();


            try {
                await developer.send({ embeds: [reportEmbed] });
                console.log({ embeds: [reportEmbed] })

                await interaction.reply('Your issue has been reported to the bot developer. Thank you for your feedback!');
                //   } catch (error) {
                //       console.error(`Error sending issue report to developer: ${error}`);
                //       await interaction.reply('There was an error while reporting the issue. Please try again later.');
                //   }

            } catch (error) {
                console.error(`Error sending issue report to developer: ${error}`);

                if (error.message.includes('Expected the value to be an object')) {
                    await interaction.reply('There was an error processing the data. Please check your input and try again.');
                } else if (error.message.includes('Cannot send messages to this user')) {
                    await interaction.reply('I\'m unable to send direct messages to the bot developer at this time. Please try another way to contact them.');
                } else {
                    const errorMessage = error.message ? error.message : 'An unknown error occurred.';
                    await interaction.reply(`There was an error while reporting the issue. Please try again later. (Error: ${errorMessage})`);
                }
            } 

        },

    };
