const BaseSlashCommand = require("../utils/BaseSlashCommands");
const {
  SlashCommandBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
} = require("discord.js");
const util = require("minecraft-server-util");

module.exports = class IpSlashCommand extends BaseSlashCommand {
  constructor() {
    super("ip");
  }

  run(client, interaction) {
    util.status("pandamium.eu").then((ResponseRelease) => {
      util.status("snapshot.pandamium.eu").then((ResponseSnapshot) => {
        const releaseVersionIP = ResponseRelease.version.name;
        const snapVersionIP = ResponseSnapshot.version.name;

        const ipEmbed = new EmbedBuilder()
          .setColor("#008000")
          .setTitle("Pandamium Server IP's")
          .addFields(
            {
              name: `Release IP: `,
              value: `pandamium.eu\n **Version:** ${releaseVersionIP}\n\n`,
            },
            {
              name: `Snapshot IP: `,
              value: `snapshot.pandamium.eu\n **Version:** ${snapVersionIP}`,
            }
          );

        return interaction.reply({ embeds: [ipEmbed], ephemeral: true });
      });
    });
  }

  getSlashCommandJSON() {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription("Replies with the server(s) IP")
      .toJSON();
  }
};