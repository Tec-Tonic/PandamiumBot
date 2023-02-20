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
//const mongoose  = require('mongoose');
//const testSchema = require('./schema/watchlist_schema');

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

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);

  const readyEmbed = new EmbedBuilder().setColor('#36FF00').setDescription(`${client.user.tag} has logged in successfully.`)
  client.channels.cache.get('1024714159637680168').send({ embeds: [readyEmbed] })

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
const pinAuthorName = "Mojira #news"; // @Mojira#news - 1040686309074796564
const pinChannel = "614507998357880862"; // #snapshot-server-chat - 614507998357880862
const delmojiraBed = require('./filters/update_del.json') // filter words to delete from mojira

client.on("messageCreate", async (message) => {
  let delmsg = false;
  if (message.author.bot) return;
  const deleteEmbed = new EmbedBuilder().setColor('#FF0000').setTitle(`Mojira message being deleted in 10 second(s)`).setDescription(`\nMessage :\n${message}`)

  if (message.author.username === pinAuthorName) {
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


client.on('messageCreate', (msg) => {
  if (msg.author == client.user) return;
  const revokePost = new EmbedBuilder().setColor('#FF0000').setDescription('You may not comment on posts here, this channel is for high quality images only!')

  const channelName = msg.channel.name //
  if (channelName === 'gallery') { 
    if (msg.attachments.size > 0 | msg.embeds.length > 0) {
      return;
    } else {
      msg.delete()
        .then(msg => {
          console.log('Gallery message has been deleted')
          msg.channel.send({ embeds: [revokePost] })
            .then(delMsg => {
              setTimeout(() => delMsg.delete(), 30000)
            })
        })
    }
  }
})


//lang
client.on('interactionCreate', async (interaction) =>{

  const translate = require("@iamtraction/google-translate");
  const ISO6391 = require("iso-639-1");
  let toLang = ''
  let toLangFull = ''

    if (interaction.customId === 'LangSelector') {
      let choices = ""
      await interaction.values.forEach(async value => {
        choices += `${value}`
      })
      
  if(choices === 'english-select') {
      toLang = 'en'
      toLangFull = 'English'
  }
  else if(choices === 'chinese-select') {
    toLang = 'zh-cn'
    toLangFull = 'Mandarin'
  }
  else if(choices === 'hindi-select') {
    toLang = 'hi'
    toLangFull = 'Hindi'
  }
  else if(choices === 'spanish-select') {
    toLang = 'es'
    toLangFull = 'Spanish'
  }
  else if(choices === 'french-select') {
    toLang = 'fr'
    toLangFull = 'French'
  }
  else if(choices === 'arabic-select') {
    toLang = 'ar'
    toLangFull = 'Arabic'
  }
  else if(choices === 'russian-select') {
    toLang = 'ru'
    toLangFull = 'Russian'
  }
  else if(choices === 'portuguese-select') {
    toLang = 'pt'
    toLangFull = 'Portuguese'
  }
  else if(choices === 'indonesian-select') {
    toLang = 'id'
    toLangFull = 'Indonesian'
  }
  else if(choices === 'urdu-select') {
    toLang = 'ur'
    toLangFull = 'Urdu'
  }
  else if(choices === 'japanese-select') {
    toLang = 'ja'
    toLangFull = 'Japanese'
  }
  else if(choices === 'german-select') {
    toLang = 'de'
    toLangFull = 'German'
  }


  const ERRembed = new EmbedBuilder().setColor("#FF0000").setTitle(`Unable to translate!`);

  const translateFile = require('./commands/translator');

  const msgID = await translateFile.msgid
  const channelID = await translateFile.chanid
  const foreignLanguage = await client.channels.cache.get(channelID).messages.fetch(msgID);

  translate(foreignLanguage, { to: `${toLang}` })
    .then((res) => {
      const getIsoName = res.from.language.iso;
      const isoName = ISO6391.getName(getIsoName);

      const translatedEmbed = new EmbedBuilder().setColor("#00FFFF").setDescription(`${isoName} -> ${toLangFull}`).setFields({ name: `Original Message :`, value: `${foreignLanguage}` },{ name: `Translation :`, value: `${res.text}` }).setFooter({text: "Google Translate",iconURL:"https://www.transparentpng.com/thumb/google-logo/google-logo-png-icon-free-download-SUF63j.png",});
      interaction.reply({ embeds: [translatedEmbed], ephemeral: true });
    })
    .catch((err) => {
      interaction.reply({ embeds: [ERRembed], ephemeral: true });
      console.error(err);
    });

}

})

main();
