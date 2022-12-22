require("dotenv").config();
const fs = require("fs");
const prefix = "!";
const APP_ID = '785978462837276684'
const GUILD_ID = '504627012921589763'



const BOT_TOKEN = process.env.TOKEN //require("./server_bot_token.json").toString();


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
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildMembers
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
  rest: { version: "10" }
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  const readyEmbed = new EmbedBuilder().setColor('#36FF00').setDescription(`${client.user.tag} has logged in successfully.`)
  client.channels.cache.get('1024714159637680168').send({ embeds: [readyEmbed] })

  // how to delete a command!
  //client.rest.delete(Routes.applicationGuildCommand(APP_ID, GUILD_ID, '1014613696221298889')).then(() => console.log('Successfully deleted guild command')).catch(console.error);

});

// welcome reactions
client.on('guildMemberAdd', (member) => {
  const pandaEmoji = `<:pandamium:797762197567832105>` 
  setTimeout(() => {                                  
      const message = member.guild.channels.cache.get('531885643626971170').lastMessage
      message.react(pandaEmoji)
  }, 500)
})

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


// Interaction(s)
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

  if (interaction.isContextMenuCommand()) {
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
    await client.rest.put(Routes.applicationCommands(APP_ID), {
      body: slashCommandsJson,
    });
    const registeredSlashCommands = await client.rest.get(
      Routes.applicationCommands(APP_ID)
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
          client.user.setStatus('idle')
          return client.user.setPresence({
            activities: [{ name: `Release players: ${Response.players.online}/${Response.players.max}`, type: ActivityType.Playing }]
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

// Message commands
client.on("messageCreate", (message) => {


  // Scam filter
  if (message.author == client.user) return;
  client.command.get("scam").execute(message, client);
  // Slur topic filter
  client.command.get("slur").execute(message, client);
  // Controversial topic filter
  client.command.get("contro").execute(message, client);
  // Hacking topic filter
  client.command.get("hacks").execute(message, client);
  // IP checks
  client.command.get("ip").execute(message, client);
  // Playerlist
  client.command.get("playerlist").execute(message, client);
  // Prefix IP command
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  if (command === "ip") {
    client.command.get("prefixip").execute(message, client);
  }
});

//pin message command
//auths
const pinAuthorID = "1040686309074796564"; // @Mojira#news - 1040686309074796564
const pinChannel = "614507998357880862"; // #snapshot-server-chat - 614507998357880862
const delmojiraBed = require('./ChatAlerts/filters/update_del.json') // filter words to delete from mojira

client.on("messageCreate", async (message) => {
  let delmsg = false;
  if (message.author.bot) return;
  const deleteEmbed = new EmbedBuilder().setColor('#FF0000').setTitle(`Mojira message being deleted in 10 second(s)`).setDescription(`\nMessage :\n${message}`)

  if (message.author.id === pinAuthorID) {
    if (message.channelId === pinChannel) {
      
      for (var i in delmojiraBed) {
      if (message.content.toLowerCase().includes(delmojiraBed[i].toLowerCase())) delmsg = true
      }

      if (delmsg){
          message.react("❌")
          client.channels.cache.get('1024714159637680168').send({embeds : [deleteEmbed]})

          setTimeout(function () {
            message.delete()
          }, 15000);

      } else {
        const test = await message.channel.messages.fetchPinned()
        const test2 = test.first()
        if (!test) return console.log(`No messages to unpin`)
        test2.unpin()

        message.pin();
      }
      
    }
  }
});

//embed reader 
client.on('messageCreate', (msg) =>{
  if (msg.author == client.user) return;
  const joinLeaveChannel = `1024719637201551410`
  const deathChannel = `1055267682787786822`
  const deathMessage = require('./ChatAlerts/filters/death_message_logs.json')
  

  msg.embeds.forEach((embed) => {
    const msgFilter = embed.author.name.toString().toLowerCase()

    const joinEmbed = new EmbedBuilder().setColor('#00FF00').setAuthor({name: embed.author.name, iconURL: embed.author.proxyIconURL})
    const leaveEmbed = new EmbedBuilder().setColor('#FF0000').setAuthor({name: embed.author.name, iconURL: embed.author.proxyIconURL})
    const deathEmbed = new EmbedBuilder().setColor('#000000').setAuthor({name: embed.author.name, iconURL: embed.author.proxyIconURL})
    console.log(embed.author.name);
    
    if (msgFilter.includes('joined the game')) {
    client.channels.cache.get(joinLeaveChannel).send({embeds : [joinEmbed]})
    }
    if (msgFilter.includes('left the game')) {
      client.channels.cache.get(joinLeaveChannel).send({embeds : [leaveEmbed]})
      }

      for (var i in deathMessage) {
      if (msgFilter.includes(deathMessage[i].toLowerCase)) {
        client.channels.cache.get(deathChannel).send({embeds : [deathEmbed]})
        }
      }
      
});
});

main();
