const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    
    if (message.author.bot && (message.content.startsWith("*Rcon") || message.content.startsWith("*Server"))) {
        
      // Extract the username and reward credits from the message
      const match = message.content.match(/\*\*\*(?:Rcon|Server)\*\* \[Voting\] ([^\s]+) got (\d+) reward credit\(s\)? for voting!\*/);
      if (match) {
        const username = match[1];
        const credits = match[2];
        const creditWord = match[3] ? 'credits' : 'credit';

        // Delete the original message
        await message.delete();
        
        // Create an embed version of the message
        const embed = new EmbedBuilder()
          .setColor("#1f8b4c")
          .setDescription(
            `**[Voting]** ${username} got ${credits} reward ${creditWord} for voting!`
          );

        // Send the embed to the same channel
        await message.channel.send({ embeds: [embed] });
      }
    }
  },
};