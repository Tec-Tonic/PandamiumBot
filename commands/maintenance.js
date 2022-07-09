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
     {name:`Info :`,value:`🔘 Removed Caps Alert\n 🔘 Added the Author to all allerts!\n 🔘 !playerlist will now be deleted after 30 seconds \n\n **Misc** : I was not able to edit the amount of players sent with the !playerlist command, it will only ever show up to 12 players at a time. I will look into it, but sadly there isnt much I can do right now.`}
   )
   client.channels.cache.get(mlog).send({embeds: [maintenanceEmbed]})
   
    }
}
