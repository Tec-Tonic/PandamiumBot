const log = process.env.PANDALOGS
const { EmbedBuilder, ButtonBuilder, ButtonComponent, ButtonStyle, ActionRowBuilder } = require("discord.js");
const topicFilter = require(`../filters/contro_alert_filter.json`);
module.exports = {
  name: "contro",
  execute(message, client) {
    if (message.author == client.user) return;

    const topicChannel = message.channelId;
    const topicTextLink = message.url;
    const topicMessageLog = message.content;
    const topicAuthor = message.author.username;

    let topicFoundInText = false;
    for (var i in topicFilter) {
      if (message.content.toLowerCase().includes(topicFilter[i].toLowerCase()))
        topicFoundInText = true;
    }
    if (topicFoundInText) {

      const btn = new ButtonBuilder()
			.setCustomId('addComment')
			.setLabel('Add Comment')
			.setStyle(ButtonStyle.Danger);
      
      const row = new ActionRowBuilder()
			.addComponents(btn);

      const controEmbed = new EmbedBuilder()
        .setColor("#7b9bcc")
        .setTitle("Controversial Topics") //stop adding exclamations to everything
        .addFields(
          { name: `Message:`, value: `${topicMessageLog}` },
          {
            name: `Info:`,
            value: `Jump to message: ${topicTextLink}`,
          }
        )
        .setFooter({ text: `Author: ${topicAuthor}` });

      client.channels.cache.get(log).send({ embeds: [controEmbed], components: [row] });
    } else {
      return;
    }
  },
};
