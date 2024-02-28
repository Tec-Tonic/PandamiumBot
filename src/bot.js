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
const path = require("path");

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

client.on("messageCreate", async (message) => {
  function readStaffData() {
    const filePath = path.join(__dirname, "./components/pandamium/staff.json");
    const staffData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(staffData);
  }
  const staffData = readStaffData();

  const staffMember = staffData.find((staff) => staff.id === message.author.id);

  if (staffMember) return;

  for (const file of commandFiles) {
    const { name } = require(`./chatAlert/alerts/${file}`);
    if (message.author == client.user) return;
    client.command.get(name).execute(message, client);
  }

  const axios = require("axios");
  const ip = "release.pandamium.eu";
  let url = `https://api.mcstatus.io/v2/status/java/${ip}`;
  const server = await axios.get(url);

  try {
    client.user.setPresence({
      activities: [
        {
          name: `Release | ${server.data.players.online}/${server.data.players.max}`,
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

// Temp Edit 
client.once('ready', () => {
let channel = client.channels.cache.get('506498349029916673');

channel.messages.fetch('1091447822890582157')
  .then(message => {
    message.edit("https://cdn.discordapp.com/attachments/1079532215584706670/1212476590282506260/Supporter.png?ex=65f1f9d1&is=65df84d1&hm=c4bc0e4c782446e5eb53de7b96261a9091538e8d41b6a51ea8c0a05f21c93136&");
  })
  .catch(console.error);
})
client.eventHandler();
client.commandHandler();
client.componentHandler();
client.login(TOKEN);
