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
    .addStringOption((option) =>
      option
        .setName("jsondata")
        .setDescription("Please enter JSON data")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("footer")
        .setDescription("Footer Text (optional)")
        .setRequired(false)
    ),
  async execute(interaction, client) {
    async function processJsonData(jsonData) {
      // Validate JSON data
      if (!validateJsonData(jsonData)) {
        return false;
      }

      const numberEmojis = ['🥇 ', '🥈 ', '🥉 ', '4. ', '5. ', '6. ', '7. ', '8. ', '9. ', '10. ', '11. ', '12. ', '13. ', '14. ', '15. ', '16. ', '17. ', '18. ', '19. ', '20. ','21. ','22. ','23. ','24. '];

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
        const fields = item.entries.slice(0,24).map((entry, index) => {
          return {
            name: numberEmojis[index] + entry.username.replace(/_/g, "\\_"),
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
        
        // Add footer if provided
        const footerText = interaction.options.getString("footer");
        if (footerText) {
          embed.addFields({name: `\u00A0`, value: `${footerText}`})
        }
        
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
        ["Moderator", "Sr. Moderator", "Admin", "Owner"].includes(role.name)
      )
    ) {
      return interaction.reply({
        content: "You do not have permission to use this command.",
        ephemeral: true,
      });
    }

    // Get options
    let jsonData;
    try {
      jsonData = JSON.parse(interaction.options.getString("jsondata"));
    } catch (error) {
      return interaction.reply({
        content: "Invalid JSON data",
        ephemeral: true,
      });
    }
    
    // Process JSON data
    const success = await processJsonData(jsonData);

    // Final reply
    interaction.reply({
      content: success ? "Embeds were created" : "Invalid JSON data",
      ephemeral: true,
    });
  },
};

