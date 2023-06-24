// const {
//   REST,
//   ActionRowBuilder,
//   ButtonBuilder,
//   ButtonStyle,
//   SelectMenuBuilder,
//   EmbedBuilder,
//   Client,
//   GatewayIntentBits,
//   ActivityType,
//   Routes,
//   Message,
//   messageLink,
//   Collection,
//   channelLink,
//   ModalBuilder,
//   TextInputBuilder,
//   TextInputStyle,
// } = require("discord.js");
// const rest = new REST().setToken(process.env.TOKEN);

// module.exports = {
//   name: "ready",
//   async execute(client) {
//     setInterval(playerlistUpdate, 300000); //Every 5 min.

//     async function playerlistUpdate() {
//       const remove = require("../../functions/events/punctuation");

//       const axios = require("axios");
//       const util = require("util");
//       const url = `https://api.mcstatus.io/v2/status/java/snapshot.pandamium.eu`;
//       const server = await axios.get(url);
//       const search = util.inspect;
  
//       // Message to Update
//       const msgID = "1107317681268461648";
//       const channelID = "824234748217393212";
//       const channel = client.channels.cache.get(channelID);


//       try {
//         const nameArr = await search(
//           server.data.players.list.map((obj) => obj.name_clean).join(", ")
//         );
        
//       //Checks if the server is Empty or not
//       const checkIfPlayer = server.data.players.online;
//       if (checkIfPlayer.toString() === "0") {
//         const ServerEmpty = new EmbedBuilder()
//           .setColor("#FF0000")
//           .setTitle(`**Server is Empty**`)
//           .setFooter({ text: `Version: ${server.data.version.name_raw}` });

//         channel.messages
//           .fetch(msgID)
//           .then((msg) => msg.edit({ embeds: [ServerEmpty] }));
//       } else {
//         const playerlistEmbed = new EmbedBuilder()
//           .setColor("#2DF904")
//           .setTitle(
//             `**Online players (${server.data.players.online}/${server.data.players.max}):**`
//           )
//           .setDescription(
//             `\`\`\`${remove.Punctuation(
//               nameArr
//             )}\`\`\`\n*This message updates every 5 minutes.*`
//           )
//           .setFooter({ text: `Version: ${server.data.version.name_raw}` });

//         channel.messages
//           .fetch(msgID)
//           .then((msg) => msg.edit({ embeds: [playerlistEmbed] }));
//       }
//     } catch {
//       const serverOffline = new EmbedBuilder()
//       .setColor("#FF0000")
//       .setTitle(`**Server is offline **`);

//       channel.messages
//           .fetch(msgID)
//           .then((msg) => msg.edit({ embeds: [serverOffline] }));
//     }
//     }
//   },
// };


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
    setInterval(playerlistUpdate, 60000); //Every 5 min.

    async function playerlistUpdate() {
      const remove = require("../../functions/events/Punctuation");

      const utility = require("minecraft-server-util");
      const axios = require("axios");
      const util = require("util");
      const url = `https://api.mcstatus.io/v2/status/java/snapshot.pandamium.eu`;
      const server = await axios.get(url);
      const search = util.inspect;
      const checkIfPlayer = server.data.players.online;
      
      // Message to Update
      const msgID = "1107317681268461648";
      const channelID = "824234748217393212";
      
      const channel = client.channels.cache.get(channelID);

      const options = {
        sessionID: 1, // a random 32-bit signed number, optional
        enableSRV: true, // SRV record lookup
      };

      try {
       
        
      //Checks if the server is Empty or not

      if (checkIfPlayer.toString() === "0") {
        const ServerEmpty = new EmbedBuilder()
          .setColor("#FF0000")
          .setTitle(`**Server is Empty**`)
          .setFooter({ text: `Version: ${server.data.version.name_raw}` });

        channel.messages
          .fetch(msgID)
          .then((msg) => msg.edit({ embeds: [ServerEmpty] }));
      } else {
        utility.queryFull("pandamium.eu", 25566, options).then((Response) => {
          const nameArr = Response.players.list.join(", ").toString();
          
        const playerlistEmbed = new EmbedBuilder()
          .setColor("#2DF904")
          .setTitle(
            `**Online players (${server.data.players.online}/${server.data.players.max}):**`
          )
          .setDescription(`\`\`\`${nameArr}\`\`\``)
          .setFooter({ text: `Version: ${server.data.version.name_raw}` });

        channel.messages
          .fetch(msgID)
          .then((msg) => msg.edit({ embeds: [playerlistEmbed] }));
      })}
    } catch {
      const serverOffline = new EmbedBuilder()
      .setColor("#FF0000")
      .setTitle(`**Server is offline **`);

      channel.messages
          .fetch(msgID)
          .then((msg) => msg.edit({ embeds: [serverOffline] }));
    }
    }
  },
};