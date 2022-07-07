const ipFilter = require(`../filters/ipfilter.json`);
const fs = require('fs');
const list = require('minecraft-server-util');

//remove Punctuation
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
    name: 'ip',
    execute(message,Discord,client){
      if (message.author == client.user) return;
      if (message.author.bot) return;

  const filterpunctuation = message.content
   let ipfoundInText = false;
   for (var i in ipFilter) {
   if (removeCapPunctuation(filterpunctuation).toLowerCase().includes(ipFilter[i])) ipfoundInText = true;
   }
   if (ipfoundInText) {
      message.react('<:resolved:942896814154199150> ')
    

      list.status('pandamium.eu').then((Responses) =>{
        list.status('snapshot.pandamium.eu').then((Response) =>{
          const snapVersionIP = Response.version.name
          const releaseversionIP = Responses.version.name
  
        const ip2embed = new Discord.MessageEmbed()
        .setColor('#008000')
        .setTitle("Pandamium Server IP's")
        .addFields(
          {name:`Release IP: `,value:`pandamium.eu\n **Version:** ${releaseversionIP}\n\n`},
          {name: `Snapshot IP: `, value: `snapshot.pandamium.eu\n **Version:** ${snapVersionIP}`},
          )
    
        message.channel.send({embeds: [ip2embed]}) //.then(message => {setTimeout(() => message.delete(), 60000)});
   }) }) }}}