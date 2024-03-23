const axios = require("axios");
const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
require("dotenv").config();

async function fetchGifs(action) {
  const giphyAPIKey = process.env.GIPHYAPI;
  const url = `https://api.giphy.com/v1/gifs/search?q=anime+${action}&api_key=${giphyAPIKey}&limit=8`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    console.log("API Response Data:", data); // Log the response data to inspect its structure

    if (!data.data || !Array.isArray(data.data) || data.data.length === 0) {
      throw new Error("No results found or results is not an array");
    }

    const gifs = data.data.map((gif) => {
      if (gif.images && gif.images.original && gif.images.original.url) {
        return { url: gif.images.original.url }; // Adjusted to use 'url' property
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
    {
      name: "user",
      description: "The user to react to.",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
  ],
  async callback(client, interaction) {
    await interaction.deferReply();

    const action = interaction.options.getString("action");
    const randomGif = await getRandomGif(action);

    const user = interaction.options.getUser("user");
    const username = user.username;

    if (!randomGif) {
      return interaction.editReply(`No gifs found for action: ${action}`);
    }

    const embed = new EmbedBuilder()
      .setTitle( `${interaction.user.username} ${action}s! ${username} `)
      .setColor("Random")
      .setImage(randomGif.url);

    await interaction.editReply({ embeds: [embed] });


  },
};
