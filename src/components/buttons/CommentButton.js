const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
  } = require("discord.js");

module.exports = {
    data: {
        name: `addComment`
    },
    async execute(interaction, client) {
        if (interaction.isButton()) {
            if (interaction.customId === "addComment") {
              
              const modal = new ModalBuilder()
                .setCustomId("commentModal")
                .setTitle("Comment");
      
              const commentInput = new TextInputBuilder()
                .setCustomId("commentInput")
                .setLabel("Please add a comment")
                .setStyle(TextInputStyle.Paragraph);
      
              const secondActionRow = new ActionRowBuilder().addComponents(
                commentInput
              );
      
              modal.addComponents(secondActionRow);
      
              await interaction.showModal(modal);
            }
          }
      

    }
}

