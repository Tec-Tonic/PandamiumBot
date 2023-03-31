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
  
  const rr = new EmbedBuilder()
.setDescription(`
React below to select which pings you would like to receive:\n\n:mega: **⭢ Snapshot Announcement Pings**\n<:snapshotchangelogping:1089615059090677760>  **⭢ Snapshot Changelog Pings**\n<:releaseannouncementping:1089613992491753573>  **⭢ Release Announcement Pings**\n<:releasechangelogping:1089615057324888235>  **⭢ Release Changelog Pings**\n<:eyeofender:1089616416929489047>  **⭢ End Reset Pings**\n:tada: **⭢ Event Pings**
`).setColor('#F53068')

module.exports.rr = rr