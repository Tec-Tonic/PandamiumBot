const log = require('../../serverlog.json').toString('')
const myLog = "963436191426957352"; 
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const scamLinkFlter = require(`../filters/scamlink.json`);
module.exports = {
  name: "scam",
 execute(message, client) {
    if (message.author == client.user) return;
    var content = message.content;
    var stringToCheck = content.replace(/\s+/g, "").toLowerCase();
    var stringToCheck = content;

    const scamAuthor = message.author;
    const scamChannel = message.channelId;

    stringToCheck.replace(/\s+/g, "").toLowerCase();
    for (var i = 0; i < scamLinkFlter.length; i++) {
      if (content.includes(scamLinkFlter[i])) {

       
         // await message.delete();
      

        const scamResultEmbed = new EmbedBuilder()
          .setDescription(
            `Your messaged was identified as a possible Scam link, ${scamAuthor}. \nIf this was a mistake open a ticket in <#750352670702698657>`
          )
          .setColor("#FF0101");

        message.channel.send({ embeds: [scamResultEmbed]}).then((message) => {
          setTimeout(() => message.delete(), 60000);
        });
        
        

        const scamEmbed = new EmbedBuilder()
          .setColor("#FF0000")
          .setTitle("Scam Link")
          .setDescription("**Scam link needs to be deleted.**")
          .addFields({
            name: `Info :`,
            value: `Author: ${scamAuthor} || Channel: <#${scamChannel}>`,
          });

         

        client.channels.cache.get(myLog).send({ embeds: [scamEmbed] }); //normal server
       

        break;
      }
    }
  },
};
