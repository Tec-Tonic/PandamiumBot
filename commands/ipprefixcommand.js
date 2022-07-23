const prefix = '!'
const list = require('minecraft-server-util');

module.exports = {
    name: 'prefixip',
    execute(message,Discord,client){
      
      if(!message.content.startsWith(prefix) || message.author.bot) return;
      message.react('<:resolved:942896814154199150> ')
    
      list.status('pandamium.eu').then((Responses) =>{
      list.status('snapshot.pandamium.eu').then((Response) =>{
        const snapVersionIP = Response.version.name
        const releaseversionIP = Responses.version.name

      const ip2embed = new Discord.MessageEmbed()
      .setColor('#008000')
      .setTitle("Pandamium Server IP's")
      .addFields(
        {name:`Release IP: `,value:`pandamium.eu\n **Version:** ${releaseversionIP}\n\n`},
        {name: `Snapshot IP: `, value: `snapshot.pandamium.eu\n **Version:** ${snapVersionIP}`},
        )
     
        message.channel.send({embeds: [ip2embed]}).then(message => {setTimeout(() => message.delete(), 60000)});

      })     }) }}