const log = require(`../logtoserver.json`).toString('')

module.exports = {
    name: 'contro',
    execute(message,Discord,client){

const topicChannel = message.channelId
const topicTextLink = message.url
const topicmessagelog = message.content

const controEmbed = new Discord.MessageEmbed()
   .setColor('#7b9bcc')
   .setTitle("Controversial Topics!")
   .addFields(
     {name:`Message :`,value:`${topicmessagelog}`},
     {name: `Info :`,value: `check <#${topicChannel}> || [click me](${topicTextLink})`}
   )
   client.channels.cache.get(log).send({embeds: [controEmbed]})
   
    }
}
