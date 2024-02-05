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
  If you would like to to support Pandamium monetarily, consider becoming a member on our Patreon page. Doing so will help us maintain and improve the hardware that the servers run on. In return, you'll receive the **Supporter** rank, and all the perks listed below, as a thank you. \n\n\n**SUPPORTER PERKS**\n\n**Snapshot Server:**\n**↳** 25 Homes\n**↳** Access to lots of particle effects\n**↳** Supporter-only <#602084896709541898> \n\n**Release Server:**\n**↳** 25 Homes & Larger claim limits\n**↳** Join even if the server is full\n**↳** Supporter-only <#602084896709541898> \n\n\n**HOW TO GET THE SUPPORTER RANK**\n:white_small_square: Subscribe to our [**Patreon**](https://www.patreon.com/pandamium).\n:white_small_square: Open a ticket in <#750352670702698657> and follow the directions.\n:white_small_square: [**Link**](https://support.patreon.com/hc/en-us/articles/212052266-Get-my-Discord-role) your Patreon and Discord accounts.\n\n\nBecoming a member of our Patreon page is a subscription so, once you join, you'll be charged every month until you cancel it. You will get the Supporter rank and its perks for 1 month per $5 USD you pay (for example, $15 equates to 3 months of perks). If you change your Minecraft or Patreon name, you will need to inform us, otherwise we won't know where the payment should be attributed.`)
  .setColor("#D122F8");

module.exports.emb = emb;
