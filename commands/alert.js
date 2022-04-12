//const log = require(`../logtoserver.json`).toString('')
module.exports = {
    name: 'alert',
    execute(message,Discord,client){
      
    const alertEmbed = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setTitle("Alert!")
      .addFields(
        {name:`Snapshot Server`,value:`Went offline <t:${parseInt(message.author.createdTimestamp / 1000, 10)}>`}
        )
    
        message.channel.send({embeds: [alertEmbed]})
}}