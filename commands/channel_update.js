const BaseSlashCommand = require("../utils/BaseSlashCommands");
const {
  SlashCommandBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

const util = require("minecraft-server-util");


module.exports = class faqSlashCommand extends BaseSlashCommand {
  constructor() {
    super("channel");
  }

  async run(client, interaction) {

    const update = interaction.options.getString("channel_name");
    if (interaction.user.id === '546277533138550786') {

        if (update === "rules") {
            const embed = new EmbedBuilder().setTitle(`1 - PUNISHMENTS`)
            .setDescription(`Punishments can be made as staff members see fit, appropriate to the severity of the violation.`).setColor('#D02FB7')
    
            const embed1 = new EmbedBuilder().setTitle(`2 - HACKING/CHEATING`)
            .setDescription(`All kinds of hacking, cheating and other ways of gaining an unfair advantage over other players are forbidden.`).setColor('#D02FB7')
    
            const embed2 = new EmbedBuilder().setTitle(`3 - GRIEFING/STEALING`)
            .setDescription(`All forms of griefing and stealing are forbidden. This includes but is not limited to salvaging items from seemingly abandoned bases.`).setColor('#D02FB7')
    
            const embed3 = new EmbedBuilder().setTitle(`4 - LOST PROGRESS DUE TO CRASHES/GLITCHES/BUGS`)
            .setDescription(`Minecraft is buggy, especially snapshots, so it may occasionally happen that items get lost due to a server crash or because of other glitches. If you play here, you have to live with that.`).setColor('#D02FB7')
    
            const embed4 = new EmbedBuilder().setTitle(`5 - PvP`)
            .setDescription(`Killing other players is allowed, however not repeatedly, especially not again after they explicitly stated that they didn't want to fight. It is allowed to keep items from killed players, however, only if the kill was done without violating any rules.`).setColor('#D02FB7')
    
            const embed5 = new EmbedBuilder().setTitle(`6 - SPAMMING/ADVERTISING`)
            .setDescription(`Spamming and advertising is forbidden. Using colour codes in snapshot-ingame-chat or impersonating other people also counts as spamming. Advertising refers to things that are external to Pandamium (other servers, websites, youtube channels, etc.). Advertising an event you're organizing on the server, or a shop, is allowed, as long as it's done reasonably.`).setColor('#D02FB7')
    
            const embed6 = new EmbedBuilder().setTitle(`7 - CHAT LANGUAGE `)
            .setDescription(`Messages sent in the public chat (ingame or Discord) should be written in English. Messages in public chats are supposed to be public, i.e. understandable for everyone.`).setColor('#D02FB7')
    
            const embed7 = new EmbedBuilder().setTitle(`8 - OFFENDING OTHERS`)
            .setDescription(`It's ok to make friendly jokes, but offenses that are hurtful or in any other way inappropriate are forbidden. This rule applies to Minecraft as well as the Discord server and is not limited to the chat, for example it also includes account names and ingame buildings!`).setColor('#D02FB7')
    
            const embed8 = new EmbedBuilder().setTitle(`9 - CONTROVERSIAL TOPICS`)
            .setDescription(`Arguing about controversial topics unrelated to Pandamium (politics, religion, etc.) should be avoided. These topics aren't completely forbidden, but can easily lead to fights and insults, which is why they should be kept to a minimum.`).setColor('#D02FB7')
    
            const embed9 = new EmbedBuilder().setTitle(`10 - GLITCH USING`)
            .setDescription(`Using any gameplay glitches that result in an unfair advantage or hinder other players' gameplay, especially, but not limited to, dupe glitching and server crashing, is forbidden. Known glitches have to be reported to a staff member.`).setColor('#D02FB7')
    
            const embed10 = new EmbedBuilder().setTitle(`11 - RUINING OTHERS' GAMEPLAY`)
            .setDescription(`Anything that hasn't been mentioned yet and that ruins the fun for other players on the server in any way, or by causing lag, is forbidden. `).setColor('#D02FB7')
    
            const embed11 = new EmbedBuilder().setTitle(`12 - HELPING RULE BREAKERS`)
            .setDescription(`Intentionally helping other players break the rules, even if you don't directly break any rules yourself, is forbidden. This includes but is not limited to providing items needed for an exploit, lying to staff when questioned about other players' offenses or even simply not reporting known offenses of other player.`).setColor('#D02FB7')
    
            const embed12 = new EmbedBuilder().setTitle(`13 - CLAIMING TO BREAK RULES`)
            .setDescription(`If a player claims to have broken the rules, that is enough reason for staff members to assume the player is telling the truth. You will not get unbanned because it was "just a joke".`).setColor('#D02FB7')
    
            const embed13 = new EmbedBuilder().setTitle(`14 - CIRCUMVENTING BANS/PUNISHMENTS`)
            .setDescription(`Using secondary accounts or any other means to circumvent bans or other punishments is not allowed. Doing so will result in at least the punishment that was circumvented. The only exception to this is for appealing as stated in rule 1.`).setColor('#D02FB7')
    
            const embed14 = new EmbedBuilder().setTitle(`15 - AFKING`)
            .setDescription(`The use auto clickers, auto reconnect mods or similar tools to get around the afk kick is NOT allowed. The reasoning for this is that it strains the mob cap, decreases server performance in general, and makes the playtime counter useless.`).setColor('#D02FB7')
    
            const embed15 = new EmbedBuilder()
            .setDescription(`_These rules apply to the Pandamium Minecraft servers and the official Pandamium Discord. They also extend to direct messages if these messages are related to Pandamium._\n\n**The rules may be edited by the Owner (Sundroid) at any time.**`).setColor('#D02FB7')
    
           //await interaction.channel.send(`https://media.discordapp.net/attachments/1062874624066605137/1087150896489697350/image_2.png?width=1440&height=130`)
    
            await interaction.channel.send('https://cdn.discordapp.com/attachments/1042728270879281243/1089230632531533944/server_rules.png')
            await interaction.channel.send({embeds: [embed, embed1, embed2, embed3, embed4, embed5, embed6, embed7, embed8, embed9, ]})
            await interaction.channel.send({embeds: [embed10, embed11, embed12, embed13, embed14, embed15]})
    
        }
        if (update === "vote") {
            const embed1 = new EmbedBuilder()
.setDescription(`**SNAPSHOT SERVER**:
https://minecraft-server-list.com/server/445164/vote/
https://minecraftservers.org/vote/562059
http://topminecraftservers.org/vote/29717
https://minecraft.global/server/172/vote

**RELEASE SERVER**:
https://minecraft-server-list.com/server/432071/vote/
https://minecraftservers.org/vote/559675
http://topminecraftservers.org/vote/29718
https://minecraft.global/server/173/vote 
`).setColor('#0BF759')

   await interaction.channel.send('https://cdn.discordapp.com/attachments/1079532165747982467/1089228783875268638/voting.png')
   await interaction.channel.send('Voting daily is a great way to help Pandamium become more popular! When you vote, you will receive one vote credit per site. These credits can be used in our vote shop to buy useful items. Please note, votes are required in order to rank up. For more information, check out <#1079532021984014396> \n\n**You can get these links by running** \`/trigger vote\` **ingame**.')
   await interaction.channel.send({embeds: [embed1]})
        }
        if (update === "faq") {
            const f1 = new EmbedBuilder()
.setDescription(`
**‣ What's the IP of the server?**
  Release server: release.pandamium.eu
  Snapshot server: snapshot.pandamium.eu
`).setColor('#FFA200')

const f2 = new EmbedBuilder()
.setDescription(`
**‣ When do auto restarts happen?**
  Snapshot server: Every 12 hours - 1:00 and 13:00 (1am/pm GMT)
  Release server: Every 12 hours - 12:00 and 00:00 (12am/pm GMT)
`).setColor('#FFA200')

const f3 = new EmbedBuilder()
.setDescription(`
**‣ What hardware is the server running on?**
  The hardware we're running is basically ideal for a Minecraft server, we have a CPU with great single core performance, more cores and RAM than the server actually needs and a fast NVMe SSD. If the server is lagging, it's because Minecraft is poorly optimized, not because of the server hardware.

:white_small_square:AMD Ryzen 3600 (6C/12T @3.6Ghz)
:white_small_square:64 GB DDR4 ECC RAM, each of the two servers has 16GB allocated.
:white_small_square:2x 500gb NVMe SSDs running in RAID1
:white_small_square:2x 1tb NVMe SSDs running in RAID1 for server backup.
:white_small_square:1 GBit Internet connection
`).setColor('#FFA200')

const f4 = new EmbedBuilder()
.setDescription(`
**‣ Is griefing and stealing allowed?**
  No, it's absolutely not allowed. On the Release server you can create a claim to protect your stuff. Unfortunately this isn't possible on the Snapshot server because we can't use plugins there, so please move far away from spawn and only share the coords with people you trust. 
 
`).setColor('#FFA200')

const f5 = new EmbedBuilder()
.setDescription(`
**‣ How can I get more homes or bigger claims?**
  You can rank up by reaching a certain amount of playtime and votes. For more info, check out <#1089274345702039673> Instead you can also donate if you want, check out \n<#1089274399200391178>.
 
`).setColor('#FFA200')

const f6 = new EmbedBuilder()
.setDescription(`
**‣ How can I join or create a town?**
To join a town, you need to apply in their Discord channel. It is up to the owners of the respective groups to accept/deny your application. To create your own, you need to open a ticket in <#1089274100565950596> and follow the correct template for the town application.
 
`).setColor('#FFA200')

const f7 = new EmbedBuilder()
.setDescription(`
**‣ Is it allowed to use Litematica to make building easier?**
  You are allowed to use the visual features of Litematica. However, Litematica allows you to place blocks in the air or other impossible positions and allows automates building to make if much faster than for normal players. These parts of the mod are **not **allowed.

`).setColor('#FFA200')

const f8 = new EmbedBuilder()
.setDescription(`
**‣ How are chunks reset?**
*Note: This does not refer to world resets but to periodic trimming of the world size!*

  Exploring freely on Pandamium causes lots of chunks to be loaded (e.g. while flying with an elytra) and then never even loaded again. Those chunks take up a lot of space, so we need to trim the world size from time to time. For this we use a tool that only deletes chunks which haven't been loaded at all in at least two weeks and for more than 2 hours in total. World trimming isn't done regularly, we usually do it together with other server maintenance since the server has to be offline for it.

`).setColor('#FFA200')



await interaction.channel.send('https://cdn.discordapp.com/attachments/1079531915155079178/1089235100606156941/FAQ.png')
await interaction.channel.send({embeds: [f1, f2, f3, f4, f5, f6, f7, f8]})
        }
        if (update === "rank") {
            const embed = new EmbedBuilder().setTitle(`GUEST`)
            .setDescription(`
    New playersㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
    
    **Snapshot Perks:**
    **▫️**Homes: 1
    
    **Release Perks:**
    **▫️**Homes: **2**
    **▫️**Claims: **1**
    **▫️**Max Claim Area: **5,000 Blocks**`).setColor('#AAAAAA')
    
            const embed2 = new EmbedBuilder().setTitle(`PLAYER`)
            .setDescription(`
    Requires 5 hours of playtime and 5 votes.
     
    **Snapshot Perks:**
    **▫️**Homes: **2 **ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
            
    **Release Perks: **
    **▫️**Homes: **3**
    **▫️**Claims: **2**
    **▫️**Max Claim Area: **10,000 Blocks **`).setColor('#55FF55')
           
            
            const embed3 = new EmbedBuilder().setTitle(`MEMBER`)
            .setDescription(`
    Requires 25 hours of playtime and 25 votes.
     
    **Snapshot Perks:**
    **▫️**Homes: **3 **ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
    
    **Release Perks: **
    **▫️**Homes: **5**
    **▫️**Claims: **3**
    **▫️**Max Claim Area: **25,000 Blocks **`).setColor('#00AA00')
    
            const embed4 = new EmbedBuilder().setTitle(`ELDER`)
            .setDescription(`
    Requires 125 hours of playtime and 125 votes.
     
    **Snapshot Perks:**
    **▫️**Homes: **4 **ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
    
    **Release Perks: **
    **▫️**Homes: **10**
    **▫️**Claims: **5**
    **▫️**Max Claim Area: **50,000 Blocks **`).setColor('#55FFFF')
    
            const embed5 = new EmbedBuilder().setTitle(`VETERAN`)
            .setDescription(`
    Requires 500 hours of playtime and 500 votes.
     
    **Snapshot Perks:**
    **▫️**Homes: **7 **ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
    
    **Release Perks: **
    **▫️**Homes: **20**
    **▫️**Claims: **10**
    **▫️**Max Claim Area: **150,000 Blocks **`).setColor('#00AAAA')
    
            const embed6 = new EmbedBuilder().setTitle(`ELITE`)
            .setDescription(`
    Requires 2500 hours of playtime and 2500 votes.
     
    **Snapshot Perks:**
    **▫️**Homes: **7 **ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
    
    **Release Perks: **
    **▫️**Homes: **20**
    **▫️**Claims: **10**
    **▫️**Max Claim Area: **150,000 Blocks **`).setColor('#5555FF')
    
            const embed7 = new EmbedBuilder().setTitle(`DONATOR`)
            .setDescription(`
    Players who have donated.
             
    **Snapshot Perks**:
    **▫️**Homes: 10ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
    **▫️**Access to lots of particle effects
    **▫️**Donator only <#1089274505295314964> 
            
    **Release Perks**: 
    **▫️**Homes: 25
    **▫️**Claims: 15
    **▫️**Max Claim Area: 250,000 Blocks
    **▫️**Join even if the server is full
    **▫️**Donator only <#1089274505295314964>`).setColor('#AA00AA')
    
            const embed8 = new EmbedBuilder().setTitle(`VIP`)
            .setDescription(`
    Not obtainable via normal means and only given by the Owner. 
     
    **Snapshot Perks:**
    **▫️**Homes: **10**ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
            
    **Release Perks**
    **▫️**Homes: **25**
    **▫️**Claims: **15**
    **▫️**Max Claim Area: **250,000 Blocks**`).setColor('#0000AA')
    
    const embed9 = new EmbedBuilder().setTitle('HELPER')
    .setDescription(`
    Helps new players and has limited moderation permissions.ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
    `).setColor('#FFFF55')
    
    const embed10 = new EmbedBuilder().setTitle('MODERATOR')
    .setDescription(`
    Helpers who do a good job for a long time may be promoted to Moderator. Moderators have more moderation staff permissions.
    `).setColor('#ffaa00')
    
    const embed11 = new EmbedBuilder().setTitle('SR. MODERATOR')
    .setDescription(`
    Sr. Moderators have the highest moderation staff permissionsㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
    `).setColor('#ffaa00')
    
    const embed12 = new EmbedBuilder().setTitle('ADMIN')
    .setDescription(`
    The highest obtainable staff rank, only those that are already Sr. Moderators and would benefit from access to the console may become Admin.
    `).setColor('#FF5555')
    
    const embed13 = new EmbedBuilder().setTitle('OWNER')
    .setDescription(`
    Owns the Discord and Minecraft servers.ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
    `).setColor('#AA0000')
    
    
            await interaction.channel.send('https://cdn.discordapp.com/attachments/1089274345702039673/1089325323226718220/player_ranks.png')
            await interaction.channel.send({embeds: [embed, embed2 , embed3 , embed4, embed5, embed6, embed7, embed8]})
            await interaction.channel.send('https://cdn.discordapp.com/attachments/1089274345702039673/1089325277471047873/staff_ranks.png')
           await interaction.channel.send({embeds: [embed9, embed10, embed11, embed12, embed13]})
        }
        if (update === "donate") {
            const emb = new EmbedBuilder().setDescription(
                `
    **DONATOR PERKS:**ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
    
    **Snapshot Server:**
    :white_small_square:10 Homes
    :white_small_square:Access to lots of particle effects
    :white_small_square:Donator only #commands 
    
    **Release Server:**
    :white_small_square:25 Homes & Larger claim limits
    :white_small_square:Join even if the server is full
    :white_small_square: Donator only #commands 
    
    `).setColor('#b055ff')
    
    const emb2 = new EmbedBuilder().setDescription(
        `
    **HOW TO GET DONATOR RANK:**
    ↳ Make a donation via Patreon https://www.patreon.com/pandamium
    ↳ Open a ticket in #support and tell us your Minecraft and Patreon names.
    ↳ Link your Patreon and Discord accounts. To do that, follow this link: https://support.patreon.com/hc/en-us/articles/212052266-Get-my-Discord-role
    
    `).setColor('#b055ff')
    
    
    await interaction.channel.send('https://cdn.discordapp.com/attachments/1079532215584706670/1089244539597897780/donations.png')
     await interaction.channel.send(`
If you would like to support Pandamium and help improve the hardware the server is running on, consider donating.
In return, you'll receive the **Donator** rank as a thank you, both in Minecraft and on Discord. `)
    
     await interaction.channel.send({embeds: [emb]})
     await interaction.channel.send({embeds: [emb2]})
     await interaction.channel.send(`*Note: Donations through Patreon are subscriptions. Once you donate, you'll be charged every month until you cancel. Donator Rank is given for 1 month per $5 you donate! If you change your Minecraft or Patreon name, you need to tell us that, otherwise we won't know where the donation should go. *`)
    
        }
        
    } else { 
        return interaction.reply('This command is restricted')
    }


  }
    getSlashCommandJSON() {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription("update")
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
      .addStringOption((option) =>
        option
          .setName("channel_name")
          .setDescription("Channel to sent message to")
          .setRequired(true)
          .addChoices(
        { name: "Rules", value: "rules" },
        { name: "Voting", value: "vote" },
        { name: "FAQ", value: "faq" },
        { name: "Ranks", value: "rank" },
        { name: "Donations", value: "donate" },
      ))
      .toJSON();
  }
};