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
      name: `reasonModal`
  },
  async execute(interaction, client) {
      console.log('Component handler function called');
      if (interaction.customId === "reasonModal") {
          const reason = interaction.fields.getTextInputValue("reasonInput");
          const channelID = interaction.message.channel.id;
          const messageID = interaction.message.id;
          const embed = interaction.message.embeds;
    
          const firstEmbed = embed[0];
          const newEmbed = new EmbedBuilder()
            .setTitle(firstEmbed.title)
            .setDescription(firstEmbed.description)
            .setColor(firstEmbed.color)
            .addFields(firstEmbed.fields)
            .addFields({ name: "Comment: ", value: reason })
            .setFooter({ text: `${firstEmbed.footer.text}` });
    
          const disabledButton = new ButtonBuilder()
            .setCustomId("addReason")
            .setLabel("Comment Added")
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(true);
    
          await client.channels.cache
            .get(channelID)
            .messages.fetch(messageID)
            .then((msg) =>
              msg.edit({
                embeds: [newEmbed],
                components: [
                  new ActionRowBuilder().addComponents(disabledButton),
                ],
              })
            );
    
          return interaction.reply({content: "Comment has been added!", ephemeral: true});
        }
  }
}