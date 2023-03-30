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
:snapshotchangelogping: **⭢ Snapshot Changelog Pings**
:releaseannouncementping: **⭢ Release Announcement Pings**
:releasechangelogping: **⭢ Release Changelog Pings**
:eyeofender: **⭢ End Reset Pings**
:tada: **⭢ Event Pings**
`).setColor('#F53068')

module.exports.rr = rr