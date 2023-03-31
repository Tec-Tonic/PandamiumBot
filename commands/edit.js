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
        
      const snap = new EmbedBuilder().setDescription(`
       

**Miscellaneous**
**/msg <playerName> <message>** → privately sends the msg to the specified player
**/trigger afk** → toggles your AFK mode
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
**/trigger home** or **/trigger home set <id>** → teleports you to your home
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


        const channel = client.channels.cache.get('602084896709541898') //commands

        channel.messages.fetch('1091446842853691422').then(msg => msg.edit({embeds: [snap]}))
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
      .addStringOption((option) =>
        option
          .setName("channel_name")
          .setDescription("Updates old embed messages")
          .setRequired(true)
          .addChoices(
            { name: "Commands", value: "commands" } //,
            //{ name: "Custom Recipes", value: "custom" },
            // { name: "Donations", value: "donate" },
            // { name: "FAQ", value: "faq" },
            // { name: "More Mob Heads", value: "mmh" },
            // { name: "Ranks", value: "ranks" },
            // { name: "Reaction Roles", value: "rr" },
            // { name: "Rules", value: "rule" },
            // { name: "Staff Applications [Message]", value: "sa" },
            // { name: "Staff Applications [Open]", value: "open-sa" },
            // { name: "Staff Applications [Closed]", value: "closed-sa" },
            // { name: "Town Applications", value: "ta" },
            // { name: "Vote", value: "vote" },
            // { name: "Welcome", value: "welcome" }
          )
      )
      .toJSON();
  }
};
