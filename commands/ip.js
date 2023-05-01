// const BaseSlashCommand = require("../utils/BaseSlashCommands");
// const {
//   SlashCommandBuilder,
//   ButtonStyle,
//   ActionRowBuilder,
//   ButtonBuilder,
//   EmbedBuilder,
// } = require("discord.js");
// const util = require("minecraft-server-util");

// module.exports = class IpSlashCommand extends BaseSlashCommand {
//   constructor() {
//     super("ip");
//   }

//   run(client, interaction) {
//     util.status("pandamium.eu").then((ResponseRelease) => {
//       util.status("snapshot.pandamium.eu").then((ResponseSnapshot) => {
//         const releaseVersionIP = ResponseRelease.version.name;
//         const snapVersionIP = ResponseSnapshot.version.name;

//         const ipEmbed = new EmbedBuilder()
//           .setColor("#008000")
//           .setTitle("Pandamium Server IP's")
//           .addFields(
//             {
//               name: `Release IP: `,
//               value: `release.pandamium.eu\n **Version:** ${releaseVersionIP}\n\n`,
//             },
//             {
//               name: `Snapshot IP: `,
//               value: `snapshot.pandamium.eu\n **Version:** ${snapVersionIP} \n\nⓘ | Buttons below will take you to [pastebin](https:pastebin.com/)`,
//             }
//           )

//           const CopyPasteIP = new ActionRowBuilder().addComponents(
//                   new ButtonBuilder()
//                     .setLabel("Release IP")
//                     .setStyle(ButtonStyle.Link)
//                     .setURL("https:pastebin.com/raw/cfi77L2e"),
//                   new ButtonBuilder()
//                     .setLabel("Snapshot IP")
//                     .setStyle(ButtonStyle.Link)
//                     .setURL("https:pastebin.com/raw/LyNSkBrS"),
//           )

//         return interaction.reply({ embeds: [ipEmbed],components: [CopyPasteIP],ephemeral: true });
//       });
//     });
//   }

//   getSlashCommandJSON() {
//     return new SlashCommandBuilder()
//       .setName(this.name)
//       .setDescription("Replies with the server(s) IP")
//       .toJSON();
//   }
// };

 