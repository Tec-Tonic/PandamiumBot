const BaseSlashCommand = require("../utils/BaseSlashCommands");
const {
  SlashCommandBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  AttachmentBuilder,
} = require("discord.js");

const util = require("minecraft-server-util");

module.exports = class faqSlashCommand extends BaseSlashCommand {
  constructor() {
    super("edit");
  }

  async run(client, interaction) {
    if (
      interaction.user.id === "546277533138550786" || interaction.user.id === "255766501464735744"
    ) {
      //code here
       
      const embed = new EmbedBuilder().setTitle(`GUEST`)
      .setDescription(`
New playersㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ\n\n**Snapshot Perks:**\n**▫️**Homes: **1**\n\n**Release Perks:**\n**▫️**Homes: **2**\n**▫️**Claims: **1**\n**▫️**Max Claim Area: **5,000 Blocks**`).setColor('#AAAAAA')

      const embed2 = new EmbedBuilder().setTitle(`PLAYER`)
      .setDescription(`
Requires 5 hours of playtime and 5 votes.\n\n**Snapshot Perks:**\n**▫️**Homes: **2 **ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ\n\n**Release Perks: **\n**▫️**Homes: **3**\n**▫️**Claims: **2**\n**▫️**Max Claim Area: **10,000 Blocks **`).setColor('#55FF55')
     
      
      const embed3 = new EmbedBuilder().setTitle(`MEMBER`)
      .setDescription(`
Requires 25 hours of playtime and 25 votes.\n\n**Snapshot Perks:**\n**▫️**Homes: **3 **ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ\n\n**Release Perks: **\n**▫️**Homes: **5**\n**▫️**Claims: **3**\n**▫️**Max Claim Area: **25,000 Blocks **`).setColor('#00AA00')

      const embed4 = new EmbedBuilder().setTitle(`ELDER`)
      .setDescription(`
Requires 125 hours of playtime and 125 votes.\n\n**Snapshot Perks:**\n**▫️**Homes: **4 **ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ\n\n**Release Perks: **\n**▫️**Homes: **10**\n**▫️**Claims: **5**\n**▫️**Max Claim Area: **50,000 Blocks **`).setColor('#55FFFF')

      const embed5 = new EmbedBuilder().setTitle(`VETERAN`)
      .setDescription(`
Requires 500 hours of playtime and 500 votes.\n\n**Snapshot Perks:**\n**▫️**Homes: **7 **ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ\n\n**Release Perks: **\n**▫️**Homes: **20**\n**▫️**Claims: **10**\n**▫️**Max Claim Area: **150,000 Blocks **`).setColor('#00AAAA')

      const embed6 = new EmbedBuilder().setTitle(`ELITE`)
      .setDescription(`
Requires 2,500 hours of playtime and 2,500 votes.\n\n**Snapshot Perks:**\n**▫️**Homes: **7 **ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ\n\n**Release Perks: **\n**▫️**Homes: **20**\n**▫️**Claims: **10**\n**▫️**Max Claim Area: **150,000 Blocks **`).setColor('#5555FF')

      const embed7 = new EmbedBuilder().setTitle(`DONATOR`)
      .setDescription(`
Players who have donated.\n\n**Snapshot Perks**:\n**▫️**Homes: **10**ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ\n**▫️**Access to lots of particle effects\n**▫️**Donator only <#602084896709541898>         \n\n**Release Perks**: \n**▫️**Homes: **25**\n**▫️**Claims: **15**\n**▫️**Max Claim Area: **250,000 Blocks**\n**▫️**Join even if the server is full\n**▫️**Donator only <#602084896709541898>`).setColor('#AA00AA')

      const embed8 = new EmbedBuilder().setTitle(`VIP`)
      .setDescription(`
Not obtainable via normal means and only given by the Owner.\n\n**Snapshot Perks:**\n**▫️**Homes: **10**ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ\n\n**Release Perks:**\n**▫️**Homes: **25**\n**▫️**Claims: **15**\n**▫️**Max Claim Area: **250,000 Blocks**`).setColor('#0000AA')



    

        const noUpdates = new EmbedBuilder().setDescription('There is nothing to update!').setColor('#189cab')
        //interaction.reply({embeds: [noUpdates], ephemeral: true})
        
        const msgID = '1091447597224448081'
        const channelID = '506987588742152202'

        const channel = client.channels.cache.get(channelID) //commands
        channel.messages.fetch(msgID).then(msg => msg.edit({embeds: [
          embed,
          embed2,
          embed3,
          embed4,
          embed5,
          embed6,
          embed7,
          embed8,
        ]}))
    } else {
      return interaction.reply(
        "You do not have the permissions to use this command."
      );
    }
  }
  getSlashCommandJSON() {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription("Edits message embeds!")
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
      .toJSON();
  }
};
