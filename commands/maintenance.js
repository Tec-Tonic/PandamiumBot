const mlog = '947886430489837628' 
//⚙️ Moved to maintenance mode.
// 🔘
module.exports = {
    name: 'maintenance',
    execute(message,Discord,client){

const maintenanceEmbed = new Discord.MessageEmbed()
   .setColor('#10F1DC')
   .setTitle(`${args[0]}`)
   .addFields(
     {name:`${args[1]} :`,value:`${args[2]}`}
   )
   client.channels.cache.get(mlog).send({embeds: [maintenanceEmbed]})
   
    }
}
