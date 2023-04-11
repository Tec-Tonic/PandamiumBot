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
       
      const translateFileFAQ = require("../embeds/faq-embed");
      const f1 = translateFileFAQ.f1;
      const f2 = translateFileFAQ.f2;
      const f3 = translateFileFAQ.f3;
      const f4 = translateFileFAQ.f4;
      const f5 = translateFileFAQ.f5;
      const f6 = translateFileFAQ.f6;
      const f7 = translateFileFAQ.f7;
      const f8 = translateFileFAQ.f8;


    

        const noUpdates = new EmbedBuilder().setDescription('There is nothing to update!').setColor('#189cab')
        //interaction.reply({embeds: [noUpdates], ephemeral: true})
        
        const msgID = '1091446742765023382'
        const channelID = '710789637219811359'

        const channel = client.channels.cache.get(channelID) //commands
        channel.messages.fetch(msgID).then(msg => msg.edit({embeds: [
          f1, f3, f2, f4, f5, f6, f7, f8
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
