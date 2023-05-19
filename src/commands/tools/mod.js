// TODO: Improve this file, but for now use this.

const {
  SlashCommandBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  AttachmentBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mod")
    .setDescription("Gets current snapshot mod embed.")
    .setDefaultMemberPermissions(PermissionFlagsBits.CreateInstantInvite),
  async execute(interaction, client) {
    var version = "1.20 Pre Release 1-2";
    var Iris =
      "https://tec-tonic.github.io/snapshot-mods/mods/iris/1-20-pre-release-1/iris-mc1.20-pre1-1.6.3-b7bf8745-dirty.jar";
    var Sodium =
      "https://tec-tonic.github.io/snapshot-mods/mods/sodium/1-20-pre-release-1/sodium-fabric-mc1.20-pre1-0.4.10rev.15f5f00.jar";

    const intRestricted = new EmbedBuilder()
      .setDescription(`You do not have access to this command.`)
      .setColor("#FF0000");

    const ModEmbed = new EmbedBuilder()
      .setTitle(version + " Mods")
      .setColor("#2DF904")
      .setDescription(
        "For more Snapshot Mods click [here](https://tec-tonic.github.io/snapshot-mods/)"
      )
      .setFields(
        {
          name: `Iris`,
          value: `[iris-mc1.20-pre1-1.6.3-b7bf8745-dirty.jar](${Iris})`, //link
        },
        {
          name: `Sodium`,
          value: `[sodium-fabric-mc1.20-pre1-0.4.10rev.15f5f00.jar](${Sodium})`, //link
        }
      ).setFooter({ text: `Snapshot 1.20 Pre Release 1 works with Pre-2` });

    if (
      interaction.user.id === "546277533138550786" ||
      interaction.user.id === "255766501464735744"
    ) {
      interaction.channel.send({ embeds: [ModEmbed] });
      return interaction.reply({ content: "Message Sent", ephemeral: true });
    } else {
      return interaction.reply({ embeds: [intRestricted], ephemeral: true });
    }
  },
};
