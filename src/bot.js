require("dotenv").config();
const { TOKEN, logs, WELCOME } = process.env;
const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
  ActivityType,
  EmbedBuilder,
} = require("discord.js");
const fs = require("fs");
// Discord requirements ↓ ↑
const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildMembers,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

client.commands = new Collection();
client.command = new Collection();
client.buttons = new Collection();
client.commandArray = [];

// Handlers
const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

//Message Alerts
const commandFiles = fs
  .readdirSync("./src/chatAlert/alerts")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./chatAlert/alerts/${file}`);
  client.command.set(command.name, command);
}

// Filters each Alert file & Update Release x/100
client.on("messageCreate", async (message) => {
  for (const file of commandFiles) {
    const { name } = require(`./chatAlert/alerts/${file}`);
    if (message.author == client.user) return;
    client.command.get(name).execute(message, client);
  }

  // Updates Presence
  const axios = require("axios");
  let url = `https://api.mcstatus.io/v2/status/java/release.pandamium.eu`;

  const server = await axios.get(url);
  const checkIfPlayer = server.data.players.online;
    client.user.setPresence({
      activities: [
        {
          name: `Release: ${server.data.players.online}/${server.data.players.max}`,
          type: ActivityType.Playing,
        },
      ],
      status: "online",
    });
});


//temp
setInterval(playerlistUpdate, 300000); //Every 5 min.

async function playerlistUpdate() {
  const remove = require("../src/functions/events/punctuation");

  const axios = require("axios");
  const util = require("util");
  const url = `https://api.mcstatus.io/v2/status/java/snapshot.pandamium.eu`;
  const server = await axios.get(url);
  const search = util.inspect;
  const nameArr = await search(
    server.data.players.list.map((obj) => obj.name_clean).join(", ")
  );
  // Message to Update
  const msgID = "1107317681268461648";
  const channelID = "824234748217393212";
  const channel = client.channels.cache.get(channelID);
  
  //Checks if the server is Empty or not 
  const checkIfPlayer = server.data.players.online;
  if (checkIfPlayer.toString() === "0") {
    const ServerEmpty = new EmbedBuilder()
      .setColor("#FF0000")
      .setTitle(`**Server is Empty**`);

    channel.messages
      .fetch(msgID)
      .then((msg) => msg.edit({ embeds: [ServerEmpty] }));
  } else {
    const playerlistEmbed = new EmbedBuilder()
      .setColor("#2DF904")
      .setTitle(
        `**Online players (${server.data.players.online}/${server.data.players.max}):**`
      )
      .setDescription(
        `\`\`\`${remove.Punctuation(
          nameArr
        )}\`\`\`\n*This message updates every 5 minutes.*`
      )
      .setFooter({ text: `Version: ${server.data.version.name_raw}` });

    channel.messages
      .fetch(msgID)
      .then((msg) => msg.edit({ embeds: [playerlistEmbed] }));
  }
}

client.eventHandler();
client.commandHandler();
client.componentHandler();
client.login(TOKEN);
