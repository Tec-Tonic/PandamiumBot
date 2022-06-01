const log = require(`../logtoserver.json`).toString('')
const cheatFilter = require(`../filters/hacksfilter.json`);
module.exports = {
    name: 'hacks',
    execute(message,Discord,client){
      if (message.author == client.user) return;
const cheatChannel = message.channelId
const cheatTextLink = message.url
const cheatmessagelog = message.content

let cheatFoundInText = false;
    for (var i in cheatFilter) {
    if (message.content.toLowerCase().includes(cheatFilter[i].toLowerCase())) cheatFoundInText = true;
    }
    if (cheatFoundInText) {
     
const cheatEmbed = new Discord.MessageEmbed()
  .setColor('#7b9bcc')
  .setTitle('Terms about Hacking/Cheating!')
  .addFields(
    {name: `Message :`, value: `${cheatmessagelog}`},
    {name: `Info :`, value: `Check <#${cheatChannel}> || [Click Me](${cheatTextLink})`}
  )
  client.channels.cache.get(log).send({embeds: [cheatEmbed]})
    }
    }
}