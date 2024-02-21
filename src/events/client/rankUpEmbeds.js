const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    
    if (message.author.bot) {
        
      // Extract the username and rank from the message
      const match = message.content.match(/\*\*<(_{1,2})?(\w+)(_{1,2})?>\*\* \2 has ranked up to \[([^\]]+)\]/);
      if (match) {
        let username = match[2];
        const rank = match[4];

        // TODO
        // Create function for this so I dont have to use it in multiple files

        // Escape underscores in the username
        username = username.replace(/_/g, '\\_');

        // Rank colors
        const rankColors = {
          'Player': '#55FF55',
          'Member': '#00AA00',
          'Elder': '#55FFFF',
          'Veteran': '#00AAAA',
          'Elite': '#5555FF'
        };

        // Get color based on rank
        const color = rankColors[rank] || '#1f8b4c';

        await message.delete();
        
        const embed = new EmbedBuilder()
          .setColor(color)
          .setDescription(
            `${username} has ranked up to [${rank}]`
          );

        await message.channel.send({ embeds: [embed] });
      }
    }
  },
};
