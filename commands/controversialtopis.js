const log = require(`../logtoserver.json`).toString('')
const topicFilter = require(`../filters/contro.json`);
module.exports = {
    name: 'contro',
    execute(message,Discord,client){
      if (message.author == client.user) return;

const topicChannel = message.channelId
const topicTextLink = message.url
const topicmessagelog = message.content
const topicAuthor = message.author.username

let topicFoundInText = false;
    for (var i in topicFilter) {
    if (message.content.toLowerCase().includes(topicFilter[i].toLowerCase())) topicFoundInText = true;
    }
    if (topicFoundInText) {
     
const controEmbed = new Discord.MessageEmbed()
   .setColor('#7b9bcc')
   .setTitle("Controversial Topics!")
   .addFields(
     {name:`Message :`,value:`${topicmessagelog}`},
     {name: `Info :`,value: `check <#${topicChannel}> || [click me](${topicTextLink})`}
   ).setFooter(`Author : ${topicAuthor}`)
   
   client.channels.cache.get(log).send({embeds: [controEmbed]})
   
  }
    }
}
