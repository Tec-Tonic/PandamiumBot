const mlog = '950432522137927690' //⚙️ Moved to maintenance mode.

module.exports = {
    name: 'maintenance',
    execute(message,Discord,client){

const maintenanceEmbed = new Discord.MessageEmbed()
   .setColor('#10F1DC')
   .setTitle("Maintenance")
   .addFields(
     {name:`Status :`,value:`⚙️ Removed maintenance mode.`},
   )
   client.channels.cache.get(mlog).send({embeds: [maintenanceEmbed]})
   
    }
}
