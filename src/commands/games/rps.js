const { CommandInteraction, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'rps',
    description: 'Play Rock, Paper, Scissors with the bot.',
    options: [
        {
            name: 'choice',
            description: 'Choose your move: rock, paper, or scissors.',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                { name: 'Rock', value: 'rock' },
                { name: 'Paper', value: 'paper' },
                { name: 'Scissors', value: 'scissors' }
            ]
        }
    ],
    async callback(client, interaction = new CommandInteraction()) {
        const choices = ['rock', 'paper', 'scissors'];
        const botChoice = choices[Math.floor(Math.random() * choices.length)];

        const playerChoice = interaction.options.getString('choice');

        let result;

        if (playerChoice === botChoice) {
            result = 'It\'s a tie!';
        } else if (
            (playerChoice === 'rock' && botChoice === 'scissors') ||
            (playerChoice === 'paper' && botChoice === 'rock') ||
            (playerChoice === 'scissors' && botChoice === 'paper')
        ) {
            result = 'You win!';
        } else {
            result = 'You lose!';
        }

        const embed = new EmbedBuilder()
            .setTitle('Rock, Paper, Scissors')
            .addFields({ name: 'You chose:', value: playerChoice})
            .addFields({ name: 'Bot\'s Choice:', value: botChoice})
            .addFields({ name: 'Result:', value: result})
            

        await interaction.reply({ embeds: [embed] });
    }
};
