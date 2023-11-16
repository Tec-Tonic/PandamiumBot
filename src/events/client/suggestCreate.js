const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  SelectMenuBuilder,
  EmbedBuilder,
  Client,
  GatewayIntentBits,
  ActivityType,
  Routes,
  Message,
  messageLink,
  Collection,
  channelLink,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.customId === "suggest") {
      let suggestion = interaction.fields.getTextInputValue("suggestInput");

      // Check if the suggestion text is more than 2000 characters
      if (suggestion.length > 2000) {
        let breakPoint = suggestion.slice(0, 2000).lastIndexOf(" ");
        const firstPart = suggestion.slice(0, breakPoint);
        const secondPart = suggestion.slice(breakPoint + 1);

        const channel = client.channels.cache.get("1137133652086636584");
        const thread = await channel.threads.create({
          name: "suggestion-thread",
          autoArchiveDuration: 60,
          reason: "Needed a separate thread for suggestions",
        });
        console.log(`Created thread: ${thread.name}`);

        await thread.send(firstPart);
        await thread.send(secondPart);

        return interaction.reply({
          content: "Your suggestion was sent!",
          ephemeral: true,
        });
      } else {
        const channel = client.channels.cache.get("1137133652086636584");
        const thread = await channel.threads.create({
          name: "suggestion-thread",
          autoArchiveDuration: 60,
          reason: "Needed a separate thread for suggestions",
        });
        console.log(`Created thread: ${thread.name}`);

        await thread.send(suggestion);

        return interaction.reply({
          content: "Your suggestion was sent!",
          ephemeral: true,
        });
      }
    }
  },
};
