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

**Supporter Only**
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

**Supporter Only**
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

module.exports.snap = snap
module.exports.release = release
module.exports.disc = disc
