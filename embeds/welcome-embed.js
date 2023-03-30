const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, EmbedBuilder } = require('discord.js');
  
  const em1 = new EmbedBuilder()
        .setDescription(`
        To access our Discord server, you need to verify your account. The following only needs to be done once:

        **HOW TO GET VERIFIED**
        :white_small_square:Click the verification button below (a new screen will pop up).
        :white_small_square:Either a Pin (that is sent via Direct Message) or some other method (this is for the example)
        
        Once your account has been verified, you will have full access to our Discord server. If you have any problems with the verification process, please message a member of staff.`).setColor('#D10E91')

const verify = new ActionRowBuilder()
.addComponents(
    new ButtonBuilder()
        .setCustomId('verify')
        .setLabel('Click to Verify')
        .setStyle(ButtonStyle.Primary),
);

module.exports.em1 = em1
module.exports.verify = verify