const {
  SlashCommandBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  AttachmentBuilder,
} = require("discord.js");

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    if (message.author.bot) {
      if (message.content.startsWith("<Rcon>")) {
        // Extract the username from the message
        const username = message.content.match(
          /\<Rcon\> \[Info\] (\w+) got one vote credit for voting!/
        )[1];

        // Delete the original message
        await message.delete();

        // Create an embed version of the message
        const embed = new EmbedBuilder()
          .setColor("#1f8b4c")
          .setDescription(
            `**[Info]** \`${username}\` got one vote credit for voting!`
          );

        // Send the embed to the same channel
        await message.channel.send({ embeds: [embed] });
      }
    }
  },
};
