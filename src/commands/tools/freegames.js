const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder,
  } = require(`discord.js`);
  const { EpicFreeGames } = require("epic-free-games");
  const puppeteer = require('puppeteer');
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName('freegames')
      .setDescription('Gets current free games from Epic Games')
      .addStringOption(option =>
          option.setName('visibility')
            .setDescription('Choose whether the response should be public or private')
            .addChoices(
              {name: 'Public [Staff-only]', value: 'public'},
              {name: 'Private',value: 'private'}
            )),
  
    async execute(interaction, client) {
  
  
      const visibility = interaction.options.getString('visibility');
      const isEphemeral = (visibility === 'private');
      
      if (!isEphemeral) {
        const member = interaction.member;
        const hasStaffRole = member.roles.cache.some(role => role.name === 'staff');
        if (!hasStaffRole) {
          return interaction.reply({ content: 'You must have the @staff role to use the public version of this command.', ephemeral: true });
        }
      }
      
      await interaction.deferReply({ephemeral: isEphemeral})
      // ================== //
  
      const epicFreeGames = new EpicFreeGames({
          country: "GB",
          locale: "en-GB",
          includeAll: true,
        });
      
        let embed;
        epicFreeGames
          .getGames()
          .then(async (res) => {
            const { freeNowExpiryDate, freeUpcomingDate } = await getExpiryDate();
      
            async function getExpiryDate() {
              const browser = await puppeteer.launch({ headless: 'new' });
              const page = await browser.newPage();
              await page.goto('https://www.epicgames.com/store/en-US/free-games');
                  
              const freeNowSelector = '#dieselReactWrapper > div > div.css-1vplx76 > main > div.css-1ktypff > div > div > div > div > div:nth-child(4) > span > div > div > section > div > div:nth-child(1) > div > div > a > div > div > div.css-hkjq8i > span > span';
              const freeNowExpiryDate = await page.evaluate((selector) => {
                const element = document.querySelector(selector);
                return element ? element.textContent : null;
              }, freeNowSelector);
            
              const freeUpcomingSelector = '#dieselReactWrapper > div > div.css-1vplx76 > main > div.css-1ktypff > div > div > div > div > div:nth-child(4) > span > div > div>section>div>div:nth-child(3)>div>div>a>div>div>div.css-hkjq8i>span>span';
              const freeUpcomingDate = await page.evaluate((selector) => {
                const element = document.querySelector(selector);
                return element ? element.textContent : null;
              }, freeUpcomingSelector);
            
              await browser.close();
              console.log('closed')
              return { freeNowExpiryDate, freeUpcomingDate };
            }
      
            const currentGames = res.currentGames;
            const nextGames = res.nextGames;
            const epicGamesLogoURL = "https://logos-world.net/wp-content/uploads/2021/12/Epic-Games-Logo.png";
            const epicGamesStoreURL = "https://www.epicgames.com/store/en-US/p/";
            const freeNowExpiryDateWithoutTime = freeNowExpiryDate.replace(/ at \d{2}:\d{2} [AP]M/, "");
            const freeUpcomingDateWithoutTime = freeUpcomingDate.replace(/ at \d{2}:\d{2} [AP]M/, "");
      
            embed = new EmbedBuilder()
              .setTitle("**Current Free Games**")
              .setColor("#F000FF")
              .setThumbnail(epicGamesLogoURL);
      
            const fields = currentGames.map((game) => {
              const gameURL = `${epicGamesStoreURL}${game.productSlug}`;
              return {
                name: "\u200B",
                value: `**[${game.title}](${gameURL})**\n**${freeNowExpiryDateWithoutTime}**\n${game.description}`,
              };
            });
      
            embed.addFields(fields);
            const nextGameTitles = nextGames
            .map((game) => {
              const gameURL = `${epicGamesStoreURL}${game.productSlug}`;
              return `- [${game.title}](${gameURL})`;
            })
            .join("\n");
          
          embed.addFields({
            name: "\u200B",
            value: `**Next Free Games**\n> ${freeUpcomingDateWithoutTime}\n${nextGameTitles}`,
          });
        
        interaction.editReply({ embeds: [embed], ephemeral: isEphemeral });
        })
    },
  };
  
  