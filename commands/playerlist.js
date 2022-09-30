const BaseSlashCommand = require("../utils/BaseSlashCommands");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const util = require("minecraft-server-util");

module.exports = class PlayerlistSlashCommand extends BaseSlashCommand {
  constructor() {
    super("playerlist");
  }

  run(client, interaction) {
    //options for both release & Snapshot
    const options = {
      sessionID: 1, // a random 32-bit signed number, optional
      enableSRV: true, // SRV record lookup
    };

    // Interaction Author
    const intAuth = interaction.user.username;

    //Snapshot Code
    util.queryFull("pandamium.eu", 25566, options).then((Response) => {
      const nameArr = Response.players.list
        .join(", ")
        .toString()
        .replace("__T0m__", "__Tec__");

      //intPrintOut Discord Log
      const playerlistInteractionUsed = new EmbedBuilder()
        .setColor("#2DF904")
        .setDescription(
          `**Snapshot Playerlist** used by **${intAuth}** \n\n**Online players :** \n${nameArr}`
        )
        .setTimestamp();

      var ChannelName = interaction.channel.name;
      if (ChannelName === "snapshot-ingame-chat") {
        client.channels.cache
          .get("963436191426957352")
          .send({ embeds: [playerlistInteractionUsed] });

        const checkIfPlayer = Response.players.online;
        if (checkIfPlayer.toString() === "0") {
          return interaction.reply({
            content: `**No online players**`,
            ephemeral: true,
          });
        }

        return interaction.reply({
          content: ` **Online players (${Response.players.online}/${Response.players.max}):** \n\`\`\`${nameArr}\`\`\``,
          ephemeral: true,
        });
      }
    });
    
    //Release Code
    util.status("pandamium.eu", 25565, options).then((ResponseRelease) => {
      var ChannelName = interaction.channel.name;
      if (ChannelName === "release-ingame-chat") {
        const checkIfPlayerRelease = ResponseRelease.players.online;
        if (checkIfPlayerRelease.toString() === "0") {
          return interaction.reply({
            content: `**No online players**`,
            ephemeral: true,
          });
        }

        const nameArrRelease = ResponseRelease.players.sample
          .map((obj) => obj.name)
          .join(", ");

        //intPrintOut Discord Log
        const playerlistInteractionUsedRelease = new EmbedBuilder()
          .setColor("#058823")
          .setDescription(
            `**Release Playerlist** used by **${intAuth}** \n\n**Online players :** \n${nameArrRelease}`
          )
          .setTimestamp();

        client.channels.cache
          .get("963436191426957352")
          .send({ embeds: [playerlistInteractionUsedRelease] });

        return interaction.reply({
          content: ` **Online players (${ResponseRelease.players.online}/${ResponseRelease.players.max}):** \n\`\`\`${nameArrRelease}\`\`\``,
          ephemeral: true,
        });
      }
    });
  }

  getSlashCommandJSON() {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription("Lists all online players")
      .toJSON();
  }
};

