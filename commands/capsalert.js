const log = require(`../logtoserver.json`).toString('')
module.exports = {
    name: 'caps',
    execute(message,Discord,client){

    const capsChannel = message.channelId
    const capsTextLink = message.url
    const capsmessagelog = message.content

    const capsembed = new Discord.MessageEmbed()
        .setColor('#7b9bcc')
        .setTitle("Caps Warning!")
        .addFields(
            {name:`Message :`,value:`${capsmessagelog}`},
            {name: `Info :`, value: `check <#${capsChannel}> || [click me](${capsTextLink})`}
        ).setTimestamp()

        

        client.channels.cache.get(log).send({embeds: [capsembed]})
        
    }}