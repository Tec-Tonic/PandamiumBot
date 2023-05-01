const {
    Client,
    ContextMenuCommandInteraction,
    ApplicationCommandType,
    SlashCommandBuilder,
    EmbedBuilder,
    ContextMenuCommandBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
  } = require("discord.js");
  
  module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {
      
        const translate = require("@iamtraction/google-translate");
        const ISO6391 = require("iso-639-1");
        let toLang = ''
        let toLangFull = ''
      
        if (interaction.customId === 'LangSelector') {
          let choices = ""
          await interaction.values.forEach(async value => {
            choices += `${value}`
          })
      
          if (choices === 'english-select') {
            toLang = 'en'
            toLangFull = 'English'
          }
          else if (choices === 'chinese-select') {
            toLang = 'zh-cn'
            toLangFull = 'Mandarin'
          }
          else if (choices === 'hindi-select') {
            toLang = 'hi'
            toLangFull = 'Hindi'
          }
          else if (choices === 'spanish-select') {
            toLang = 'es'
            toLangFull = 'Spanish'
          }
          else if (choices === 'french-select') {
            toLang = 'fr'
            toLangFull = 'French'
          }
          else if (choices === 'arabic-select') {
            toLang = 'ar'
            toLangFull = 'Arabic'
          }
          else if (choices === 'russian-select') {
            toLang = 'ru'
            toLangFull = 'Russian'
          }
          else if (choices === 'portuguese-select') {
            toLang = 'pt'
            toLangFull = 'Portuguese'
          }
          else if (choices === 'indonesian-select') {
            toLang = 'id'
            toLangFull = 'Indonesian'
          }
          else if (choices === 'urdu-select') {
            toLang = 'ur'
            toLangFull = 'Urdu'
          }
          else if (choices === 'japanese-select') {
            toLang = 'ja'
            toLangFull = 'Japanese'
          }
          else if (choices === 'german-select') {
            toLang = 'de'
            toLangFull = 'German'
          }
      
      
          const ERRembed = new EmbedBuilder().setColor("#FF0000").setTitle(`Unable to translate!`);
      
          const translateFile = require('../../commands/util/translator_app');
      
          const msgID = await translateFile.msgid
          const channelID = await translateFile.chanid
          const foreignLanguage = await client.channels.cache.get(channelID).messages.fetch(msgID);
      
          translate(foreignLanguage, { to: `${toLang}` })
            .then((res) => {
              const getIsoName = res.from.language.iso;
              const isoName = ISO6391.getName(getIsoName);
      
              const translatedEmbed = new EmbedBuilder().setColor("#00FFFF").setDescription(`${isoName} -> ${toLangFull}`).setFields({ name: `Original Message :`, value: `${foreignLanguage}` }, { name: `Translation :`, value: `${res.text}` }).setFooter({ text: "Google Translate", iconURL: "https://www.transparentpng.com/thumb/google-logo/google-logo-png-icon-free-download-SUF63j.png", });
              interaction.reply({ embeds: [translatedEmbed], ephemeral: true });
            })
            .catch((err) => {
              interaction.reply({ embeds: [ERRembed], ephemeral: true });
              console.error(err);
            });
      
        }

    },
  };
  