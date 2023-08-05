const {
  SlashCommandBuilder,
  EmbedBuilder,
  discordSort,
  DiscordAPIError,
  Discord,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("suggest")
    .setDescription("Allow users to suggest directly to staff members anonymously."),

  async execute(interaction, client) {
    
      const modalClosed = new ModalBuilder()
        .setCustomId("suggest")
        .setTitle("Suggest Anonymously");

      const suggest = new TextInputBuilder()
        .setCustomId("suggestInput")
        .setLabel("Suggestion will be sent to staff-only channel")
        .setStyle(TextInputStyle.Paragraph)
        .setPlaceholder("Please write your suggestion here.");

      const secondActionRow = new ActionRowBuilder().addComponents(suggest);

      modalClosed.addComponents(secondActionRow);

      await interaction.showModal(modalClosed);
  },
};
