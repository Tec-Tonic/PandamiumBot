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

    const clientId = "785978462837276684";
    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

    try {
      console.log("Refresh Started");

      await rest.put(Routes.applicationCommands(clientId), {
        body: client.commandArray,
      });

      await rest.delete(
        Routes.applicationGuildCommand('785978462837276684', '504627012921589763', '1102725564965605433')
      );

      console.log("Success");
    } catch (error) {
      console.log(error);
    }
  };
};
