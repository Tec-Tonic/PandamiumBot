const log = require('../../serverlog.json').toString('')
const { EmbedBuilder } = require("discord.js");
const slurFilter = require(`../filters/slur_filter.json`);
module.exports = {
  name: "slur",
  execute(message, client) {
    if (message.author == client.user) return;
    const slurChannel = message.channelId;
    const slurTextLink = message.url;
    const slurmessagelog = message.content;
    const slurAuthor = message.author.username;

    let slurfoundInText = false;

    for (var i in slurFilter) {
      if (message.content.toLowerCase().includes(slurFilter[i].toLowerCase()))
        slurfoundInText = true;
    }
    if (slurfoundInText) {
      const slurEmbed = new EmbedBuilder()
        .setColor("#FF0000")
        .setTitle("Slurs")
        .addFields(
          { name: `Message :`, value: `|| ${slurmessagelog} ||` },
          {
            name: `Info: `,
            value: `check <#${slurChannel}> || [click me](${slurTextLink})`,
          }
        )
        .setFooter({ text: `Author : ${slurAuthor}` });

      client.channels.cache.get(log).send({ embeds: [slurEmbed] });
    } else return;
  },
};
