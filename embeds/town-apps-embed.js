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
  
  const town = new EmbedBuilder().setDescription(`
If you want to apply for a town Discord channel, read the following carefully.

**TOWN REQUIREMENTS**
**↳** The town must have at least six members to be considered for acceptance. 
**↳** You must provide screenshots of the town/area where it’s planned to be built.

**HOW TO APPLY**
:white_small_square:Open a ticket in <#1089326603672223794> and follow the directions.

Please use the following template when applying:

==========
Server (Snapshot/Release):
Town Name:
Member Count: 
Members: 
Description:
==========

**Don't forget to provide screenshots!**
`).setColor('#EA5374')

module.exports.town = town