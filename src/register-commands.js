import dotenv from 'dotenv'
dotenv.config()

import { REST, Routes, ApplicationCommandOptionType } from 'discord.js';

const commands = [
    {
      name: 'ping',
      description: 'Replies with Pong!',
    },
    {
      name: 'misaka',
      description: 'Tell You who is Misaka',
    },
    {
      name: 'love-finder',
      description: 'Finds if Your love can Happen',
      options: [
             {
               name: 'user1_name',
               description: 'Enter the name of first user',
               type :ApplicationCommandOptionType.String,
               choices: [
                {
                  name:'me',
                  value: 'Inori',
                }
              ],
               required: true,
              },
              {
                name: 'user2_name',
                description: 'Enter the name of first user',
                type :ApplicationCommandOptionType.String,
                choices: [
                  {
                    name:'owner',
                    value: 'Misaka',
                  }
                ],
                required: true,
              },
              ],
             },

             {
              name: 'about-me',
              description : 'Tells U About Ino'
             }
          ];



  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
  
  try {
    console.log('Started refreshing application (/) commands.');
  
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands });
  
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }