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
       
      const translateFileStaffop = require("../embeds/staff-open-embed");
      const open = translateFileStaffop.open;


    

        const noUpdates = new EmbedBuilder().setDescription('There is nothing to update!').setColor('#189cab')
        //interaction.reply({embeds: [noUpdates], ephemeral: true})
        
        const msgID = '1091447694557466724'
        const channelID = '559311187867729932'

        const channel = client.channels.cache.get(channelID) //commands
        channel.messages.fetch(msgID).then(msg => msg.edit({embeds: [
          open
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
