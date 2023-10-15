const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    if (message.author.bot) return; // Ignore messages from bots

//     // Check if the message was sent in a channel called "Gallery"
//     if (message.channel.name !== "testing") return;

//     const authorId = message.author.id;
//     const lastMessages = messageHistory.get(authorId) || [];

//     if (
//       message.content &&
//       message.content.trim().length > 0 &&
//       !message.content.match(/\S/g)
//     ) {
//       // If the user sent plain text, add it to the last messages array
//       lastMessages.push(true);
//     } else {
//       // If the user did not send plain text, add false to the last messages array
//       lastMessages.push(false);
//     }

//     // Keep only the last 3 messages
//     if (lastMessages.length > 3) {
//       lastMessages.shift();
//     }

//     // Update the message history for the user
//     messageHistory.set(authorId, lastMessages);

//     // Check if the last 3 messages were plain text
//     if (lastMessages.length === 3 && lastMessages.every((message) => message)) {
//       // Send a reminder message
//       const reminderMessage = await message.channel.send(
//         `${message.author}, please do not send plain text messages here.`
//       );

//       // Delete the reminder message after 5 minutes
//       setTimeout(() => {
//         reminderMessage.delete();
//       }, 5 * 60 * 1000);
//       // Clear the message scores
//       messageHistory.set(authorId, []);
//     }
  },
};
