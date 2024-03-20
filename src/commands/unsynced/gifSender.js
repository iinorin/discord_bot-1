const axios = require("axios");
const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
require("dotenv").config();

async function fetchGifs(action) {
  const tenorAPIKey = process.env.TENORAPI;
  const url = `https://tenor.googleapis.com/v2/search?q=anime${action}&key=${tenorAPIKey}&client_key=discord bot&limit=8`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    console.log("API Response Data:", data); // Log the response data to inspect its structure

    if (!data.results || !Array.isArray(data.results)) {
      throw new Error("No results found or results is not an array");
    }

    const gifs = data.results.map((result) => {
      if (result.url) {
        return { url: result.url }; // Adjusted to use 'url' property
      } else {
        throw new Error("No media found or media is not an array");
      }
    });

    return gifs;
  } catch (error) {
    console.error("Error fetching gifs:", error);
    return [];
  }
}

async function getRandomGif(action) {
  const gifs = await fetchGifs(action);
  const randomIndex = Math.floor(Math.random() * gifs.length);
  return gifs[randomIndex];
}

module.exports = {
  name: "reaction",
  description: "Fetches an anime-related gif based on the provided action.",
  options: [
    {
      name: "action",
      description:
        "The action to fetch a gif for (kill, kiss, lewd, slap, punch, poke, hug)",
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        { name: "Kill", value: "kill" },
        { name: "Kiss", value: "kiss" },
        { name: "Lewd", value: "lewd" },
        { name: "Slap", value: "slap" },
        { name: "Punch", value: "punch" },
        { name: "Poke", value: "poke" },
        { name: "Hug", value: "hug" },
        { name: "bonk", value: "bonk" },
      ],
    },
  ],
  async callback(client, interaction) {
    await interaction.deferReply();

    const action = interaction.options.getString("action");
    const randomGif = await getRandomGif(action);

    if (!randomGif) {
      return interaction.editReply(`No gifs found for action: ${action}`);
    }
    console.log(randomGif.url);

    const embed = new EmbedBuilder()
      .setTitle("Title")

      // .setImage('https://media1.tenor.com/m/6QAwJhmtZm0AAAAC/die-i-will-find-you.gif');
      .setImage(randomGif.url);

    await interaction.editReply(randomGif.url);
    await interaction.channel.send({ embeds: [embed] });
    console.log(embed)
  },
};
