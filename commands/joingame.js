//const log = require(`../logtoserver.json`).toString('')
const personalLog = '963436191426957352'
const joinFilter = require(`../filters/joingamefilter.json`);

module.exports = {
    name: 'joinSnapshot',
    execute(message,Discord,client){
      if (message.author == client.user) return;
      if(!message.author.username === "PandamiumBot") return

    const joinMessage = message.content

let joinGame = false;
    for (var i in joinFilter) {
    if (message.content.toLowerCase().includes(joinFilter[i].toLowerCase())) joinGame = true;
    }
    if (joinGame) {
     
const joinEmbed = new Discord.MessageEmbed()
   .setColor('#7b9bcc')
   .setTitle(joinMessage)

   client.channels.cache.get(personalLog).send({embeds: [joinEmbed]})
   
  }
    }
}
