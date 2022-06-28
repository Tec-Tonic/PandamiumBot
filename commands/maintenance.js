const mlog = '950432522137927690' 
//⚙️ Moved to maintenance mode.
// 🔘
module.exports = {
    name: 'maintenance',
    execute(message,Discord,client){

    let args = message.content.split(/ +/)

const maintenanceEmbed = new Discord.MessageEmbed()
   .setColor('#10F1DC')
   .setTitle(`Changelog`)
   .addFields(
     {name:`Info :`,value:`🔘 Added more scam links to the list \n\nThe Bot will also log every message it deletes so I can keep track of any errors.`}
   )
   client.channels.cache.get(mlog).send({embeds: [maintenanceEmbed]})
   
    }
}
