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

        const msgID = await interaction.targetId
        const channelID = await interaction.channelId
       
        const foreignLanguage = await client.channels.cache.get(channelID).messages.fetch(msgID)
        
        
            
            translate(foreignLanguage , { to: 'en' }).then(res => {
                const getIsoName = res.from.language.iso
                const isoName = ISO6391.getName(getIsoName)

                const embed = new EmbedBuilder().setColor('#00FFFF').setDescription(`${isoName} -> English`).setFields({name: `Translate :`, value: `${foreignLanguage}`}, {name: `Translation :`, value: `${res.text}`},)
                interaction.reply({embeds: [embed]}); 

                
              })
              

        


    }
    getSlashCommandJSON() {
       return new ContextMenuCommandBuilder()
        .setName(this.name)
        .setType(ApplicationCommandType.Message)
        .toJSON()
    }
}