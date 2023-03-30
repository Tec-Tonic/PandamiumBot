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
React below to select which pings you would like to receive:

:mega: **⭢ Snapshot Announcement Pings**
<:snapshotchangelogping:1089615059090677760>  **⭢ Snapshot Changelog Pings**
<:releaseannouncementping:1089613992491753573>  **⭢ Release Announcement Pings**
<:snapshotchangelogping:1089615059090677760> **⭢ Release Changelog Pings**
<:eyeofender:1089616416929489047>  **⭢ End Reset Pings**
:tada: **⭢ Event Pings**
`).setColor('#F53068')

module.exports.rr = rr