const botlogs = process.env.PANDALOGS;
const { EmbedBuilder, ButtonBuilder, ButtonComponent, ButtonStyle, ActionRowBuilder } = require("discord.js");
const slurFilter = require(`../filters/slur_alert_filter.json`);


module.exports = {
  name: "slur_used",
  execute(message, client) {
    if (message.author == client.user) return;

    const slurChannel = message.channelId;
    const slurTextLink = message.url;
    const slurMessageLog = message.content;
    const slurAuthor = message.author.username;

    let slurFoundInText = false;
    for (var i in slurFilter) {
      if (message.content.toLowerCase().includes(slurFilter[i].toLowerCase()))
        slurFoundInText = true;
    }

    if (slurFoundInText) {
      const btn = new ButtonBuilder()
			.setCustomId('addReason')
			.setLabel('Add Reason')
			.setStyle(ButtonStyle.Danger);
      
      const row = new ActionRowBuilder()
			.addComponents(btn);

      const slurEmbed = new EmbedBuilder()
        .setColor("#FF0000")
        .setTitle("Slurs")
        .addFields(
          { name: `Message :`, value: `|| ${slurMessageLog} ||` },
          {
            name: `Info: `,
            value: `check <#${slurChannel}> || [click me](${slurTextLink})`,
          }
        )
        .setFooter({ text: `Author : ${slurAuthor}` });

      client.channels.cache.get(botlogs).send({ embeds: [slurEmbed], components: [row] });
    } else return;
  },
};