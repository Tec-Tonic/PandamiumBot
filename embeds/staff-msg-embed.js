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
        If you want to apply to become a Helper, read the following carefully.\n\n**RECOMMENDATIONS FOR HELPER**\n**↳** 16+ years of age\n**↳** 50+ votes\n**↳** 50+ hours of playtime\n\n\n**HOW TO APPLY**\n:white_small_square: Open a ticket in <#750352670702698657> and follow the directions. \n\nWhen you submit your application, it will be transferred to a private staff area for review and your ticket will be closed. Applications that have been transferred are unable to be edited.\n\n\n**HELPFUL TIPS**\n**↳** Write a long and detailed application.\n**↳** Include as much relevant information as possible (e.g. past staff experience, when/how long you can be online).\n**↳** Include any punishments you've received on the server and why you think you're still suitable to be on our staff team.\n\n\n**HOW DECISIONS ARE MADE**\nWe use a point based system to make decisions about staff applications. Every staff member can give you plus or minus points (higher ranks have more influence). There are also some additional points which are calculated by set formulas and depend on things like your playtime. A final decision will be made after we've reviewed all of the applications, which may take quite a while. Your ticket being closed just means we've seen your application, not that we've made a decision.
                `).setColor('#65FE54')

                module.exports.staff = staff