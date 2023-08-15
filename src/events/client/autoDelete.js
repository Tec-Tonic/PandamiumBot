module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    const MojiraFilter = require("../../chatAlert/filters/mojira_delete_filter.json");
    let MojiraFoundInText = false;
    for (var i in MojiraFilter) {
        if (message.content.toLowerCase().includes(MojiraFilter[i].toLowerCase()))
            if (message.channel.name === 'minecraft-updates')
                if (message.author.bot) {
          MojiraFoundInText = true;
        }
    }

    const inGameChatFilter = require("../../chatAlert/filters/chat_delete_filter.json");
    const remove = require('../../functions/events/punctuation')

    let TextFoundInText = false;
    const reminder = message.content
    for (var i in inGameChatFilter) {
        if (remove.Punctuation(reminder).toLowerCase().includes(remove.Punctuation(inGameChatFilter[i].toLowerCase())))
            if (message.channel.name === 'snapshot-ingame-chat')
                if (message.author.bot) {
          TextFoundInText = true;
        }
    }

    if (MojiraFoundInText) {
      message.react("❌");

      setTimeout(() => {
        return message.delete();
      }, 5000);
    }

    if (TextFoundInText) {
      message.react("❌");

      setTimeout(() => {
        return message.delete();
      }, 5000);
    }
    
  },
};
