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
      enableSRV: true // SRV record lookup
  };

    util.queryFull('pandamium.eu', 25566, options).then((Response) => {
      const intAuth = interaction.author
      const playerlistInteractionUsed = new EmbedBuilder().setColor('#2DF904').setTitle(`Playerlist`).setDescription(`Playerlist used by ${intAuth}`).setTimestamp()
      client.channels.cache.get('963436191426957352').send({ embeds: [playerlistInteractionUsed] })


    util.queryFull('pandamium.eu', 25565, options).then((ResponseRelease) =>{
      const checkIfPlayer = Response.players.online;
      if (checkIfPlayer.toString() === "0")
        return interaction.reply(`**No online players**`);

    const nameArr = Response.players.list.join(", ");

    var ChannelName = interaction.channel.name;
    if (ChannelName === "snapshot-ingame-chat") {/*return interaction.reply({
      content: `Please use this command in <#824234748217393212>`,
      ephemeral: true
    })*/

      return interaction.reply({
        content: ` **Online players (${Response.players.online}/${Response.players.max}):** \n\`\`\`${nameArr}\`\`\``,
        ephemeral: true,
      });
    }
    if (ChannelName === "release-ingame-chat") {/*return interaction.reply({
      content: `Please use this command in <#824234748217393212>`,
      ephemeral: true
    })*/
    const nameArrRelease = ResponseRelease.players.list.join(", ");
      return interaction.reply({
        content: ` **Online players (${ResponseRelease.players.online}/${ResponseRelease.players.max}):** \n\`\`\`${nameArrRelease}\`\`\``,
        ephemeral: true,
      });
    }
    });
  })
  
  }

  getSlashCommandJSON() {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription("Gets online player info")
      .toJSON();
  }
};
