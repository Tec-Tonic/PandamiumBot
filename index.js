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
const log = require(`./logtoserver.json`).toString('')
const personalLog = '963436191426957352'
const announcementFilter = require(`./filters/anouncement.json`)

client.command = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.command.set(command.name, command);
}

client.once('ready', () => {
    const serverCount = client.guilds.cache.size
      client.user.setActivity(' Discord!', { type: 'WATCHING' });
      console.log(`Logged in as ${client.user.tag} on ${serverCount} servers`);
  });

  client.on('guildMemberAdd', (member) => {
    setTimeout(() => {
        const message = member.guild.channels.cache.get('531885643626971170').lastMessage
        message.react('<:pandamium:797762197567832105>')
    }, 500)
})

client.on('messageCreate', message =>{   
// scam filter
  if (message.author == client.user) return;
  client.command.get('scam').execute(message,Discord,client)
         
// slur topic filter
  if (message.author == client.user) return;
    client.command.get('slur').execute(message,Discord,client)
  
// controversial topic filter   
  if (message.author == client.user) return;   
    client.command.get('contro').execute(message,Discord,client)
     
// hacking topic filter
  if (message.author == client.user) return;
    client.command.get('hacks').execute(message,Discord,client)
  
// ip checks
  if (message.author == client.user) return;
  if (message.author.bot) return;
    client.command.get('ip').execute(message,Discord,client)
  
// Caps
  if (message.author == client.user) return; 
    client.command.get('caps').execute(message,Discord,client)
    

// prefix ip command
if (message.author == client.user) return;
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  if(command === 'ip'){
    client.command.get('prefixip').execute(message,Discord,client)
} else if(command === 'sendupdate6370'){
  message.react('☑️')
    client.command.get('maintenance').execute(message,Discord,client)
}

  })

    
  //Announcement checks
  const wait = require('util').promisify(setTimeout);
  client.on("messageCreate", async message => {
    if (message.author == client.user) return;
    await wait(1000)
    let foundmessage = message.content
    let args1 = message.content.replace(`<@&980742669779234857> The Snapshot server was updated to`).split(/ +/)
      foundmessage = args1[1]
        let announcefoundInText = false;
      for (var i in announcementFilter) {
       if (message.content.toLowerCase().includes(announcementFilter[i].toLowerCase())) announcefoundInText = true;
      }
      if (announcefoundInText) {
        client.channels.cache.get(personalLog).send(foundmessage)
        return;
      }
  })
  client.login(process.env.TOKEN);