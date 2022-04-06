const log = require(`../logtoserver.json`).toString('')
module.exports = {
    name: 'hacks',
    execute(message,Discord,client){

const cheatChannel = message.channelId
const cheatTextLink = message.url
const cheatmessagelog = message.content

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