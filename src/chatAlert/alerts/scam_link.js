const log = process.env.LOGS
const myLog = process.env.LOGS
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, GuildMember } = require("discord.js");
const scamLinkFilter = require(`../filters/scam_link_filter.json`);
module.exports = {
  name: "scam",
  execute(message, client) {
    if (message.author == client.user) return;
    var content = message.content;
    var stringToCheck = content.replace(/\s+/g, "").toLowerCase();
    var stringToCheck = content;

    const scamAuthor = message.author;
    const scamChannel = message.channelId;

    stringToCheck.replace(/\s+/g, "").toLowerCase();
    for (var i = 0; i < scamLinkFilter.length; i++) {
      if (content.includes(scamLinkFilter[i])) {

        setTimeout(function() { 
          message.delete();
      }, 2000);


      const scamButtonRedirect = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
        .setLabel("Support")
        .setStyle(ButtonStyle.Link)
        .setURL("https://discord.com/channels/504627012921589763/750352670702698657/1031570296454516808"),
      )

        const scamResultEmbed = new EmbedBuilder()
          .setDescription(
            `Your messaged was identified as a possible Scam link, ${scamAuthor}. \nIf this was a mistake open a ticket in <#750352670702698657>`
          )
          .setColor("#FF0101");

        message.reply({ embeds: [scamResultEmbed] ,components: [scamButtonRedirect],}).then((message) => {
          setTimeout(() => message.delete(), 60000);
        });
        
        

        const scamEmbed = new EmbedBuilder()
          .setColor("#FF0000")
          .setTitle("Scam Link")
          .setDescription("Scam link has been deleted.")
          .addFields({
            name: `Info:`,
            value: `Channel: <#${scamChannel}> \nScam trigger: \`${scamLinkFilter[i]}\``,
          });

          // embed with trigger phrase
        const authorEmbed = new EmbedBuilder()
          .setColor("#FF0000")
          .setTitle('Author Information')
          .setAuthor({ name: `${scamAuthor.tag}`, iconURL: `https://cdn.discordapp.com/avatars/${scamAuthor.id}/${scamAuthor.avatar}.jpeg`, url: 'https://discord.com/channels/504627012921589763/743387831992320070/1091448738909794344' })
          .setDescription(`ID: ${scamAuthor.id} \nJoined Discord: ${new Date(scamAuthor.createdTimestamp).toLocaleDateString()}`)
    
        client.channels.cache.get(log).send({ embeds: [scamEmbed, authorEmbed] }); //normal server
        break;
      }
    }
  },
};
