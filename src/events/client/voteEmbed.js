const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    
    if (message.author.bot && message.content.startsWith("**<Rcon>**")) {
        
      // Extract the username and message content from the message
      const match = message.content.match(/\*\*\<Rcon\>\*\* \[(.+)\] ([\w_]+) (.+)/);
      if (match) {
        const category = match[1];
        const username = match[2];
        const msgContent = match[3];

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
    }
  },
};
