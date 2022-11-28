const list = require("minecraft-server-util");

module.exports = {
  name: "playerlist",
  execute(message, client) {
    var ChannelName = message.channel.name;
    if (ChannelName !== "snapshot-ingame-chat") return; //snapshot-ingame-chat
    if (message.author.bot) return;

    if (message.content.startsWith("!playerlist") || message.content.startsWith("!list")) {
      const options = {
        sessionID: 1, // a random 32-bit signed number, optional
        enableSRV: true // SRV record lookup
    };
    
    // The port and options arguments are optional, the
    // port will default to 25565 and the options will
    // use the default options.
    list.queryFull('pandamium.eu', 25566, options)
        .then((Response) => {

          message.delete();
          const checkIfPlayer = Response.players.online;
          if (checkIfPlayer.toString() === "0")
            return message.channel
              .send(`**No online players**`)
              .then((message) => {
                setTimeout(() => message.delete(), 1000 * 30);
              });

          const nameArr = Response.players.list.join(", ").toString()//.replace("__T0m__", "__Tec__");

          message.channel
            .send(
              ` **Online players (${Response.players.online}/${Response.players.max}):** \n\`\`\`${nameArr}\`\`\``
            )
            .then((message) => {
              setTimeout(() => message.delete(), 1000 * 30);
            });
        })
        .catch((error) => {
          message.channel.send("There was an error!");
          throw error;
        });
    }
  },
};
