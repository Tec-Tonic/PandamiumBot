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
  
  module.exports = {
    name: "messageCreate",
    async execute(client) {

        const axios = require("axios");
        const ip = "release.pandamium.eu";
        let url = `https://api.mcstatus.io/v2/status/java/${ip}`;
        const server = await axios.get(url);
    
        try {
          client.user.setPresence({
            activities: [
              {
                name: `Release: ${server.data.players.online}/${server.data.players.max}`,
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
 
    },
  };
  