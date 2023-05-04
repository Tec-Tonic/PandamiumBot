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
        var version = '23w17a'
        var Iris = 'https://tec-tonic.github.io/snapshot-mods/mods/iris/23w17a/iris-mc23w17a-1.6.2-ea4f07b7-dirty.jar'
        var Sodium = 'https://tec-tonic.github.io/snapshot-mods/mods/sodium/23w17a/sodium-fabric-mc23w17a-0.4.10rev.fe77f41-dirty.jar'
        
        const ModEmbed = new EmbedBuilder().setTitle(version + ' Mods').setColor('#2DF904')
        .setDescription('For more mods click [here](https://tec-tonic.github.io/snapshot-mods/)')
        .setFields(
            {name: `Iris`, value: `[iris-mc23w17a-1.6.2-ea4f07b7-dirty.jar](${Iris})`},
            {name: `Sodium`, value: `[sodium-fabric-mc23w17a-0.4.10rev.fe77f41-dirty.jar](${Sodium})`}
        )

        interaction.channel.send({embeds: [ModEmbed]})
        return interaction.reply({content: 'Message Sent', ephemeral: true})
    }
}