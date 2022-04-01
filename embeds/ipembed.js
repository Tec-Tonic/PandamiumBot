new Discord.MessageEmbed()
.setColor('#008000')
.setTitle("Pandamium Server IP's")
.setDescription(`Release version : ${releaseVersion} \nSnapshot version : ${snapshotVersion}`)
.addFields(
  {name:`Release IP:`,value:`pandamium.eu`},
  {name: `Snapshot IP:`, value: `snapshot.pandamium.eu`}
).setTimestamp()