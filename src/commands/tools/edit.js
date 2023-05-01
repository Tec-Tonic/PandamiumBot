// File Needs A lot of work, its a basic and messy function atm

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
    .setName('edit')
    .setDescription('Edits Message Embeds'),
    async execute(interaction, client) {
        
        if (
            interaction.user.id === "546277533138550786" || interaction.user.id === "255766501464735744"
          ) {
            //get files from here

              const noUpdates = new EmbedBuilder().setDescription('There is nothing to update!').setColor('#189cab')
              return interaction.reply({embeds: [noUpdates], ephemeral: true})
              
              const msgID = '1091447597224448081' 
              const channelID = '506987588742152202' 
      
              const channel = client.channels.cache.get(channelID) //commands
              channel.messages.fetch(msgID).then(msg => msg.edit({embeds: [
                  //embeds
              ]}))  
              
          } else {
            return interaction.reply(
              "You do not have the permissions to use this command."
            );
          }

    }
}