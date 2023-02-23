const BaseSlashCommand = require("../utils/BaseSlashCommands");
const {
  SlashCommandBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
} = require("discord.js");

const util = require("minecraft-server-util");


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
      const connectionEmbed = new EmbedBuilder().setColor('#2DF904').setDescription(`Possible ways to fix connection issues (snapshot server):\n• Clear your dns cache (if you’re on Windows, try the command \`ipconfig /flushdns\`)\n• Use the IP \`pandamium.eu:25566\`\n• Use the IP \`116.202.216.130:25566\`\n• Try using a VPN\n• Wait it out - it may be a problem with your ISP who will fix the problem themselves (try again in a few hours)\n• https://help.minecraft.net/hc/en-us/articles/360034754052-Multiplayer-Connection-Issues-Java-Edition-`
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
        `Last reset : 26th September 2021\n\nThe Snapshot server was reset because the world could not be updated from [21W37A](https://www.minecraft.net/en-us/article/minecraft-snapshot-21w37a) to [21W38A](https://www.minecraft.net/en-us/article/minecraft-snapshot-21w38a) after Mojang added the new world generation. All dimensions were reset. \nWe always keep player data (E.g. Playtime, Votes and inventories) `)

      interaction.reply({ embeds: [WorldResetEmbed] });
    }

    // Mods MC
    else if (category === "mods-faq") {
      const oldSnapVersion = '23w07a'
      const snapModVersion = '1.19.4 Pre-release 1'

      let mods = true //True = mod are in date
      const ModsOutdateEmbed = new EmbedBuilder().setColor('#ff0000').setTitle('Minecraft Mods').setDescription(`These mods have not been updated yet, we will update this asap.`)

      //version : 23w07a
      const ModsEmbed = new EmbedBuilder().setColor('#2DF904').setTitle(`Minecraft Mods`).setFields(
        {name: `----\n Ported by : [object Object]#5860 \n----`, value: `\n`},
        {name: `Malilib (${snapModVersion})`, value: "[Download](https://tomalbrc.github.io/blog/)"},
        {name: `Litematica (${snapModVersion})`, value: "[Download](https://tomalbrc.github.io/blog/)"},
        {name: `Minihud (${snapModVersion})`, value: "[Download](https://tomalbrc.github.io/blog/)"},
        {name: `Itemscroller (${snapModVersion})`, value: "[Download](https://tomalbrc.github.io/blog/)"},
        {name: `Just Map (${snapModVersion})`, value: "[Download](https://tomalbrc.github.io/blog/)"},

      )
      // version : 1.19.4 per release 1
      const ShaderModsEmbed = new EmbedBuilder().setColor('#2DF904').setFields(
        {name: `Shader Related Mods\n----\n Ported by : IMS#7902 \n----`, value: `\n`},
        {name: `Iris (${snapModVersion})`, value: "[Download](https://tec-tonic.github.io/snapshot-mods/mods/iris-mc1.19.4-pre1-1.6.0-beta-snap.4-e5979bdc-dirty.jar)", inline: true},
        {name: `Sodium (${snapModVersion})`, value: "[Download](https://tec-tonic.github.io/snapshot-mods/mods/sodium-fabric-mc1.19.4-pre1-0.4.10rev.7869ae2-dirty.jar)", inline: true},

        
      ) 
      // version : 1.19.4 pre release 1
      const miscModsEmbed = new EmbedBuilder().setColor('#2DF904').setFields(
        {name: `----\n Other Mods \n----`, value: `\n`},
        {name: `Fabric API (${snapModVersion})`, value: "[Download](https://beta.curseforge.com/minecraft/mc-mods/fabric-api/download/4407699)", inline: true},
        {name: `Fabric Loader`, value: "[Open](https://fabricmc.net/)", inline: true},
      ).setFooter({text: "Please DO NOT contact the original creators regarding issues!"})

      const AlertNewSnapshot = new EmbedBuilder().setColor('#ff0000').setTitle('New Sapshot').setDescription('Please Note, there is a new snapshot. This command will be updated when all mods are ported \n\n Feel free to check out [Minecraft Snapshot 1.19.4 Pre Release 1](https://www.minecraft.net/en-us/article/minecraft-1-19-4-pre-release-1)')
      if (mods) {
      interaction.reply({ embeds: [ShaderModsEmbed,miscModsEmbed,] });
    } else {
      interaction.reply({ embeds: [ModsOutdateEmbed] });
    }
    
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
        { name: "lastest-snapshot-mods", value: "mods-faq" },
      ))
      .toJSON();
  }
};
