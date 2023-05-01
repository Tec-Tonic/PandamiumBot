const log = process.env.PANDALOGS
const { EmbedBuilder } = require("discord.js");
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
      const controEmbed = new EmbedBuilder()
        .setColor("#7b9bcc")
        .setTitle("Controversial Topics") //stop adding exclamations to everything
        .addFields(
          { name: `Message :`, value: `${topicMessageLog}` },
          {
            name: `Info :`,
            value: `check <#${topicChannel}> || [click me](${topicTextLink})`,
          }
        )
        .setFooter({ text: `Author : ${topicAuthor}` });

      client.channels.cache.get(log).send({ embeds: [controEmbed] });
    }
  },
};
