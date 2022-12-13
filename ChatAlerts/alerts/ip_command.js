const ipFilter = require(`../filters/ip_filter.json`);
const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
const list = require("minecraft-server-util");

//remove Punctuation
var punctuation = "!\"#$%&'’()*+,-./:;<=>@[\\]^_`{|}~";
function removeCapPunctuation(string) {
  return string
    .split("")
    .filter(function (letter) {
      return punctuation.indexOf(letter) === -1;
    })
    .join("");
}

module.exports = {
  name: "ip",
  execute(message, client) {
    if (message.author == client.user) return;
    if (message.author.bot) return;

    const filterpunctuation = message.content;
    let ipfoundInText = false;
    for (var i in ipFilter) {
      if (
        removeCapPunctuation(filterpunctuation)
          .toLowerCase()
          .includes(ipFilter[i])
      )
        ipfoundInText = true;
    }
    if (ipfoundInText) {
      message.react("<:resolved:1006341376314720376>");

      list.status("pandamium.eu").then((ResponseRelease) => {
        list.status("snapshot.pandamium.eu").then((ResponseSnapshot) => {
          const releaseVersionIP = ResponseRelease.version.name;
          const snapVersionIP = ResponseSnapshot.version.name;

          const ip2embed = new EmbedBuilder()
            .setColor("#008000")
            .setTitle("Pandamium Server IP's")
            .addFields(
              {
                name: `Release IP: `,
                value: `pandamium.eu\n **Version:** ${releaseVersionIP}\n\n`,
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

          //.then(message => {setTimeout(() => message.delete(), 30000)});
        });
      });
    }
  },
};
