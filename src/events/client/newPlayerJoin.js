const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    
    const regex = /<(.*)> \[Server\] Welcome to the server, (.*)! Have fun!/;
    const match = message.content.match(regex);
    const newPlayerEmbed = new EmbedBuilder()
    .setColor("#00FF04")
    .setDescription(`<@1155559317500596234>\nGuest | ${username} joined the server for the first time!`)

    if (match) {
        const username = match[1];
        client.channels.cache.get("950432522137927690").send({ embeds: [newPlayerEmbed] });
    }

  },
};