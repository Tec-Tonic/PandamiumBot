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

const watchlist = "688479008395886605"; //#Watchlist
const player_records = "513781098904420371"; //#player-records
module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.customId === "staff_menu") {
      const translateFile = require("../../commands/staff/user_app");
      const user = translateFile.user;
      const message = translateFile.message;

      let choices = "";
      await interaction.values.forEach(async (value) => {
        choices += `${value}`;
      });

      function createEmbedMessage(
        user,
        message,
        color,
        description,
        attachments,
        title
      ) {
        let embedMessage = new EmbedBuilder().setTitle(title).setColor(color);

        // Check if message content exists
        if (message.content) {
          embedMessage
            .setDescription(
              `\n\`\`\`${message}\`\`\`\n**Username**: <@${user.id}> | ${user.username}\n**Channel**: <#${message.channel.id}>`
            )
            .setFooter({
              text: `ID: ${user.id} • ${interaction.user.username}`,
            });
        } else {
          embedMessage
            .setDescription(
              `**Username**: <@${user.id}> | ${user.username}\n**Channel**: <#${message.channel.id}>`
            )
            .setFooter({ text: `ID: ${user.id}` });
        }

        // If attachments are added
        if (attachments.size > 0) {
          let imageCount = 0;

          attachments.forEach((attachment) => {
            const url = attachment.url;

            // Remove URL parameters
            const urlWithoutParameters = url.split("?")[0];

            // Get file type
            const fileType = urlWithoutParameters.split(".").pop();

            if (["mp4", "webm", "mov"].includes(fileType)) {
              embedMessage.addFields({ name: `Video:`, value: url });
            } else {
              // If it's the first image, set it as the embed image
              if (imageCount === 0) {
                embedMessage.setImage(url);
              } else {
                // If there are more images, add them to the fields
                embedMessage.addFields({
                  name: `Image ${imageCount + 1}:`,
                  value: url,
                });
              }
              imageCount++;
            }
          });
        }

        return embedMessage;
      }

      if (choices === "watchlist") {
        let watchlistAdd = createEmbedMessage(
          user,
          message,
          "#FFAA00",
          message.content,
          message.attachments,
          "Watchlist"
        );
        const watchlistNoDelete = new EmbedBuilder()
          .setColor("#6CFF00")
          .setDescription(`Added to <#${watchlist}>`);

        interaction.reply({ embeds: [watchlistNoDelete], ephemeral: true });
        client.channels.cache.get(watchlist).send({ embeds: [watchlistAdd] });
      } else if (choices === "watchlist_delete") {
        let watchlistAdd = createEmbedMessage(
          user,
          message,
          "#FFAA00",
          message.content,
          message.attachments,
          "Watchlist"
        );

        const watchlistDelete = new EmbedBuilder()
          .setColor("#6CFF00")
          .setDescription(`Message was Deleted & Added to <#${watchlist}>`);

        interaction.reply({ embeds: [watchlistDelete], ephemeral: true });
        message.delete(message.content);
        client.channels.cache.get(watchlist).send({ embeds: [watchlistAdd] });
      } else if (choices === "records") {
        let watchlistAdd = createEmbedMessage(
          user,
          message,
          "#FF0000",
          message.content,
          message.attachments,
          "Player Record"
        );
        const recordNoDelete = new EmbedBuilder()
          .setColor("#6CFF00")
          .setDescription(`Added to <#${player_records}>`);

        interaction.reply({ embeds: [recordNoDelete], ephemeral: true });
        client.channels.cache
          .get(player_records)
          .send({ embeds: [watchlistAdd] });
      } else if (choices === "records_delete") {
        let watchlistAdd = createEmbedMessage(
          user,
          message,
          "#FF0000",
          message.content,
          message.attachments,
          "Player Record"
        );

        const recordDelete = new EmbedBuilder()
          .setColor("#6CFF00")
          .setDescription(
            `Message was Deleted & Added to <#${player_records}>`
          );

        interaction.reply({ embeds: [recordDelete], ephemeral: true });
        message.delete(message.content);
        client.channels.cache
          .get(player_records)
          .send({ embeds: [watchlistAdd] });
      } else if (choices === "ticket") {
        const TicketMessage = new EmbedBuilder()
          .setTitle(`Open a Ticket`)
          .setColor("#1C8600")
          .setDescription(
            `Hey ${user.username}, \nPlease open a Ticket in <#750352670702698657>\nWhen available a staff member will look into the issue`
          );

        interaction.reply({ content: `Message sent`, ephemeral: true });
        interaction.channel.send({ embeds: [TicketMessage] });
      } 
      else if (choices === "invite") {
        const InviteMessage = new EmbedBuilder()
          .setTitle(`Discord Invite`)
          .setColor("#0CFF00")
          .setThumbnail("https://tec-tonic.github.io/Mob-Heads-Checklist/src/img/site/ai1ia.png?ex=659dbeae&is=658b49ae&hm=6c031d2c93cfcd4a46be92652fdb74bf10df39fb7a4a4d5198a28ac6b88b33bc&")
          .setDescription(
            `Hey ${user.username}, You can use one of the following! \n- http://discord.pandamium.eu/ \n- https://discord.com/invite/5FG758KPru`
          );

        interaction.reply({ content: `Message sent`, ephemeral: true });
        interaction.channel.send({ embeds: [InviteMessage] });
      }
    }
  },
};
