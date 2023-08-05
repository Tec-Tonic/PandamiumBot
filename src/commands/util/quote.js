const {
  SlashCommandBuilder,
  EmbedBuilder,
  discordSort,
  DiscordAPIError,
  Discord,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("quote")
    .setDescription(
      "Converts a Discord message link into an Embed! [Visible to everyone]"
    )
    .addStringOption((option) =>
      option.setName("link").setDescription("link required").setRequired(true)
    ).addStringOption((option) =>
    option.setName("message").setDescription("message optional").setRequired(false)
  ),

  async execute(interaction, client) {
    try {
      const link = interaction.options.getString("link");
      const quoteMessage = interaction.options.getString("message");

      const ErrlinkReply = new EmbedBuilder()
        .setDescription(
          `I do not have access to this message, provide a message link from this server.`
        )
        .setColor("#FF0000");
        const messageNotFound = new EmbedBuilder()
        .setDescription(
          `Message not found, please try again.`
        )
        .setColor("#FF0000");
        const channelNotFound = new EmbedBuilder()
        .setDescription(
          `Channel not found, please try again.`
        )
        .setColor("#FF0000");

      const discordLinkReg = /\/([0-9].*)\/([0-9].*)\/([0-9].*[^/])\/{0,}/;
      const parsed = discordLinkReg.exec(link);
      const messageId = parsed[3];
      const channelId = parsed[2];
      const guildId = parsed[1];

      if (guildId === interaction.guild.id) {
        try {
          const channel = await client.channels.fetch(channelId);
          try {
            const message = await channel.messages.fetch(messageId);
            const time = Math.round(message.createdTimestamp / 1000);

            let linkReply;
            if (message.embeds.length > 0) {
              // Handle embeds
              linkReply = new EmbedBuilder(message.embeds[0]);
            } else {
              // Handle regular messages
              linkReply = new EmbedBuilder()
                .setAuthor({
                  name: `${message.author.username}`,
                  iconURL:
                    `https://cdn.discordapp.com/avatars/` +
                    message.author.id +
                    `/` +
                    message.author.avatar +
                    `.jpeg`,
                  url: `${link}`,
                })
                .setColor("#1BEACA");

              if (message.content) {
                linkReply.setDescription(`${message.content}`);
              }

              if (message.attachments.size > 0) {
                let attachmentText = "";
                let imageCount = 0;
                message.attachments.forEach((attachment) => {
                  if (attachment.contentType.startsWith("image/")) {
                    imageCount++;
                    if (imageCount === 1 && message.attachments.size === 1) {
                      linkReply.setImage(attachment.url);
                    } else {
                      attachmentText += `${attachment.name} | [Open Image](${attachment.url})\n`
                    }
                  } else {
                    attachmentText += `${attachment.name} | [Open Image](${attachment.url})\n`;
                  }
                });
                if (attachmentText) {
                  linkReply.addFields({ name: "Attachments", value: attachmentText });
                }
              }
            }

            const dateReply = new EmbedBuilder()
              .setDescription(
                `[Original Message](${link}) sent <t:${time}:R> in <#${channelId}>`
              )
              .setColor("#1BEACA");

              if (quoteMessage) {
                await interaction.reply({ content: `${quoteMessage}`, embeds: [dateReply, linkReply] });
              } else {
                await interaction.reply({ embeds: [dateReply, linkReply] });
              }
          } catch (e) {
            if (e instanceof DiscordAPIError && e.code === 10008) {
              // Message not found
              interaction.reply({
                embeds: [messageNotFound],
                ephemeral: true,
              });
            } else {
              throw e;
            }
          }
        } catch (e) {
          if (e instanceof DiscordAPIError && (e.code === 10003 || e.code === 50001)) {
            // Channel not found
            interaction.reply({
              embeds: [channelNotFound],
              ephemeral: true,
            });
          } else {
            throw e;
          }
        }
      } else {
        interaction.reply({ embeds: [ErrlinkReply], ephemeral: true });
      }
    } catch (e) {
      if (!(e instanceof DiscordAPIError)) {
        console.log(e)
        // Invalid link
        const Err = new EmbedBuilder()
          .setColor("#FF0000")
          .setDescription("Please use a valid link!");
        interaction.reply({ embeds: [Err], ephemeral: true });
      }
    }
  },
};
