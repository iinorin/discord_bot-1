const {
  Client,
  IntentsBitField,
  EmbedBuilder,
  ApplicationCommandOptionType,
} = require("discord.js");

const { Player, SpotifyExtractor } = require('discord-player');

// const client = new Client({
//   intents: [
//     IntentsBitField.Flags.Guilds,
//     IntentsBitField.Flags.GuildMessages,
//     IntentsBitField.Flags.MessageContent,
//     IntentsBitField.Flags.GuildVoiceStates,
//   ],
// });

// Create the Player instance after the client is created
// console.log(client.player); // This should now log the Player object

module.exports = {
  name: "play",
  description: "Plays music in your voice channel.",
  testOnly: true, // Just for testing, remove it for actual usage
  options: [
    {
      name: "query",
      description: "The Spotify track link to play.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  callback: async (client, interaction) => {
    client.player = new Player(client);

    if (!interaction.guild) {
      await interaction.reply(
        "This command can only be used in a server (guild)."
      );
      return;
    }

    const member = interaction.member;

    if (!member || !member.voice.channel) {
      await interaction.reply(
        "You need to be in a voice channel to use this command!"
      );
      return;
    }

    const voiceChannel = member.voice.channel;

    try {
      console.log(client.player);

      const queue = await client.player.nodes.create(interaction.guild);

      console.log("Successfully created queue.");

      if (!queue.connection) await queue.connect(voiceChannel);

      const query = interaction.options.getString("query");
      console.log(query); // Verify the Spotify URL

      // Check if the query is a Spotify track link
      if (query.includes("open.spotify.com/track/")) {
        const extractor = new SpotifyExtractor(); // Create a new instance of SpotifyExtractor
        const trackInfo = await extractor.spotify(query); // Use SpotifyExtractor to get track info

        console.log(typeof SpotifyExtractor); // Should be "function"
        console.log(extractor); // Should show the extractor instance

        

        await queue.play(trackInfo.tracks[0]);
        const embed = new EmbedBuilder()
          .setTitle("Music Player")
          .setDescription(`Now playing: ${trackInfo.tracks[0].title}`)
          .setColor(0x0099ff)
          .setTimestamp()
          .setFooter({ text: `Requested by ${interaction.user.tag}` });

        await interaction.reply({ embeds: [embed] });
      } else {
        await interaction.reply("Please provide a valid Spotify track link!");
      }
    } catch (error) {
      console.error("Error joining/playing in voice channel:", error);
      await interaction.reply("Failed to join/queue the track!");
    }
  },
};

// Login with your Discord bot token (replace with your actual token)
// client.login(process.env.TOKEN);
// https://open.spotify.com/track/4SupI9OXg3hwrymR85hkhL?si=81a7564237de4f5e 