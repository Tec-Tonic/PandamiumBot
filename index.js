const Discord = require('discord.js');
const client = new Discord.Client({
    intents : [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_PRESENCES
       
    ]
});
require('dotenv').config()
const fs = require('fs');
const prefix = '!'
const personalLog = '963436191426957352' 
const banchannel = '780489408536772620' 

client.command = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.command.set(command.name, command);
}

client.once('ready', () => {
    const serverCount = client.guilds.cache.size
      client.user.setActivity('Discord', { type: 'WATCHING' });
      console.log(`Logged in as ${client.user.tag} on ${serverCount} servers`);
  });

  client.on('guildMemberAdd', (member) => {
    const pandaEmoji = `<:pandamium:797762197567832105>` 
    setTimeout(() => {                                  
        const message = member.guild.channels.cache.get('531885643626971170').lastMessage
        message.react(pandaEmoji)
    }, 500)
})

//Deleted message check
client.on('messageDelete', message => {
  client.command.get('confirmDelete').execute(message,Discord,client)
  })
  
client.on('messageCreate', message =>{   
// scam filter
  if (message.author == client.user) return;
    client.command.get('scam').execute(message,Discord,client)
// slur topic filter
    client.command.get('slur').execute(message,Discord,client)
// controversial topic filter   
    client.command.get('contro').execute(message,Discord,client)
// hacking topic filter
    client.command.get('hacks').execute(message,Discord,client)
// ip checks
    client.command.get('ip').execute(message,Discord,client)
// playerlist
    client.command.get('playerlist').execute(message,Discord,client)
// prefix ip command
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
if(command === 'ip'){ 
    client.command.get('prefixip').execute(message,Discord,client)
} else if(command === 'sendupdate6370'){
  message.react('☑️')
    client.command.get('maintenance').execute(message,Discord,client)
}

//Detect player join
    //client.command.get('joinSnapshot').execute(message,Discord,client)
    // if(message.embeds.length >= 0) 
    // // Check if the Message has embed or not
    // {
    //   let embed = message.embeds
    //    //console.log(embed) //just a console.log

    //   for(let i = 0; i < embed.length; i++)
    //   // Loop it since in v13 you can send multiple embed in single message
    //   {
        
    //     if(embed[i].description.toString() === null) return;
    //     // check each embed if it has title or not, if it doesnt then do nothing

    //     //if(embed[i].description.toLowerCase().includes('joined the game'))
    //     // check each embed if it includes word 'hi' or not
    //     {
    //       client.channels.cache.get(personalLog).send(embed[i].description.toString())
    //     }
    //   }
    // }
})

//ban appeal
client.on('messageCreate', async message => {
if (message.author == client.user) return;

    let replyThere = true;
    if(!message.reference) replyThere = false;
    if(message.content.includes('!appeal')){
      if(!message.member.roles.cache.some(r => r.name === "Staff")) return console.log(`${message.author.username} used !appeal`);
        if (replyThere){
          message.react('🆗')
        const repliedTo = await message.channel.messages.fetch(message.reference.messageId);
        let threadAuthor = repliedTo.author

        const msgAccept = new Discord.MessageEmbed()
        .setColor('#32FF00')
        .setTitle(`${repliedTo.author.username}`)
        .setDescription(`${repliedTo.content}`)
      
          await client.channels.cache.get(banchannel).send({embeds: [msgAccept]}).then(message =>{
          message.react('👍'),
          message.react('👎')
          message.startThread({
            name: `Appeal ${threadAuthor.username}`,
            autoArchiveDuration: 60,
            type: 'GUILD_PUBLIC_THREAD'
        });
          })
        
          

   
    }} 
  })

  client.login(process.env.TOKEN);