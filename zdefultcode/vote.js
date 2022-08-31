// const BaseSlashCommand = require("../utils/BaseSlashCommands");
// const {
//   SlashCommandBuilder,
//   ButtonStyle,
//   ActionRowBuilder,
//   ButtonBuilder,
//   EmbedBuilder,
// } = require("discord.js");

// module.exports = class VoteSlashCommand extends BaseSlashCommand {
//   constructor() {
//     super("vote");
//   }

//   run(client, interaction) {
   

//     const voteOffline = new EmbedBuilder().setTitle('Server Vote Links').setDescription(`This command is being worked on, [click me](https://discordapp.com/channels/504627012921589763/505028299232247808) to go to the links`)

//     // const voteEmbed = new EmbedBuilder()
//     //   .setTitle("Snapshot Vote Site Links")
//     //   .setColor("#00AC18")
//     //   .setFields(
//     //     {
//     //       name: `Snapshot link 1 :`,
//     //       value: `Minecraft-server-list`,
//     //       inline: true,
//     //     },
//     //     {
//     //       name: `Snapshot link 2 :`,
//     //       value: `Minecraftservers.org`,
//     //       inline: true,
//     //     },
//     //     { name: `Snapshot link 3 :`, value: `Minecraft-mp.com`, inline: true },
//     //     { name: `Snapshot link 4 :`, value: `Topg.org`, inline: true }
//     //   );

//     // const vote = new ActionRowBuilder().addComponents(
//     //   new ButtonBuilder()
//     //     .setLabel("Link 1")
//     //     .setStyle(ButtonStyle.Link)
//     //     .setURL("https://minecraft-server-list.com/server/445164/vote/"),
//     //   new ButtonBuilder()
//     //     .setLabel("Link 2")
//     //     .setStyle(ButtonStyle.Link)
//     //     .setURL("https://minecraftservers.org/vote/562059"),

//     //   new ButtonBuilder()
//     //     .setLabel("Link 3")
//     //     .setStyle(ButtonStyle.Link)
//     //     .setURL("https://minecraft-mp.com/server/232030/vote/"),

//     //   new ButtonBuilder()
//     //     .setLabel("Link 4")
//     //     .setStyle(ButtonStyle.Link)
//     //     .setURL("https://topg.org/Minecraft/in-519676")
//     // );
//     // const releaseVote = new ActionRowBuilder().addComponents(
//     //   new ButtonBuilder()
//     //     .setCustomId("RV-links")
//     //     .setLabel("Release Vote Links")
//     //     .setStyle(ButtonStyle.Primary)
//     // );

//     // return interaction.reply({
//     //   embeds: [voteEmbed],
//     //   components: [vote, releaseVote],
//     //   ephemeral: true,
//     // });

//     return interaction.reply({
//       embeds: [voteOffline]
//     })
//   }

//   getSlashCommandJSON() {
//     return new SlashCommandBuilder()
//       .setName(this.name)
//       .setDescription("Displays Snapshot Vote links!")
//       .toJSON();
//   }
// };
