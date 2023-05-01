const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require(`discord.js`);

module.exports = {
    data: new SlashCommandBuilder()
    .setName('button')
    .setDescription('Returns a button!'),
    async execute(interaction, client) {
        const button = new ButtonBuilder()
        .setCustomId(`test1`)
        .setLabel(`Our Website`)
        .setStyle(ButtonStyle.Primary);

        await interaction.reply({ content: "Work In Progess, feel free to check out this cool button tho ;)", components: [new ActionRowBuilder().addComponents(button)]
        });
    }
}