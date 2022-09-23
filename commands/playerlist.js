const BaseSlashCommand = require("../utils/BaseSlashCommands");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const util = require("minecraft-server-util");

module.exports = class PlayerlistSlashCommand extends BaseSlashCommand {
  constructor() {
    super("playerlist");
  }

  run(client, interaction) {
    const options = {
      sessionID: 1, // a random 32-bit signed number, optional
      enableSRV: true, // SRV record lookup
    };

    util.queryFull("pandamium.eu", 25566, options).then((Response) => {
      const intAuth = interaction.user.username;

      util.status("pandamium.eu", 25565, options).then((ResponseRelease) => {
        const nameArr = Response.players.list
          .join(", ")
          .toString()
          .replace("__T0m__", "__Tec__");

        //Used to get Username and playerlist data once command is executed
        const playerlistInteractionUsed = new EmbedBuilder()
          .setColor("#2DF904")
          .setDescription(
            `Snapshot Playerlist used by ${intAuth} \n\n${nameArr}`
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
        if (ChannelName === "release-ingame-chat") {
          client.channels.cache
            .get("963436191426957352")
            .send({ embeds: [playerlistInteractionUsedRelease] });

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

          //Used to get Username and playerlist (for release) data once command is executed
          const playerlistInteractionUsedRelease = new EmbedBuilder()
        .setColor("#2DF904")
        .setDescription(
          `Release Playerlist used by ${intAuth} \n\n${nameArrRelease}`
        )
        .setTimestamp();

          return interaction.reply({
            content: /*`This command is undergoing maintenance, please use \`!playerlist\` to check online players!`*/ ` **Online players (${ResponseRelease.players.online}/${ResponseRelease.players.max}):** \n\`\`\`${nameArrRelease}\`\`\``,
            ephemeral: true,
          });
        }
      });
    });
  }

  getSlashCommandJSON() {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription("Gets online player info")
      .toJSON();
  }
};
