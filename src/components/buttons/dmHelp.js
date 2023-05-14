const {
    ActionRowBuilder,
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
  } = require("discord.js");
  
  module.exports = {
    data: {
      name: `dmHelp`,
    },
    async execute(interaction, client) {
      const rejectMessage = new EmbedBuilder()
        .setColor("#FF0000")
        .setTitle("Linking Account")
        .setDescription(
          `Hey, if you are trying to link your account please message <@604625105758322688>. \n\nIf you require help please use the help button below and a Staff member will respond when available. \n\nHappy Minecrafting, \nPandamium`
        );
  
      const button = new ButtonBuilder()
        .setCustomId(`dmHelp`)
        .setLabel(`Help`)
        .setStyle(ButtonStyle.Danger)
        .setDisabled(true);
  
      const HelpNeededEmbed = new EmbedBuilder()
        .setColor("#F205FA")
        .setDescription(
          `<@${interaction.user.id}> requests help, please DM them`
        );
  
      await client.channels.cache
        .get("950432522137927690")
        .send({ embeds: [HelpNeededEmbed] });
  
      await interaction.reply({
        content: `Your request was sent! We will get back to you shortly.`,
      });
  
      const msgID = interaction.message.id;
      await interaction.message
        .fetch(msgID)
        .then((msg) =>
          msg.edit({
            embeds: [rejectMessage],
            components: [new ActionRowBuilder().addComponents(button)],
          })
        );
    },
  };
  