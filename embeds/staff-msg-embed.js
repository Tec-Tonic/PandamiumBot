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
  
  const staff = new EmbedBuilder().setDescription(`
  If you want to apply to become a Helper, read the following carefully.\n\n**WHAT WE LOOK FOR**\n**↳** Maturity and good character\n**↳** Activity on the server\n**↳** Commitment and effort to the server\n**↳** Discord and In-game Interactions\n\n\n**RECOMMENDATIONS FOR HELPER**\n**↳** 16+ years of age\n**↳** 50+ votes\n**↳** 50+ hours of playtime\n\n\n**HOW TO APPLY**\n:white_small_square: Open an Applications and Appeals ticket in <#750352670702698657>. \n:white_small_square: Post your application using the format provided below.\n\n\n**HELPFUL TIPS**\n**↳** Write a long and detailed application.\n**↳** Include as much relevant information as possible.\n**↳** Include any punishments you've received on the server and why you think you're still suitable to be on our staff team.\n\n\n**HOW DECISIONS ARE MADE**\nWe use a point based system to make decisions about staff applications. Every staff member can give you plus or minus points (higher ranks have more influence). There are also some additional points which are calculated by set formulas and depend on things like your playtime. A final decision will be made after we've reviewed all of the applications, which may take quite a while. Your ticket being closed just means we've seen your application, not that we've made a decision.
     `).setColor('#65FE54')

                module.exports.staff = staff