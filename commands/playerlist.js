const BaseSlashCommand = require("../utils/BaseSlashCommands");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const util = require("minecraft-server-util");

module.exports = class PlayerlistSlashCommand extends BaseSlashCommand {
  constructor() {
    super("playerlist");
  }

  run(client, interaction) {
    const options = {
      sessionID: 1, // a random 32-bit signed number, optional
      enableSRV: true, // SRV record lookup
    };

    util.queryFull("pandamium.eu", 25566, options).then((Response) => {
      const intAuth = interaction.user.username;
      const playerlistInteractionUsed = new EmbedBuilder()
        .setColor("#2DF904")
        .setDescription(`Snapshot Playerlist used by ${intAuth}`)
        .setTimestamp();
      
        const playerlistInteractionUsedRelease = new EmbedBuilder()
        .setColor("#2DF904")
        .setDescription(`Release Playerlist used by ${intAuth}`)
        .setTimestamp();

      util.status("pandamium.eu", 25565, options).then((ResponseRelease) => {
        const nameArr = Response.players.list.join(", ").toString().replace("__T0m__", "__Tec__")

        var ChannelName = interaction.channel.name;
        if (ChannelName === "snapshot-ingame-chat") {

          const checkIfPlayer = Response.players.online;
        if (checkIfPlayer.toString() === "0"){
          return interaction.reply({content:`**No online players**` ,ephemeral: true});
        }
        
          client.channels.cache.get("963436191426957352").send({ embeds: [playerlistInteractionUsed] });
          return interaction.reply({
            content: ` **Online players (${Response.players.online}/${Response.players.max}):** \n\`\`\`${nameArr}\`\`\``,
            ephemeral: true,
          });
          
        }
        if (ChannelName === "release-ingame-chat") {
          const checkIfPlayerRelease = ResponseRelease.players.online;
          if (checkIfPlayerRelease.toString() === "0"){
            return interaction.reply({content:`**No online players**` ,ephemeral: true});
          }

          client.channels.cache.get("963436191426957352").send({ embeds: [playerlistInteractionUsedRelease] });
          const nameArrRelease = ResponseRelease.players.sample.map(obj => obj.name).join(", ");
          return interaction.reply({
            content: /*`This command is undergoing maintenance, please use \`!playerlist\` to check online players!`*/ ` **Online players (${ResponseRelease.players.online}/${ResponseRelease.players.max}):** \n\`\`\`${nameArrRelease}\`\`\``,
            ephemeral: true,
          });
        }
      });
    });
  }

  getSlashCommandJSON() {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription("Gets online player info")
      .toJSON();
  }
};
