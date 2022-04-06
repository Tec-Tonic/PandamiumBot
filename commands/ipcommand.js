module.exports = {
    name: 'ip',
    execute(message,Discord,client){
      
    const ip2embed = new Discord.MessageEmbed()
      .setColor('#008000')
      .setTitle("Pandamium Server IP's")
      .addFields(
        {name:`Release IP:`,value:`pandamium.eu`},
        {name: `Snapshot IP:`, value: `snapshot.pandamium.eu`}
        )
    
        message.channel.send({embeds: [ip2embed]}).then(message => {setTimeout(() => message.delete(), 60000)});
}}