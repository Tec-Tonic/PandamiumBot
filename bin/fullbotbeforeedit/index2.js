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
  if(!message.content.startsWith(prefix) || message.author.bot) return;
      const args = message.content.slice(prefix.length).split(/ +/);
      const command = args.shift().toLowerCase();
      if(command === 'ip'){
        message.react('☑️')
        client.command.get('ip').execute(message,Discord,client)
    }
  })

  const scamLinkFlter = require(`./filters/filter.json`);
// scam filter
client.on("messageCreate", message => {
  if (message.author == client.user) return;
    var content = message.content;
      var stringToCheck = content.replace(/\s+/g, '').toLowerCase();
        var stringToCheck = content;

        const scamAuthor = message.author
          const scamChannel = message.channelId

stringToCheck.replace(/\s+/g, '').toLowerCase();
    for (var i = 0; i < scamLinkFlter.length; i++) {
        if (content.includes(scamLinkFlter[i])){  
            message.delete();

            const scamEmbed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle("Scam Link")
            .setDescription("Scam link deleted.")
            .addFields(
                {name : `Info :`, value : `Author: ${scamAuthor} || Channel: <#${scamChannel}>`}
                )
    
            client.channels.cache.get(log).send(({embeds: [scamEmbed]}))
                message.channel.send(`Sorry ${scamAuthor}, Scam links are not allowed. Open a ticket in <#750352670702698657> if this is a mistake!`)
                  .then(message => {setTimeout(() => message.delete(), 60000)});
            break
        }
    }
})

 
const slurFilter = require(`./filters/slurfilter.json`);
// slur topic filter
client.on("messageCreate", message => {    
  if (message.author == client.user) return;
  let slurfoundInText = false;
  for (var i in slurFilter) {
  if (message.content.toLowerCase().includes(slurFilter[i].toLowerCase())) slurfoundInText = true;
  }
  if (slurfoundInText) {
    client.command.get('slur').execute(message,Discord,client)
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
  

  const announcementFilter = require(`./filters/anouncement.json`)
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