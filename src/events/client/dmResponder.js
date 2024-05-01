const {
  REST,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  ChannelType,
} = require("discord.js");

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    let DMmessage = message.content;
    let author = message.author;

    const rejectMessage = new EmbedBuilder()
      .setColor("#FF0000")
      .setTitle("Linking Account")
      .setDescription(
        `Hey ${author.username}, if you are trying to link your account please message <@604625105758322688>. \n\nIf you require help please use the help button below and a Staff member will respond when available. \n\nHappy Minecrafting, Pandamium`
      );
    
    const codeEmbed = new EmbedBuilder()
      .setColor("#F205FA")
      .setTitle(`**Direct Message Received**`)
      .setDescription(`${author.username} sent:\n${DMmessage}`);

      const button = new ButtonBuilder()
        .setCustomId(`dmHelp`)
        .setLabel(`Help`)
        .setStyle(ButtonStyle.Danger)
        .setDisabled(false);

    if (message.author.bot) return;
    if (message.channel.type === ChannelType.DM) {
      if (!DMmessage) return;
      message.reply({ embeds: [rejectMessage], components: [new ActionRowBuilder().addComponents(button)] });
      
      client.channels.cache.get("950432522137927690").send({ embeds: [codeEmbed] });
    }

    module.exports.author = author
  },
};
