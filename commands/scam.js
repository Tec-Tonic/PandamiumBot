const log = require(`../logtoserver.json`).toString('')
module.exports = {
    name: 'scam',
    execute(message,Discord,client){
        const scamAuthor = message.author
        const scamChannel = message.channelId
        
        const scamEmbed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle("Scam Link")
            .setDescription("Scam link deleted.")
            .addFields(
                {name : `Info :`, value : `Author: ${scamAuthor} || Channel: <#${scamChannel}>`}
                )
    
            client.channels.cache.get(log).send(({embeds: [scamEmbed]}))
}}