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

    // Update Game versions 
    else if (category === "gameVer-faq") {
      interaction.reply('https://help.minecraft.net/hc/en-us/articles/360034754852-Changing-game-versions-')
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
      
      const snapModVersion = '1.19.4 Pre-release 1'
      const modLink = new EmbedBuilder().setColor('#2DF904').setTitle(`${snapModVersion} Mods`).setDescription(`All mods are uploaded to a github page, use button to navigate to the site. \n\n**Mods :**\n**-** Malilib\n**-** Litematica\n**-** Minihud \nand more.. `)
      const modbtnUse = new EmbedBuilder().setDescription('GitHub Embed Generated').setColor('#2DF904')
      const modbtn = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setURL('https://tec-tonic.github.io/snapshot-mods/')
					.setLabel('GitHub Page')
					.setStyle(ButtonStyle.Link),
			);

      interaction.reply({ embeds: [modLink], components: [modbtn], ephemeral: true});
      client.channels.cache.get('963436191426957352').send({embeds: [modbtnUse]}) //console log
   
    
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
        { name: "Change Game Version", value: "gameVer-faq" },
        { name: "Dont Ask To Ask", value: "data-faq" },
        { name: "Last World Reset (Snapshot)", value: "reset-faq" },
        { name: "Snapshot Mods", value: "mods-faq" },
      ))
      .toJSON();
  }
};

