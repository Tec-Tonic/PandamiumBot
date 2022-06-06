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
     {name:`Info :`,value:`🔘 Added \`!appeal\` command. \n\nJust reply to the message and then type !appeal. The message will be sent to <#780489408536772620> with a thread, and an Up and Down vote!`}
   )
   client.channels.cache.get(mlog).send({embeds: [maintenanceEmbed]})
   
    }
}
