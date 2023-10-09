const {
  REST,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  SelectMenuBuilder,
  EmbedBuilder,
  Client,
  GatewayIntentBits,
  ActivityType,
  Routes,
  Message,
  messageLink,
  Collection,
  channelLink,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");
const rest = new REST().setToken(process.env.TOKEN);

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`Logged in as ${client.user.username}!`);

    const readyEmbed = new EmbedBuilder()
      .setColor("#36FF00")
      .setDescription(`${client.user.username} has logged in.`);
    client.channels.cache.get(process.env.LOGS).send({ embeds: [readyEmbed] });

    const axios = require("axios");
    const ip = "release.pandamium.eu";
    let url = `https://api.mcstatus.io/v2/status/java/${ip}`;
    const server = await axios.get(url);

    try {
      client.user.setPresence({
        activities: [
          {
            name: `Release | ${server.data.players.online}/${server.data.players.max}`,
            type: ActivityType.Playing,
          },
        ],
        status: "online",
      });
    } catch {
      client.user.setPresence({
        activities: [{ name: `Minecraft`, type: ActivityType.Playing }],
        status: "online",
      });
    }

    const playerlistUpdate = require("../../components/pandamium/playerlist-loop");

    // Get the guild and channel objects
    const guildID = "504627012921589763";
    const channelID = "824234748217393212";
    const guild = client.guilds.cache.get(guildID);
    const channel = guild.channels.cache.get(channelID);

    // Fetch the last message sent in the channel
    channel.messages.fetch({ limit: 1 }).then((messages) => {
      const lastMessage = messages.first();
      const commandExecuted = lastMessage.content.toLowerCase() === "true";

      // Call the playerlistUpdate function to start the loop
      playerlistUpdate(client, commandExecuted);
    });
  },
};
