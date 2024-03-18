const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ButtonBuilder,
} = require(`discord.js`);

const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lookup")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .setDescription("Gets minecraft username data - using PlayerDB API")
    .addStringOption((option) =>
      option
        .setName("username")
        .setDescription("This will gather data for this username.")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const username = interaction.options.getString("username");
    const url = "https://playerdb.co/api/player/minecraft/" + username;

    // Fetch the data from the API
    const response = await axios.get(url);
    const data = response.data;

    // Player doesnt exist - return true
    if (!data.success) {
        const embed = new EmbedBuilder()
          .setTitle(`Player Not Found`)
          .setDescription(`The player \`${username}\` could not be found.`)
          .setColor('#FF0000');
      
        await interaction.reply({ embeds: [embed], ephemeral: true });
        return;
      }

    // Access the data
    const uuidData = data.data.player.id || "No Data";
  
    const nameMCProfileLink = `https://namemc.com/profile/${uuidData}`;
    // Create a Msg Link
    const linkNameMCButton = new ButtonBuilder()
    .setStyle(ButtonStyle.Link)
    .setLabel(`NameMC Profile`)
    .setURL(nameMCProfileLink);

  const linkNMCButton = new ActionRowBuilder().addComponents(
    linkNameMCButton
  );

    const embed = new EmbedBuilder()
      .setTitle(`Data for \`${username}\``)
      .setColor("#1BFF00")
      .addFields(
        { name: "UUID", value: uuidData }
      )
      .setThumbnail(`https://crafthead.net/body/${uuidData}`);

    await interaction.reply({ embeds: [embed],components: [linkNMCButton], ephemeral: true });
  },
};
