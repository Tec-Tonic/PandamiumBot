module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: `\`Error ID: 17\`, please report in <#515269721688375296>`,
          ephemeral: true,
        });
      }
    } else if (interaction.isButton()) {
      const { buttons } = client;
      const { customId } = interaction;
      const button = buttons.get(customId)
      if (!button) return new Error(`\`Error ID: 18\`, please report in <#515269721688375296>`)

      try {
        await button.execute(interaction, client);
      } catch (err) {
        console.log(err);
      }
    } else if (interaction) {
        const { commands } = client;
        const { commandName } = interaction;
        const command = commands.get(commandName);
        if (!command) return;
  
        try {
          await command.execute(interaction, client);
        } catch (error) {
          console.error(error);
          await interaction.reply({
            content: `ErrorID: 19`,
            ephemeral: true,
          });
      }
    }
  },
};
