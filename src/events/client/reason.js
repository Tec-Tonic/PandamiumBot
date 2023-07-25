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
    name: "interactionCreate",
    async execute(interaction, client) {
        
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
          .addFields({ name: "Reason: ", value: reason })
          .setFooter({ text: `${firstEmbed.footer.text}` });
  
        const disabledButton = new ButtonBuilder()
          .setCustomId("addReason")
          .setLabel("Reason Added")
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
  
        return interaction.reply({content: "Reason has been added!", ephemeral: true});
      }
    },
  };
  