const mlog = '963436191426957352' //'950432522137927690'

module.exports = {
    name: 'maintenance',
    execute(message,Discord,client){

const maintenanceEmbed = new Discord.MessageEmbed()
   .setColor('#10F1DC')
   .setTitle("Maintenance")
   .addFields(
     {name:`Status :`,value:`⚙️ Moved to maintenance mode.`},
   )
   client.channels.cache.get(mlog).send({embeds: [maintenanceEmbed]})
   
    }
}
