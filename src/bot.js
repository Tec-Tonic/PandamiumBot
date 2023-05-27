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

  try {
    client.user.setPresence({
      activities: [
        {
          name: `Release: ${server.data.players.online}/${server.data.players.max}`,
          type: ActivityType.Playing,
        },
      ],
      status: "online",
    });
  } catch {
    client.user.setPresence({
      activities: [{ name: `Minecraft`, type: ActivityType.Playing }],
      status: "online",
    });
  }
});

client.eventHandler();
client.commandHandler();
client.componentHandler();
client.login(TOKEN);
