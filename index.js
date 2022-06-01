const Discord = require('discord.js');
const client = new Discord.Client({
    intents : [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES
    ]
});
require('dotenv').config()
const fs = require('fs');
const prefix = '!'
const log = require(`./logtoserver.json`).toString('')
const personalLog = '963436191426957352'
const slurFilter = require(`./filters/slurfilter.json`);
const topicFilter = require(`./filters/contro.json`);
const cheatFilter = require(`./filters/hacksfilter.json`);
const ipFilter = require(`./filters/ipfilter.json`);
const announcementFilter = require(`./filters/anouncement.json`)

var punctuation = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
function removeCapPunctuation(string) {
  return string
    .split('')
    .filter(function(letter) {
      return punctuation.indexOf(letter) === -1;
    })
    .join('');
}

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

client.on('messageCreate', message =>{   
 
// scam filter
  if (message.author == client.user) return;
  client.command.get('scam').execute(message,Discord,client)
         

// slur topic filter
  if (message.author == client.user) return;
  let slurfoundInText = false;
  for (var i in slurFilter) {
  if (message.content.toLowerCase().includes(slurFilter[i].toLowerCase())) slurfoundInText = true;
  }
  if (slurfoundInText) {
    client.command.get('slur').execute(message,Discord,client)
    return;
  }
 
// controversial topic filter   
    if (message.author == client.user) return;
    let topicFoundInText = false;
    for (var i in topicFilter) {
    if (message.content.toLowerCase().includes(topicFilter[i].toLowerCase())) topicFoundInText = true;
    }
    if (topicFoundInText) {
      client.command.get('contro').execute(message,Discord,client)
      return;
    }

// hacking topic filter
    if (message.author == client.user) return;
    let cheatFoundInText = false;
    for (var i in cheatFilter) {
    if (message.content.toLowerCase().includes(cheatFilter[i].toLowerCase())) cheatFoundInText = true;
    }
    if (cheatFoundInText) {
     client.command.get('hacks').execute(message,Discord,client)
      return;
    }
   // ip checks
   if (message.author == client.user) return;
   if (message.author.bot) return;
         const filterpunctuation = message.content
   let ipfoundInText = false;
   for (var i in ipFilter) {
   if (removeCapPunctuation(filterpunctuation).toLowerCase().includes(ipFilter[i])) ipfoundInText = true;
   }
   if (ipfoundInText) {
       message.react('☑️')
       client.command.get('ip').execute(message,Discord,client)
     return;
   }

// Caps
    if (message.author == client.user) return; 
    if (!message.author.bot) return;
    if (message.content.includes("Online players")) {return};
    if (message.content.includes('<@')) {return};
    if (message.content.length < 15) return;
        let non_caps = 0
        let caps = 0
    const filterCapPunctuation = message.content
    for (x=0;x<message.content.length;x++) {
      if (removeCapPunctuation(filterCapPunctuation[x]).toUpperCase() === message.content[x]) caps++;
      else non_caps++;
    }
    const textCaps = (caps / message.content.length) * 100;
    if (textCaps >= 75 ) {
        client.command.get('caps').execute(message,Discord,client)
    }

       // prefix ip command
  if(!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  if(command === 'ip'){
    message.react('☑️')
    client.command.get('ip').execute(message,Discord,client)
} else if(command === 'sendupdate6370'){
  message.react('☑️')
  //client.command.get('maintenance').execute(message,Discord,client)
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