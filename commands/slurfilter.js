const log = require(`../logtoserver.json`).toString('')
module.exports = {
    name: 'slur',
    execute(message,Discord,client){

        const slurChannel = message.channelId
        const slurTextLink = message.url
        const slurmessagelog = message.content
        
        const slurEmbed = new Discord.MessageEmbed()
          .setColor('#FF0000')
          .setTitle("Slurs!")
          .addFields(
            {name:`Message :`,value:`|| ${slurmessagelog} ||`},
            {name:`Info: `,value: `check <#${slurChannel}> || [click me](${slurTextLink})`}
          )
          client.channels.cache.get(log).send(({embeds: [slurEmbed]}))
}}