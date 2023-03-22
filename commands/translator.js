const {
    Client,
    ContextMenuCommandInteraction,
    ApplicationCommandType,
  } = require("discord.js");
  const BaseSlashCommand = require("../utils/BaseSlashCommands");
  const {
    SlashCommandBuilder,
    EmbedBuilder,
    ContextMenuCommandBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
  } = require("discord.js");
  const translate = require("@iamtraction/google-translate");
  const ISO6391 = require("iso-639-1");
  const sendToConsole = "1037707228897095811"; //jarvisconsole
  
  module.exports = class TranslateCommand extends BaseSlashCommand {
    constructor() {
      super("translate");
    }
  
    async run(client, interaction) {
      
    const ERRembed = new EmbedBuilder().setColor("#FF0000").setTitle(`Unable to translate!`);

    const foreignLanguage = await client.channels.cache.get(interaction.channel.id).messages.fetch(interaction.id);

    translate(foreignLanguage, { to: `en` })
      .then((res) => {
        const getIsoName = res.from.language.iso;
        const isoName = ISO6391.getName(getIsoName);

        const translatedEmbed = new EmbedBuilder().setColor("#00FFFF").setDescription(`${isoName} -> English`).setFields({ name: `Original Message :`, value: `${foreignLanguage}` }, { name: `Translation :`, value: `${res.text}` }).setFooter({ text: "Google Translate", iconURL: "https://www.transparentpng.com/thumb/google-logo/google-logo-png-icon-free-download-SUF63j.png", });
        interaction.reply({ embeds: [translatedEmbed], ephemeral: true });
      })
      .catch((err) => {
        interaction.reply({ embeds: [ERRembed], ephemeral: true });
        console.error(err);
      });

  }
      
      
      
  getSlashCommandJSON() {
    return new SlashCommandBuilder()
        .setName(this.name)
        .setDescription("Translates text to English")
        .addStringOption(option =>
            option.setName('input')
                .setDescription('text required')
                .setRequired(true))
        .toJSON();
}
};
  