const {
    Client,
    Intents,
    ApplicationCommandOptionType,
    ActionRowBuilder,
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
  } = require("discord.js");
  
  // Function to create a game embed with the grid
  function createGameEmbed(grid) {
    return new EmbedBuilder()
      .setTitle("Snake Game")
      .setDescription("```" + grid + "```")
      .setColor("#0099ff")
      .setTimestamp();
  }
  
  // Function to create action rows with buttons
  function createButtons() {
    const top = new ButtonBuilder()
      .setCustomId("up")
      .setLabel("⬆️")
      .setStyle(ButtonStyle.Primary);
  
    const left = new ButtonBuilder()
      .setCustomId("left")
      .setLabel("⬅️")
      .setStyle(ButtonStyle.Primary);
  
    const right = new ButtonBuilder()
      .setCustomId("right")
      .setLabel("➡️")
      .setStyle(ButtonStyle.Primary);
  
    const down = new ButtonBuilder()
      .setCustomId("down")
      .setLabel("⬇️")
      .setStyle(ButtonStyle.Primary);
  
    const row1 = new ActionRowBuilder().addComponents(top);
    const row2 = new ActionRowBuilder().addComponents(left, right);
    const row3 = new ActionRowBuilder().addComponents(down);
  
    return [row1, row2, row3];
  }
  
  // Function to create the grid representing the game state
  function createGrid(size, snake, food) {
    const grid = [];
    for (let y = 0; y < size; y++) {
      const row = [];
      for (let x = 0; x < size; x++) {
        // Check if the current position is the snake's head or body
        if (snake.head.x === x && snake.head.y === y) {
          row.push('🟩'); // Head of the snake
        } else if (snake.body.some(segment => segment.x === x && segment.y === y)) {
          row.push('🟦'); // Body of the snake
        } else if (food.x === x && food.y === y) {
          row.push('🍎'); // Food
        } else {
          row.push('⬛'); // Empty space
        }
      }
      grid.push(row.join(''));
    }
    return grid.join('\n');
  }
  
  // Function to move the snake
  function moveSnake(gameState) {
    // Logic to move the snake based on the current direction
  }
  
  // Your command callback function
  async function callback(client, interaction) {
    // Initialize game state
    const gameState = {
      size: 10, // Size of the grid
      snake: {
        head: { x: 5, y: 5 }, // Initial position of the snake's head
        body: [] // Array to store the snake's body segments
      },
      food: { x: 2, y: 2 }, // Initial position of the food
      direction: 'right', // Initial direction of the snake
      score: 0 // Score counter
    };
  
    // Start the game by sending the initial game embed with buttons
    await interaction.reply({
      embeds: [createGameEmbed(createGrid(gameState.size, gameState.snake, gameState.food))],
      components: createButtons()
    });
  
    // Add game state to the games map with user ID as key
    games.set(interaction.user.id, gameState);
  }
  
  module.exports = {
    name: "snake",
    description: "Play snake game with bot",
    callback
  };
  