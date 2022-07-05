const personalLog = '963436191426957352'
export const name = 'confirmDelete'
export function execute(message, Discord, client) {

    const deletedMessage = message.content
    const deletedMessageAuthor = message.author.username
    const deleteMsgEmbed = new Discord.MessageEmbed().setColor('#FF0000').setTitle("Message Deleted").addFields(
        { name: `Message :`, value: `${deletedMessage}` },
        { name: `Info :`, value: `${deletedMessageAuthor}` }
    )
    client.channels.cache.get(personalLog).send(({ embeds: [deleteMsgEmbed] }))

}