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
    data: new ContextMenuCommandBuilder()
    .setName('Translate')
    .setType(ApplicationCommandType.Message),
    async execute(interaction, client) {
        
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
          
          return interaction.reply({components : [LanguageSelect], ephemeral: true})
        //   .then(delMsg => {
        //                  setTimeout(() => delMsg.delete(), 20000)
        //                 })
          
    }
}