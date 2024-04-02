const { ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  // data: new SlashCommandBuilder()

  name: "botinfo",
  description: "Gives some bot stats",
  // deleted: true,
  devonly: true,

  async callback(client, interaction) {
    const name = client.user.tag;
    const icon = `${client.user.displayAvatarURL()}`;
    let totalSeconds = client.uptime / 1000;
    let days = Math.floor(totalSeconds / 86400);
    let servercount = await client.guilds.cache.reduce(
      (a, b) => a + b.memberCount,
      0
    );
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    let uptime = `${days} days, ${hours} hours, ${minutes} minutes & ${seconds} seconds`;
    let ping = `${Date.now() - interaction.createdTimestamp}ms.`;

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Primary Server")
        .setStyle(ButtonStyle.Link)
        .setURL("https://discord.gg/6HHukmvE8E"),

      new ButtonBuilder()
        .setLabel("Bot Invite")
        .setStyle(ButtonStyle.Link)
        .setURL(
          "https://discord.com/oauth2/authorize?client_id=1207271901366587412&permissions=8&scope=bot"
        )
    );

    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setAuthor({ name: name, iconURL: icon })
      .setThumbnail(`${icon}`)
      .setFooter({ text: "Bot ID: 1207271901366587412 " })
      .setTimestamp()
      .addFields({
        name: "Server Numbers",
        value: `${client.guilds.cache.size}`,
        inline: true,
      })
      .addFields({
        name: "Server Members",
        value: `${servercount}`,
        inline: true,
      })
      .addFields({ name: "Latency", value: `${ping}`, inline: true })
      .addFields({ name: "Uptime", value: `\`\`\`${uptime}\`\`\`` });

    await interaction.reply({
      embeds: [embed],
      components: [row],
      ephemeral: false,
    });
  },
};
