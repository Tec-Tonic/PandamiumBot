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
  
  const closed = new EmbedBuilder().setDescription('Staff applications are currently **CLOSED**').setColor('#Ff1d8e')

  module.exports.closed = closed