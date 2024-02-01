const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const translate = require("@iamtraction/google-translate");
const ISO6391 = require("iso-639-1");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("translate")
    .setDescription("Translates text to English")
    .addStringOption((option) =>
      option.setName("input").setDescription("text required").setRequired(true)
    ),
  async execute(interaction, client) {
    const ERRembed = new EmbedBuilder()
      .setColor("#FF0000")
      .setTitle(`Unable to translate!`);

    const foreignLanguage = interaction.options.getString("input");

    translate(foreignLanguage, { to: `en` })
      .then((res) => {
        const getIsoName = res.from.language.iso;
        const isoName = ISO6391.getName(getIsoName);

        const translatedEmbed = new EmbedBuilder()
          .setColor("#00FFFF")
          .setDescription(`${isoName} -> English`)
          .setFields(
            { name: `Original Message :`, value: `${foreignLanguage}` },
            { name: `Translation :`, value: `${res.text}` }
          )
          .setFooter({
            text: "Google Translate",
            iconURL:
              "https://www.transparentpng.com/thumb/google-logo/google-logo-png-icon-free-download-SUF63j.png",
          });
        interaction.reply({ embeds: [translatedEmbed], ephemeral: true });
      })
      .catch((err) => {
        interaction.reply({ embeds: [ERRembed], ephemeral: true });
        console.error(err);
      });
  },
};
