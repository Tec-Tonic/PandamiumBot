const Discord = require ("discord.js");
const fs = require('fs')
const { Intents } = Discord;
const intents = new Intents ();
for(const intent of Object.keys (Intents.FLAGS)){
intents.add(intent);
}
const client = new Discord.Client ({
  intents: intents
});
require('dotenv').config()

const prefix = '!'
const logToServer = '950432522137927690'
// Panda server logs : 950432522137927690
// My server logs : 947886430489837628 

client.once('ready', () => {
  const serverCount = client.guilds.cache.size
	client.user.setActivity(' Discord', { type: 'WATCHING' });
    console.log(`Logged in as ${client.user.tag} in ${serverCount}`);
});

client.on('messageCreate', message =>{ 
  const ip2embed = new Discord.MessageEmbed()
    .setColor('#008000')
    .setTitle("Pandamium Server IP's")
    .addFields(
      {name:`Release IP:`,value:`pandamium.eu`},
      {name: `Snapshot IP:`, value: `snapshot.pandamium.eu`}
    )
  if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args =message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
  if(command === 'ip'){
    message.channel.send({embeds: [ip2embed]})
  }
})

const scamLinkFlter = require(`./filters/filter.json`);
// scam filter
client.on("messageCreate", message => {
  if (message.author == client.user) return;
    var content = message.content;
      var stringToCheck = content.replace(/\s+/g, '').toLowerCase();
        var stringToCheck = content;
stringToCheck.replace(/\s+/g, '').toLowerCase();
    const scamAuthor = message.author
      const scamChannel = message.channelId

    for (var i = 0; i < scamLinkFlter.length; i++) {
        if (content.includes(scamLinkFlter[i])){  
            message.delete();
              client.channels.cache.get(logToServer).send(`[Scam-Links] ${scamAuthor} sent a scam link in <#${scamChannel}>. Message was deleted. `)
                message.channel.send(`Sorry ${scamAuthor}, Scam links are not allowed. Open a ticket in <#750352670702698657> if this is a mistake!`)
                  .then(message => {setTimeout(() => message.delete(), 60000)});
            break
        }
    }
})

const slurFilter = require(`./filters/slurfilter.json`);
// slur filter
client.on("messageCreate", message => {
    if (message.author == client.user) return;

    const slurChannel = message.channelId
    const slurTextLink = message.url
    const slurmessagelog = message.content

    const slurEmbed = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setTitle("Slurs!")
      .addFields(
        {name:`Message :`,value:`|| ${slurmessagelog} ||`},
        {name:`Info: `,value: `check <#${slurChannel}> || [click me](${slurTextLink})`}
      )

    let foundInText = false;
    for (var i in slurFilter) {
    if (message.content.toLowerCase().includes(slurFilter[i].toLowerCase())) foundInText = true;
    }
    if (foundInText) {
      client.channels.cache.get(logToServer).send({embeds: [slurEmbed]})
      return;
    }
})

const topicFilter = require(`./filters/chatalerts.json`);
// controversial topic filter
client.on("messageCreate", message => {    
    if (message.author == client.user) return;

    const topicChannel = message.channelId
    const topicTextLink = message.url
    const topicmessagelog = message.content
    
    const controEmbed = new Discord.MessageEmbed()
       .setColor('#7b9bcc')
       .setTitle("Controversial Topics!")
       .addFields(
         {name:`Message :`,value:`${topicmessagelog}`},
         {name: `Info :`,value: `check <#${topicChannel}> || [click me](${topicTextLink})`}
       )

    let topicFoundInText = false;
    for (var i in topicFilter) {
    if (message.content.toLowerCase().includes(topicFilter[i].toLowerCase())) topicFoundInText = true;
    }
    if (topicFoundInText) {
      client.channels.cache.get(logToServer).send({embeds: [controEmbed]})
      return;
    }
})  

const cheatFilter = require(`./filters/hacksfilter.json`);
// hacking topic filter
client.on("messageCreate", message => {    
    if (message.author == client.user) return;

    const cheatChannel = message.channelId
    const cheatTextLink = message.url
    const cheatmessagelog = message.content
    
    const cheatEmbed = new Discord.MessageEmbed()
      .setColor('#7b9bcc')
      .setTitle('Terms about Hacking/Cheating!')
      .addFields(
        {name: `Message :`, value: `${cheatmessagelog}`},
        {name: `Info :`, value: `Check <#${cheatChannel}> || [Click Me](${cheatTextLink})`}
      )

    let cheatFoundInText = false;
    for (var i in cheatFilter) {
    if (message.content.toLowerCase().includes(cheatFilter[i].toLowerCase())) cheatFoundInText = true;
    }
    if (cheatFoundInText) {
      client.channels.cache.get(logToServer).send({embeds: [cheatEmbed]})
      return;
    }
})  
// Caps here
client.on("messageCreate", message => {
    if (message.author == client.user) return 
    if (message.content.includes("Online players")) {return};
    if (message.content.includes('<@')) {return};

    const capsChannel = message.channelId
    const capsTextLink = message.url
    const capsmessagelog = message.content
    const filterCapPunctuation = message.content

    var punctuation1 = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';

    function removeCapPunctuation(string) {
      return string
        .split('')
        .filter(function(letter) {
          return punctuation1.indexOf(letter) === -1;
        })
        .join('');
    }

    if (message.content.length < 15) return;
    
    let non_caps = 0
    let caps = 0
  
    for (x=0;x<message.content.length;x++) {
      if (removeCapPunctuation(filterCapPunctuation[x]).toUpperCase() === message.content[x]) caps++;
      else non_caps++;
    }
    const textCaps = (caps / message.content.length) * 100;
    if (textCaps >= 75 ) {
      var fixedpercent = parseFloat(textCaps).toFixed( 1 );

      const capsembed = new Discord.MessageEmbed()
      .setColor('#7b9bcc')
      .setTitle("Caps Warning!")
      .addFields(
        {name:`Message :`,value:`${capsmessagelog}`},
        {name: `Info :`, value: `check <#${capsChannel}> || [click me](${capsTextLink}) \n${fixedpercent}% Uppercase`}
      ).setTimestamp()
      client.channels.cache.get(logToServer).send({embeds: [capsembed]})
     
    }
  })

  // ip check
  const ipFilter = require(`./filters/ipfilter.json`);

client.on("messageCreate", message => {
    if (message.author == client.user) return;
    if (message.author.bot) return;
   
    const filterpunctuation = message.content
   
    const ipembed = new Discord.MessageEmbed()
    .setColor('#008000')
    .setTitle("Pandamium Server IP's")
    .addFields(
      {name:`Release IP:`,value:`pandamium.eu`},
      {name: `Snapshot IP:`, value: `snapshot.pandamium.eu`}
    ).setTimestamp()

    var punctuation = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

    function removePunctuation(string) {
      return string
        .split('')
        .filter(function(letter) {
          return punctuation.indexOf(letter) === -1;
        })
        .join('');
    }

    let ipfoundInText = false;
    for (var i in ipFilter) {
    if (removePunctuation(filterpunctuation).toLowerCase().includes(ipFilter[i])) ipfoundInText = true;
    }
    if (ipfoundInText) {
        message.react('☑️')
        message.channel.send({embeds: [ipembed]}).then(message => {setTimeout(() => message.delete(), 60000)});
      return;
    }
})


client.login(process.env.TOKEN);