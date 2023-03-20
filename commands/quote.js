const BaseSlashCommand = require("../utils/BaseSlashCommands");
const {
    SlashCommandBuilder,
    EmbedBuilder,
    discordSort,
    DiscordAPIError,
    Discord,
} = require("discord.js");

module.exports = class QuoteSlashCommand extends BaseSlashCommand {
    constructor() {
        super("quote");
    }

    async run(client, interaction) {

        const link = interaction.options.getString('link')
        const ErrlinkReply = new EmbedBuilder().setDescription(`I do not have access to this message, provide a message link from this server.`).setColor('#FF0000')

        const discordLinkReg = /\/([0-9].*)\/([0-9].*)\/([0-9].*[^/])\/{0,}/
        const parsed = discordLinkReg.exec(link)
        const messageId = parsed[3];
        const channelId = parsed[2];
        const guildId = parsed[1];

        if (guildId === '504627012921589763') {

            const channel = await client.channels.fetch(channelId);
            const message = await channel.messages.fetch(messageId);
            const time = Math.round(message.createdTimestamp / 1000);

            
            var EMBED_COLOR = message.member.displayHexColor
                if (EMBED_COLOR == 'null') {
                var EMBED_COLOR = '#1BEACA'
                }

            console.log(EMBED_COLOR)

            const linkReply = new EmbedBuilder()
                .setAuthor({ name: `${message.author.tag}`, iconURL: `https://cdn.discordapp.com/avatars/` + message.author.id + `/` + message.author.avatar + `.jpeg`, url: `${link}` })
                .setDescription(`${message.content}`)
                .setColor(EMBED_COLOR)

            const dateReply = new EmbedBuilder()
                .setDescription(`[Message](${link}) created <t:${time}:R> in <#${channelId}>`)
                .setColor(EMBED_COLOR)


            await interaction.reply({ embeds: [linkReply, dateReply] });

        } else {
            interaction.reply({ embeds: [ErrlinkReply] })
        }
    }

    getSlashCommandJSON() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription("Converts a Discord message link into an Embed! [Visible to everyone]")
            .addStringOption(option =>
                option.setName('link')
                    .setDescription('link required')
                    .setRequired(true))
            .toJSON();
    }
};
