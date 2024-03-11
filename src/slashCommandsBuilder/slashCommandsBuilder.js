
const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
    .setName("uinfo")
    .setDescription('Echoes some information about the user who triggered it.');

module.exports = {
    data,
    async execute(interaction) {
        if (!interaction.member) {
            await interaction.reply(`Unable to access user information in this context.`);
            return;
        }

        await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
    }
};