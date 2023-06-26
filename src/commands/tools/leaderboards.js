const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leaderboards")
    .setDescription("Creates leaderboard Embeds")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addAttachmentOption((option) =>
      option
        .setName("file")
        .setDescription("please attach file")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    // Check user roles
    if (
      !interaction.member.roles.cache.some((role) =>
        ["Sr. Moderator", "Admin", "Owner"].includes(role.name)
      )
    ) {
      return interaction.reply({
        content: "You do not have permission to use this command.",
        ephemeral: true,
      });
    }

    // Get options
    const upload = interaction.options.getAttachment("file");

    function getMonthlyData(jsonData) {
      let result = {
        monthly_playtime: [],
        monthly_votes: [],
      };
      jsonData.monthly_playtime.forEach((item) => {
        result.monthly_playtime.push({
          username: item.username,
          value: item.value,
        });
      });
      jsonData.monthly_votes.forEach((item) => {
        result.monthly_votes.push({
          username: item.username,
          value: item.value,
        });
      });
      return result;
    }

    // Fetch file
    const file = upload.url;
    if (!file) return console.log("No attached file found");

    const response = await fetch(file);
    if (!response.ok)
      return interaction.channel.send(
        "There was an error with fetching the file:",
        response.statusText
      );
    const jsonData = await response.json();
    let monthlyData = getMonthlyData(jsonData);

    const numberEmojis = [' 🥇 ', '🥈', '🥉', '⒋', '⒌', '⒍', '⒎', '⒏', '⒐', '⒑', '⒒', '⒓', '⒔', '⒕', '⒖'];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


    // Helper function to get the end of the month
    function getMonthEnd(date) {
      return new Date(date.getFullYear(), date.getMonth(), 0);
    }

    // Get closest month end
    const date = new Date();
    const closestMonthEnd = getMonthEnd(date);
    const formattedClosestMonthEnd = `${
      monthNames[closestMonthEnd.getMonth()]
    } ${closestMonthEnd.getFullYear()}`;

    // Create the embeds
    const PlaytimeEmbed = new EmbedBuilder()
      .setColor("#00FF0F")
      .setDescription(
        `## Monthly Playtime Leaderboard results - ${formattedClosestMonthEnd}`
      );

    const VotesEmbed = new EmbedBuilder()
      .setColor("#00FF0F")
      .setDescription(
        `## Monthly Votes Leaderboard results - ${formattedClosestMonthEnd}`
      );

    // Add fields for playtime data
    PlaytimeEmbed.addFields(
      ...monthlyData.monthly_playtime.map((item, index) => {
        const hours = Math.floor((item.value * 0.05) / 60 / 60);
        const minutes = Math.round(
          ((item.value * 0.05) / 60 / 60 - hours) * 60
        );
        return {
          name: `${numberEmojis[index]} ${item.username.replace(/_/g, "\\_")}`,
          value: `\`\`\`${hours} Hrs & ${minutes} Mins\`\`\``,
          inline: true,
        };
      })
    );

    // Add fields for votes data
    VotesEmbed.addFields(
      ...monthlyData.monthly_votes.map((item, index) => ({
        name: `${numberEmojis[index]} ${item.username.replace(/_/g, "\\_")}`,
        value: `\`\`\`${item.value.toString()} Votes\`\`\``,
        inline: true,
      }))
    );

    // Send the embeds
    interaction,channel.send({ embeds: [PlaytimeEmbed, VotesEmbed] })
    interaction.reply({ content: "Command was successful" });
  },
};
