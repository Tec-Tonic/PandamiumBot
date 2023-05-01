const {
    Client,
    ContextMenuCommandInteraction,
    ApplicationCommandType,
    SlashCommandBuilder,
    EmbedBuilder,
    ContextMenuCommandBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
  } = require("discord.js");
  
  const emb = new EmbedBuilder().setDescription(`
        Voting daily is a great way to help Pandamium become more popular! When you vote, you will receive one vote credit per site. These credits can be used in our vote shop to buy useful items. Please note, votes are required in order to rank up. For more information, check out <#506987588742152202>.\n\n**You can get these links by running \`/trigger vote\` ingame.**\n\n**SNAPSHOT SERVER**\n[**Minecraft Server List**](https://minecraft-server-list.com/server/445164/vote/)\n[**Minecraft Servers**](https://minecraftservers.org/vote/562059)\n[**Top Minecraft Servers**](http://topminecraftservers.org/vote/29717)\n[**Minecraft Global**](https://minecraft.global/server/172/vote)\n\n**RELEASE SERVER**\n[**Minecraft Server List**](https://minecraft-server-list.com/server/432071/vote/)\n[**Minecraft Servers**](https://minecraftservers.org/vote/559675)\n[**Top Minecraft Servers**](http://topminecraftservers.org/vote/29718)\n[**Minecraft Global**](https://minecraft.global/server/173/vote)`).setColor('#0BF759')

        module.exports.emb = emb