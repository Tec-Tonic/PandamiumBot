const { EmbedBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  name: "messageCreate",
  async execute(client, message) {
    if (message && message.content && message.content.trim() === "!ip") {
      const url = `https://api.mcstatus.io/v2/status/java/`;
      const snapshot = await axios.get(url + "snapshot.pandamium.eu");
      const release = await axios.get(url + "release.pandamium.eu");

      const snapVersion = snapshot.data.version.name_raw;
      const releaseVersion = release.data.version.name_raw;

      const ipPrefixEmbed = new EmbedBuilder()
        .setColor("#008000")
        .setTitle("Pandamium Server IP's")
        .addFields(
          {
            name: `Snapshot IP: `,
            value: `snapshot.pandamium.eu\n **Version:** ${snapVersion}`,
          },
          {
            name: `Release IP: `,
            value: `release.pandamium.eu\n **Version:** ${releaseVersion}\n\n`,
          }
        );

      message.channel.send({ embeds: [ipPrefixEmbed] }).then((message) => {
        setTimeout(function () {
          message.edit(`[Delete] Will be deleted shortly.`);
        }, 30000);
        setTimeout(function () {
          message.delete();
        }, 32000);
      });
    }
  },
};
