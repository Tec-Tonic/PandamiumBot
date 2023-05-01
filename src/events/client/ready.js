const { REST, ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder, EmbedBuilder, Client, GatewayIntentBits, ActivityType, Routes, Message, messageLink, Collection, channelLink, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");

const rest = new REST().setToken(process.env.TOKEN);
const clientId = '785978462837276684'
const guildId = '504627012921589763'

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Logged in as ${client.user.tag}!`)

        const axios = require('axios')
        const ip = 'release.pandamium.eu'
        let url = `https://api.mcstatus.io/v2/status/java/${ip}`
        const server = await axios.get(url)
    
        client.user.setPresence({
            activities: [{ name: `Release: ${server.data.players.online}/${server.data.players.max}`, type: ActivityType.Playing }],
            status: "online",
          });
          
    // rest.delete(Routes.applicationGuildCommand(clientId, guildId, '1102725564965605435'))
	// .then(() => console.log('Successfully deleted guild command'))
	// .catch(console.error);

    // rest.delete(Routes.applicationCommand(clientId, '1042597844885983354'))
	// .then(() => console.log('Successfully deleted application command'))
	// .catch(console.error);
    }
}