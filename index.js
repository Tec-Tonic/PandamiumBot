require("dotenv").config();
const fs = require("fs");
const prefix = "!";
const APP_ID = '785978462837276684'
const GUILD_ID = '504627012921589763'
const BOT_TOKEN = 'Nzg1OTc4NDYyODM3Mjc2Njg0.Gi80Nt.clm5LSFzw9EnI32D6VHQoA--5kXTw426h7EpQc'


const { Partials, ChannelType } = require('discord.js');
const { registerCommands } = require("./utils/registry");
const util = require("minecraft-server-util");
const {ActionRowBuilder,ButtonBuilder,ButtonStyle,SelectMenuBuilder,EmbedBuilder,Client,GatewayIntentBits,ActivityType,Routes,Message,messageLink,Collection,channelLink,} = require("discord.js");
const { type } = require("os");

const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
  rest: { version: "10" }
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Chat Alert checks
client.command = new Collection();
const commandFiles = fs
  .readdirSync("./ChatAlerts/alerts")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./ChatAlerts/alerts/${file}`);
  client.command.set(command.name, command);
}

//DM message responder
client.on("messageCreate", async message => {
  
  let linkCode = Number(message.content.replace(/\D/g, ''))
  let author = message.author

  const codeEmbed = new EmbedBuilder().setColor('#F205FA').setDescription(`**Attempt to link Account**\n\n<@${author.id}>` + ' tried to send code ' + linkCode)

if (message.author.bot) return;
if(message.channel.type === ChannelType.DM) {
  if ( !linkCode ) return 
  message.reply('Hello, If you are trying to link your account please message <@604625105758322688> (you can click the @ to message it)')
  client.channels.cache.get('963436191426957352').send({ embeds: [codeEmbed] })
}
});


//interactions
client.rest.setToken(BOT_TOKEN);

client.on("interactionCreate", (interaction) => {
  if (interaction.isChatInputCommand()) {
    const { commandName } = interaction;
    const cmd = client.slashCommands.get(commandName);
    if (cmd) {
      cmd.run(client, interaction);
    } else {
      interaction.reply({ content: "This command has no run method." });
    }
  }
});


async function main() {
  try {
    client.slashCommands = new Collection();
    await registerCommands(client, "../commands");
    console.log(client.slashCommands);
    const slashCommandsJson = client.slashCommands.map((cmd) =>
      cmd.getSlashCommandJSON()
    );
    console.log(slashCommandsJson);
    await client.rest.put(Routes.applicationGuildCommands(APP_ID, GUILD_ID), {
      body: slashCommandsJson,
    });
    const registeredSlashCommands = await client.rest.get(
      Routes.applicationGuildCommands(APP_ID, GUILD_ID)
    );
    console.log(registeredSlashCommands);
    await client.login(BOT_TOKEN);
  } catch (err) {
    console.log(err);
  }
}

client.on('messageCreate', (message) => {
  const channelNames = message.channel.name
  if (channelNames === "release-ingame-chat") {

  util.status("pandamium.eu").then((Response) => {

    const checkIfPlayer = Response.players.online;
        if (checkIfPlayer.toString() === "0"){
          return client.user.setPresence({
            activities: [{ name: `Minecraft`, type: ActivityType.Playing }],
            status: "online",
          })
        } else {
    client.user.setPresence({
      activities: [{ name: `Release players: ${Response.players.online}/${Response.players.max}`, type: ActivityType.Playing }],
      status: "online",
    });
  }
  })
}
})

//message commands
client.on("messageCreate", (message) => {


  // scam filter
  if (message.author.bot) return;
  client.command.get("scam").execute(message, client);
  // slur topic filter
  client.command.get("slur").execute(message, client);
  // controversial topic filter
  client.command.get("contro").execute(message, client);
  // hacking topic filter
  client.command.get("hacks").execute(message, client);
  // ip checks
  client.command.get("ip").execute(message, client);
  // playerlist
  client.command.get("playerlist").execute(message, client);
  // prefix ip command
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  if (command === "ip") {
    client.command.get("prefixip").execute(message, client);
  }
});

main();
