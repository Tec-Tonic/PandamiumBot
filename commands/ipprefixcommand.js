const prefix = '!'
module.exports = {
    name: 'prefixip',
    execute(message,Discord,client){
      
      if(!message.content.startsWith(prefix) || message.author.bot) return;
      message.react('<:resolved:942896814154199150> ')
    const ip2embed = new Discord.MessageEmbed()
      .setColor('#008000')
      .setTitle("Pandamium Server IP's")
      .addFields(
        {name:`Release IP:`,value:`pandamium.eu`},
        {name: `Snapshot IP:`, value: `snapshot.pandamium.eu`}
        )
    
        message.channel.send({embeds: [ip2embed]}) //.then(message => {setTimeout(() => message.delete(), 60000)});
}}