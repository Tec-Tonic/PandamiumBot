const BaseSlashCommand = require("../utils/BaseSlashCommands");
const {
  SlashCommandBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  AttachmentBuilder,
} = require("discord.js");

const util = require("minecraft-server-util");

module.exports = class faqSlashCommand extends BaseSlashCommand {
  constructor() {
    super("edit");
  }

  async run(client, interaction) {
    if (
      interaction.user.id === "546277533138550786" || interaction.user.id === "255766501464735744"
    ) {
      //code here
       
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
      **/rtp** → randomly teleports you (same as the RTP portal at spawn)
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

    

        const noUpdates = new EmbedBuilder().setDescription('There is nothing to update!').setColor('#189cab')
        //interaction.reply({embeds: [noUpdates], ephemeral: true})
        
        const msgID = '1091446846452400158'
        const channelID = '602084896709541898'

        const channel = client.channels.cache.get(channelID) //commands
        channel.messages.fetch(msgID).then(msg => msg.edit({embeds: [
          release
        ]}))  
    } else {
      return interaction.reply(
        "You do not have the permissions to use this command."
      );
    }
  }
  getSlashCommandJSON() {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription("Edits message embeds!")
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
      .toJSON();
  }
};
