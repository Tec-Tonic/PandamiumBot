// TODO: Improve this file, but for now use this.

const {
    SlashCommandBuilder,
    ButtonStyle,
    ActionRowBuilder,
    ButtonBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
    AttachmentBuilder,
  } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('mod')
    .setDescription('Gets current mod embed.')
    .setDefaultMemberPermissions(PermissionFlagsBits.CreateInstantInvite),
    async execute(interaction, client) {
        var version = '23w18a'
        var Iris = 'https://tec-tonic.github.io/snapshot-mods/mods/iris/23w18a/iris-mc23w18a-1.6.2-c075ea36-dirty.jar'
        var Sodium = 'https://tec-tonic.github.io/snapshot-mods/mods/sodium/23w18a/sodium-fabric-mc23w18a-0.4.11rev.f773c15.jar'
        
        const intRestricted = new EmbedBuilder().setDescription(`You do not have access to this command.`).setColor('#FF0000')

        const ModEmbed = new EmbedBuilder().setTitle(version + ' Mods').setColor('#2DF904')
        .setDescription('For more Snapshot Mods click [here](https://tec-tonic.github.io/snapshot-mods/)')
        .setFields(
            {name: `Iris`, value: `[iris-mc23w18a-1.6.2-c075ea36-dirty.jar](${Iris})`},
            {name: `Sodium`, value: `[sodium-fabric-mc23w18a-0.4.11rev.f773c15.jar](${Sodium})`}
        )

        if (
            interaction.user.id === "546277533138550786" || interaction.user.id === "255766501464735744"
          ) {
        interaction.channel.send({embeds: [ModEmbed]})
        return interaction.reply({content: 'Message Sent', ephemeral: true})
          } else {
            return interaction.reply({embeds: [intRestricted],ephemeral: true,})
          }
    }
}