const log = process.env.PANDALOGS
const { EmbedBuilder, ButtonBuilder, ButtonComponent, ButtonStyle, ActionRowBuilder } = require("discord.js");
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

      const btn = new ButtonBuilder()
			.setCustomId('addReason')
			.setLabel('Add Reason')
			.setStyle(ButtonStyle.Danger);
      
      const row = new ActionRowBuilder()
			.addComponents(btn);

      const cheatEmbed = new EmbedBuilder()
        .setColor("#7b9bcc")
        .setTitle("Terms about Hacking/Cheating")
        .addFields(
          { name: `Message:`, value: `${cheatMessageLog}` },
          {
            name: `Info:`,
            value: `Jump to message: ${cheatTextLink}`,
          }
        )
        .setFooter({ text: `Author: ${cheatAuthor}` });

      client.channels.cache.get(log).send({ embeds: [cheatEmbed], components: [row] });
    } else {
      return;
    }
  },
};