// require("dotenv").config();
// const {
//   Client,
//   Routes,
//   Collection,
//   ActivityType,
//   messageLink,
// } = require("discord.js");
// const { registerCommands } = require("./utils/registry");
// const { util } = require("minecraft-server-util");
// const {
//   SlashCommandBuilder,
//   ButtonStyle,
//   ActionRowBuilder,
//   ButtonBuilder,
//   EmbedBuilder,
// } = require("discord.js");

// const { BOT_TOKEN, APP_ID, GUILD_ID } = process.env;
// const client = new Client({ intents: [], rest: { version: "10" } });

// client.rest.setToken(BOT_TOKEN);

// client.on("ready", () => {
//   console.log(`Logged in as ${client.user.tag}!`);
//   client.user.setPresence({
//     activities: [{ name: `Tec`, type: ActivityType.Watching }],
//     status: "online",
//   });
// });

// client.on("interactionCreate", (interaction) => {
//   if (interaction.isChatInputCommand()) {
//     const { commandName } = interaction;
//     const cmd = client.slashCommands.get(commandName);
//     if (cmd) {
//       cmd.run(client, interaction);
//     } else {
//       interaction.reply({ content: "This command has no run method." });
//     }
//   }
// });

// async function main() {
//   try {
//     client.slashCommands = new Collection();
//     await registerCommands(client, "../commands");
//     console.log(client.slashCommands);
//     const slashCommandsJson = client.slashCommands.map((cmd) =>
//       cmd.getSlashCommandJSON()
//     );
//     console.log(slashCommandsJson);
//     await client.rest.put(Routes.applicationGuildCommands(APP_ID, GUILD_ID), {
//       body: slashCommandsJson,
//     });
//     const registeredSlashCommands = await client.rest.get(
//       Routes.applicationGuildCommands(APP_ID, GUILD_ID)
//     );
//     console.log(registeredSlashCommands);
//     await client.login(BOT_TOKEN);
//   } catch (err) {
//     console.log(err);
//   }
// }



// //button commands!
// client.on("interactionCreate", (interaction) => {
//   if (!interaction.isButton()) return;

//   if (interaction.customId == "RV-links") {
//     const voteEmbed = new EmbedBuilder()
//       .setTitle("Release Vote Site Links")
//       .setColor("#00AC18")
//       .setFields(
//         {
//           name: `Release link 1 :`,
//           value: `Minecraft-server-list`,
//           inline: true,
//         },
//         {
//           name: `Release link 2 :`,
//           value: `Minecraftservers.org`,
//           inline: true,
//         },
//         { name: `Release link 3 :`, value: `Minecraft-mp.com`, inline: true },
//         { name: `Release link 4 :`, value: `Topg.org`, inline: true }
//       );

//     const releaseVote = new ActionRowBuilder().addComponents(
//       new ButtonBuilder()
//         .setLabel("Link 1")
//         .setStyle(ButtonStyle.Link)
//         .setURL("https://minecraft-server-list.com/server/432071/vote/"),
//       new ButtonBuilder()
//         .setLabel("Link 2")
//         .setStyle(ButtonStyle.Link)
//         .setURL("https://minecraftservers.org/vote/559675"),

//       new ButtonBuilder()
//         .setLabel("Link 3")
//         .setStyle(ButtonStyle.Link)
//         .setURL("https://minecraft-mp.com/server/207380/vote/"),

//       new ButtonBuilder()
//         .setLabel("Link 4")
//         .setStyle(ButtonStyle.Link)
//         .setURL("https://topg.org/Minecraft/in-517972")
//     );

//     return interaction.reply({
//       embeds: [voteEmbed],
//       components: [releaseVote],
//       ephemeral: true,
//     });
//   }
// });

// main();
