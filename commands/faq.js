const BaseSlashCommand = require("../utils/BaseSlashCommands");
const {
  SlashCommandBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = class faqSlashCommand extends BaseSlashCommand {
  constructor() {
    super("faq");
  }

  run(client, interaction) {

    const Blocked = new EmbedBuilder().setColor('#FF0000').setDescription(`You do not have access to this command!`)
    const revoke = interaction.member.roles.cache.some(r => r.name === "NoSnapshotIngameChat")
    if (revoke) return interaction.reply({embeds: [Blocked], ephemeral: true})

    const category = interaction.options.getString("category");

    if (category === "connect-faq") {
      const connectionEmbed = new EmbedBuilder().setDescription(
        `
        Possible ways to fix connection issues (snapshot server):

        • Clear your dns cache (if you’re on Windows, try the command \`ipconfig /flushdns\`)
        • Use the IP \`pandamium.eu:25566\`
        • Use the IP \`116.202.216.130:25566\`
        • Try using a VPN
        • Wait it out - it may be a problem with your ISP who will fix the problem themselves (try again in a few hours)
        • https://help.minecraft.net/hc/en-us/articles/360034754052-Multiplayer-Connection-Issues-Java-Edition-
            `
      );
      interaction.reply({ embeds: [connectionEmbed] });
    }

    if (category === "data-faq") {
        interaction.reply('https://dontasktoask.com/')
    }
  }

  getSlashCommandJSON() {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription("Replies with the relevant categories information")
      .addStringOption((option) =>
        option
          .setName("category")
          .setDescription("The help category")
          .setRequired(true)
          .addChoices(
        { name: "Connection Issues", value: "connect-faq" },
        { name: "Dont Ask To Ask", value: "data-faq" },
      ))
      .toJSON();
  }
};
