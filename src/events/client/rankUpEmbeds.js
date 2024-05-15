// const { EmbedBuilder } = require('discord.js');
// const axios = require('axios');

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    return;
//     if (message.author.bot || message.author.id === '546277533138550786') {
        
//       let content = message.content;
//       if (content.startsWith('*')) {
//           content = content.slice(1);
//       }
//       if (content.endsWith('*')) {
//           content = content.slice(0, -1);
//       }

//       // Extract the username and rank from the message
//       const match = content.match(/(_{1,2})?(\w+\s\|\s\w+)(_{1,2})? \2 has ranked up to \[([^\]]+)\]/); 
//       if (match) {
//         let username = match[2];
//         const rank = match[4];

//         // Define rank colors
//         const rankColors = {
//           'Guest': '#AAAAAA',
//           'Player': '#55FF55',
//           'Member': '#00AA00',
//           'Elder': '#55FFFF',
//           'Veteran': '#00AAAA',
//           'Elite': '#5555FF'
//         };

//         // Define rank order
//         const rankOrder = ['Guest', 'Player', 'Member', 'Elder', 'Veteran', 'Elite'];

//         // Get color based on rank
//         const color = rankColors[rank] || '#1f8b4c'; // default color if rank is not found

//         // Get previous rank based on rank order
//         const previousRankIndex = rankOrder.indexOf(rank) - 1;
//         const previousRank = rankOrder[previousRankIndex >= 0 ? previousRankIndex : 0];

//         // Get the Minecraft username without escape characters
//         const minecraftUsername = username.split('|')[1].trim().replace(/\\_/g, '_');

//         // Fetch the player's UUID from PlayerDB API
//         const response = await axios.get(`https://playerdb.co/api/player/minecraft/${minecraftUsername}`);
//         const data = response.data;
        
//         // Check if the player's data is found and the UUID property exists
//         if (data && data.data && data.data.player && data.data.player.id) {
//           const uuid = data.data.player.id;

//           // Use the UUID to get the player's head PNG from Crafthead API
//           const avatarUrl = `https://crafthead.net/avatar/${uuid}`;

//           // Delete the original message
//           await message.delete();
          
//           // Create an embed version of the message
//           const embed = new EmbedBuilder()
//             .setColor(color)
//             .setAuthor({ name: `${previousRank} | ${minecraftUsername} has ranked up to [${rank}]`, iconURL: avatarUrl })
      
//           // Send the embed to the same channel
//           await message.channel.send({ embeds: [embed] });
//         } else {
//           console.log('Player data not found or UUID property does not exist');
//         }
//       }
//     }
  },
};
