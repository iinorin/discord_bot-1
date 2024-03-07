module.exports = {
    name: 'someone',
    description: 'echo',
    // devOnly: Boolean,
    // testOnly: true, 
    // options: Object[],
    deleted: Boolean,
  
        async execute(interaction) {
        await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
    },
  };
    