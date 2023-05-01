module.exports = {
    data: {
        name: `test1`
    },
    async execute(interaction, client) {
        await interaction.reply({
            content: `https://www.pandamium.com/`
        });
    }
}