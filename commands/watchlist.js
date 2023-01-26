const BaseSlashCommand = require("../utils/BaseSlashCommands");
const {
  SlashCommandBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
} = require("discord.js");

const schema = require("../schema/watchlist_schema");
const { parse } = require("dotenv");

module.exports = class IpSlashCommand extends BaseSlashCommand {
  constructor() {
    super("watchlist");
  }

  async run(client, interaction) {

    const noPermissions = new EmbedBuilder().setColor('#FF0000').setDescription('You don\'t have permission to do that!')
    if (!interaction.member.roles.cache.has("544173748735967253")) return interaction.reply({embeds: [noPermissions], ephemeral: true }) //staff role
    
  const intAuth = interaction.user.username;
  const playerName = interaction.options.getString('player-name')
  const reasonName = interaction.options.getString('reason')
  const addPlayer = interaction.options.get('function').value
  const removePlayer = interaction.options.get('function').value
 

    if(addPlayer === 'add_name'){
    await new schema({
      name: `${playerName} joined the game`,
      reason: `${reasonName}`,
      staff: `${intAuth}`
    }).save()

    const AddedPlayerEmbed = new EmbedBuilder().setColor('#36393F').setFields({name: `Watchlist - Add`, value: `\`\`\`${playerName} was added to the watchlist\`\`\``})
    interaction.reply({embeds: [AddedPlayerEmbed], ephemeral: true })
  }

  if(removePlayer === 'remove_name'){
    const name = await schema.findOneAndDelete(
      {name: `${playerName} joined the game`}
    )
    
    const RemovePlayerEmbed = new EmbedBuilder().setColor('#36393F').setFields({name: `Watchlist - Remove`, value: `\`\`\`${playerName} was removed from the watchlist\`\`\``})
    interaction.reply({embeds: [RemovePlayerEmbed], ephemeral: true })
  }
  
  }
  getSlashCommandJSON() {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription("Player Watchlist")
      .addStringOption(option =>
        option.setName('function')
        .setDescription('You will add or remove a player-name')
        .setRequired(true)
        .setChoices(
          {name: 'add', value: 'add_name'},
          {name: 'remove', value: 'remove_name'}
          ))
      
        .addStringOption(option =>
        option.setName('player-name')
          .setDescription('Will add/remove this player to the Watch Database')
          .setRequired(true))
          
          .addStringOption(option =>
            option.setName('reason')
              .setDescription('Please provide a reason for adding this player!')
              .setRequired(true))
      .toJSON();
  }
};

