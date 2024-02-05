const botlogs = process.env.PANDALOGS;
const { EmbedBuilder, ButtonBuilder, ButtonComponent, ButtonStyle, ActionRowBuilder } = require("discord.js");
const SupporterFilter = require(`../filters/supporter_filter.json`);


module.exports = {
  name: "supporter_rank",
  execute(message, client) {
    if (message.author == client.user) return;

    const SupporterChannel = message.channelId;
    const slurTextLink = message.url;
    const slurMessageLog = message.content;
    const slurAuthor = message.author.username;

    let slurFoundInText = false;
    for (var i in SupporterFilter) {
      if (message.content.toLowerCase().includes(SupporterFilter[i].toLowerCase()))
        slurFoundInText = true;
    }

    if (slurFoundInText) {
      
      const SupporterEmbed = new EmbedBuilder()
        .setTitle(`Supporter Rank`)
        .setColor(`#00FFD8`)
        .setDescription(`
We have changed the "Donator" rank to "Supporter". Nothing is changing with the cosmetic perks that come with the rank, and if you already have the rank then you will of course keep it, this is purely a visual change.
### Why?
In order to appear on the [official Minecraft server list](https://findmcserver.com/server/GiOOKwFVlz?vote=true) we have to comply with Mojang's usage and community and guidelines. We already do for the most part, so nothing else will be changing about the server, but the specific use of the word "donate" and its variants come with legal implications that we'd like to avoid 😄 
`)

      client.channels.cache.get(botlogs).send({ embeds: [SupporterEmbed] });
    } else return;
  },
};