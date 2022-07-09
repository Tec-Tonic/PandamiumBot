const log = require(`../logtoserver.json`).toString('')
const slurFilter = require(`../filters/slurfilter.json`);
module.exports = {
    name: 'slur',
    execute(message,Discord,client){
      if (message.author == client.user) return;
        const slurChannel = message.channelId
        const slurTextLink = message.url
        const slurmessagelog = message.content
        const slurAuthor = message.author

        let slurfoundInText = false;
        
        for (var i in slurFilter) {
        if (message.content.toLowerCase().includes(slurFilter[i].toLowerCase())) slurfoundInText = true;
        }
        if (slurfoundInText) {
    
        const slurEmbed = new Discord.MessageEmbed()
          .setColor('#FF0000')
          .setTitle("Slurs")
          .addFields(
            {name:`Message :`,value:`|| ${slurmessagelog} ||`},
            {name:`Info: `,value: `check <#${slurChannel}> || [click me](${slurTextLink})`}
          ).setFooter(`Author : ${slurAuthor}`)

          client.channels.cache.get(log).send(({embeds: [slurEmbed]}))
        } else return;
      }}