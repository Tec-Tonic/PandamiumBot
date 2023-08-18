const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    
    if (message.author.bot && message.content.startsWith("**<Rcon>**")) {
        
      // Extract the username from the message
      const match = message.content.match(/\*\*\<Rcon\>\*\* \[Info\] (_{1,2})?(\w+)(_{1,2})? got one vote credit for voting!/);
      if (match) {
        const username = match[2];

        // Delete the original message
        await message.delete();
        
        // Create an embed version of the message
        const embed = new MessageEmbed()
          .setColor("#1f8b4c")
          .setDescription(
            `**[Info]** \`${username}\` got one vote credit for voting!`
          );

        // Send the embed to the same channel
        await message.channel.send({ embeds: [embed] });
      }
    }
  },
};

