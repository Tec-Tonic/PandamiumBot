const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  ButtonStyle,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ModalBuilder,
} = require("discord.js");
const axios = require("axios");

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    const regex =
      /\*\*<(.*)>\*\* \[Pandamium\] Welcome to the server, (.*)! Have fun!/;
    const match = message.content.match(regex);
    if (match) {
      await message.delete();
      const usernameWithPrefix = match[1];
      const username = usernameWithPrefix.replace("Guest | ", "");
      const newPlayerMessageLink = message.url;
      const url = `https://api.mojang.com/users/profiles/minecraft/${username}`;

      try {
        const response = await axios.get(url);
        const data = response.data;

        if (data && data.id) {
          const uuid = data.id;
          const skinUrl = `https://visage.surgeplay.com/full/512/${uuid}`;
          const nameMCProfileLink = `https://namemc.com/profile/${uuid}`;

          const newPlayerEmbed = new EmbedBuilder()
            .setColor("#00FF04")
            .setDescription(
              `${username} joined the snapshot server for the first time!`
            )
            .setThumbnail(skinUrl);

          const inGameMessage = new EmbedBuilder()
            .setColor("#00FF04")
            .setDescription(
              `Welcome to the server, ${usernameWithPrefix}! Have fun!`
            );

          if (message.author == client.user) return;

          // Replace join message with embed
          message.channel.send({ embeds: [inGameMessage] });

          // Create a API button
          const button = new ButtonBuilder()
            .setCustomId("craftyData")
            .setLabel("Crafty API Data")
            .setStyle(ButtonStyle.Primary);

          // Create a Msg Link
          const linkButton = new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel(`In-Game Chat`)
            .setURL(newPlayerMessageLink);

          // Create a Msg Link
          const linkNameMCButton = new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel(`NameMC Profile`)
            .setURL(nameMCProfileLink);

          const linkNMCButton = new ActionRowBuilder().addComponents(
            linkButton,
            linkNameMCButton
          );

          const craftyButton = new ActionRowBuilder().addComponents(button);

          // Bot-log pings
          let messageContent = `<@&1155559317500596234>`;

          client.channels.cache.get("950432522137927690").send({
            content: messageContent,
            embeds: [newPlayerEmbed],
            components: [linkNMCButton, craftyButton],
          });
        } else {
          console.log(
            `Error: Failed to retrieve skin URL. Username-Prefix: ${usernameWithPrefix}, Username: ${username}`
          );
        }
      } catch (error) {
        console.log("Error:", error);
      }
    }
  },
};
