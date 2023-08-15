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

    // // Loop
    // setInterval(playerlistUpdate, 300000); //Every 5 min.

    // async function playerlistUpdate() {
    //   const remove = require("../../functions/events/punctuation");

    //   const utility = require("minecraft-server-util");
    //   const axios = require("axios");
    //   const util = require("util");
    //   const url = `https://api.mcstatus.io/v2/status/java/snapshot.pandamium.eu`;
    //   const server = await axios.get(url);
    //   const search = util.inspect;
    //   const checkIfPlayer = server.data.players.online;
    //   const unixTimestamp = Math.floor((Date.now() + 300000) / 1000);

    //   // Message to Update
    //   const msgID = "1138257210925924403";
    //   const channelID = "824234748217393212";

    //   const channel = client.channels.cache.get(channelID);

    //   const options = {
    //     sessionID: 1, // a random 32-bit signed number, optional
    //     enableSRV: true, // SRV record lookup
    //   };

    //   try {
    //     //Checks if the server is Empty or not

    //     if (checkIfPlayer.toString() === "0") {
    //       const ServerEmpty = new EmbedBuilder()
    //         .setColor("#FF0000")
    //         .setTitle(`**Server is Empty**`)
    //         .setDescription(`*Message will refresh <t:${unixTimestamp}:R>*`)
    //         .setFooter({ text: `Version: ${server.data.version.name_raw}` });

    //       channel.messages
    //         .fetch(msgID)
    //         .then((msg) =>
    //           msg.edit({
    //             content:
    //               "# The chat linking mod we have been using is currently broken in the latest Minecraft version. Keep an eye on <#505093367903027220> to know when this channel is working again. \n## You can use </playerlist:1102727613102960663> in <#614507998357880862>.",
    //             embeds: [ServerEmpty],
    //           })
    //         );
    //     } else {
    //       utility.queryFull("pandamium.eu", 25566, options).then((Response) => {
    //         const nameArr = Response.players.list.join(", ").toString();

    //         const playerlistEmbed = new EmbedBuilder()
    //           .setColor("#2DF904")
    //           .setTitle(
    //             `**Online players (${Response.players.online}/${Response.players.max}):**`
    //           )
    //           .setDescription(
    //             `\`\`\`${nameArr}\`\`\`\n*Message will refresh <t:${unixTimestamp}:R>*`
    //           )
    //           .setFooter({ text: `Version: ${server.data.version.name_raw}` });

    //         channel.messages
    //           .fetch(msgID)
    //           .then((msg) =>
    //             msg.edit({
    //               content:
    //                 "# The chat linking mod we have been using is currently broken in the latest Minecraft version. Keep an eye on <#505093367903027220> to know when this channel is working again. \n## You can use </playerlist:1102727613102960663> in <#614507998357880862>.",
    //               embeds: [playerlistEmbed],
    //             })
    //           );
    //       });
    //     }
    //   } catch {
    //     const serverOffline = new EmbedBuilder()
    //       .setColor("#FF0000")
    //       .setTitle(`**Server is offline **`)
    //       .setDescription(`*Message will refresh <t:${unixTimestamp}:R>*`);

    //     channel.messages
    //       .fetch(msgID)
    //       .then((msg) =>
    //         msg.edit({
    //           content:
    //             "# The chat linking mod we have been using is currently broken in the latest Minecraft version. Keep an eye on <#505093367903027220> to know when this channel is working again. \n## You can use </playerlist:1102727613102960663> in <#614507998357880862>.",
    //           embeds: [serverOffline],
    //         })
    //       );
    //   }
    // }
  },
};
