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
  
  const embed = new EmbedBuilder().setTitle(`GUEST`)
        .setDescription(`
New playersㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ\n\n**Snapshot Perks:**\n**▫️**Homes: **1 **\n\n**Release Perks:**\n**▫️**Homes: **2**\n**▫️**Claims: **1**\n**▫️**Max Claim Area: **5,000 Blocks**`).setColor('#AAAAAA')

        const embed2 = new EmbedBuilder().setTitle(`PLAYER`)
        .setDescription(`
Requires 5 hours of playtime and 5 votes.\n\n**Snapshot Perks:**\n**▫️**Homes: **2 **ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ\n\n**Release Perks: **\n**▫️**Homes: **3**\n**▫️**Claims: **2**\n**▫️**Max Claim Area: **10,000 Blocks **`).setColor('#55FF55')
       
        
        const embed3 = new EmbedBuilder().setTitle(`MEMBER`)
        .setDescription(`
Requires 25 hours of playtime and 25 votes.\n\n**Snapshot Perks:**\n**▫️**Homes: **3 **ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ\n\n**Release Perks: **\n**▫️**Homes: **5**\n**▫️**Claims: **3**\n**▫️**Max Claim Area: **25,000 Blocks **`).setColor('#00AA00')

        const embed4 = new EmbedBuilder().setTitle(`ELDER`)
        .setDescription(`
Requires 125 hours of playtime and 125 votes.\n\n**Snapshot Perks:**\n**▫️**Homes: **4 **ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ\n\n**Release Perks: **\n**▫️**Homes: **10**\n**▫️**Claims: **5**\n**▫️**Max Claim Area: **50,000 Blocks **`).setColor('#55FFFF')

        const embed5 = new EmbedBuilder().setTitle(`VETERAN`)
        .setDescription(`
Requires 500 hours of playtime and 500 votes.\n\n**Snapshot Perks:**\n**▫️**Homes: **5 **ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ\n\n**Release Perks: **\n**▫️**Homes: **15**\n**▫️**Claims: **7**\n**▫️**Max Claim Area: **100,000 Blocks **`).setColor('#00AAAA')

        const embed6 = new EmbedBuilder().setTitle(`ELITE`)
        .setDescription(`
Requires 2,500 hours of playtime and 2,500 votes.\n\n**Snapshot Perks:**\n**▫️**Homes: **7 **ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ\n\n**Release Perks: **\n**▫️**Homes: **20**\n**▫️**Claims: **10**\n**▫️**Max Claim Area: **150,000 Blocks **`).setColor('#5555FF')

        const embed7 = new EmbedBuilder().setTitle(`SUPPORTER`)
        .setDescription(`
Players who have subscribed to our Patreon.\n\n**Snapshot Perks**:\n**▫️**Homes: **10**ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ\n**▫️**Access to lots of particle effects\n**▫️**Supporter-only <#602084896709541898>         \n\n**Release Perks**: \n**▫️**Homes: **25**\n**▫️**Claims: **15**\n**▫️**Max Claim Area: **250,000 Blocks**\n**▫️**Join even if the server is full\n**▫️**Supporter-only <#602084896709541898>`).setColor('#AA00AA')

        const embed8 = new EmbedBuilder().setTitle(`VIP`)
        .setDescription(`
Not obtainable via normal means and only given by the Owner.\n\n**Snapshot Perks:**\n**▫️**Homes: **10**ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ\n\n**Release Perks:**\n**▫️**Homes: **25**\n**▫️**Claims: **15**\n**▫️**Max Claim Area: **250,000 Blocks**`).setColor('#0000AA')

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

module.exports.embed = embed
module.exports.embed2 = embed2
module.exports.embed3 = embed3
module.exports.embed4 = embed4
module.exports.embed5 = embed5
module.exports.embed6 = embed6
module.exports.embed7 = embed7
module.exports.embed8 = embed8
module.exports.embed9 = embed9
module.exports.embed10 = embed10
module.exports.embed11 = embed11
module.exports.embed12 = embed12
module.exports.embed13 = embed13
