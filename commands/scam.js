const log = require(`../logtoserver.json`).toString('')
const scamLinkFlter = require(`../filters/filter.json`);
module.exports = {
    name: 'scam',
    execute(message,Discord,client){
    
        if (message.author == client.user) return;
        var content = message.content;
          var stringToCheck = content.replace(/\s+/g, '').toLowerCase();
            var stringToCheck = content;
    
            const scamAuthor = message.author
              const scamChannel = message.channelId
    
    stringToCheck.replace(/\s+/g, '').toLowerCase();
        for (var i = 0; i < scamLinkFlter.length; i++) {
            if (content.includes(scamLinkFlter[i])){  
                //message.delete();
    
                const scamEmbed = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle("Scam Link")
                .setDescription("Scam link deleted.")
                .addFields(
                    {name : `Info :`, value : `Author: ${scamAuthor} || Channel: <#${scamChannel}>`}
                    )
        
                client.channels.cache.get(log).send(({embeds: [scamEmbed]}))
                    //message.channel.send(`Sorry ${scamAuthor}, Scam links are not allowed. Open a ticket in <#750352670702698657> if this is a mistake!`)
                      //.then(message => {setTimeout(() => message.delete(), 60000)});
                break
            }
        }

    }}