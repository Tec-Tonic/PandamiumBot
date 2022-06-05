const mlog = '947886430489837628' 
//⚙️ Moved to maintenance mode.
// 🔘
module.exports = {
    name: 'maintenance',
    execute(message,Discord,client){

    let args = message.content.split(/ +/)

const maintenanceEmbed = new Discord.MessageEmbed()
   .setColor('#10F1DC')
   .setTitle(`${args[1]}`)
   .addFields(
     {name:`${args[2]} :`,value:`${args[3]}`}
   )
   client.channels.cache.get(mlog).send({embeds: [maintenanceEmbed]})
   
    }
}
