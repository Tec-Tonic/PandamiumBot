const playerlistUpdate = require("../../components/pandamium/playerlist-loop");
const {
  ApplicationCommandType,
  ContextMenuCommandBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const fs = require("fs");
const path = require("path");

// Function to read the staff data from the JSON file
function readStaffData() {
  const filePath = path.join(
    __dirname,
    "../../components/pandamium/staff.json"
  );
  const staffData = fs.readFileSync(filePath, "utf8");
  return JSON.parse(staffData);
}

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("Playerlist Loop Toggle")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .setType(ApplicationCommandType.Message),
  
    async execute(interaction, client) {
    const staffData = readStaffData();

    // Find the staff member in the staffData array based on their ID
    const staffMember = staffData.find(
      (staff) => staff.id === interaction.user.id
    );

    // Check if the staff member exists and has a perm-lvl of 3 or higher
    if (staffMember && parseInt(staffMember["perm-lvl"]) >= 3) {
      const guildID = "797494884159848469";
      const channelID = "1062411654983319592";
      const guild = client.guilds.cache.get(guildID);
      const channel = guild.channels.cache.get(channelID);

      
      // Fetch the last message sent by the bot in the channel
      const lastBotMessage = channel.messages.cache.find(
        (m) => m.author.id === client.user.id
      );

      if (lastBotMessage) {
        const messageContent = lastBotMessage.content.toLowerCase();
        const toggledMessageContent =
          messageContent === "true" ? "false" : "true";
        lastBotMessage.edit(toggledMessageContent).catch(console.error);

        if (toggledMessageContent === "false") {
          playerlistUpdate.stopLoop(); // Activate the stopLoop function
        } else {
          playerlistUpdate(client, true); // Continue the loop
        }

        interaction.reply({
          content: `Playerlist Loop set to ${toggledMessageContent}`,
          ephemeral: true,
        });
      } else {
        channel.send("true").catch(console.error);
      }
    } else {
      interaction.reply({
        content: "You do not have permission to use this command.",
        ephemeral: true,
      });
    }
  },
};
