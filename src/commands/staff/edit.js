const {
  SlashCommandBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  AttachmentBuilder,
} = require("discord.js");
const fs = require("fs");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("edit")
    .setDescription("Allows staff to edit embeds.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addSubcommand((subcommand) =>
      subcommand
        .setName("getfile")
        .setDescription("Sends embed json data as file attachment [Staff-Only]")
        .addStringOption((option) =>
          option
            .setName("name")
            .setDescription("The file you want the JSON data for.")
            .setRequired(true)
            .addChoices(
              { name: "Reaction Roles", value: "reaction_roles.json" },
              { name: "Rules [1-10]", value: "rules_1_10.json" },
              { name: "Rules [11-15]", value: "rules_11_15.json" },
              { name: "FAQ", value: "faq.json" },
              { name: "Ranks [Player Ranks]", value: "ranks_player.json" },
              { name: "Ranks [Staff Ranks]", value: "ranks_staff.json" },
              { name: "Voting", value: "vote.json" },
              { name: "Supporter", value: "supporter.json" },
              { name: "Commands [Snapshot Server]", value: "cmd_snap.json" },
              { name: "Commands [Release Server]", value: "cmd_release.json" },
              { name: "Commands [Discord Server]", value: "cmd_discord.json" },
              { name: "Custom Recipes", value: "custom_recipes.json" },
              { name: "More Mob Heads", value: "more_mob_head.json" },
              {
                name: "Staff Applications [Main Message]",
                value: "staff_apps_main.json",
              },
              {
                name: "Staff Applications [Open/Closed Message]",
                value: "staff_apps_last.json",
              },
              { name: "Town Applications", value: "town_apps.json" },
              { name: "Timezone", value: "timezone.json" }
            )
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("sendfile")
        .setDescription("Use the attached file to edit the embed [Staff-Only]")
        .addAttachmentOption((option) =>
          option
            .setName("file")
            .setDescription("please attach file")
            .setRequired(true)
        )
    ),
  async execute(interaction, client) {
    // Check user roles
    if (
      !interaction.member.roles.cache.some((role) =>
        ["Sr. Moderator", "Admin", "Owner", "Bot Developer"].includes(role.name)
      )
    ) {
      return interaction.reply({
        content: "You do not have permission to use this command.",
        ephemeral: true,
      });
    }

    if (interaction.options.getSubcommand() === "getfile") {
      const fileName = interaction.options.getString("name");

      const json1 = fs.readFileSync(
        `./src/components/channelEmbeds/${fileName}`,
        "utf8"
      );

      const jsondata = JSON.parse(json1);

      const messageId = jsondata[0].msgID;
      const channelId = jsondata[0].ChannelID;

      const channel = client.channels.cache.get(channelId);
      const message = await channel.messages.fetch(messageId);
      const embeds = message.embeds;

      const data = embeds.map((embed) => ({
        title: embed.title,
        description: embed.description,
        color: embed.color.toString(16).padStart(6, "0"),
        fields: embed.fields,
        messageId: message.id,
        channelId: message.channel.id,
      }));

      const buffer = Buffer.from(JSON.stringify(data), "utf-8");

      const attachment = new AttachmentBuilder()
        .setName(fileName)
        .setFile(buffer);

      interaction.reply({
        content: "Please check <#1133032584620822548> for the file",
        ephemeral: true,
      });
      client.channels.cache
        .get("1133032584620822548")
        .send({ files: [attachment] });
    } else if (interaction.options.getSubcommand() === "sendfile") {
      const attachmentOption = interaction.options.get("file");
      const attachment = attachmentOption.attachment;

      if (!attachment) {
        return interaction.reply({
          content: "Please attach a file!",
          ephemeral: true,
        });
      }

      const response = await axios.get(attachment.url, {
        responseType: "arraybuffer",
      });
      const buffer = Buffer.from(response.data);
      const data = JSON.parse(buffer.toString());

      const newEmbeds = data.map((item) => {
        return new EmbedBuilder()
          .setTitle(item.title)
          .setDescription(item.description)
          .setColor(`#${item.color}`)
          .addFields(item.fields);
      });

      const channel = client.channels.cache.get(data[0].channelId);
      const unixTimestamp = Math.floor((Date.now() + 50000) / 1000);
      const message = await channel.messages.fetch(data[0].messageId);

      const yes = new ButtonBuilder()
        .setCustomId("edit_yes")
        .setLabel("Yes")
        .setStyle(ButtonStyle.Success);

      const no = new ButtonBuilder()
        .setCustomId("edit_no")
        .setLabel("No")
        .setStyle(ButtonStyle.Danger);

      await interaction.reply({
        content: `Are you sure you want to edit this message? \nPlease confirm <t:${unixTimestamp}:R> or the edit will be cancelled`,
        embeds: newEmbeds,
        components: [new ActionRowBuilder().addComponents(yes, no)],
        ephemeral: true,
      });

      try {
        const buttonInteraction =
          await interaction.channel.awaitMessageComponent({
            filter: (i) =>
              i.customId === "edit_yes" || i.customId === "edit_no",
            time: 50000,
          });

        if (buttonInteraction.customId === "edit_yes") {
          await message.edit({ embeds: newEmbeds });
          await buttonInteraction.reply({
            content: "Message edited successfully!",
            ephemeral: true,
          });
        } else {
          await buttonInteraction.reply({
            content: "Edit cancelled.",
            ephemeral: true,
          });
        }
      } catch (error) {
        await interaction.followUp({
          content: "Edit cancelled due to no response.",
          ephemeral: true,
        });
        await interaction.deleteReply();
      }
    }
  },
};
