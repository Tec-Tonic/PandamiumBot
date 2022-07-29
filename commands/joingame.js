//const log = require(`../logtoserver.json`).toString('')
const personalLog = '963436191426957352'
const joinFilter = require(`../filters/joingamefilter.json`);

module.exports = {
    name: 'joinSnapshot',
    execute(message,Discord,client){
      if (message.author == client.user) return;

      if(message.embeds.length >= 0) 
      // Check if the Message has embed or not
      {
        let embed = message.embeds
        // console.log(embed) just a console.log
  
        for(let i = 0; i < embed.length; i++)
        // Loop it since in v13 you can send multiple embed in single message
        {
          
          if(embed[i].description === null) return;
          // check each embed if it has title or not, if it doesnt then do nothing
  
          if(embed[i].description.toLowerCase().includes('joined the game'))
          // check each embed if it includes word 'hi' or not
          {
            client.channels.cache.get(personalLog).send(embed)
          }
        }
      }

//       if(!message.author.username === "PandamiumBot") return

//     const joinMessage = message.content

// let joinGame = false;
//     for (var i in joinFilter) {
//     if (message.content.toLowerCase().includes(joinFilter[i].toLowerCase())) joinGame = true;
//     }
//     if (joinGame) {
     
// const joinEmbed = new Discord.MessageEmbed()
//    .setColor('#7b9bcc')
//    .setTitle(joinMessage)

//    client.channels.cache.get(personalLog).send({embeds: [joinEmbed]})
   
//   }
    }
}
