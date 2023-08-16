const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    console.log("before code " + message.content)
    if (message.author.bot && message.content.startsWith("**<Rcon>**")) {
        console.log("after code " + message.content)
      // Extract the username from the message
      const match = message.content.match(/\*\*\<Rcon\>\*\* \[Info\] (\w+) got one vote credit for voting!/);
      if (match) {
        const username = match[1];

        // Delete the original message
        //await message.delete();
        await message.react('🤖')

        // Create an embed version of the message
        const embed = new EmbedBuilder()
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

