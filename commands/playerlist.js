const BaseSlashCommand = require("../utils/BaseSlashCommands");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const util = require("minecraft-server-util");

const data = require('../filters/funny_quotes.json')
const staffMember = require("../filters/staff.json");
const logs = process.env.LOGS

function randomObject(obj) {
  let arr = Object.values(obj);
  return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = class PlayerlistSlashCommand extends BaseSlashCommand {
  constructor() {
    super("playerlist");
  }

  async run(client, interaction)  {

        //Options for Snapshot & Release
    const options = {
      sessionID: 1,
      enableSRV: true,
    };

    var channelName = interaction.channel.name;
    if (channelName === "snapshot-ingame-chat") {
      var port = 25566;
      var colour = "#2DF904";
      var ServerName = "Snapshot";
    } else if (channelName === "release-ingame-chat") {
      var port = 25565;
      var colour = "#058823";
      var ServerName = "Release";
    }
    //if (channelName === "snapshot-ingame-chat" || channelName === "release-ingame-chat") {

    try {
    util.queryFull("pandamium.eu", port, options).then(async (Server) => {
      const nameArr = Server.players.list.join(", ").toString();

      //Discord Log
      const playerlistInteractionUsed = new EmbedBuilder()
        .setColor(colour)
        .setDescription(
          `**${ServerName} Playerlist**\n\n**Online players (${Server.players.online}/${Server.players.max}):** \n\`\`\`${nameArr}\`\`\``
        );

      // Snapshot Playerlist Result
      const playerlistEmbedBetter = new EmbedBuilder()
        .setColor(colour)
        .setTitle(
          `**Online players (${Server.players.online}/${Server.players.max}):**`
        )
        .setDescription(`\`\`\`${nameArr}\`\`\``)
        .setFooter({ text: `Version: ${Server.version}` });

      // Snapshot No Players Online
      const ServerEmpty = new EmbedBuilder()
        .setColor("#FF0000")
        .setTitle(`**No online players**`);

      const checkIfPlayer = Server.players.online;
      if (checkIfPlayer.toString() === "0") {
        return interaction.reply({
          embeds: [ServerEmpty],
          ephemeral: true,
        });
      }

      //Single player Online
      if (checkIfPlayer.toString() === "1") {
        const singlePlayerlistEmbedBetter = new EmbedBuilder()
          .setColor(colour)
          .setTitle(
            `**Online player (${Server.players.online}/${Server.players.max}):**`
          )
          .setDescription(`\`\`\`${nameArr}\`\`\` \n` + randomObject(data))
          .setFooter({ text: `Version: ${Server.version}` });

        return interaction.reply({
          embeds: [singlePlayerlistEmbedBetter],
          ephemeral: true,
        });
      }

      await client.channels.cache.get(logs).send({ embeds: [playerlistInteractionUsed] });

      return interaction.reply({
        embeds: [playerlistEmbedBetter],
        ephemeral: true,
      });
    });
} catch {
    const Error = new EmbedBuilder().setColor("#FF0000").setDescription('Server is \`Offline\` or \`Unreachable\`! \n\nPlease report this issue in <#515269721688375296> if it continues to occur')
    interaction.reply({
        embeds: [Error],
        ephemeral: true,
    })
}

  //   //options for both release & Snapshot
  //   const options = {
  //     sessionID: 1, // a random 32-bit signed number, optional
  //     enableSRV: true, // SRV record lookup
  //   };

  //   // Interaction Author
  //   const intAuth = interaction.user.tag;

  //   var channelName = interaction.channel.name;
  //   if (channelName === "snapshot-ingame-chat" || channelName === "release-ingame-chat") {

  //     //Snapshot Code
  //     util.queryFull("pandamium.eu", 25566, options).then((Response) => {
  //       const nameArr = Response.players.list.join(", ").toString();

  //       //intPrintOut Discord Log
  //       const playerlistInteractionUsed = new EmbedBuilder()
  //         .setColor("#2DF904")
  //         .setDescription(
  //           `**Snapshot Playerlist**\n\n**Online players (${Response.players.online}/${Response.players.max}):** \n\`\`\`${nameArr}\`\`\``
  //         )

  //       // Snapshot better playerlist
  //       const playerlistEmbedBetter = new EmbedBuilder()
  //         .setColor("#2DF904")
  //         .setTitle(
  //           `**Online players (${Response.players.online}/${Response.players.max}):**`
  //         )
  //         .setDescription(`\`\`\`${nameArr}\`\`\``)
  //         .setFooter({ text: `Version: ${Response.version}` })

  //       // Snapshot better no players
  //       const playerlistemptyEmbed = new EmbedBuilder()
  //         .setColor("#FF0000")
  //         .setTitle(`**No online players**`);

  //       var ChannelName = interaction.channel.name;
  //       if (ChannelName === "snapshot-ingame-chat") {

  //         const checkIfPlayer = Response.players.online;
  //         if (checkIfPlayer.toString() === "0") {
  //           return interaction.reply({
  //             embeds: [playerlistemptyEmbed],
  //             ephemeral: true,
  //           });
  //         }

  //         client.channels.cache.get(logs).send({ embeds: [playerlistInteractionUsed] });

  //         //Single player Online
  //         if (checkIfPlayer.toString() === "1") {
  //           const singlePlayerlistEmbedBetter = new EmbedBuilder()
  //             .setColor("#2DF904")
  //             .setTitle(
  //               `**Online player (${Response.players.online}/${Response.players.max}):**`
  //             )
  //             .setDescription(`\`\`\`${nameArr}\`\`\` \n` + randomObject(data))
  //             .setFooter({ text: `Version: ${Response.version}` })

  //           return interaction.reply({
  //             embeds: [singlePlayerlistEmbedBetter],
  //             ephemeral: true,
  //           });

  //         }

  //         return interaction.reply({
  //           embeds: [playerlistEmbedBetter],
  //           ephemeral: true,
  //         });
  //       }
  //     });


  //     //====================================== Release Code ======================================
      


  //     util.status("pandamium.eu", 25565, options).then((ResponseRelease) => {
  //       var ChannelName = interaction.channel.name;

  //       // Release better no players
  //       const playerlistemptyEmbedRelease = new EmbedBuilder()
  //         .setColor("#FF0000")
  //         .setTitle(`**No online players**`);

  //       if (ChannelName === "release-ingame-chat") {
  //         const checkIfPlayerRelease = ResponseRelease.players.online;
  //         if (checkIfPlayerRelease.toString() === "0") {
  //           return interaction.reply({
  //             embeds: [playerlistemptyEmbedRelease],
  //             ephemeral: true,
  //           });
  //         }

  //         const nameArrRelease = ResponseRelease.players.sample
  //           .map((obj) => obj.name)
  //           .join(", ");

  //         //intPrintOut Discord Log
  //         const playerlistInteractionUsedRelease = new EmbedBuilder()
  //           .setColor("#058823")
  //           .setDescription(
  //             `**Release Playerlist**\n\n**Online players (${ResponseRelease.players.online}/${ResponseRelease.players.max}):** \n\`\`\`${nameArrRelease}\`\`\``
  //           )


  //         //release better playerlist
  //         const playerlistEmbedBetterRelease = new EmbedBuilder()
  //           .setColor("#2DF904")
  //           .setTitle(
  //             `**Online players (${ResponseRelease.players.online}/${ResponseRelease.players.max}):**`
  //           )
  //           .setDescription(`\`\`\`${nameArrRelease}\`\`\``)
  //           .setFooter({ text: `Version: ${ResponseRelease.version.name}` })
  //         // command history log (Release)
  //         client.channels.cache
  //           .get(logs)
  //           .send({ embeds: [playerlistInteractionUsedRelease] });

  //         return interaction.reply({
  //           embeds: [playerlistEmbedBetterRelease],
  //           ephemeral: true,
  //         });
  //       }
  //     });
  //   } else {
  //     let StaffFoundInText = false;
  //     for (var i in staffMember) {
  //       if (intAuth.includes(staffMember[i])) StaffFoundInText = true;
  //     }

  //     if (StaffFoundInText) {
  //       util.queryFull("pandamium.eu", 25566, options).then((Response) => {
  //         util.queryFull("pandamium.eu", 25565, options).then((ResponseRelease) => {
            
  //           //snapshot array
  //           const nameArr = Response.players.list.join(", ").toString() || 'No online players'
  //           const nameLinkSnapshot = Response.players.list.join("\n https://namemc.com/profile/") || 'No online players'
  //           //release array
  //           const nameArrRelease = ResponseRelease.players.list.join(", ").toString() || 'No online players'
  //           const nameLinkRelease = ResponseRelease.players.list.join("\n https://namemc.com/profile/") || 'No online players'

  //           //snapshot
  //           const playerlistEmbedBetter = new EmbedBuilder().setColor("#2DF904").setTitle(`**Snapshot Online players (${Response.players.online}/${Response.players.max}):**`).setDescription(`\`\`\`${nameArr}\`\`\``).setFooter({ text: `Version: ${Response.version}` });
  //           //release
  //           const playerlistEmbedBetterRelease = new EmbedBuilder().setColor("#058823").setTitle(`**Release Online players (${ResponseRelease.players.online}/${ResponseRelease.players.max}):**`).setDescription(`\`\`\`${nameArrRelease}\`\`\``).setFooter({ text: `Version: ${ResponseRelease.version}` });
  //           //Namemc
  //           const Namemc = new EmbedBuilder().setColor('#2E86C1').setTitle('NameMC Profiles').setDescription(`**Snapshot**\n https://namemc.com/profile/${nameLinkSnapshot} \n\n **Release**\n https://namemc.com/profile/${nameLinkRelease}`) //https://namemc.com/profile/_Tec_.2
  //             return interaction.reply({content: `**Extra Information for Staff**\n`, embeds: [playerlistEmbedBetter, playerlistEmbedBetterRelease, Namemc], ephemeral: true,});

  //           });
  //       });
  //     } else {

  //     const errPlayerlist = new EmbedBuilder()
  //       .setDescription('Please use <#824234748217393212> or <#604630001957994504>.').setColor('#FF0000')

  //     interaction.reply({
  //       embeds: [errPlayerlist],
  //       ephemeral: true,
  //     })
  //   }
  //  }
   }

  getSlashCommandJSON() {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription("Lists all online players")
      .toJSON();
  }
};
