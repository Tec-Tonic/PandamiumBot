const ipFilter = require(`../filters/ipfilter.json`);
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
      message.react('☑️')
    
    const ip2embed = new Discord.MessageEmbed()
      .setColor('#008000')
      .setTitle("Pandamium Server IP's")
      .addFields(
        {name:`Release IP:`,value:`pandamium.eu`},
        {name: `Snapshot IP:`, value: `snapshot.pandamium.eu`}
        )
    
        message.channel.send({embeds: [ip2embed]}).then(message => {setTimeout(() => message.delete(), 60000)});
}}}