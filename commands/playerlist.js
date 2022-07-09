const list = require('minecraft-server-util');

module.exports = {
    name: 'playerlist',
    execute(message,Discord,client){

        var ChannelName = message.channel.name
        if(ChannelName !== "bot-tests") return //snapshot-ingame-chat
        if(message.author.bot) return;
       
        if(message.content.includes('!playerlist')){

        list.status('snapshot.pandamium.eu').then((Response) =>{
            message.delete()
            const nameArr = Response.players.sample.map(obj => obj.name).join(", ");
            const playerembed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .addFields(
                            {name: 'Online:', value: ` ${Response.players.online}/${Response.players.max}`,},
                            {name:`Players:`, value: `\`\`\`${nameArr}\`\`\`` },
                        )
                        message.channel.send(({embeds: [playerembed]})).then(message => {setTimeout(() => message.delete(), 1000 * 30)});;
                        nameArr.clear();
         })
        .catch ((error) =>{
            message.channel.send('There was an error!');
            throw error;
        })}
    }
}