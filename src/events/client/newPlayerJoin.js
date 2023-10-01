const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    const regex =
      /\*\*<(.*)>\*\* \[Server\] Welcome to the server, (.*)! Have fun!/;
    const match = message.content.match(regex);
    if (match) {
      await message.react("❌"); //await message.delete();
      const username = match[1];
      const newPlayerMessageLink = message.url;

      const url = `https://api.mojang.com/users/profiles/minecraft/${username}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const uuid = data.id;
          const skinUrl = `https://crafatar.com/skins/${uuid}`;

          const newPlayerEmbed = new EmbedBuilder()
            .setColor("#00FF04")
            .setDescription(
              `${username} joined the snapshot server for the first time! | [View In-Game Chat](${newPlayerMessageLink})`
            )
            .setThumbnail(skinUrl);

          const inGameMessage = new EmbedBuilder()
            .setColor("#00FF04")
            .setDescription(`Welcome to the server, ${username}! Have fun!`);

          if (message.author == client.user) return;

          // Replace join message with embed
          message.channel.send({ embeds: [inGameMessage] });

          // Send the ping message first
          client.channels.cache
            .get("950432522137927690")
            .send(`<@&1155559317500596234>`)
            .then((sentMessage) => {
              // Wait for a few seconds
              setTimeout(() => {
                // Edit the message to include the embed
                sentMessage.edit({ content: "", embeds: [newPlayerEmbed] });
              }, 2000); // Wait for 2 seconds
            });
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
  },
};
