const log = require(`../logtoserver.json`).toString('')
module.exports = {
    name: 'Scam Link',
    execute(message,Discord,client){
        const scamAuthor = message.author
        const scamChannel = message.channelId
        const scamTextLink = message.url

        const scamEmbed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle("Scam Link")
        .addFields(
            {name : "Scam link was Deleted!", value: `[click me](${scamTextLink})`},
            {name : `${scamAuthor} sent the message`, value : `In ${scamChannel}`}
            )

        client.channels.cache.get(log).send(({embeds: [scamEmbed]}))
                message.channel.send(`Sorry ${scamAuthor}, Scam links are not allowed. Open a ticket in <#750352670702698657> if this is a mistake!`)
                  .then(message => {setTimeout(() => message.delete(), 60000)});
//`[Scam-Links] ${scamAuthor} sent a scam link in <#${scamChannel}>. Message was deleted. `
        // const slurChannel = message.channelId
        // const slurTextLink = message.url
        // const slurmessagelog = message.content
        
        // const slurEmbed = new Discord.MessageEmbed()
        //   .setColor('#FF0000')
        //   .setTitle("Slurs!")
        //   .addFields(
        //     {name:`Message :`,value:`|| ${slurmessagelog} ||`},
        //     {name:`Info: `,value: `check <#${slurChannel}> || [click me](${slurTextLink})`}
        //   )
        //   client.channels.cache.get(log).send(({embeds: [slurEmbed]}))
}}