const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  devonly: Boolean,
  // deleted: Boolean,
  name: "update-avatar",
  description: "Animate an avatar for your bot",

  options: [
    {
      name: "new-avatar",
      description: "The avatar to animate",
      type: ApplicationCommandOptionType.Attachment,
      required: true,
    },
  ],
  async callback(client, interaction) {
    const { options } = interaction;
    const avatar = options.getAttachment("new-avatar");
    console.log(options);

    async function sendMessage(message) {
      const embed = new EmbedBuilder()
        .setColor("Random")
        .setDescription(message);

      await interaction.reply({ embeds: [embed], ephemeral: true });
    }
    if (   
      avatar.contentType !== "image/gif" &&
      avatar.contentType !== "image/png" &&
      avatar.contentType !== "image/jpeg"
    )
      return await sendMessage(` Please use a gif format for animated emojis`);

    var error;
    await client.user.setAvatar(avatar.url).catch(async (err) => {
      error = true;
      console.log(err);
      return await sendMessage(`▲ Error: \`${err.toString()}\``);
    });

    if (error) return;
    await sendMessage(`I have uploaded your avatar`);
  },
};
