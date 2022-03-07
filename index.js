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


client.once('ready', () => {
	client.user.setActivity(' the server', { type: 'WATCHING' });
    console.log(`${client.user.tag} is ready!`)

    // punishment location, channel checks
    const snapInGameChannel = "604630001957994504"
    const releaseInGameChannel = "824234748217393212"
    let topicChannelName = "Discord"
    let topicChannel = message.channelId

const scamLinkFlter = require(`./filters/filter.json`);
// scam filter
client.on("messageCreate", message => {
    var content = message.content;
    var stringToCheck = content.replace(/\s+/g, '').toLowerCase();
    var stringToCheck = content;
    stringToCheck.replace(/\s+/g, '').toLowerCase();
    const scamAuthor = message.author
    //const scamAuthorNoPing = message.author.username
    const scamChannel = message.channelId

    if (topicChannel === snapInGameChannel) topicChannelName = "Snapshot" 
    if (topicChannel === releaseInGameChannel) topicChannelName = "Release" 

    for (var i = 0; i < scamLinkFlter.length; i++) {
        if (content.includes(scamLinkFlter[i])){  
            message.delete();
            client.channels.cache.get('948990457201975308').send(`[${topicChannelName}] ${scamAuthor} sent a scam link in <#${scamChannel}>. Message was deleted! `)
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
    if (topicChannel === snapInGameChannel) topicChannelName = "Snapshot" 
    if (topicChannel === releaseInGameChannel) topicChannelName = "Release" 
    let foundInText = false;
    for (var i in slurFilter) {
    if (message.content.toLowerCase().includes(slurFilter[i].toLowerCase())) foundInText = true;
    }
    if (foundInText) {
        client.channels.cache.get('948990457201975308').send(`[${topicChannelName}] Slurs are being used in <#${slurChannel}> \n${slurTextLink}`)
      return;
    }
})
const topicFilter = require(`./filters/chatalerts.json`);
// controversial topic filter
client.on("messageCreate", message => {
    const topicWithNameChannel = message.channelId
    if (topicChannel === snapInGameChannel) topicChannelName = "Snapshot" 
    if (topicChannel === releaseInGameChannel) topicChannelName = "Release" 
    const topicTextLink = message.url

    let topicFoundInText = false;
    for (var i in topicFilter) {
    if (message.content.toLowerCase().includes(topicFilter[i].toLowerCase())) topicFoundInText = true;
    }
    if (topicFoundInText) {
        client.channels.cache.get('948990457201975308').send(`[${topicChannelName}] Possible __controversial topic__ being mentioned in <#${topicWithNameChannel}> \n${topicTextLink}`)
      return;
    }
})  

// client.on('messageCreate', (message) => {
//     if (message.author.bot) return;
//     const ipCheckWords = require(`./filters/ipcheckfliter.json`)
    
//     let ipFoundInText = false;
//     for (var i in ipCheckWords) {
//     if (message.content.toLowerCase().includes(ipCheckWords[i].toLowerCase())) ipFoundInText = true;
//     }
//     if (ipFoundInText) {
//         message.channel.send('Release Server IP: pandamium.eu \nSnapshot Server IP: snapshot.pandamium.eu')
//       return;
//     }
// })

});


client.login(process.env.TOKEN);