const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const fs = require("fs");

module.exports = (client) => {
  client.commandHandler = async () => {
    const commandFolders = fs.readdirSync(`./src/commands`);
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
        console.log(`Handler: loaded ${file}`);
      }
    }

    const clientId = "835211465988112405";
    const guildId = "1090777057392336896";
    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

    try {
      console.log("Refresh Started");

      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: client.commandArray,
      });

      console.log("Success");
    } catch (error) {
      console.log(error);
    }
  };
};
