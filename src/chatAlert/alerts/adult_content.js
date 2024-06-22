const log = process.env.PANDALOGS
const { EmbedBuilder, ButtonBuilder, ButtonComponent, ButtonStyle, ActionRowBuilder } = require("discord.js");
const topicFilter = require(`../filters/adult_filter.json`);
module.exports = {
  name: "adult",
  execute(message, client) {
    if (message.author == client.user) return;
    let topicAuthor;

    const topicTextLink = message.url;
    const topicMessageLog = message.content;
    
    if (message.author.bot) {
      topicAuthor = message.content.split(" ")[1];
    } else {
      topicAuthor = message.author.username;
    }

    let topicFoundInText = false;
    for (var i in topicFilter) {
      if (message.content.toLowerCase().includes(topicFilter[i].toLowerCase()))
        topicFoundInText = true;
    }
    if (topicFoundInText) {

      const btn = new ButtonBuilder()
			.setCustomId('addReason')
			.setLabel('Add Comment')
			.setStyle(ButtonStyle.Danger);
      
      const row = new ActionRowBuilder()
			.addComponents(btn);

      const adultEmbed = new EmbedBuilder()
        .setColor("#FF0000")
        .setTitle("Adult Content")
        .addFields(
          { name: `Message:`, value: `||${topicMessageLog}||` },
          {
            name: `Info:`,
            value: `Jump to message: ${topicTextLink}`,
          }
        )
        .setFooter({ text: `Author: ${topicAuthor}`});

      client.channels.cache.get(log).send({ embeds: [adultEmbed], components: [row] });
    } else {
      return;
    }
  },
};
