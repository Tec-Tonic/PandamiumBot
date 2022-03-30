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

const snapshotVersion = "22w12a"
const releaseVersion = "1.18.2"
const topicChannelName = "[Auto-Log]"
const logToServer = '947886430489837628'
// Panda server logs : 950432522137927690
// My server logs : 947886430489837628 

client.once('ready', () => {
	client.user.setActivity(' Minecraft', { type: 'PLAYING' });
    console.log(`Logged in as Utility`);
});

const scamLinkFlter = require(`./filters/filter.json`);
// scam filter
client.on("messageCreate", message => {
    var content = message.content;
    var stringToCheck = content.replace(/\s+/g, '').toLowerCase();
    var stringToCheck = content;
stringToCheck.replace(/\s+/g, '').toLowerCase();
    const scamAuthor = message.author
    const scamChannel = message.channelId

    for (var i = 0; i < scamLinkFlter.length; i++) {
        if (content.includes(scamLinkFlter[i])){  
            message.delete();
            client.channels.cache.get(logToServer).send(`${topicChannelName} ${scamAuthor} sent a scam link in <#${scamChannel}>. Message was deleted. `)
            message.channel.send(`Sorry ${scamAuthor}, Scam links are not allowed. Open a ticket in <#750352670702698657> if this is a mistake!`)
            .then(message => {setTimeout(() => message.delete(), 600000)});
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

    let foundInText = false;
    for (var i in slurFilter) {
    if (message.content.toLowerCase().includes(slurFilter[i].toLowerCase())) foundInText = true;
    }
    if (foundInText) {
        client.channels.cache.get(logToServer).send(`${topicChannelName} Slurs are being used in <#${slurChannel}> \n> ||${slurmessagelog}|| \n${slurTextLink}`)
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
    
    let topicFoundInText = false;
    for (var i in topicFilter) {
    if (message.content.toLowerCase().includes(topicFilter[i].toLowerCase())) topicFoundInText = true;
    }
    if (topicFoundInText) {
        client.channels.cache.get(logToServer).send(`${topicChannelName} Possible __controversial topic__ being mentioned in <#${topicChannel}> \n> ${topicmessagelog} \n${topicTextLink}`)
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
    
    let cheatFoundInText = false;
    for (var i in cheatFilter) {
    if (message.content.toLowerCase().includes(cheatFilter[i].toLowerCase())) cheatFoundInText = true;
    }
    if (cheatFoundInText) {
        client.channels.cache.get(logToServer).send(`${topicChannelName} General terms about hacking/cheating being mentioned in <#${cheatChannel}> \n> ${cheatmessagelog} \n${cheatTextLink}`)
      return;
    }
})  
// Caps here
client.on("messageCreate", message => {
    if (message.author == client.user) return 
    if (message.content.includes("Online players")) {return};

    const capsChannel = message.channelId
    const capsTextLink = message.url
    const capsmessagelog = message.content

    if (message.content.length < 15) return;
    
    let non_caps = 0
    let caps = 0
  
    for (x=0;x<message.content.length;x++) {
      if (message.content[x].toUpperCase() === message.content[x]) caps++;
      else non_caps++;
    }
    const textCaps = (caps / message.content.length) * 100;
    if (textCaps >= 75 ) {
      var fixedpercent = parseFloat(textCaps).toFixed( 1 );

      const capsmessagelength = message.content.length

      const capsembed = new Discord.MessageEmbed()
      .setColor('#7b9bcc')
      .setTitle("Auto-Log")
      .setDescription(`Message length : ${capsmessagelength}`)
      .addFields(
        {name:`Message :`,value:`${capsmessagelog}`},
        {name: `${fixedpercent}% Uppercase`, value: `check <#${capsChannel}> || [click me](${capsTextLink})`}
      ).setTimestamp()
      client.channels.cache.get(logToServer).send({embeds: [capsembed]})
      
        
        //(`${topicChannelName} This message is ${fixedpercent}% caps, check <#${capsChannel}> \n> ${capsmessagelog} \n${capsTextLink}`)
     
    }
  })

  // ip check
  const ipFilter = require(`./filters/ipfilter.json`);

client.on("messageCreate", message => {
    if (message.author == client.user) return;
    const filterpunctuation = message.content
    const noCapsChannels = ['958674960442884116', '949458490664038430']
    if (message.channelId = noCapsChannels) return;
    
    const ipembed = new Discord.MessageEmbed()
    .setColor('#008000')
    .setTitle("Pandamium Server Ip's")
    .setDescription(`Snapshot version : ${snapshotVersion}\nRelease version : ${releaseVersion}`)
    .addFields(
      {name:`Release Ip:`,value:`pandamium.eu`},
      {name: `Snapshot Ip:`, value: `snapshot.pandamium.eu`}
    ).setTimestamp()

    var punctuation = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';

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
    if (removePunctuation(filterpunctuation).toLowerCase().includes(ipFilter[i].toLowerCase())) ipfoundInText = true;
    }
    if (ipfoundInText) {
        message.channel.send({embeds: [ipembed]}).then(message => {setTimeout(() => message.delete(), 600000)});
      return;
    }
})


client.login(process.env.TOKEN);