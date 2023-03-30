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

const emb = new EmbedBuilder()
  .setDescription(`
    If you would like to support Pandamium and help improve the hardware the server is running on, consider donating. In return, you'll receive the **Donator **rank as a thank you, both in Minecraft and on Discord. \n\n\n**DONATOR PERKS**\n\n**Snapshot Server:**\n**↳** 10 Homes\n**↳** Access to lots of particle effects\n**↳** Donator only <#1089327016379162644> \n\n**Release Server:**\n**↳** 25 Homes & Larger claim limits\n**↳** Join even if the server is full\n**↳** Donator only <#1089327016379162644> \n\n\n**HOW TO GET DONATOR RANK**\n:white_small_square: Make a donation via [**Patreon**](https://www.patreon.com/pandamium).\n:white_small_square: Open a ticket in <#1089326603672223794> and tell us your Minecraft and Patreon names.\n:white_small_square: [**Link**](https://support.patreon.com/hc/en-us/articles/212052266-Get-my-Discord-role) your Patreon and Discord accounts.\n\n\nDonations through Patreon are subscriptions. Once you donate, you'll be charged every month until you cancel. Donator Rank is given for 1 month per $5 you donate! If you change your Minecraft or Patreon name, you need to tell us that, otherwise we won't know where the donation should go.`)
  .setColor("#D122F8");

module.exports.emb = emb;
