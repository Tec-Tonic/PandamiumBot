const Discord = require ("discord.js");
const { Intents } = Discord;
const intents = new Intents ();
for(const intent of Object.keys (Intents.FLAGS)){
intents.add(intent);
}
const client = new Discord.Client ({
  intents: intents
});
require('dotenv').config()

const topicChannelName = "Auto-log"
const logToServer = '948990457201975308'
// Panda server logs : 950432522137927690
// My server logs : 948990457201975308

client.once('ready', () => {
	client.user.setActivity(' Minecraft', { type: 'PLAYING' });
    console.log(`${client.user.tag} is ready!`)


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
            client.channels.cache.get(logToServer).send(`[${topicChannelName}] ${scamAuthor} sent a scam link in <#${scamChannel}>. Message was deleted! `)
            message.channel.send(`Sorry ${scamAuthor}, Scam links are not allowed. Open a ticket in <#750352670702698657> if this is a mistake!`)
            .then(message => {setTimeout(() => message.delete(), 600000)});
            break
        }
    }
})

const slurFilter = require(`./filters/slurfilter.json`);
// slur filter
client.on("messageCreate", message => {
    const slurChannel = message.channelId
    const slurTextLink = message.url
    
    let foundInText = false;
    for (var i in slurFilter) {
    if (message.content.toLowerCase().includes(slurFilter[i].toLowerCase())) foundInText = true;
    }
    if (foundInText) {
        client.channels.cache.get(logToServer).send(`[${topicChannelName}] Slurs are being used in <#${slurChannel}> \n${slurTextLink}`)
      return;
    }
})

const topicFilter = require(`./filters/chatalerts.json`);
// controversial topic filter
client.on("messageCreate", message => {    
    const topicChannel = message.channelId
    const topicTextLink = message.url

    let topicFoundInText = false;
    for (var i in topicFilter) {
    if (message.content.toLowerCase().includes(topicFilter[i].toLowerCase())) topicFoundInText = true;
    }
    if (topicFoundInText) {
        client.channels.cache.get(logToServer).send(`[${topicChannelName}] Possible __controversial topic__ being mentioned in <#${topicChannel}> \n${topicTextLink}`)
      return;
    }
})  

});


client.login(process.env.TOKEN);