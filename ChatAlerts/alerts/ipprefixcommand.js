const prefix = "!";
const { EmbedBuilder } = require("discord.js");
const list = require("minecraft-server-util");

module.exports = {
  name: "prefixip",
  execute(message, client) {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    message.react("<:resolved:1006341376314720376>");

    list.status("pandamium.eu").then((Responses) => {
      list.status("snapshot.pandamium.eu").then((Response) => {
        const snapVersionIP = Response.version.name;
        const releaseversionIP = Responses.version.name;

        const ip2embed = new EmbedBuilder()
          .setColor("#008000")
          .setTitle("Pandamium Server IP's")
          .addFields(
            {
              name: `Release IP: `,
              value: `pandamium.eu\n **Version:** ${releaseversionIP}\n\n`,
            },
            {
              name: `Snapshot IP: `,
              value: `snapshot.pandamium.eu\n **Version:** ${snapVersionIP}`,
            }
          );

        message.channel.send({ embeds: [ip2embed] }).then((message) => {
          setTimeout(function () {
            message.edit(`**[**Delete**]** Will be deleted shortly.`);
          }, 30000);
          setTimeout(function () {
            message.delete();
          }, 32000);
        });
      });
    });
  },
};
