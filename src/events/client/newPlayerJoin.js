const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  ButtonStyle,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ModalBuilder,
} = require("discord.js");
const axios = require("axios");
const fs = require("fs");

// Read the staff.json file
const staffData = JSON.parse(
  fs.readFileSync("src/components/pandamium/staff.json", "utf8")
);

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    // Staff Check
    // call API
    const utility = require("minecraft-server-util");
    var port = 25566;
    const options = {
      sessionID: 1,
      enableSRV: true,
    };

    const regex =
      /\*\*<(.*)>\*\* \[Pandamium\] Welcome to the server, (.*)! Have fun!/;
    const match = message.content.match(regex);
    if (match) {
      await message.delete();
      const usernameWithPrefix = match[1];
      const username = usernameWithPrefix.replace("Guest | ", "");
      const newPlayerMessageLink = message.url;
      const url = `https://api.mojang.com/users/profiles/minecraft/${username}`;

      try {
        const response = await axios.get(url);
        const data = response.data;

        if (data && data.id) {
          const uuid = data.id;
          const skinUrl = `https://visage.surgeplay.com/full/512/${uuid}`;
          const nameMCProfileLink = `https://namemc.com/profile/${uuid}`;

          await utility
            .queryFull("pandamium.eu", port, options)
            .then(async (Response) => {
              const nameArr = Response.players.list;
              let onlineStaff = [];

              for (let i = 0; i < nameArr.length; i++) {
                const staffUsername = nameArr[i];
                const url =
                  "https://playerdb.co/api/player/minecraft/" + staffUsername;

                // Fetch the data from the API
                const response = await axios.get(url);
                const data = response.data;

                if (data && data.data && data.data.player) {
                  const uuidData = data.data.player.raw_id || "No Data";

                  // Filter the staffData to check if the player is a staff member
                  const isStaff = staffData.some(
                    (staff) => staff.UUID === uuidData
                  );

                  if (isStaff) {
                    // The player is a staff member
                    onlineStaff.push(staffUsername);
                  }
                }
              }

              // Prepare the online staff message
              let onlineStaffMessage =
                onlineStaff.length > 0 ? onlineStaff.join(", ") : "None";

              const newPlayerEmbed = new EmbedBuilder()
                .setColor("#00FF04")
                .setDescription(
                  `${username} joined the snapshot server for the first time!\n\n**Online Staff**: \n${onlineStaffMessage}`
                )
                .setThumbnail(skinUrl);

              const inGameMessage = new EmbedBuilder()
                .setColor("#00FF04")
                .setDescription(
                  `Welcome to the server, ${usernameWithPrefix}! Have fun!`
                );

              if (message.author == client.user) return;

              // Replace join message with embed
              message.channel.send({ embeds: [inGameMessage] });

              // Create a API button
              const button = new ButtonBuilder()
                .setCustomId("craftyData")
                .setLabel("Crafty API Data")
                .setStyle(ButtonStyle.Primary);

              // Create a Msg Link
              const linkButton = new ButtonBuilder()
                .setStyle(ButtonStyle.Link)
                .setLabel(`In-Game Chat`)
                .setURL(newPlayerMessageLink);

              // Create a Msg Link
              const linkNameMCButton = new ButtonBuilder()
                .setStyle(ButtonStyle.Link)
                .setLabel(`NameMC Profile`)
                .setURL(nameMCProfileLink);

              const linkNMCButton = new ActionRowBuilder().addComponents(
                linkButton,
                linkNameMCButton
              );

              const craftyButton = new ActionRowBuilder().addComponents(button);

              // Bot-log pings
              let messageContent = `<@&1155559317500596234>`;

              client.channels.cache.get("950432522137927690").send({
                content: messageContent,
                embeds: [newPlayerEmbed],
                components: [linkNMCButton, craftyButton],
              });
            });
        } else {
          console.log(
            `Error: Failed to retrieve skin URL. Username-Prefix: ${usernameWithPrefix}, Username: ${username}`
          );
        }
      } catch (error) {
        console.log("Error:", error);
      }
    }
  },
};
