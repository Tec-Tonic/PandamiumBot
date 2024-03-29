const {
  SlashCommandBuilder,
  EmbedBuilder,
  discordSort,
  DiscordAPIError,
  Discord,
} = require("discord.js");
const fs = require("fs");

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    const staffFilePath = "src/components/pandamium/staff.json";
    const staffData = JSON.parse(fs.readFileSync(staffFilePath, "utf8"));

    const staffMember = staffData.find(
      (staffMember) => staffMember.id === message.author.id
    );
    if (!staffMember || staffMember["auto-quote"] === "false") return;

    // Checks channel, don't want bot embeds in records channels
    if (
      message.channel.name === "player-record" ||
      message.channel.name === "player-watchlist"
    )
      return;

    // Check if the message contains a link preceded by '?-' or '?'
    const linkRegex = /\?[-]?https?:\/\/[\S]+/g;
    const linkMatches = [...new Set(message.content.match(linkRegex))]; // Remove duplicates
    for (const linkMatch of linkMatches) {
      // Extract the first link from the message
      const link = linkMatch.substring(linkMatch.startsWith('?-') ? 2 : 1);

      // Execute the provided code with the extracted link
      try {
        const discordLinkReg = /\/([0-9].*)\/([0-9].*)\/([0-9].*[^/])\/{0,}/;
        const parsed = discordLinkReg.exec(link);
        const messageId = parsed[3];
        const channelId = parsed[2];
        const guildId = parsed[1];

        if (guildId !== message.guild.id) {
          return;
        }

        const channel = await client.channels.fetch(channelId);
        const fetchedMessage = await channel.messages.fetch(messageId);
        const time = Math.round(fetchedMessage.createdTimestamp / 1000);

        let linkReply;
        if (fetchedMessage.embeds.length > 0) {
          // Handle embeds
          linkReply = new EmbedBuilder(fetchedMessage.embeds[0]);
        } else {
          // Handle regular messages
          linkReply = new EmbedBuilder()
            .setAuthor({
              name: `${fetchedMessage.author.username}`,
              iconURL:
                `https://cdn.discordapp.com/avatars/` +
                fetchedMessage.author.id +
                `/` +
                fetchedMessage.author.avatar +
                `.jpeg`,
              url: `${link}`,
            })
            .setColor("#1BEACA");

          if (fetchedMessage.content) {
            linkReply.setDescription(`${fetchedMessage.content}`);
          }

          if (fetchedMessage.attachments.size > 0) {
            let attachmentText = "";
            let imageCount = 0;
            fetchedMessage.attachments.forEach((attachment) => {
              if (attachment.contentType.startsWith("image/")) {
                imageCount++;
                if (
                  imageCount === 1 &&
                  fetchedMessage.attachments.size === 1
                ) {
                  linkReply.setImage(attachment.url);
                } else {
                  attachmentText += `${attachment.name} | Open Image\n`;
                }
              } else {
                attachmentText += `${attachment.name} | Open Image\n`;
              }
            });
            if (attachmentText) {
              linkReply.addFields({
                name: "Attachments",
                value: attachmentText,
              });
            }
          }
        }

        const dateReply = new EmbedBuilder()
          .setDescription(
            `${message.author.username} sent ${link} <t:${time}:R>`
          )
          .setColor("#1BEACA");

        // Check if the linkMatch starts with '?-'
        if (!linkMatch.startsWith('?-')) {
          await message.channel.send({ embeds: [dateReply, linkReply] });
        } else {
          await message.channel.send({ embeds: [linkReply] });
        }
      } catch (e) {
        if (
          e instanceof DiscordAPIError &&
          (e.code === 10003 || e.code === 50001 || e.code === 10008)
        ) {
          return;
        } else {
          console.error(e);
        }
      }
    }
  },
};
