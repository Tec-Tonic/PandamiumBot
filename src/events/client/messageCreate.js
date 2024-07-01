/*
Current File Content: 01/05/24

- Mojira New Java version Ping
- Mojira Invalid Version Delete
- Pandamium Info sent to Discord Delete
- DM Reply
- Vote Embed Creator
- Double Vote Credit Week
*/

const {
  REST,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  ChannelType,
} = require("discord.js");

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    // Sends ping if new Snapshot is detected
    const MojiraUpdateFilter = require("../../chatAlert/filters/mojira_ping_filter.json");
    let MojiraUpdatePing = false;
    for (var i in MojiraUpdateFilter) {
      if (
        message.content
          .toLowerCase()
          .includes(MojiraUpdateFilter[i].toLowerCase())
      )
        if (message.channel.name === "minecraft-updates")
          if (message.author.bot) {
            MojiraUpdatePing = true;
          }
    }
    if (MojiraUpdatePing) {
      message.reply(`<@&1217903210035941497>`); // Minecraft News Pings
    }
    // ^^^

    // If invalid version info is sent, delete
    const MojiraFilter = require("../../chatAlert/filters/mojira_delete_filter.json");
    let MojiraFoundInText = false;
    for (var i in MojiraFilter) {
      if (message.content.toLowerCase().includes(MojiraFilter[i].toLowerCase()))
        if (message.channel.name === "minecraft-updates")
          if (message.author.bot) {
            MojiraFoundInText = true;
          }
    }

    if (MojiraFoundInText) {
      message.react("❌");

      setTimeout(() => {
        return message.delete();
      }, 5000);
    }
    // ^^^

    // If server info is sent to discord, delete
    const inGameChatFilter = require("../../chatAlert/filters/chat_delete_filter.json");
    const remove = require("../../functions/events/punctuation");

    let TextFoundInText = false;
    const reminder = message.content;
    for (var i in inGameChatFilter) {
      if (
        remove
          .Punctuation(reminder)
          .toLowerCase()
          .includes(remove.Punctuation(inGameChatFilter[i].toLowerCase()))
      )
        if (message.channel.name === "snapshot-ingame-chat")
          if (
            message.author.bot ||
            message.author.id === "546277533138550786"
          ) {
            TextFoundInText = true;
          }
    }

    if (TextFoundInText) {
      message.react("❌");

      setTimeout(() => {
        return message.delete();
      }, 5000);
    }
    // ^^^

    // Vote Message Embed Creator
    if (
      message.author.bot &&
      (message.content.startsWith("*Rcon") ||
        message.content.startsWith("*Server"))
    ) {
      // Extract the username and reward credits from the message
      const match = message.content.match(
        /(?:Rcon|Server) \[Voting\] ([^\s]+) got (\d+) reward/
      );
      if (match) {
        const username = match[1];
        const credits = match[2];
        const creditWord = credits > 1 ? "credits" : "credit";

        // Delete the original message
        await message.delete();

        // Create an embed version of the message
        const embed = new EmbedBuilder()
          .setColor("#1f8b4c")
          .setDescription(
            `**[Voting]** ${username} got ${credits} reward ${creditWord} for voting!`
          );

        // Send the embed to the same channel
        await message.channel.send({ embeds: [embed] });
      }
    }
    // ^^^

          // Double Vote Credit Week
          const DVCmatch = message.content.includes(
            "The monthly leader boards have been reset and a week of double reward credits for voting has begun!"
          );
    
          const channel = client.channels.cache.get("505093367903027220"); 
    
          if (DVCmatch) {
            channel.send(
              "<@&1150149222331588730>\n# Double Voting Rewards Week!\nFor the next week, you will now receive 2 reward credits when voting for the **snapshot** server!"
            );
          }
    // ^^^

    // DM Reply
    let DMmessage = message.content;
    let author = message.author;

    const rejectMessage = new EmbedBuilder()
      .setColor("#FF0000")
      .setTitle("Linking Account")
      .setDescription(
        `Hey ${author.username}, \nIf you require help please use the help button below and a Staff member will respond when available. \n\nHappy Minecrafting, Pandamium`
      );

    const codeEmbed = new EmbedBuilder()
      .setColor("#F205FA")
      .setTitle(`**Direct Message Received**`)
      .setDescription(`${author.username} sent:\n${DMmessage}`);

    const button = new ButtonBuilder()
      .setCustomId(`dmHelp`)
      .setLabel(`Help`)
      .setStyle(ButtonStyle.Danger)
      .setDisabled(false);

    if (message.author.bot) return;
    if (message.channel.type === ChannelType.DM) {
      if (!DMmessage) return;
      message.reply({
        embeds: [rejectMessage],
        components: [new ActionRowBuilder().addComponents(button)],
      });

      client.channels.cache
        .get("1095405945917550623")
        .send({ embeds: [codeEmbed] }); //LOGS BOT SERVER
    }

    module.exports.author = author;
    // ^^^
  },
};
