const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, EmbedBuilder } = require('discord.js');
  
  // const em1 = new EmbedBuilder()
  //       .setDescription(`
  //       To access our Discord server, you need to verify your account. The following only needs to be done once:

  //       **HOW TO GET VERIFIED**
  //       :white_small_square:Click the verification button below (a new screen will pop up).
  //       :white_small_square:Either a Pin (that is sent via Direct Message) or some other method (this is for the example)
        
  //       Once your account has been verified, you will have full access to our Discord server. If you have any problems with the verification process, please message a member of staff.`).setColor('#D10E91')

// const verify = new ActionRowBuilder()
// .addComponents(
//     new ButtonBuilder()
//         .setCustomId('verify')
//         .setLabel('Click to Verify')
//         .setStyle(ButtonStyle.Primary),
// );

const em1 = new EmbedBuilder()
         .setDescription(`
To access our Discord server, you need to link your Minecraft account to your Discord account. The following only needs to be done once:\n\n**HOW TO LINK YOUR ACCOUNTS**\n:white_small_square:Log into the **Release Server**  →  \`release.pandamium.eu\`.\n:white_small_square:Use the command \`/discord link\` in-game. You will get a 4 digit link code.\n:white_small_square:Send a private message with this link code to <@604625105758322688>\n\nTo send a dm to the bot, you need to enable the \`Allow direct messages from server members\` option for this Discord server. You can find it by right clicking the Pandamium icon and selecting Privacy Settings (you can disable it again afterwards). If there are any problems with the linking process, please message a member of staff.
`).setColor('#D10E91')


 module.exports.em1 = em1
// module.exports.verify = verify