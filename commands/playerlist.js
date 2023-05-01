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
    if (channelName === "snapshot-ingame-chat" || channelName === "snapshot-server") {
      var port = 25566;
      var colour = "#2DF904";
      var ServerName = "Snapshot";
    } else if (channelName === "release-ingame-chat" || channelName === "release-server") {
      var port = 25565;
      var colour = "#058823";
      var ServerName = "Release";
    } else if (channelName === "builder-general") {
      var portB = 25565;
      var colourB = "#FF00FF";
    }

    //if (channelName === "snapshot-ingame-chat" || channelName === "release-ingame-chat") {

    try {
      if (channelName === "builder-general") {
        util.status("build.pandamium.eu", portB, options).then(async (ServerB) => {
          const nameArr = ServerB.players.sample
          .map((obj) => obj.name)
          .join(", ");
    
          // Playerlist Result
          const playerlistEmbedBetterB = new EmbedBuilder()
            .setColor(colourB)
            .setTitle(
              `**Online players (${ServerB.players.online}/${ServerB.players.max}):**`
            )
            .setDescription(`\`\`\`${nameArr}\`\`\``)
    
          // No Players Online
          const ServerEmptyB = new EmbedBuilder()
            .setColor("#FF0000")
            .setTitle(`**No online players**`);
    
          const checkIfPlayer = ServerB.players.online;
          if (checkIfPlayer.toString() === "0") {
            return interaction.reply({
              embeds: [ServerEmptyB],
              ephemeral: true,
            });
          }
    
          return interaction.reply({
            embeds: [playerlistEmbedBetterB],
            ephemeral: true,
          });
        });
      } else {

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

      // //Single player Online
      // if (checkIfPlayer.toString() === "1") {
      //   const singlePlayerlistEmbedBetter = new EmbedBuilder()
      //     .setColor(colour)
      //     .setTitle(
      //       `**Online player (${Server.players.online}/${Server.players.max}):**`
      //     )
      //     .setDescription(`\`\`\`${nameArr}\`\`\` \n` + randomObject(data))
      //     .setFooter({ text: `Version: ${Server.version}` });

      //   return interaction.reply({
      //     embeds: [singlePlayerlistEmbedBetter],
      //     ephemeral: true,
      //   });
      // }

      await client.channels.cache.get(logs).send({ embeds: [playerlistInteractionUsed] });

      return interaction.reply({
        embeds: [playerlistEmbedBetter],
        ephemeral: true,
      });
    })
  }

} catch {
    const Error = new EmbedBuilder().setColor("#FF0000").setDescription('Server is \`Offline\` or \`Unreachable\`! \n\nPlease report this issue in <#515269721688375296> if it continues to occur')
    interaction.reply({
        embeds: [Error],
        ephemeral: true,
    })
}

   }

  getSlashCommandJSON() {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription("Lists all online players")
      .toJSON();
  }
};