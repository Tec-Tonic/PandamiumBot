// module.exports = {
//     name: 'help',
//     execute(message,Discord,client){
//       if (message.author == client.user) return;

//       const helpEmbed = new Discord.MessageEmbed()
//       .setColor('#008000')
//       .setTitle("Help Menu")
//       .addFields(
//         {name:`!playerlist`,value:`- Sends a list of the player(s) on the Snapshot server.`},
//         {name:`!ip`,value:`- Sends an Embed with the server(s) IP and Version`},
//         {name: `!appeal`, value: `- Reply to a message then type the command, it will then turn the message into an Embed with a thread and an up and down vote`},
//         {name:`[Auto Actions]`,value:`- There are curentlly 4 : [Controversial Topics], [Hacking Topics], [Scam Link Detection], [Slur Filter]`},
//         )
//     }
// }