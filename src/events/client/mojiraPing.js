module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    const MojiraFilter = require("../../chatAlert/filters/mojira_ping_filter.json");
    let MojiraFoundInText = false;
    for (var i in MojiraFilter) {
      if (message.content.toLowerCase().includes(MojiraFilter[i].toLowerCase()))
        if (message.channel.name === "minecraft-updates")
          if (message.author.bot) {
            MojiraFoundInText = true;
          }
    }
    if (MojiraFoundInText) {
      message.reply(`<@&1217903210035941497>`); // Minecraft News Pings
    }
  },
};
