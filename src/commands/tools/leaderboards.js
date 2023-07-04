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
    async function processJsonData(upload) {
      // Fetch file
      const file = upload.url;
      if (!file) return console.log("No attached file found");

      const response = await fetch(file);
      if (!response.ok)
        return console.log(
          "There was an error with fetching the file:",
          response.statusText
        );
      const jsonData = await response.json();

      // Validate JSON data
      if (!validateJsonData(jsonData)) {
        return false;
      }

      jsonData.forEach((item) => {
        let dateStr = "";
        if (item.date) {
          const [year, month] = item.date;
          dateStr =
            " - " +
            new Date(year, month - 1).toLocaleString("en-US", {
              month: "long",
              year: "numeric",
            });
        }
        const embed = new EmbedBuilder()
          .setDescription("## " + item.title + dateStr)
          .setColor(item.color);
        const fields = item.entries.map((entry) => {
          return {
            name: entry.username.replace(/_/g, "\\_"),
            value:
              "```" +
              item.entry_format
                .replace("%s", entry.values[0])
                .replace("%s", entry.values[1]) +
              "```",
            inline: true,
          };
        });
        embed.addFields(fields);
        interaction.channel.send({ embeds: [embed] });
      });

      return true;
    }

    function validateJsonData(jsonData) {
      if (!Array.isArray(jsonData)) return false;

      for (const item of jsonData) {
        if (!item.title || !item.color || !item.entry_format || !item.entries)
          return false;

        if (!Array.isArray(item.entries)) return false;

        for (const entry of item.entries) {
          if (!entry.username || !entry.values) return false;

          if (!Array.isArray(entry.values)) return false;
        }
      }

      // All checks passed
      return true;
    }

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

    // Process JSON data
    const success = await processJsonData(upload);

    // Final reply
    interaction.reply({
      content: success ? "Embeds were created" : "Invalid JSON data",
      ephemeral: true,
    });
  },
};
