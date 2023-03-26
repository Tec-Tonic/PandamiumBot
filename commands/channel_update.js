const BaseSlashCommand = require("../utils/BaseSlashCommands");
const {
  SlashCommandBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  AttachmentBuilder
} = require("discord.js");

const util = require("minecraft-server-util");


module.exports = class faqSlashCommand extends BaseSlashCommand {
  constructor() {
    super("channel");
  }

  async run(client, interaction) {

    const update = interaction.options.getString("channel_name");
    if (interaction.user.id === '546277533138550786' || interaction.user.id === '1089362805137887232') {

      if (update === 'commands'){
        const snap = new EmbedBuilder().setDescription(`
       

**Miscellaneous**
**/msg <playerName> <message>** → privately sends the msg to the specified player
**/trigger clear** → clears your inventory
**/trigger discord** → gives you the Pandamium Discord link
**/trigger gift** → allows you to gift a vote credit to another player, 15 min cooldown
**/trigger leaderboards** → displays playtime & voting leaderboards in chat
**/trigger options** → allows you to toggle keep inventory, phantom spawning & more
**/trigger playtime** → shows your playtime
**/trigger respawn** → kills you and takes you back to your spawn point
**/trigger sit** → makes you sit down
**/trigger tpa** → lists all online player's IDs
**/trigger world_info** → shows the number of players and entities per dimension

**Homes**
**/trigger homes** → shows your homes
**/trigger delhome** or **/trigger delhome set <id>** → deletes a home
**/trigger sethome **or **/trigger sethome set <id>** → sets a home

**Teleporting**
**/trigger enderman_farm** → teleports you to the enderman farm in the end
**/trigger home** or **/trigger home set <id>** → teleports you to your home
**/trigger rtp** → randomly teleports you (same as the RTP portal at spawn)
**/trigger spawn** → teleports you to spawn
**/trigger tpa set <id>** → sends a teleport request to the specified player

**Voting**
**/trigger vote** → gives you links to websites where you can vote for the server
**/trigger vote_shop** → opens a menu where you can spend your vote credits

**Donators Only**
**/trigger frame_visibility** → allows you to make item frames invisible
**/trigger hat** → puts the item in your hand onto your head
**/trigger item_font** → change the font/color of the name of the item held
**/trigger particles** → opens a menu where you can switch between particle effects
**/trigger pose** → when looking at an armor stand, opens a customization menu
**/trigger sign_font** → change the font/color of the sign you are facing
        `).setColor('#09E6FC')

        const release = new EmbedBuilder().setDescription(`
       

**Miscellaneous**
**/afk** → toggle your afk status
**/clear **→ clears your inventory
**/discord** → gives you the Pandamium Discord link
**/playtime** → shows your total playtime on the server
**/playtimetop** → shows a ranking of all players sorted by playtime
**/respawn** → kills you and allows you to get back to your spawn point quickly
**/warp** → allows you to use warps
**/world_info** → shows you stats about your current dimension

**Homes**
**/homes** → shows you a list of your homes
**/sethome <homeName>** → sets a home with the specified name

**Messaging**
**/chat** → allows you use chat rooms (Start your msg with ! to write in public)
**/ignore <playerName>** → blocks chat and msgs of a player
**/mail clear** → clear mail
**/mail read** → read mail
**/mail send <playername>** → send mail to a player. Can be sent to offline players
**/msg <playerName> <message> **→ privately sends the msg to the specified player
**/reply <message>** or **/r <message>** → responds to the last private msg received

**Teleporting**
**/home <homeName>** → teleports you to the specified home
**/spawn** → teleports you to the spawn
**/tpa <playerName>** → sends a teleport request to the specified player
**/tpaccept** → accepts a teleport request
**/tpdeny** → denies a teleport request 

**Voting**
**/votes** → shows your vote count
**/votecredits** → tells you how many vote credits you currently have
**/voteshop** → opens the voteshop
**/votetop** → shows a ranking of all players sorted by votes

**Donators Only**
**/armorstand **→ change armor stand settings
**/dye**  → change the color of leather armor
**/enderchest** or **/ec** → opens your ender chest
**/hat **→ puts the block you're currently holding on your head
**/item_font** → change the font/color of the name of the item held
**/sign_font** → change the font/color of the sign you are looking at 
**/workbench** or **/wb** → opens a workbench
`).setColor('#7A8CEA')

const disc = new EmbedBuilder().setDescription(`


**Chat**
**/ip** → prints the server IP
**/playerlist** (ingame-chat channels only) → shows you a list of all online players
**/faq** → displays a list of frequently asked questions
`).setColor('#AF61E1')

        await interaction.channel.send('https://cdn.discordapp.com/attachments/1089327016379162644/1089632067521892362/image.png')
        await interaction.channel.send({embeds: [snap]})
        await interaction.channel.send('https://cdn.discordapp.com/attachments/1089327016379162644/1089632368073134162/image.png')
        await interaction.channel.send({embeds: [release]})
        await interaction.channel.send('https://cdn.discordapp.com/attachments/1089327016379162644/1089632536763830312/image.png')
        await interaction.channel.send({embeds: [disc]})
      }

      if (update === 'custom'){
        const image = new AttachmentBuilder('https://cdn.discordapp.com/attachments/1087413427972083752/1089651932727083161/final.gif')
        const image1 = new EmbedBuilder().setDescription('Pandamium custom recipes are designed to help improve the player experience on our server. Our recipes are crafted identically as to their vanilla counterparts.\n\nWe recommend that you view our custom recipes on the [**Pandamium Website**](https://www.pandamium.com/info/custom-recipes) for a better viewing experience.').setColor('#0159FF')
        
        await interaction.channel.send('https://cdn.discordapp.com/attachments/1087413427972083752/1089639909066821642/image.png')
        await interaction.channel.send({embeds: [image1]})
        await interaction.channel.send({ files : [image] })
        
      }

      if (update === 'donate'){
        const emb = new EmbedBuilder().setDescription(
          `
          If you would like to support Pandamium and help improve the hardware the server is running on, consider donating. In return, you'll receive the **Donator **rank as a thank you, both in Minecraft and on Discord. 
      
      
          **DONATOR PERKS**
      
          **Snapshot Server:**
          :white_small_square:10 Homes
          :white_small_square:Access to lots of particle effects
          :white_small_square:Donator only <#1089327016379162644> 
          
          **Release Server:**
          :white_small_square:25 Homes & Larger claim limits
          :white_small_square:Join even if the server is full
          :white_small_square: Donator only <#1089327016379162644> 
          
          
          **HOW TO GET DONATOR RANK**
          ↳ Make a donation via [**Patreon**](https://www.patreon.com/pandamium)
          ↳ Open a ticket in <#1089326603672223794> and tell us your Minecraft and Patreon names.
          ↳ [**Link**](https://support.patreon.com/hc/en-us/articles/212052266-Get-my-Discord-role) your Patreon and Discord accounts.
          
          
          Donations through Patreon are subscriptions. Once you donate, you'll be charged every month until you cancel. Donator Rank is given for 1 month per $5 you donate! If you change your Minecraft or Patreon name, you need to tell us that, otherwise we won't know where the donation should go.
          
      `).setColor('#D122F8')
      
      
      await interaction.channel.send('https://media.discordapp.net/attachments/1079532215584706670/1089580753647587398/image.png?width=1595&height=220')
      await interaction.channel.send({embeds: [emb]})
      }

      if (update === 'faq'){
        const f1 = new EmbedBuilder()
        .setDescription(`
        **‣ What's the IP of the server?**
          Release server: release.pandamium.eu
          Snapshot server: snapshot.pandamium.eu
        `).setColor('#FFA200')
        
        const f2 = new EmbedBuilder()
        .setDescription(`
        **‣ When do auto restarts happen?**
        Both servers will restart every 12 Hours - <t:0:t> and <t:43200:t>
        `).setColor('#FFA200')
        
        const f3 = new EmbedBuilder()
        .setDescription(`
        **‣ What hardware is the server running on?**
          The hardware we're running is basically ideal for a Minecraft server, we have a CPU with great single core performance, more cores and RAM than the server actually needs and a fast NVMe SSD. If the server is lagging, it's because Minecraft is poorly optimized, not because of the server hardware.
        
        :white_small_square:AMD Ryzen 3600 (6C/12T @3.6Ghz)
        :white_small_square:64 GB DDR4 ECC RAM.
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
          You can rank up by reaching a certain amount of playtime and votes. For more info, check out <#1089326766474154004> Instead you can also donate if you want, check out \n<#1089326826834366684>.
         
        `).setColor('#FFA200')
        
        const f6 = new EmbedBuilder()
        .setDescription(`
        **‣ How can I join or create a town?**
        To join a town, you need to apply in their Discord channel. It is up to the owners of the respective groups to accept/deny your application. To create your own, you need to open a ticket in <#1089326603672223794> and follow the correct template for the town application. Go to <#1089326977225347092> for more detail.
         
        `).setColor('#FFA200')
        
        const f7 = new EmbedBuilder()
        .setDescription(`
        **‣ Is it allowed to use Litematica to make building easier?**
          You are allowed to use the visual features of Litematica. However, Litematica allows you to place blocks in the air or other impossible positions and allows automates building to make if much faster than for normal players. These parts of the mod are **not **allowed.
        
        `).setColor('#FFA200')
        
        const f8 = new EmbedBuilder()
        .setDescription(`
        **‣ How are chunks reset?**
        This does not refer to world resets but to periodic trimming of the world size!
        
          Exploring freely on Pandamium causes lots of chunks to be loaded (e.g. while flying with an elytra) and then never even loaded again. Those chunks take up a lot of space, so we need to trim the world size from time to time. For this we use a tool that only deletes chunks which haven't been loaded at all in at least two weeks and for more than 2 hours in total. World trimming isn't done regularly, we usually do it together with other server maintenance since the server has to be offline for it.
        
        `).setColor('#FFA200')
        
        
        
        await interaction.channel.send('https://media.discordapp.net/attachments/1079531915155079178/1089599118764150934/image.png?width=1439&height=199')
        await interaction.channel.send({embeds: [f1, f2, f3, f4, f5, f6, f7, f8]})
      }

      if (update === 'ranks'){
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
**▫️**Homes: **10**ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
**▫️**Access to lots of particle effects
**▫️**Donator only <#1089327016379162644> 
        
**Release Perks**: 
**▫️**Homes: **25**
**▫️**Claims: **15**
**▫️**Max Claim Area: **250,000 Blocks**
**▫️**Join even if the server is full
**▫️**Donator only <#1089327016379162644>`).setColor('#AA00AA')

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
Helpers who do a good job for a long time may be promoted to Moderator. Moderators have more staff moderation permissions.
`).setColor('#ffaa00')

const embed11 = new EmbedBuilder().setTitle('SR. MODERATOR')
.setDescription(`
Moderators who are really active and dedicated to the server and do an extremely good job for a long time might be promoted to Sr. Moderator. They have the highest staff moderation permissions.ㅤㅤ
`).setColor('#ffaa00')

const embed12 = new EmbedBuilder().setTitle('ADMIN')
.setDescription(`
The highest obtainable staff rank. Only those that are already Sr. Moderators and would benefit from access to the console may become Admin.
`).setColor('#FF5555')

const embed13 = new EmbedBuilder().setTitle('OWNER')
.setDescription(`
Owns the Discord and Minecraft servers.ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
`).setColor('#AA0000')


        await interaction.channel.send('https://cdn.discordapp.com/attachments/1079532021984014396/1089598304037376120/image.png')
        await interaction.channel.send({embeds: [embed, embed2 , embed3 , embed4, embed5, embed6, embed7, embed8]})
        await interaction.channel.send('https://cdn.discordapp.com/attachments/1079532021984014396/1089598384224079922/image.png')
       await interaction.channel.send({embeds: [embed9, embed10, embed11, embed12, embed13]})
      }

      if (update === 'rr'){
        const rr = new EmbedBuilder()
        .setDescription(`
        React below to select which pings you would like to receive:

        📣 ⭢ Snapshot Announcement Pings
        <:snapshotchangelogping:1089615059090677760>   ⭢ Snapshot Changelog Pings
        <:releaseannouncementping:1089613992491753573>    ⭢ Release Announcement Pings
        <:releasechangelogping:1089615057324888235>   ⭢ Release Changelog Pings
        <:eyeofender:1089616416929489047>   ⭢ End Reset Pings
        :tada: ⭢ Event Pings
`).setColor('#F53068')

await interaction.channel.send('https://media.discordapp.net/attachments/1079531833567481977/1089598568525992076/image.png?width=1595&height=220')
await interaction.channel.send({embeds: [rr]})
      }

      if (update === 'rule'){
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

        const embed6 = new EmbedBuilder().setTitle(`7 - CHAT LANGUAGE`)
        .setDescription(`Messages sent in the public chat (ingame or Discord) should be written in English. Messages in public chats are supposed to be understandable for everyone.`).setColor('#D02FB7')

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
        .setDescription(`**These rules apply to the Pandamium Minecraft servers and the official Pandamium Discord. They also extend to direct messages if these messages are related to Pandamium.**\n\n**The rules may be edited by the Owner (Sundroid) at any time.**`).setColor('#D02FB7')

       await interaction.channel.send('https://cdn.discordapp.com/attachments/1089274040839057489/1089579687149326426/image.png')
        await interaction.channel.send({embeds: [embed, embed1, embed2, embed3, embed4, embed5, embed6, embed7, embed8, embed9, ]})
        await interaction.channel.send({embeds: [embed10, embed11, embed12, embed13, embed14, embed15]})

      }

      if (update === 'sa'){
        const staff = new EmbedBuilder().setDescription(`
        If you want to apply to become a Helper, read the following carefully.
        
        **RECOMMENDATIONS FOR HELPER**
        ↳  16+ years of age
        ↳  50+ votes
        ↳  50+ hours of playtime
        
        
        **HOW TO APPLY**
        :white_small_square: Open a Staff Application ticket in <#1089326603672223794> and follow the directions. 
        
        When you submit your application, it will be transferred to a private staff area for review and your ticket will be closed. Applications that have been transferred are unable to be edited.
        
        
        **HELPFUL TIPS**
        **↳** Write a long and detailed application.
        
        **↳** Include as much relevant information as possible (e.g. past staff experience, when/how long you can be online).
        
        **↳** Include any punishments you've received on the server and why you think you're still suitable to be on our staff team.
        
        
        **HOW DECISIONS ARE MADE**
        We use a point based system to make decisions about staff applications. Every staff member can give you plus or minus points (higher ranks have more influence). There are also some additional points which are calculated by set formulas and depend on things like your playtime. A final decision will be made after we've reviewed all of the applications, which may take quite a while. Your ticket being closed just means we've seen your application, not that we've made a decision.
                `).setColor('#65FE54')
        
                const closed = new EmbedBuilder().setTitle('Staff applications are currently closed. There will be an announcement when they reopen.').setColor('#Ff1d8e')
          await interaction.channel.send('https://cdn.discordapp.com/attachments/1089274599553908756/1089652960948125768/image.png')
          await interaction.channel.send({embeds: [staff]})
          await interaction.channel.send({embeds: [closed]})
      }

      if (update === 'vote'){
        const emb = new EmbedBuilder().setDescription(`
        Voting daily is a great way to help Pandamium become more popular! When you vote, you will receive one vote credit per site. These credits can be used in our vote shop to buy useful items. Please note, votes are required in order to rank up. For more information, check out <#1089326766474154004>.

        **You can get these links by running \`/trigger vote\` ingame.**
        
        **SNAPSHOT SERVER:**
        <https://minecraft-server-list.com/server/445164/vote/>
        <https://minecraftservers.org/vote/562059>
        <http://topminecraftservers.org/vote/29717>
        <https://minecraft.global/server/172/vote>
        
        **RELEASE SERVER:**
        <https://minecraft-server-list.com/server/432071/vote/>
        <https://minecraftservers.org/vote/559675>
        <http://topminecraftservers.org/vote/29718>
        <https://minecraft.global/server/173/vote>
        `).setColor('#0BF759')

        await interaction.channel.send('https://cdn.discordapp.com/attachments/1089274151304429578/1089597029904289812/image.png')
        await interaction.channel.send({embeds: [emb]})
      }

      if (update === 'welcome'){
        const em1 = new EmbedBuilder()
        .setDescription(`
        To access our Discord server, you need to link your Minecraft account to your Discord account. The following only needs to be done once:

        **HOW TO LINK YOUR ACCOUNTS**
        ▫️Log into the **Release Server**  →  \`release.pandamium.eu\`
        ▫️Use the command \`/discord link\` in-game. You will get a 4 digit link code.
        ▫️Send a private message with this link code to <@604625105758322688>
        
        To send a dm to the bot, you need to enable the \`Allow direct messages from server members\` option for this Discord server. You can find it by right clicking the Pandamium icon and selecting Privacy Settings (you can disable it again afterwards).  If there are any problems with the linking process, please message a member of staff.
`).setColor('#D10E91')

        await interaction.channel.send('https://cdn.discordapp.com/attachments/1079529798000447548/1089581593418530857/image.png')
        await interaction.channel.send({embeds: [em1]})
      }
        

      if (update === 'mmh') {
        const mmh1 = new EmbedBuilder().setDescription(`
        **TAXIDERMIST ADVANCEMENT GUIDE**

**How can I obtain these mob heads?**
The mob heads drop from mobs that are killed by charged creepers (creepers which have been struck by lightning).

**How many mobs drop their heads?**
There are 178 unique heads that you can obtain (not including the vanilla heads).
All heads (except the Wither, Wolf and Vex heads) drop from mobs with specific data values.

**Wither ** - The Wither will drop 1 to 3 random wither heads when killed by a Charged Creeper.
:white_small_square:Wither
:white_small_square:Armoured Wither
:white_small_square:Invulnerable Wither
:white_small_square:Armoured Invulnerable Wither

**Wolf **- Wolves have a 50/50 chance of dropping either a Wolf head, or an Angry Wolf head. This was done as there is no way to detect if a wolf is angry using a loot table predicate.
:white_small_square:Wolf
:white_small_square:Angry Wolf

**Vex **- Vexes have a 50/50 chance of dropping either a Vex head, or an Charging Vex head. This was done as there is no way to detect if a vex is charging using a loot table predicate.
:white_small_square:Vex
:white_small_square:Charging Vex

**Is there a limit to the number of mob heads that drop per explosion?**
No, as long as a mob is killed by a charged creeper's explosion, it will drop a head.

**Is the mob head drop rate 100%?**
Yes.

**Will the charged creeper definitely kill a mob, or do I need to take into consideration a mobs health?**
For most mobs, they're a one-shot from a charged creeper explosion, but some mobs (such as ravagers, withers and wardens) are not, so you will have to weaken these mobs first.

**What size of slime/magma cube drop heads?**
All sizes of the mob drop their respective mob heads.

**How can I preview what the mob heads look like?**
You can view all of the mob heads on our [**website**](https://www.pandamium.com/info/more-mob-heads). To see them in-game, download the datapack below and put it into your world's datapacks folder. Then open the world (or run /reload) and run the following command: \`function pandamium.mob_heads:give_all\`

[**Datapack Download**](https://cdn.discordapp.com/attachments/380394321217716227/1075501943516041256/Pandamium_Mob_Heads.zip)

`).setColor('#FE5453')

    await interaction.channel.send('https://media.discordapp.net/attachments/1079532292080422914/1089581400073711686/image.png')
    await interaction.channel.send({embeds: [mmh1]})
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
        { name: "Commands", value: "commands" },
        { name: "Custom Recipes", value: "custom" },
        { name: "Donations", value: "donate" },
        { name: "FAQ", value: "faq" },
        { name: "More Mob Heads", value: "mmh" },
        { name: "Ranks", value: "ranks" },
        { name: "Reaction Roles", value: "rr" },
        { name: "Rules", value: "rule" },
        { name: "Staff Applications [Closed]", value: "sa" },
        { name: "Vote", value: "vote" },
        { name: "Welcome", value: "welcome" },
        
      ))
      .toJSON();
  }
};