const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require(`discord.js`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("time")
    .setDescription("Converts Minecraft Ticks to Seconds")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addStringOption((option) =>
      option.setName("for").setDescription("Time is required")
    )
    .addStringOption((option) =>
      option
        .setName("method")
        .setDescription("Select as required")
        .addChoices(
          { name: "Minute(s)", value: "m" },
          { name: "Hour(s)", value: "h" },
          { name: "Week(s)", value: "w" },
          { name: "Day(s)", value: "d" },
          { name: "Year(s)", value: "y" },
        )
    ),

  async execute(interaction, client) {
    const time = interaction.options.getString("for");
    const method = interaction.options.getString("method");

    if (method === "m") {
      const newTime = time * 60;
      const intResult = Math.round(interaction.createdTimestamp / 1000)
      const result = intResult + newTime

      //console.log(result);
      interaction.reply(`${result} -> <t:${result}:t>` );
    }
  },
};
