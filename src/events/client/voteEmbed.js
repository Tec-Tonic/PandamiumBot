const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    
    if (message.author.bot && message.content.startsWith("**<Rcon>**")) {
        
      // Extract the username and message content from the message
      const splitMessage = message.content.split(" ");
      const category = splitMessage[2].slice(1, -1);
      const username = splitMessage[3];
      const msgContent = splitMessage.slice(4).join(" ");

      // Delete the original message
      //await message.delete();
      await message.react("😁");
        
      // Create an embed version of the message
      const embed = new EmbedBuilder()
        .setColor("#1f8b4c")
        .setDescription(
          `**[${category}]** \`${username}\` ${msgContent}`
        );

      // Send the embed to the same channel
      await message.channel.send({ embeds: [embed] });
    }
  },
};
