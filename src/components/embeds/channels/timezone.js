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
  
  const tz = new EmbedBuilder()
.setDescription(`
## Winter timezones:
UTC -12:
UTC -11:
UTC -10:
UTC -9:
- <@202863749315559424>
UTC -8:
- <@405540902174720001>
- <@692153466428063825>
UTC -7:
UTC -6:
UTC -5:
- <@423288503422418946>
- <@565544573154230313>
- <@497214837374320670>
- <@915455249899221033>
UTC -4:
UTC -3:
UTC -2:
UTC -1:
UTC:
- <@255766501464735744>
- <@336123112187887619>
- <@546277533138550786>
- <@451802211757064192>
- <@918213403376492574>
UTC +1:
- <@210716756778418187>
- <@203577381385011200>
- <@288374565170708480>
- <@570952544709378049>
- <@511155292461989889>
- <@351039332238491648>
UTC +2:
UTC +3:
UTC +4:
UTC +5:
UTC +6:
UTC +7:
UTC +8:
UTC +9:
UTC +10:
UTC +11:
UTC +12:
UTC +13:
UTC +14:

Post your timezone here and it'll be added to the list and your message will be deleted..
`).setColor('#FF5D00')

module.exports.tz = tz