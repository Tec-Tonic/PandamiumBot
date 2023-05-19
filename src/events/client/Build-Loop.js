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
    async execute(client) {
      setInterval(BuildplayerlistUpdate, 300000); //Every 5 min.
  
      async function BuildplayerlistUpdate() {
        const remove = require("../src/functions/events/punctuation");
  
        const axios = require("axios");
        const util = require("util");
        const url = `https://api.mcstatus.io/v2/status/java/build.pandamium.eu`;
        const server = await axios.get(url);
        const search = util.inspect;
        const nameArr = await search(
          server.data.players.list.map((obj) => obj.name_clean).join(", ")
        );
        // Message to Update
        const msgID = "1109174802075373628";
        const channelID = "1109096205251792956";
        const channel = client.channels.cache.get(channelID);
  
        //Checks if the server is Empty or not
        const checkIfPlayer = server.data.players.online;
        if (checkIfPlayer.toString() === "0") {
          const ServerEmpty = new EmbedBuilder()
            .setColor("#FF0000")
            .setTitle(`**Server is Empty**`);
  
          channel.messages
            .fetch(msgID)
            .then((msg) => msg.edit({ embeds: [ServerEmpty] }));
        } else {
          const playerlistEmbed = new EmbedBuilder()
            .setColor("#2DF904")
            .setTitle(
              `**Online players (${server.data.players.online}/${server.data.players.max}):**`
            )
            .setDescription(
              `\`\`\`${remove.Punctuation(
                nameArr
              )}\`\`\`\n*This message updates every 5 minutes.*`
            )
            .setFooter({ text: `Version: ${server.data.version.name_raw}` });
  
          channel.messages
            .fetch(msgID)
            .then((msg) => msg.edit({ embeds: [playerlistEmbed] }));
        }
      }
    },
  };
  