const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");

function playGame(userChoice) {
    const choices = ['snake', 'water', 'gun'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    if (userChoice === computerChoice) {
        return { result: "It's a tie!", computerChoice };
    } else if (userChoice === 'snake') {
        return { result: "You win! Snake drinks water.", computerChoice };
    } else if (userChoice === 'water') {
        return { result: "You lose! Snake drinks water.", computerChoice };
    } else if (userChoice === 'gun') {
        return { result: "You lose! Water rusts the gun.", computerChoice };
    }
}

module.exports = {
    name: 'swg',
    description: 'Play snake water gun game.',
    options: [ 
        {
            name: 'choice',
            description: 'Choose your option',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                { name: 'Snake', value: 'snake' },
                { name: 'Water', value: 'water' },
                { name: 'Gun', value: 'gun' }
            ]
        }
    ],
    async callback(client, interaction) {
        await interaction.deferReply();

        const userChoice = interaction.options.getString("choice");
        const { result, computerChoice } = playGame(userChoice);

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Snake Water Gun Game')
            .addFields({ name: 'Your Choice', value: userChoice, inline: true })
            .addFields({ name: 'My Choice', value: computerChoice, inline: true })
            .setDescription(result);
    
     

        await interaction.editReply({ embeds: [embed] });
    },
};
