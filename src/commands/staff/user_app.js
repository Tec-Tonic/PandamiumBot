const {
    Client,
    ContextMenuCommandInteraction,
    ApplicationCommandType,
    SlashCommandBuilder,
    EmbedBuilder,
    ContextMenuCommandBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    PermissionFlagsBits
  } = require("discord.js");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName('Staff Menu')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .setType(ApplicationCommandType.Message),
  
    async execute(interaction) {
       
        const row = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
              .setCustomId("staff_menu")
              .setPlaceholder("Select an option")
              .addOptions(
                {
                  label: 'Add to watchlist',
                  description: 'Add this user to the watchlist',
                  value: 'watchlist',
                },
                {
                  label: 'Add to watchlist & delete',
                  description: 'Add this user to the watchlist and delete their message',
                  value: 'watchlist_delete',
                },
                {
                  label: 'Add to Player Records',
                  description: 'Add this user to the Player Records',
                  value: 'records',
                },
                {
                  label: 'Add to Player Records & delete',
                  description: 'Add this user to the Player Records and delete their message',
                  value: 'records_delete',
                },
                {
                  label: 'Send Ticket message',
                  description: 'Send a ticket message to this user',
                  value: 'ticket',
                },
              ),
          );
    
        const embed = new EmbedBuilder()
          .setColor('#0099ff')
          .setTitle('Staff Menu')
          .setDescription('Please select an option from the dropdown menu.');
    
          const user = interaction.options.getMessage('message').author;
          const message = interaction.options.getMessage('message')

          module.exports.user = user
          module.exports.message = message

        await interaction.reply({ ephemeral: true, embeds: [embed], components: [row] });
      },
    };