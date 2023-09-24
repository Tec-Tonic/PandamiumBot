const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    
    const regex = /\*\*<(.*)>\*\* \[Server\] Welcome to the server, (.*)! Have fun!/;
    const match = message.content.match(regex);

    if (match) {
        const username = match[1];
        const newPlayerEmbed = new EmbedBuilder()
        .setColor("#00FF04")
        .setDescription(`${username} joined the server for the first time!`)

        if (message.author == client.user) return;
        // Send the ping message first
        client.channels.cache.get("950432522137927690").send(`<@&1155559317500596234>`)
        .then(sentMessage => {
            // Wait for a few seconds
            setTimeout(() => {
                // Edit the message to include the embed
                sentMessage.edit({ content: '', embeds: [newPlayerEmbed] });
            }, 2000);  // Wait for 5 seconds
        });
    }
  },
};
