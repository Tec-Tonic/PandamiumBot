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

    // No access
    const Blocked = new EmbedBuilder().setColor('#FF0000').setDescription(`You do not have access to this command!`)
    const revoke = interaction.member.roles.cache.some(r => r.name === "NoSNapshotIngameChat")
    if (revoke) return interaction.reply({embeds: [Blocked], ephemeral: true})

    const category = interaction.options.getString("category");

    // Connection
    if (category === "connect-faq") {
      const connectionEmbed = new EmbedBuilder().setColor('#2DF904').setDescription(
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

    // Dont Ask To Ask Link
    else if (category === "data-faq") {
        interaction.reply('https://dontasktoask.com/')
    }

    // Reset Info
    else if (category === "reset-faq") {
      const WorldResetEmbed = new EmbedBuilder().setColor('#2DF904').setDescription(
        `
      Last reset : 26th September 2021

      The Snapshot server was reset because the world could not be updated from [21W37A](https://www.minecraft.net/en-us/article/minecraft-snapshot-21w37a) to [21W38A](https://www.minecraft.net/en-us/article/minecraft-snapshot-21w38a) after Mojang added the new world generation. All dimensions were reset. 
      We always keep player data (E.g. Playtime, Votes and inventories) `)

      interaction.reply({ embeds: [WorldResetEmbed] });
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
        { name: "connection-issues", value: "connect-faq" },
        { name: "dont-ask-to-ask", value: "data-faq" },
        { name: "last-world-reset", value: "reset-faq" },
      ))
      .toJSON();
  }
};
