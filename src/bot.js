require("dotenv").config();
const { TOKEN, logs, welcome } = process.env;
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
  if (checkIfPlayer.toString() === "0") {
    client.user.setPresence({
      activities: [
        {
          name: `Release: ${server.data.players.online}/${server.data.players.max}`,
          type: ActivityType.Playing,
        },
      ],
      status: "online",
    });
  }
});

// welcome reactions
// TODO: Add Welcome channel ID to .env and Heroku config
//       Add a useful User Embed (info about them ect..)
//       Move to src/events/client -> Will allow for a cleaners bot.js file
client.on("guildMemberAdd", (user) => {
  const pandaEmoji = `<:pandamium:797762197567832105>`;
  setTimeout(() => {
    const message =
      user.guild.channels.cache.get(welcome).lastMessage;
    message.react(pandaEmoji);
  }, 500);

  // Update this
  // const authorEmbed = new EmbedBuilder()
  //   .setColor("#FF0000")
  //   .setThumbnail(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.jpeg`)
  //   .setDescription(
  //     `**<@${user.id}> joined**

  //     ID: ${user.id} \nJoined Discord: ${new Date(
  //       user.createdTimestamp
  //     ).toLocaleDateString()}`
  //   );
  //   client.channels.cache.get(logs).send({ embeds: [authorEmbed] })
});

client.eventHandler();
client.commandHandler();
client.componentHandler();
client.login(TOKEN);
