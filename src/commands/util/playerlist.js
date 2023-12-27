const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require(`discord.js`);
const log = process.env.PANDALOGS
const data = require("../../components/playerlist/quotes.json");

function randomObject(obj) {
  let arr = Object.values(obj);
  return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("playerlist")
    .setDescription("Returns a list of Online Players. [Public]"),

  async execute(interaction, client) {

    await interaction.defereditReply({ephemeral: true});

    try {
      //Get Server
      var channelName = interaction.channel.name;
      if (
        channelName === "snapshot-ingame-chat" ||
        channelName === "snapshot-server"
      ) {
        var ip = "pandamium.eu";
        var colour = "#2DF904";
        var port = 25566
      } else if (
        channelName === "release-ingame-chat" ||
        channelName === "release-server"
      ) {
        var ip = "pandamium.eu";
        var colour = "#058823";
        var port = 25565
      } else if (
        channelName === "builder-general" ||
        channelName === "builder-ingame-chat" 
      ) {
        var ip = "build.pandamium.eu";
        var colour = "#FF00FF";
        var port = 25565
      } else {
        var colour = "#FF0000"
      }

      const options = {
        sessionID: 1, 
        enableSRV: true, 
      };

      // call API
      const utility = require("minecraft-server-util");
 
      utility.queryFull("pandamium.eu", port, options).then((Response) => {
        const nameArr = Response.players.list.join(", ").toString();

      //No Players Online
      const ServerEmpty = new EmbedBuilder()
        .setColor("#FF0000")
        .setTitle(`**No online players**`)
        .setFooter({ text: `Version: ${Response.version}` });

      const checkIfPlayer = Response.players.online
      if (checkIfPlayer.toString() === "0") {
        return interaction.editReply({
          embeds: [ServerEmpty],
          ephemeral: true,
        });
      }

      //Single player Online (Use Quote)
      if (checkIfPlayer.toString() === "1") {
        const singlePlayerEmbed = new EmbedBuilder()
          .setColor(colour)
          .setTitle(
            `**Online player (${Response.players.online}/${Response.players.max}):**`
          )
          .setDescription(
            `\`\`\`${nameArr}\`\`\` \n` + randomObject(data)
          )
          .setFooter({ text: `Version: ${Response.version}` });

        return interaction.editReply({
          embeds: [singlePlayerEmbed],
          ephemeral: true,
        });
      }

      const playerlistEmbed = new EmbedBuilder()
      .setColor(colour)
      .setTitle(
        `**Online players (${Response.players.online}/${Response.players.max}):**`
      )
      .setDescription(`\`\`\`${nameArr}\`\`\``)
      .setFooter({ text: `Version: ${Response.version}` });

      interaction.editReply({ embeds: [playerlistEmbed], ephemeral: true });
      }).catch((error) => {
        console.log(error)
        const Error = new EmbedBuilder()
          .setColor("#FF0000")
          .setDescription(
            "Server is `Offline` or `Unreachable`! \n\nPlease report this issue in <#515269721688375296> if it continues to occur"
          );
        interaction.editReply({
          embeds: [Error],
          ephemeral: true,
        });

        const AlertErrorEmbed = new EmbedBuilder()
          .setColor("#FF0000")
          .setDescription(
            "Server is `Offline` or `Unreachable`!"
          )
          .addFields(
            {
              name: `Info :`,
              value: `User: ${interaction.user.username})`,
            }
          )
        client.channels.cache.get(log).send({ embeds: [AlertErrorEmbed] });
      });

    } catch (error) {
      
      const Error = new EmbedBuilder()
        .setColor("#FF0000")
        .setDescription(
          "Server is `Offline` or `Unreachable`! \n\nPlease report this issue in <#515269721688375296> if it continues to occur"
        );
      interaction.editReply({
        embeds: [Error],
        ephemeral: true,
      });
      console.log(error)

    }
  },
};
