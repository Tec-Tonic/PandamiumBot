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
      client.user.setActivity(' Discord', { type: 'WATCHING' });
      console.log(`Logged in as ${client.user.tag} on ${serverCount} servers`);
  });

client.on('messageCreate', message =>{ 
    if(!message.content.startsWith(prefix) || message.author.bot) return;
      const args =message.content.slice(prefix.length).split(/ +/);
      const command = args.shift().toLowerCase();
      if(command === 'ip'){
        message.react('☑️')
        client.command.get('ip').execute(message,Discord,client)
    }
  })

  const alertFilter = require(`./filters/alert.json`)
  // Current Alert Code for restarts
client.on("messageCreate", message => {
  let foundInText = false;
    for (var i in alertFilter) {
    if (message.content.toLowerCase().includes(alertFilter[i].toLowerCase())) foundInText = true;
    }
    const formatAMPM = (date) => {
      let hours = date.getHours();
      let minutes = date.getMinutes();    
      const ampm = hours >= 12 ? 'pm' : 'am';
      hours %= 12;
      hours = hours || 12;    
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      const strTime = `${hours}:${minutes} ${ampm}`;
      return strTime;
    };
    if (formatAMPM(new Date()) == '12:00 pm') return;
    if (formatAMPM(new Date()) == '12:00 am') return;
    if (formatAMPM(new Date()) == '6:00 pm') return;
    if (formatAMPM(new Date()) == '6:00 am') return;
    if (foundInText) {
     client.command.get('alert').execute(message,Discord,client)
      return;
    }
})

const topicFilter = require(`./filters/contro.json`);
// controversial topic filter
client.on("messageCreate", message => {    
    if (message.author == client.user) return;
    let topicFoundInText = false;
    for (var i in topicFilter) {
    if (message.content.toLowerCase().includes(topicFilter[i].toLowerCase())) topicFoundInText = true;
    }
    if (topicFoundInText) {
      client.command.get('contro').execute(message,Discord,client)
      return;
    }
})  

const cheatFilter = require(`./filters/hacksfilter.json`);
// hacking topic filter
client.on("messageCreate", message => {    
    if (message.author == client.user) return;
    let cheatFoundInText = false;
    for (var i in cheatFilter) {
    if (message.content.toLowerCase().includes(cheatFilter[i].toLowerCase())) cheatFoundInText = true;
    }
    if (cheatFoundInText) {
     client.command.get('hacks').execute(message,Discord,client)
      return;
    }
})  

client.on("messageCreate", message => {
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
  })

  const ipFilter = require(`./filters/ipfilter.json`);
const { waitForDebugger } = require('inspector');
  client.on("messageCreate", message => {
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
  })
  client.login(process.env.TOKEN);