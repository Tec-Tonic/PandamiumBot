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
    ),

  async execute(interaction, client) {
    try {
      const link = interaction.options.getString("link");
      const ErrlinkReply = new EmbedBuilder()
        .setDescription(
          `I do not have access to this message, provide a message link from this server.`
        )
        .setColor("#FF0000");

      const discordLinkReg = /\/([0-9].*)\/([0-9].*)\/([0-9].*[^/])\/{0,}/;
      const parsed = discordLinkReg.exec(link);
      const messageId = parsed[3];
      const channelId = parsed[2];
      const guildId = parsed[1];

      if (guildId === "504627012921589763") {
        const channel = await client.channels.fetch(channelId);
        const message = await channel.messages.fetch(messageId);
        const time = Math.round(message.createdTimestamp / 1000);

        const linkReply = new EmbedBuilder()
          .setAuthor({
            name: `${message.author.tag}`,
            iconURL:
              `https://cdn.discordapp.com/avatars/` +
              message.author.id +
              `/` +
              message.author.avatar +
              `.jpeg`,
            url: `${link}`,
          })
          .setDescription(`${message.content}`)
          .setColor("#1BEACA");

        const dateReply = new EmbedBuilder()
          .setDescription(
            `[Original Message](${link}) sent <t:${time}:R> in <#${channelId}>`
          )
          .setColor("#1BEACA");

        await interaction.reply({ embeds: [dateReply, linkReply] });
      } else {
        interaction.reply({ embeds: [ErrlinkReply] });
      }
    } catch {
      const Err = new EmbedBuilder()
        .setColor("#FF0000")
        .setDescription("Please use a valid link!");
      interaction.reply({ embeds: [Err], ephemeral: true });
    }
  },
};