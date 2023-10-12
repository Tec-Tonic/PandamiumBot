const { EmbedBuilder } = require("discord.js");
const utility = require("minecraft-server-util");
const axios = require("axios");
let loopFlag = true; // Flag variable to control the loop
let lastBotMessage; // Variable to store the last bot message

module.exports = async function playerlistUpdate(client, commandExecuted) {
  // Check if the command was executed
  if (commandExecuted) {
    try {
      const url = `https://api.mcstatus.io/v2/status/java/snapshot.pandamium.eu`;
      const server = await axios.get(url);
      const checkIfPlayer = server.data.players.online;
      const unixTimestamp = Math.floor((Date.now() + 300000) / 1000);
      // Message to Update
      const guildID = '504627012921589763';
      const channelID = '824234748217393212';
      const guild = client.guilds.cache.get(guildID);
      const channel = guild.channels.cache.get(channelID);
      // Fetch the last message sent by the bot in the channel
      channel.messages.fetch().then((messages) => {
        lastBotMessage = messages.filter(m => m.author.id === client.user.id).last();
        
        // Check if the server is empty or not
        if (checkIfPlayer === 0) {
          const ServerEmpty = new EmbedBuilder()
            .setColor("#FF0000")
            .setTitle("**Server is Empty**")
            .setDescription(`*Message will refresh <t:${unixTimestamp}:R>*`)
            .setFooter({ text: `Version: ${server.data.version.name_raw}` });
          
          if (!lastBotMessage || !lastBotMessage.editable) {
            channel.send({content: "# The chat linking mod we have been using is currently broken in the latest Minecraft version. Keep an eye on <#505093367903027220> to know when this channel is working again. \n## You can use </playerlist:1102727613102960663> in <#614507998357880862>.", embeds: [ServerEmpty] }).then(newMessage => {
              if (lastBotMessage) {
                lastBotMessage.delete(); 
              }
              lastBotMessage = newMessage;
            });
          } else {
            lastBotMessage.edit({content:"# The chat linking mod we have been using is currently broken in the latest Minecraft version. Keep an eye on <#505093367903027220> to know when this channel is working again. \n## You can use </playerlist:1102727613102960663> in <#614507998357880862>.", embeds: [ServerEmpty] });
          }
        } else {
          const options = {
            sessionID: 1, // a random 32-bit signed number, optional
            enableSRV: true, // SRV record lookup
          };
          utility.queryFull("pandamium.eu", 25566, options).then((Response) => {
            const nameArr = Response.players.list.join(", ").toString();
            const playerlistEmbed = new EmbedBuilder()
              .setColor("#2DF904")
              .setTitle(`**Online players (${Response.players.online}/${Response.players.max}):**`)
              .setDescription(`\`\`\`${nameArr}\`\`\`\n*Message will refresh <t:${unixTimestamp}:R>*`)
              .setFooter({ text: `Version: ${server.data.version.name_raw}` });
            
            if (!lastBotMessage || !lastBotMessage.editable) {
              channel.send({content:"# The chat linking mod we have been using is currently broken in the latest Minecraft version. Keep an eye on <#505093367903027220> to know when this channel is working again. \n## You can use </playerlist:1102727613102960663> in <#614507998357880862>.", embeds: [playerlistEmbed] }).then(newMessage => {
                if (lastBotMessage) {
                  lastBotMessage.delete(); 
                }
                lastBotMessage = newMessage;
              });
            } else {
              lastBotMessage.edit({content:"# The chat linking mod we have been using is currently broken in the latest Minecraft version. Keep an eye on <#505093367903027220> to know when this channel is working again. \n## You can use </playerlist:1102727613102960663> in <#614507998357880862>.", embeds: [playerlistEmbed] });
            }
          });
        }
      });
    } catch {
      const unixTimestamp = Math.floor((Date.now() + 300000) / 1000);
      const serverOffline = new EmbedBuilder()
        .setColor("#FF0000")
        .setTitle("**Server is offline**")
        .setDescription(`*Message will refresh <t:${unixTimestamp}:R>*`);
      
      if (!lastBotMessage || !lastBotMessage.editable) {
        channel.send({content:"# The chat linking mod we have been using is currently broken in the latest Minecraft version. Keep an eye on <#505093367903027220> to know when this channel is working again. \n## You can use </playerlist:1102727613102960663> in <#614507998357880862>.", embeds: [serverOffline] }).then(newMessage => {
          if (lastBotMessage) {
            lastBotMessage.delete(); 
          }
          lastBotMessage = newMessage;
        });
      } else {
        lastBotMessage.edit({content:"# The chat linking mod we have been using is currently broken in the latest Minecraft version. Keep an eye on <#505093367903027220> to know when this channel is working again. \n## You can use </playerlist:1102727613102960663> in <#614507998357880862>.", embeds: [serverOffline] });
      }
    }
  }
  // Continue running the loop until loopFlag is set to false
  if (loopFlag) {
    setTimeout(() => {
      playerlistUpdate(client, commandExecuted);
    }, 300000); // Every 5 Min
  }
};

// Function to stop the loop
module.exports.stopLoop = function() {
  loopFlag = false;
};