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
  
  const open = new EmbedBuilder().setDescription(`
Staff applications are currently **OPEN**\n\n\n**-=== Staff Application Form ===-**\n\n\n**GENERAL QUESTIONS **\n\nMinecraft Username:\nAge:\nCurrent Votes:\nCurrent Playtime:\nTimezone:\nServer you usually play on (Snapshot/Release):\nWhen will you be available: \n\n\n**MAIN QUESTIONS**\n\n▫️Why should you be chosen as a staff member?\n▫️Do you have any relevant staff experience? If so, please explain.\n▫️What is an example of a time you acted in a helper-like manner?\n▫️If you were the owner, what changes would you make to Pandamium?\n▫️ Anything else you want to add?
`).setColor('#Ff1d8e')

  module.exports.open = open