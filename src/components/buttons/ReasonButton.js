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
        name: `addReason`
    },
    async execute(interaction, client) {
        if (interaction.isButton()) {
            if (interaction.customId === "addReason") {
              
              const modal = new ModalBuilder()
                .setCustomId("reasonModal")
                .setTitle("Reason");
      
              const ReasonInput = new TextInputBuilder()
                .setCustomId("reasonInput")
                .setLabel("Please add a reason")
                .setStyle(TextInputStyle.Paragraph);
      
              const secondActionRow = new ActionRowBuilder().addComponents(
                ReasonInput
              );
      
              modal.addComponents(secondActionRow);
      
              await interaction.showModal(modal);
            }
          }
      

    }
}

