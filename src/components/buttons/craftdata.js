const fetch = require("node-fetch");
const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require(`discord.js`);

module.exports = {
  data: {
    name: `craftyData`
  },
  async execute(interaction, client) {
    
  if (!interaction.isButton()) return;
  if (interaction.customId === 'craftyData') {
    const getNameEmbed = interaction.message.embeds[0];
    const description = getNameEmbed.description;
    const username = description.split(' ')[0];
    const url = "https://api.crafty.gg/api/v2/players?search=" + username;

    // Fetch the data from the API
    const response = await fetch(url);
    const data = await response.json();

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
    const skinData = data.data.skins_count.toString() || "No Data";
    const capeData = data.data.capes_count.toString() || "No Data";
    const uuidData = data.data.uuid || "No Data";
    const createdAtData = new Date(data.data.created_at) || "No Data";

    // Format the date
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };

    const formattedDate = createdAtData.toLocaleDateString("en-GB", options);

    // Map over the usernames array - creates a list
    const usernames = data.data.usernames.map((user) => user.username);
    let formattedUsernames = `+ ${usernames[0]}`;
    if (usernames.length > 1) {
      formattedUsernames += `\n- ${usernames.slice(1).join(', ')}`;
    }

    // Skin 
    const skinUrl = `https://visage.surgeplay.com/full/512/${uuidData}`;

    const embed = new EmbedBuilder()
      .setTitle(`Data for \`${username}\``)
      .setDescription(
        `All Username(s):\n \`\`\`diff\n${formattedUsernames}\`\`\``
      )
      .setColor("#1BFF00")
      .addFields(
        { name: "Skin Count:", value: skinData, inline: true },
        { name: "Cape Count", value: capeData, inline: true },
        { name: "UUID", value: uuidData },
        { name: "Created", value: formattedDate }
      )
      .setThumbnail(skinUrl);

    await interaction.reply({ embeds: [embed], ephemeral: true });
  }

}
}
