const log = require(`../logtoserver.json`).toString('')
module.exports = {
    name: 'alert',
    execute(message,Discord,client){
      
    const alertEmbed = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setTitle("Alert!")
      .addFields(
        {name:`Snapshot Server`,value:`Been offline for <t:1649706840:R>`}
        )
    
        client.channels.cache.get(log).send({embeds: [alertEmbed]})
}}