const {
  SlashCommandBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
} = require("discord.js");

const util = require("minecraft-server-util"); // Deprecated (use API)

module.exports = {
  data: new SlashCommandBuilder()
    .setName("faq")
    .setDescription("Replies with the relevant categories information")
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("Choose from the list below")
        .setRequired(true)
        .addChoices(
          { name: "Change Game Version", value: "gameVer-faq" },
          { name: "Connection Issues", value: "connect-faq" },
          { name: "Dont Ask To Ask", value: "data-faq" },
          { name: "Last World Reset (Snapshot)", value: "reset-faq" },
          { name: "Server IP", value: "ip-faq" },
        )
    ),

  async execute(interaction, client) {
    const intAuth = interaction.user.tag; //if needed

    // No access
    const Blocked = new EmbedBuilder()
      .setColor("#FF0000")
      .setDescription(`You do not have access to this command!`);
    const revoke = interaction.member.roles.cache.some(
      (r) => r.name === "NoSNapshotIngameChat"
    );
    if (revoke)
      return interaction.reply({ embeds: [Blocked], ephemeral: true });

    const category = interaction.options.getString("category");

    // Connection
    if (category === "connect-faq") {
      const connectionEmbed = new EmbedBuilder()
        .setColor("#2DF904")
        .setDescription(
          `Possible ways to fix connection issues (snapshot server):\n• Clear your dns cache (if you’re on Windows, try the command \`ipconfig /flushdns\`)\n• Use the IP \`pandamium.eu:25566\`\n• Use the IP \`116.202.216.130:25566\`\n• Try using a VPN\n• Wait it out - it may be a problem with your ISP who will fix the problem themselves (try again in a few hours)\n• https://help.minecraft.net/hc/en-us/articles/360034754052-Multiplayer-Connection-Issues-Java-Edition-`
        );
      return interaction.reply({ embeds: [connectionEmbed] });
    }

    // Update Game versions
    else if (category === "gameVer-faq") {
      return interaction.reply(
        "https://help.minecraft.net/hc/en-us/articles/360034754852-Changing-game-versions-"
      );
    }
    // Dont Ask To Ask Link
    else if (category === "data-faq") {
      return interaction.reply("https://dontasktoask.com/");
    }

    // Reset Info
    else if (category === "reset-faq") {
      const WorldResetEmbed = new EmbedBuilder()
        .setColor("#2DF904")
        .setDescription(
          `Last reset : 26th September 2021\n\nThe Snapshot server was reset due to the world not being able to updated from [21W37A](https://www.minecraft.net/en-us/article/minecraft-snapshot-21w37a) to [21W38A](https://www.minecraft.net/en-us/article/minecraft-snapshot-21w38a) after Mojang added the new world generation. All dimensions were reset. \nWe always keep player data (e.g. Playtime, Votes and inventories) `
        );

      return interaction.reply({ embeds: [WorldResetEmbed] });
    }

    else if (category === "ip-faq") {
      const SnapshotURL = `https://api.mcstatus.io/v2/status/java/snapshot.pandamium.eu`;
      const ReleaseURL = `https://api.mcstatus.io/v2/status/java/release.pandamium.eu`;
      const axios = require("axios");
      const SnapshotServer = await axios.get(SnapshotURL);
      const ReleaseServer = await axios.get(ReleaseURL);

      const ipEmbed = new EmbedBuilder()
          .setColor("#008000")
          .setTitle("Pandamium Server IP's")
          .addFields(
            {
              name: `Snapshot IP: `,
              value: `snapshot.pandamium.eu\n **Version:** ${SnapshotServer.data.version.name_raw}`,
            },
            {
              name: `Release IP: `,
              value: `release.pandamium.eu\n **Version:** ${ReleaseServer.data.version.name_raw}\n\n`,
            }
          )

          return interaction.reply({ embeds: [ipEmbed], ephemeral: true });
    }
  },
};
