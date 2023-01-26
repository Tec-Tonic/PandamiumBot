// const log = require('../../serverlog.json').toString('')
// const { EmbedBuilder } = require("discord.js");
// const schema = require("../../schema/watchlist_schema.js");

// module.exports = {
//   name: "watchlist",
//   async execute(message, client) {
//     if (message.author == client.user) return;

      
//           if (message.channel.name === `joins`) {
//             const NameTest = message.content//.toString()
            
         
//             schema.findOneAndRemove({ name: NameTest }, (err, result) => {
            
//               if(!result) return // returns when someone not on the list joins
//               const nameFound = new EmbedBuilder().setTitle('Watchlist').setColor('#8FFF00').setDescription(`Added by ${result.staff}`)
//               .addFields(
//                 { name: `Message :`, value: `\`\`\`${result.name}\`\`\`` },
//                 {
//                   name: `Reason: `,
//                   value: `${result.reason}`,
//                 }
                
//               ).setFooter({ text: `This player was removed from the watchlist, please readd them if needed!` })
              
//               client.channels.cache.get('950432522137927690').send({embeds : [nameFound]}) //Bot logs
//             })}
            
          
    
//   },
// };