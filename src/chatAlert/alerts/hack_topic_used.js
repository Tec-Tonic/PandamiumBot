const log = process.env.PANDALOGS
const { EmbedBuilder } = require("discord.js");
const cheatFilter = require(`../filters/hack_alert_filter.json`);
module.exports = {
  name: "hacks",
  execute(message, client) {
    if (message.author.bot) return;
    
    const cheatChannel = message.channelId;
    const cheatTextLink = message.url;
    const cheatMessageLog = message.content;
    const cheatAuthor = message.author.username;

    let cheatFoundInText = false;
    for (var i in cheatFilter) {
      if (message.content.toLowerCase().includes(cheatFilter[i].toLowerCase()))
        cheatFoundInText = true;
    }
    if (cheatFoundInText) {
      const cheatEmbed = new EmbedBuilder()
        .setColor("#7b9bcc")
        .setTitle("Terms about Hacking/Cheating!")
        .addFields(
          { name: `Message :`, value: `${cheatMessageLog}` },
          {
            name: `Info :`,
            value: `Check <#${cheatChannel}> || [Click Me](${cheatTextLink})`,
          }
        )
        .setFooter({ text: `Author : ${cheatAuthor}` });

      client.channels.cache.get(log).send({ embeds: [cheatEmbed] });
    }
  },
};