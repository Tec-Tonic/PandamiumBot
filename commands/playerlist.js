const BaseSlashCommand = require("../utils/BaseSlashCommands");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const util = require("minecraft-server-util");

module.exports = class PlayerlistSlashCommand extends BaseSlashCommand {
  constructor() {
    super("playerlist");
  }

  run(client, interaction) {
    //options for both release & Snapshot
    const options = {
      sessionID: 1, // a random 32-bit signed number, optional
      enableSRV: true, // SRV record lookup
    };

    // Interaction Author
    const intAuth = interaction.user.username;
    var channelName = interaction.channel.name;
      if (channelName === "snapshot-ingame-chat" || channelName === "release-ingame-chat") {

    //Snapshot Code
    util.queryFull("pandamium.eu", 25566, options).then((Response) => {
      const nameArr = Response.players.list.join(", ").toString();

      //intPrintOut Discord Log
      const playerlistInteractionUsed = new EmbedBuilder()
        .setColor("#2DF904")
        .setDescription(
          `**Snapshot Playerlist** used by **${intAuth}** \n\n**Online players (${Response.players.online}/${Response.players.max}):** \n\`\`\`${nameArr}\`\`\``
        )
        

      // Snapshot better playerlist
      const playerlistEmbedBetter = new EmbedBuilder()
        .setColor("#2DF904")
        .setTitle(
          `**Online players (${Response.players.online}/${Response.players.max}):**`
        )
        .setDescription(`\`\`\`${nameArr}\`\`\``);

      // Snapshot better no players
      const playerlistemptyEmbed = new EmbedBuilder()
        .setColor("#FF0000")
        .setTitle(`**No online players**`);

      var ChannelName = interaction.channel.name;
      if (ChannelName === "snapshot-ingame-chat") {

        const checkIfPlayer = Response.players.online;
        if (checkIfPlayer.toString() === "0") {
          return interaction.reply({
            embeds: [playerlistemptyEmbed],
            ephemeral: true,
          });
        }

        client.channels.cache.get("963436191426957352").send({ embeds: [playerlistInteractionUsed] });

        return interaction.reply({
          embeds: [playerlistEmbedBetter],
          ephemeral: true,
        });
      }
    });

    //Release Code
    util.status("pandamium.eu", 25565, options).then((ResponseRelease) => {
      var ChannelName = interaction.channel.name;

      // Release better no players
      const playerlistemptyEmbedRelease = new EmbedBuilder()
        .setColor("#FF0000")
        .setTitle(`**No online players**`);

      if (ChannelName === "release-ingame-chat") {
        const checkIfPlayerRelease = ResponseRelease.players.online;
        if (checkIfPlayerRelease.toString() === "0") {
          return interaction.reply({
            embeds: [playerlistemptyEmbedRelease],
            ephemeral: true,
          });
        }

        const nameArrRelease = ResponseRelease.players.sample
          .map((obj) => obj.name)
          .join(", ");

        //intPrintOut Discord Log
        const playerlistInteractionUsedRelease = new EmbedBuilder()
          .setColor("#058823")
          .setDescription(
            `**Release Playerlist** used by **${intAuth}** \n\n**Online players (${ResponseRelease.players.online}/${ResponseRelease.players.max}):** \n\`\`\`${nameArrRelease}\`\`\``
          )
          

        //release better playerlist
        const playerlistEmbedBetterRelease = new EmbedBuilder()
          .setColor("#2DF904")
          .setTitle(
            `**Online players (${ResponseRelease.players.online}/${ResponseRelease.players.max}):**`
          )
          .setDescription(`\`\`\`${nameArrRelease}\`\`\``);

        // command history log (Release)
        client.channels.cache
          .get("963436191426957352")
          .send({ embeds: [playerlistInteractionUsedRelease] });

        return interaction.reply({
          embeds: [playerlistEmbedBetterRelease],
          ephemeral: true,
        });
      }
    });
  } else {

    const errPlayerlist = new EmbedBuilder()
    .setDescription('Please use <#824234748217393212> or <#604630001957994504>.').setColor('#FF0000')

    interaction.reply({
      embeds: [errPlayerlist],
      ephemeral: true,
    })
  }
  
  }

  getSlashCommandJSON() {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription("Lists all online players")
      .toJSON();
  }
};
