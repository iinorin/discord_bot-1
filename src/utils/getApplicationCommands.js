module.exports = async (client, guildId) => {
  let applicationCommands;

  if (guildId) {
    try {
      const guild = await client.guilds.fetch(guildId);
      applicationCommands = guild.commands;
    } catch (error) {
      console.error(`Error fetching guild commands for guild ID "${guildId}":`, error);
      throw error; // Re-throw the error to allow caller to handle it
    }
  } else {
    applicationCommands = await client.application.commands;
    
  }

  await applicationCommands.fetch();
  return applicationCommands;
};
