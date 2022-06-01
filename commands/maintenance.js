const mlog = '963436191426957352' //⚙️ Moved to maintenance mode.

module.exports = {
    name: 'maintenance',
    execute(message,Discord,client){

const maintenanceEmbed = new Discord.MessageEmbed()
   .setColor('#10F1DC')
   .setTitle("Maintenance")
   .addFields(
     {name:`Status :`,value:`⚙️ Disabled maintenance mode.`},
     {name :`Changes :`, value: `🔘 Moved all functions to their own folders (shouldnt effect anything you all see) \n🔘 Added more Error detection \n🔘 Added more checks (Will only go to a private server while testing)`}
   )
   client.channels.cache.get(mlog).send({embeds: [maintenanceEmbed]})
   
    }
}
