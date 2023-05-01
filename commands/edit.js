// const BaseSlashCommand = require("../utils/BaseSlashCommands");
// const {
//   SlashCommandBuilder,
//   ButtonStyle,
//   ActionRowBuilder,
//   ButtonBuilder,
//   EmbedBuilder,
//   PermissionFlagsBits,
//   AttachmentBuilder,
// } = require("discord.js");

// const util = require("minecraft-server-util");

// module.exports = class faqSlashCommand extends BaseSlashCommand {
//   constructor() {
//     super("edit");
//   }

//   async run(client, interaction) {
//     if (
//       interaction.user.id === "546277533138550786" || interaction.user.id === "255766501464735744"
//     ) {
//       //code here
       
//       const translateFileRank = require("../embeds/rank-embed");
        
//         const embed = translateFileRank.embed;
//         const embed2 = translateFileRank.embed2;
//         const embed3 = translateFileRank.embed3;
//         const embed4 = translateFileRank.embed4;
//         const embed5 = translateFileRank.embed5;
//         const embed6 = translateFileRank.embed6;
//         const embed7 = translateFileRank.embed7;
//         const embed8 = translateFileRank.embed8;
        
//         const embed9 = translateFileRank.embed9;
//         const embed10 = translateFileRank.embed10;
//         const embed11 = translateFileRank.embed11;
//         const embed12 = translateFileRank.embed12;
//         const embed13 = translateFileRank.embed13;


    

//         const noUpdates = new EmbedBuilder().setDescription('There is nothing to update!').setColor('#189cab')
//         //interaction.reply({embeds: [noUpdates], ephemeral: true})
        
//         const msgID = '1091447597224448081' 
//         const channelID = '506987588742152202' 

//         const channel = client.channels.cache.get(channelID) //commands
//         channel.messages.fetch(msgID).then(msg => msg.edit({embeds: [
//             embed,
//             embed2,
//             embed3,
//             embed4,
//             embed5,
//             embed6,
//             embed7,
//             embed8,
//         ]}))  
        
//     } else {
//       return interaction.reply(
//         "You do not have the permissions to use this command."
//       );
//     }
//   }
//   getSlashCommandJSON() {
//     return new SlashCommandBuilder()
//       .setName(this.name)
//       .setDescription("Edits message embeds!")
//       .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
//       .toJSON();
//   }
// };
