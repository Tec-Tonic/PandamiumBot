// Update required, to lazy 

const {
    SlashCommandBuilder,
    ButtonStyle,
    ActionRowBuilder,
    ButtonBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
    AttachmentBuilder,
  } = require("discord.js");
  
  const util = require("minecraft-server-util");// Deprecated 
  const intComplete = new EmbedBuilder().setDescription(`Information embed sent.`).setColor('#189cab')
  const intRestricted = new EmbedBuilder().setDescription(`This command is restricted!`).setColor('#FF0000')
  
  module.exports = {
    data: new SlashCommandBuilder()
    .setName('channel')
    .setDescription('sends information embeds').setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addStringOption((option) =>
      option
        .setName("channel_name")
        .setDescription("Channel to sent message to")
        .setRequired(true)
        .addChoices(
          { name: "Commands", value: "commands" },
          { name: "Custom Recipes", value: "custom" },
          { name: "Donations", value: "donate" },
          { name: "FAQ", value: "faq" },
          { name: "More Mob Heads", value: "mmh" },
          { name: "Ranks", value: "ranks" },
          { name: "Reaction Roles", value: "rr" },
          { name: "Rules", value: "rule" },
          { name: "Staff Applications [Message]", value: "sa" },
          { name: "Staff Applications [Open]", value: "open-sa" },
          { name: "Staff Applications [Closed]", value: "closed-sa" },
          { name: "Town Applications", value: "ta" },
          { name: "Vote", value: "vote" },
          { name: "Welcome", value: "welcome" }
        )
    ),
    async execute(interaction, client) {
        const update = interaction.options.getString("channel_name");
        if (
          interaction.user.id === "546277533138550786" || interaction.user.id === "255766501464735744"
        ) {
          if (update === "commands") {
            const translateFileCommand = require("../../components/embeds/channels/command-embed");
            const snap = translateFileCommand.snap;
            const release = translateFileCommand.release;
            const disc = translateFileCommand.disc;
    
            await interaction.reply({embeds: [intComplete],ephemeral: true,})
            await interaction.channel.send(
              "https://cdn.discordapp.com/attachments/1089274505295314964/1089921681872650362/snapcommands.png"
            );
            await interaction.channel.send({ embeds: [snap] });
            await interaction.channel.send(
              "https://cdn.discordapp.com/attachments/1089274505295314964/1089921688315105421/relcommands.png"
            );
            await interaction.channel.send({ embeds: [release] });
            await interaction.channel.send(
              "https://cdn.discordapp.com/attachments/1089274505295314964/1089921693516054598/disccommands.png"
            );
            await interaction.channel.send({ embeds: [disc] });
          }
    
          if (update === "custom") {
            const image = new AttachmentBuilder(
              "https://cdn.discordapp.com/attachments/1087413427972083752/1089651932727083161/final.gif"
            );
            const image1 = new EmbedBuilder()
              .setDescription(
                "Pandamium custom recipes are designed to help improve the player experience on our server. Our recipes are crafted identically as to their vanilla counterparts.\n\nWe recommend that you view our custom recipes on the [**Pandamium Website**](https://www.pandamium.com/info/custom-recipes) for a better viewing experience."
              )
              .setColor("#0159FF");
    
              await interaction.reply({embeds: [intComplete],ephemeral: true,})
            await interaction.channel.send(
              "https://cdn.discordapp.com/attachments/1089274546680516700/1089921719311028224/customrecipes.png"
            );
            await interaction.channel.send({ embeds: [image1] });
            await interaction.channel.send({ files: [image] });
          }
    
          if (update === "donate") {
            const translateFileDonator = require("../../components/embeds/channels/donator-embed");
            const emb = translateFileDonator.emb;
    
            await interaction.reply({embeds: [intComplete],ephemeral: true,})
            await interaction.channel.send(
              "https://cdn.discordapp.com/attachments/1089274399200391178/1089922475057483877/image.png"
            );
            await interaction.channel.send({ embeds: [emb] });
          }
    
          if (update === "faq") {
            const translateFileFAQ = require("../../components/embeds/channels/faq-embed");
            const f1 = translateFileFAQ.f1;
            const f2 = translateFileFAQ.f2;
            const f3 = translateFileFAQ.f3;
            const f4 = translateFileFAQ.f4;
            const f5 = translateFileFAQ.f5;
            const f6 = translateFileFAQ.f6;
            const f7 = translateFileFAQ.f7;
            const f8 = translateFileFAQ.f8;
    
            await interaction.reply({embeds: [intComplete],ephemeral: true,})
            await interaction.channel.send(
              "https://cdn.discordapp.com/attachments/1089274212662923386/1089921572283895909/faq.png"
            );
            await interaction.channel.send({
              embeds: [f1, f3, f2, f4, f5, f6, f7, f8],
            });
          }
    
          if (update === "ranks") {
            const translateFileRank = require("../../components/embeds/channels/rank-embed");
            const embed = translateFileRank.embed;
            const embed2 = translateFileRank.embed2;
            const embed3 = translateFileRank.embed3;
            const embed4 = translateFileRank.embed4;
            const embed5 = translateFileRank.embed5;
            const embed6 = translateFileRank.embed6;
            const embed7 = translateFileRank.embed7;
            const embed8 = translateFileRank.embed8;
            const embed9 = translateFileRank.embed9;
            const embed10 = translateFileRank.embed10;
            const embed11 = translateFileRank.embed11;
            const embed12 = translateFileRank.embed12;
            const embed13 = translateFileRank.embed13;
    
            await interaction.reply({embeds: [intComplete],ephemeral: true,})
            await interaction.channel.send(
              "https://media.discordapp.net/attachments/1089274345702039673/1091085776932053052/image.png?width=1440&height=298"
            );
            await interaction.channel.send({
              embeds: [
                embed,
                embed2,
                embed3,
                embed4,
                embed5,
                embed6,
                embed7,
                embed8,
              ],
            });
            await interaction.channel.send(
              "https://cdn.discordapp.com/attachments/1089274345702039673/1089921625807409292/staffranks.png"
            );
            await interaction.channel.send({
              embeds: [embed9, embed10, embed11, embed12, embed13],
            });
          }
    
          if (update === "rr") {
            const translateFileRR = require("../../components/embeds/channels/reaction-role-embed");
            const rr = translateFileRR.rr;
    
            await interaction.reply({embeds: [intComplete],ephemeral: true,})
            await interaction.channel.send(
              "https://cdn.discordapp.com/attachments/1089274296020500630/1089921589249839115/reactionroles.png"
            );
            await interaction.channel.send({ embeds: [rr] });
          }
    
          if (update === "rule") {
            const translateFileRule = require("../../components/embeds/channels/rule-embed");
            const embed = translateFileRule.embed;
            const embed1 = translateFileRule.embed1;
            const embed2 = translateFileRule.embed2;
            const embed3 = translateFileRule.embed3;
            const embed4 = translateFileRule.embed4;
            const embed5 = translateFileRule.embed5;
            const embed6 = translateFileRule.embed6;
            const embed7 = translateFileRule.embed7;
            const embed8 = translateFileRule.embed8;
            const embed9 = translateFileRule.embed9;
            const embed10 = translateFileRule.embed10;
            const embed11 = translateFileRule.embed11;
            const embed12 = translateFileRule.embed12;
            const embed13 = translateFileRule.embed13;
            const embed14 = translateFileRule.embed14;
            const embed15 = translateFileRule.embed15;
    
            await interaction.reply({embeds: [intComplete],ephemeral: true,})
            await interaction.channel.send(
              "https://cdn.discordapp.com/attachments/1089274040839057489/1089921506630438933/rules.png"
            );
            await interaction.channel.send({
              embeds: [
                embed,
                embed1,
                embed2,
                embed3,
                embed4,
                embed5,
                embed6,
                embed7,
                embed8,
                embed9,
              ],
            });
            await interaction.channel.send({
              embeds: [embed10, embed11, embed12, embed13, embed14, embed15],
            });
          }
    
          if (update === "sa") {
            const translateFileStaffMsg = require("../../components/embeds/channels/staff-msg-embed");
            const staff = translateFileStaffMsg.staff;
    
            await interaction.reply({embeds: [intComplete],ephemeral: true,})
            await interaction.channel.send(
              "https://cdn.discordapp.com/attachments/1089274599553908756/1090012977702391948/image.png"
            );
            await interaction.channel.send({ embeds: [staff] });
          }
    
          if (update === "open-sa") {
            const translateFileStaffop = require("../../components/embeds/channels/staff-open-embed");
            const open = translateFileStaffop.open;
    
            await interaction.reply({embeds: [intComplete],ephemeral: true,})
            await interaction.channel.send({ embeds: [open] });
          }
    
          if (update === "closed-sa") {
            const translateFileStaffcl = require("../../components/embeds/channels/staff-closed-embed");
            const closed = translateFileStaffcl.closed;
    
            await interaction.reply({embeds: [intComplete],ephemeral: true,})
            await interaction.channel.send({ embeds: [closed] });
          }
    
          if (update === "vote") {
            const translateFileVote = require("../../components/embeds/channels/vote-embed");
            const emb = translateFileVote.emb;
    
            await interaction.reply({embeds: [intComplete],ephemeral: true,})
            await interaction.channel.send(
              "https://cdn.discordapp.com/attachments/1089274151304429578/1089921551333335141/voting.png"
            );
            await interaction.channel.send({ embeds: [emb] });
          }
    
          if (update === "welcome") {
            const translateFilewelcome = require("../../components/embeds/channels/welcome-embed");
            const em1 = translateFilewelcome.em1;
            //const verify = translateFilewelcome.verify;
    
            await interaction.reply({embeds: [intComplete],ephemeral: true,})
            await interaction.channel.send(
              "https://cdn.discordapp.com/attachments/1079529798000447548/1089581593418530857/image.png"
            );
            await interaction.channel.send({ embeds: [em1]/*, components: [verify] */});
          }
    
          if (update === "mmh") {
            const translateFileMMH = require("../../components/embeds/channels/more-mob-heads-embed");
            const mmh1 = translateFileMMH.mmh1;
    
            await interaction.reply({embeds: [intComplete],ephemeral: true,})
            await interaction.channel.send(
              "https://cdn.discordapp.com/attachments/1089274638204403762/1089921740651630622/mobheads.png"
            );
            await interaction.channel.send({ embeds: [mmh1] });
          }
    
          if (update === "ta") {
            const translateFileTownApps = require("../../components/embeds/channels/town-apps-embed");
            const town = translateFileTownApps.town;
    
            await interaction.reply({embeds: [intComplete],ephemeral: true,})
            await interaction.channel.send(
              "https://cdn.discordapp.com/attachments/1089274446000423075/1090019998845653083/image.png"
            );
            await interaction.channel.send({ embeds: [town] });
          }
        } else {
          return interaction.reply({embeds: [intRestricted],ephemeral: true,})
        }
    }
}