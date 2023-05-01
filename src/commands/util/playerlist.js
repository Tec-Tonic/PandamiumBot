const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require(`discord.js`);

const axios = require("axios");
const util = require("util");
const remove = require("../../functions/events/Punctuation");
const data = require("../../components/playerlist/quotes.json");

function randomObject(obj) {
  let arr = Object.values(obj);
  return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("playerlist")
    .setDescription("Returns a list of Online Players."),

  async execute(interaction, client) {
    try {
      //Get Server
      var channelName = interaction.channel.name;
      if (
        channelName === "snapshot-ingame-chat" ||
        channelName === "snapshot-server"
      ) {
        var ip = "snapshot.pandamium.eu";
        var colour = "#2DF904";
      } else if (
        channelName === "release-ingame-chat" ||
        channelName === "release-server"
      ) {
        var ip = "release.pandamium.eu";
        var colour = "#058823";
      } else if (channelName === "builder-general") {
        var ip = "build.pandamium.eu";
        var colour = "#FF00FF";
      }

      // call API
      const url = `https://api.mcstatus.io/v2/status/java/${ip}`;
      const server = await axios.get(url);
      const search = util.inspect;
      const nameArr = await search(
        server.data.players.list.map((obj) => obj.name_clean).join(", ")
      );

       //No Players Online
       const ServerEmpty = new EmbedBuilder()
       .setColor("#FF0000")
       .setTitle(`**No online players**`);

      const checkIfPlayer = server.data.players.online;
      if (checkIfPlayer.toString() === "0") {
        return interaction.reply({
          embeds: [ServerEmpty],
          ephemeral: true,
        });
      }

       //Single player Online (Use Quote)
       if (checkIfPlayer.toString() === "1") {
        const singlePlayerEmbed = new EmbedBuilder()
          .setColor(colour)
          .setTitle(
            `**Online player (${server.data.players.online}/${server.data.players.max}):**`
          )
          .setDescription(`\`\`\`${remove.Punctuation(nameArr)}\`\`\` \n` + randomObject(data))
          .setFooter({ text: `Version: ${server.data.version.name_raw}` });

        return interaction.reply({
          embeds: [singlePlayerEmbed],
          ephemeral: true,
        });
      }
  
      const playerlistEmbed = new EmbedBuilder()
        .setColor(colour)
        .setTitle(
          `**Online players (${server.data.players.online}/${server.data.players.max}):**`
        )
        .setDescription(`\`\`\`${remove.Punctuation(nameArr)}\`\`\``)
        .setFooter({ text: `Version: ${server.data.version.name_raw}` });

      interaction.reply({ embeds: [playerlistEmbed], ephemeral: true });
    } catch {
      const Error = new EmbedBuilder()
        .setColor("#FF0000")
        .setDescription(
          "Server is `Offline` or `Unreachable`! \n\nPlease report this issue in <#515269721688375296> if it continues to occur"
        );
      interaction.reply({
        embeds: [Error],
        ephemeral: true,
      });
    }
  },
};
