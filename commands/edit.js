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
       
      const staff = new EmbedBuilder().setDescription(`
      If you want to apply to become a Helper, read the following carefully.\n\n**RECOMMENDATIONS FOR HELPER**\n**↳** 16+ years of age\n**↳** 50+ votes\n**↳** 50+ hours of playtime\n\n\n**HOW TO APPLY**\n:white_small_square: Open a ticket in <#750352670702698657> and follow the directions. \n\nWhen you submit your application, it will be transferred to a private staff area for review and your ticket will be closed. Applications that have been transferred are unable to be edited.\n\n\n**HELPFUL TIPS**\n**↳** Write a long and detailed application.\n**↳** Include as much relevant information as possible (e.g. past staff experience, when/how long you can be online).\n**↳** Include any punishments you've received on the server and why you think you're still suitable to be on our staff team.\n\n\n**HOW DECISIONS ARE MADE**\nWe use a point based system to make decisions about staff applications. Every staff member can give you plus or minus points (higher ranks have more influence). There are also some additional points which are calculated by set formulas and depend on things like your playtime. A final decision will be made after we've reviewed all of the applications, which may take quite a while. Your ticket being closed just means we've seen your application, not that we've made a decision.
              `).setColor('#65FE54')
    

        const noUpdates = new EmbedBuilder().setDescription('There is nothing to update!').setColor('#189cab')
        //interaction.reply({embeds: [noUpdates], ephemeral: true})
        
        const msgID = '1091447674378670270'
        const channelID = '559311187867729932'

        const channel = client.channels.cache.get(channelID) //commands
        channel.messages.fetch(msgID).then(msg => msg.edit({embeds: [staff]}))
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
