const personalLog = '963436191426957352'
module.exports = {
    name: 'confirmDelete',
    execute(message,Discord,client){

const deletedMessage = message.content
const deletedMessageAuthor = message.author.username
const deletedMessageChannel = message.channelId

const deleteMsgEmbed = new Discord.MessageEmbed().setColor('#FF0000').setTitle("Message Deleted").addFields(
  {name: `Message :`, value: `${deletedMessage}`},
  {name: `Info :`, value: `Author | ${deletedMessageAuthor} Channel | ${deletedMessageChannel}`}
  )
client.channels.cache.get(personalLog).send(({embeds: [deleteMsgEmbed]}))

    }
}