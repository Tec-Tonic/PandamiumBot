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

module.exports = class TestCommand extends BaseSlashCommand {
  constructor() {
    super("Translate");
  }

  async run(client, interaction) {
    const LanguageSelect = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("LangSelector")
        .setPlaceholder("Select Language")
        .addOptions(
          {
            label: "English",
            description: "Will be translated to English",
            value: "english-select",
          },
          {
            label: "Mandarin Chinese",
            description: "这会将消息翻译成普通话",
            value: "chinese-select",
          },
          {
            label: "Hindi",
            description: "यह संदेश का हिंदी में अनुवाद करेगा",
            value: "hindi-select",
          },
          {
            label: "Spanish",
            description: "Esto traducirá el mensaje al español.",
            value: "spanish-select",
          },
          {
            label: "French",
            description: "Cela traduira le message en français",
            value: "french-select",
          },
          {
            label: "Arabic",
            description: "سيؤدي هذا إلى ترجمة الرسالة إلى اللغة العربية",
            value: "arabic-select",
          },
          {
            label: "Russian",
            description: "Это переведет сообщение на русский язык.",
            value: "russian-select",
          },
          {
            label: "Portuguese",
            description: "Isso traduzirá a mensagem para o português",
            value: "portuguese-select",
          },
          {
            label: "Indonesian",
            description: "Ini akan menerjemahkan pesan ke bahasa Indonesia",
            value: "indonesian-select",
          },
          {
            label: "Urdu",
            description: "اس سے پیغام کا اردو میں ترجمہ ہو جائے گا۔",
            value: "urdu-select",
          },
          {
            label: "Japanese",
            description: "これでメッセージが日本語に翻訳されます",
            value: "japanese-select",
          },
          {
            label: "German",
            description: "Dadurch wird die Nachricht ins Deutsche übersetzt",
            value: "german-select",
          }
        )
    );
    
    
    const msgID = await interaction.targetId;
    module.exports.msgid = msgID

    const channelID = await interaction.channelId;
    module.exports.chanid = channelID
    
    interaction.reply({components : [LanguageSelect], ephemeral: true})
    
  }
  getSlashCommandJSON() {
    return new ContextMenuCommandBuilder()
      .setName(this.name)
      .setType(ApplicationCommandType.Message)
      .toJSON();
  }
};
