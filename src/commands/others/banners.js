const {
    ApplicationCommandOptionType,
    EmbedBuilder,
    DataResolver,
    Routes,
  } = require("discord.js");
  
  module.exports = {
    name: "setbanner",
    description: "Changes bot banner",
    devonly: Boolean,
    options: [
      {
        name: "banner",
        description: "The banner to add",
        type: ApplicationCommandOptionType.Attachment,
        required: true,
      },
    ],
  
    async callback(client, interaction) {
      
      const {options} = interaction;
      console.log(options);
      const banner = options.getAttachment("banner");
  
      async function sendMessage(message) {
        const embed = new EmbedBuilder()
          .setColor("Blurple")
          .setDescription(message);
  
        // await interaction.reply({ embeds: [embed], ephemeral: false });
        await interaction.channel.send({ embeds: [embed], ephemeral: false });
      }

      if (
        banner.contentType !== "image/gif" &&
        banner.contentType !== "image/png"
      )
        return await sendMessage("Please use a gif or png format for banners");
  
      var error;
      await client.rest
        .patch(Routes.user(), {
          body: { banner: await DataResolver.resolveImage(banner.url) },
        })
        .catch(async (err) => {
          error = true;
          await sendMessage(`💀 Error: \`${err.toString()}\``);
        });
  
      if (error) return;
      await sendMessage("🌐 I have updated your banner!!");
    },
  };
  