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
**↳** AMD Ryzen 3600 (6C/12T @3.6Ghz)
**↳** 64 GB DDR4 ECC RAM
**↳** 2x 500gb NVMe SSDs
**↳** 1tb Backup Storage

`).setColor('#FFA200')
        
const f4 = new EmbedBuilder()
.setDescription(`
**‣ Is griefing and stealing allowed?**
No, it's absolutely not allowed. On the Release server you can create a claim to protect your stuff. Unfortunately this isn't possible on the Snapshot server because we can't use plugins there, so please move far away from spawn and only share the coords with people you trust. 
         
`).setColor('#FFA200')
        
const f5 = new EmbedBuilder()
.setDescription(`
**‣ How can I get more homes or bigger claims?**
You can rank up by reaching a certain amount of playtime and votes. For more info, check out <#506987588742152202> Instead you can also support us monetarily if you want, check out \n<#506498349029916673>.
         
`).setColor('#FFA200')
        
const f6 = new EmbedBuilder()
.setDescription(`
**‣ How can I join or create a town?**
To join a town, you need to apply in their Discord channel. It is up to the owners of the respective groups to accept/deny your application. To create your own, you need to open a ticket in <#750352670702698657> and follow the correct template for the town application. Go to <#1031296778907156511> for more detail.
         
`).setColor('#FFA200')
        
const f7 = new EmbedBuilder()
.setDescription(`
**‣ Is Litematica allowed?**
You are allowed to use the visual features of Litematica (holograms) as well as placement restriction mode. However, you are **not** allowed to use easy place mode or any printer (auto build) aspect of the mod.       
`).setColor('#FFA200')
        
const f8 = new EmbedBuilder()
.setDescription(`
**‣ How are chunks reset?**
This does not refer to world resets but to periodic trimming of the world size!
        
Exploring freely on Pandamium causes lots of chunks to be loaded (e.g. while flying with an elytra) and then never even loaded again. Those chunks take up a lot of space, so we need to trim the world size from time to time. For this we use a tool that only deletes chunks which haven't been loaded at all in at least two weeks and for more than 2 hours in total. World trimming isn't done regularly, we usually do it together with other server maintenance since the server has to be offline for it.
        `).setColor('#FFA200')

module.exports.f1 = f1
module.exports.f2 = f2
module.exports.f3 = f3
module.exports.f4 = f4
module.exports.f5 = f5
module.exports.f6 = f6
module.exports.f7 = f7
module.exports.f8 = f8