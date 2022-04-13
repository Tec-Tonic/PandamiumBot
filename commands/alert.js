const mylog = "963436191426957352"
module.exports = {
    name: 'alert',
    execute(message,Discord,client){
      
    const alertEmbed = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setTitle("Alert!")
      .addFields(
        {name:`Snapshot Server`,value:`Went offline, <t:${Date.now()/ 1000 | 0}>`}
        )
    
        client.channels.cache.get(mylog).send({embeds: [alertEmbed]})
}}