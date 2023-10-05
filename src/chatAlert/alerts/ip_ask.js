const ipFilter = require(`../filters/ip_ask.json`);
const { EmbedBuilder } = require("discord.js");
const fs = require("fs");

//remove Punctuation
const remove = require('../../functions/events/punctuation')

module.exports = {
  name: "ip",
  async execute(message, client) {
    if (message.author == client.user) return;
    if (message.author.bot) return;

    const axios = require("axios");
    const url = `https://api.mcstatus.io/v2/status/java/`;
    const snapshot = await axios.get(url + "snapshot.pandamium.eu");
    const release = await axios.get(url + "release.pandamium.eu");

    const filterPunctuation = message.content;
    let ipFoundInText = false;
    for (var i in ipFilter) {
      if (
        remove.Punctuation(filterPunctuation).toLowerCase().includes(ipFilter[i])
      )
        ipFoundInText = true;
    }
    if (ipFoundInText) {
      message.react("✅");

      const releaseVersion = release.data.version.name_raw;
      const snapVersion = snapshot.data.version.name_raw;

      const ipAskEmbed = new EmbedBuilder()
        .setColor("#008000")
        .setTitle("Pandamium Server IP's")
        .addFields(
          {
            name: `Snapshot IP: `,
            value: `\`\`\`snapshot.pandamium.eu\`\`\`\n **Version:** ${snapVersion}`,
          },
          {
            name: `Release IP: `,
            value: `\`\`\`release.pandamium.eu\`\`\`\n **Version:** ${releaseVersion}\n\n`,
          }
        );

      message.channel.send({ embeds: [ipAskEmbed] }).then((message) => {
        setTimeout(function () {
          message.edit(`[Delete] Will be deleted shortly.`);
        }, 117000);
        setTimeout(function () {
          message.delete();
        }, 120000);
      })
    } else {
      return;
    }
  },
};
