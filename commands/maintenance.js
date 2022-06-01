const mlog = '950432522137927690' //⚙️ Moved to maintenance mode.

module.exports = {
    name: 'maintenance',
    execute(message,Discord,client){

const maintenanceEmbed = new Discord.MessageEmbed()
   .setColor('#10F1DC')
   .setTitle("Maintenance")
   .addFields(
     {name:`Status :`,value:`⚙️ Disabled maintenance mode.`},
     {name :`Changes :`, value: `🔘 Moved all functions to their own folders (shouldnt effect anything you all see) \n🔘 Added more Error detection \n🔘 Added more checks (Will only go to a private server while testing) \n🔘 Fun fact : Main file went from 400 lines of code to 67 after I moved it all around.`}
   )
   client.channels.cache.get(mlog).send({embeds: [maintenanceEmbed]})
   
    }
}
