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
      const usernameWithPrefix = match[1];
      const username = usernameWithPrefix.replace("Guest | ", "");
      const newPlayerMessageLink = message.url;
      console.log(username)
      const url = `https://api.mojang.com/users/profiles/minecraft/${username}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.id) {
            const uuid = data.id;
            const skinUrl = `https://crafatar.com/skins/${uuid}`;
            const newPlayerEmbed = new EmbedBuilder()
              .setColor("#00FF04")
              .setDescription(
                `${usernameWithPrefix} joined the snapshot server for the first time! | [View In-Game Chat](${newPlayerMessageLink})`
              )
              .setThumbnail(skinUrl);

            const inGameMessage = new EmbedBuilder()
              .setColor("#00FF04")
              .setDescription(`Welcome to the server, ${usernameWithPrefix}! Have fun!`);

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
          } else {
            console.log(`Error: Failed to retrieve skin URL. Username-Prefix: ${usernameWithPrefix}, Username: ${username}`);
          }
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
  },
};