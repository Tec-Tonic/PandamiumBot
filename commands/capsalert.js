const log = require(`../logtoserver.json`).toString('')
var punctuation = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
function removeCapPunctuation(string) {
  return string
    .split('')
    .filter(function(letter) {
      return punctuation.indexOf(letter) === -1;
    })
    .join('');
}

module.exports = {
    name: 'caps',
    execute(message,Discord,client){
      return;
    // const capsChannel = message.channelId
    // const capsTextLink = message.url
    // const capsmessagelog = message.content

    // if (!message.author.bot) return;
    // if (message.content.includes("Online players")) {return};
    // if (message.content.includes('<@')) {return};
    // if (message.content.length < 15) return;
    //     let non_caps = 0
    //     let caps = 0
    // const filterCapPunctuation = message.content
    // for (x=0;x<message.content.length;x++) {
    //   if (removeCapPunctuation(filterCapPunctuation[x]).toUpperCase() === message.content[x]) caps++;
    //   else non_caps++;
    // }
    // const textCaps = (caps / message.content.length) * 100;
    // if (textCaps >= 75 ) {
    
    // const capsembed = new Discord.MessageEmbed()
    //     .setColor('#7b9bcc')
    //     .setTitle("Caps Warning!")
    //     .addFields(
    //         {name:`Message :`,value:`${capsmessagelog}`},
    //         {name: `Info :`, value: `check <#${capsChannel}> || [click me](${capsTextLink})`}
    //     ).setTimestamp()

        

    //     client.channels.cache.get(log).send({embeds: [capsembed]})
        
    }}//}