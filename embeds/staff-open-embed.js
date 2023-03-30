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
  
  const open = new EmbedBuilder().setDescription('Staff applications are currently **OPEN**').setColor('#Ff1d8e')

  module.exports.open = open