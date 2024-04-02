const { PermissionsBitField, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "serverinfo",
  description: "Display information about the server",
  // deleted: true,
  devonly: true,

  async callback(client, interaction) {
    const guild = interaction.guild;

    // interaction.deferReply();

    // Get total member count
    const memberCount = guild.memberCount;
    console.log(memberCount);

    // Get text and voice channels count + Category and Threads(public) count
    const textChannelsCount = guild.channels.cache
      .filter((channel) => channel.type === 0)
      .toJSON().length;
    const voiceChannelsCount = guild.channels.cache
      .filter((channel) => channel.type === 2)
      .toJSON().length;
    const categoryCount = guild.channels.cache
      .filter((channel) => channel.type === 4)
      .toJSON().length;

    const threadsCount = guild.channels.cache
      .filter((channel) => channel.type === 11)
      .toJSON().length;

    console.log(
      "total channels",
      textChannelsCount,
      voiceChannelsCount,
      categoryCount,
      threadsCount
    );

    // Get server owner
    const owner = guild.ownerId;
    console.log("owner name ", owner);

    // Get server creation date
    const creationDate = guild.createdAt.toDateString();
    console.log("date created", creationDate);

    // Get emoji count
    const emojisCount = guild.emojis.cache.size;
    console.log("emojies", emojisCount);

    // Get server boost count
    const boostCount = guild.premiumSubscriptionCount;
    console.log("boost count", boostCount);

    // Get role count
    const roleCount = guild.roles.cache.size;
    console.log("role amount", roleCount);

    // Get admin and moderator count
    const adminCount = guild.roles.cache.filter((role) =>
      role.permissions.has(PermissionsBitField.Flags.Administrator)
    ).size;
    const moderatorCount = guild.roles.cache.filter((role) =>
      role.permissions.has(PermissionsBitField.Flags.ManageMessages)
    ).size;

    console.log("admin and moderator", adminCount, moderatorCount);

    // Get server avatar URL
    const serverAvatarURL =
      guild.iconURL({ dynamic: true, size: 256 }) ||
      "https://i.pinimg.com/564x/89/0f/95/890f959439820a4f878a11bc64366757.jpg";
    console.log(serverAvatarURL, "avatar url");

    let baseVerfication = guild.verificationLevel;
    if (baseVerfication ==0) verificationLevel = "None";
    if (baseVerfication ==1) verificationLevel = "Low";
    if (baseVerfication ==2) verificationLevel = "Medium";
    if (baseVerfication ==3) verificationLevel = "High";
    if (baseVerfication ==4) verificationLevel =  "Very High";

    // Create embed with server information
    try {
      const embed = new EmbedBuilder()
        .setColor("#0088ff")
        .setTitle(`${guild.name} Server Info`)
        .addFields(
          { name: "Owner", value: `<@${owner}>` },
          { name: "Creation Date", value: creationDate, inline: true},
          { name: "Total Members", value: `${memberCount}`, inline: true },
          { name: "Text Channels", value: `${textChannelsCount}`, inline: true },
          {
            name: "Voice Channels",
            value: `${voiceChannelsCount}`,
            inline: true,
          },
          {
            name: "Server Categories",
            value: `${categoryCount}`,
            inline: true,
          },
          { name: "Threads", value: `${threadsCount}`, inline: true },
          { name: "Boost Count", value: `${boostCount}`, inline: true },
          { name: "Emojis", value: `${emojisCount}`, inline: true },
          { name: "Roles", value: ` ${roleCount} `, inline: true },
          { name: "Admins", value: `${adminCount}`, inline: true },
          { name: "Moderators", value: `${moderatorCount}`, inline: true },
          { name: "Verification Level ", value: `${verificationLevel}`, inline: true }  
        )

        .setThumbnail(serverAvatarURL)
        .setTimestamp()
        .setFooter({ text: `Server ID  ${guild.id}` });

      // Reply with the embed
      await interaction.reply({ embeds: [embed], ephemeral: false});
      console.log(embed);
    } catch (error) {
      console.log("The error u got is:: ", error.stack);
    }
  },
};


//