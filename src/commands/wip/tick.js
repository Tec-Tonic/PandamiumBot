const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require(`discord.js`);

module.exports = {
    data: new SlashCommandBuilder()
    .setName('tick')
    .setDescription("Converts Minecraft Ticks to Seconds")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
      .addStringOption(option =>
		option.setName('input')
			.setDescription('Ticks are required')
            .setRequired(true)),

    async execute(interaction, client) {
    
    const ticks = interaction.options.getString('input')
    const toSeconds = Math.round(ticks * 0.05)
    const toMin = Math.round(toSeconds / 60)

    const TickEmbed = new EmbedBuilder().setColor('#189cab').setDescription(`**Ticks**: ${ticks} \n---\n**Seconds**: ${toSeconds} \n---\n**Minutes**: ${toMin}`)

    interaction.reply({embeds: [TickEmbed], ephemeral: true})
   
    }
}