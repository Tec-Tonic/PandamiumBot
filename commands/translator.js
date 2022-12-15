const { Client, ContextMenuCommandInteraction, ApplicationCommandType } = require("discord.js");
const BaseSlashCommand = require("../utils/BaseSlashCommands");
const { SlashCommandBuilder, EmbedBuilder, ContextMenuCommandBuilder } = require("discord.js");
const translate = require('@iamtraction/google-translate');
const ISO6391 = require('iso-639-1');


module.exports = class TestCommand extends BaseSlashCommand {
    constructor() {
      super("Translate");
    }

    async run(client, interaction) {

        const ERRembed = new EmbedBuilder().setColor('#FF0000').setTitle(`Unable to translate!`)
        const msgID = await interaction.targetId
        const channelID = await interaction.channelId
       
        const foreignLanguage = await client.channels.cache.get(channelID).messages.fetch(msgID)
        
        
            
            translate(foreignLanguage , { to: 'en' }).then(res => {
                const getIsoName = res.from.language.iso
                const isoName = ISO6391.getName(getIsoName)
                const intAuth = interaction.user.username;

                const embed = new EmbedBuilder().setColor('#00FFFF').setDescription(`${isoName} -> English`).setFields({name: `Original Message :`, value: `${foreignLanguage}`}, {name: `Translation :`, value: `${res.text}`},)
                interaction.reply({embeds: [embed], ephemeral: true,}); 

                //server log
                const embedUsedBy = new EmbedBuilder().setColor('#00FFFF').setDescription(`Translator used by **${intAuth}** \n\n ${isoName} -> English`).setFields({name: `Original Message :`, value: `${foreignLanguage}`}, {name: `Translation :`, value: `${res.text}`},)
                client.channels.cache.get("963436191426957352").send({ embeds: [embedUsedBy] });
                
              }).catch(err => {
                interaction.reply({embeds: [ERRembed], ephemeral: true,})
                console.error(err);
                
              });
              

        


    }
    getSlashCommandJSON() {
       return new ContextMenuCommandBuilder()
        .setName(this.name)
        .setType(ApplicationCommandType.Message)
        .toJSON()
    }
}