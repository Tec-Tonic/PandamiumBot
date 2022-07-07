const list = require('minecraft-server-util');

module.exports = {
    name: 'playerlist',
    execute(message,Discord,client){

        var ChannelName = message.channel.name
        if(ChannelName !== "snapshot-ingame-chat") return

        list.status('snapshot.pandamium.eu').then((Response) =>{
            const nameArr = Response.players.sample.map(obj => obj.name).join("\n");
           
            const playerembed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .addFields(
                            {name: 'Online:', value: ` ${Response.players.online}/${Response.players.max}`,},
                            {name:`Players:`, value: `${nameArr}` },
                        )
                        message.channel.send(({embeds: [playerembed]}));
                        return
          
         })
        .catch ((error) =>{
            message.channel.send('There was an error!');
            throw error;
        })
    }
}