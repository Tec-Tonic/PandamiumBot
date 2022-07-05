
module.exports = {
    name: 'confirmDelete',
    execute(message,Discord,client){

const deletedMessage = message.content
const deletedMessageAuthor = deletedMessage.author.user.username
const deleteMsgEmbed = new Discord.MessageEmbed().setColor('#FF0000').setTitle("Message Deleted").addFields(
  {name: `Message :`, value: `${deletedMessage}`},
  {name: `Info :`, value: `${deletedMessageAuthor}`}
  )
client.channels.cache.get(personalLog).send(({embeds: [deleteMsgEmbed]}))

    }
}