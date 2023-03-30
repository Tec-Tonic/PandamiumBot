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
  
        const embed = new EmbedBuilder().setTitle(`1 - PUNISHMENTS`)
        .setDescription(`Punishments can be made as staff members see fit, appropriate to the severity of the violation.`).setColor('#D02FB7')

        const embed1 = new EmbedBuilder().setTitle(`2 - HACKING/CHEATING`)
        .setDescription(`All kinds of hacking, cheating and other ways of gaining an unfair advantage over other players are forbidden.`).setColor('#D02FB7')

        const embed2 = new EmbedBuilder().setTitle(`3 - GRIEFING/STEALING`)
        .setDescription(`All forms of griefing and stealing are forbidden. This includes but is not limited to salvaging items from seemingly abandoned bases.`).setColor('#D02FB7')

        const embed3 = new EmbedBuilder().setTitle(`4 - LOST PROGRESS DUE TO CRASHES/GLITCHES/BUGS`)
        .setDescription(`Minecraft is buggy, especially snapshots, so it may occasionally happen that items get lost due to a server crash or because of other glitches. If you play here, you have to live with that.`).setColor('#D02FB7')

        const embed4 = new EmbedBuilder().setTitle(`5 - PvP`)
        .setDescription(`Killing other players is allowed, however not repeatedly, especially not again after they explicitly stated that they didn't want to fight. It is allowed to keep items from killed players, however, only if the kill was done without violating any rules.`).setColor('#D02FB7')

        const embed5 = new EmbedBuilder().setTitle(`6 - SPAMMING/ADVERTISING`)
        .setDescription(`Spamming and advertising is forbidden. Using colour codes in snapshot-ingame-chat or impersonating other people also counts as spamming. Advertising refers to things that are external to Pandamium (other servers, websites, youtube channels, etc.). Advertising an event you're organizing on the server, or a shop, is allowed, as long as it's done reasonably.`).setColor('#D02FB7')

        const embed6 = new EmbedBuilder().setTitle(`7 - CHAT LANGUAGE`)
        .setDescription(`Messages sent in the public chat (ingame or Discord) should be written in English. Messages in public chats are supposed to be understandable for everyone.`).setColor('#D02FB7')

        const embed7 = new EmbedBuilder().setTitle(`8 - OFFENDING OTHERS`)
        .setDescription(`It's ok to make friendly jokes, but offenses that are hurtful or in any other way inappropriate are forbidden. This rule applies to Minecraft as well as the Discord server and is not limited to the chat, for example it also includes account names and ingame buildings!`).setColor('#D02FB7')

        const embed8 = new EmbedBuilder().setTitle(`9 - CONTROVERSIAL TOPICS`)
        .setDescription(`Arguing about controversial topics unrelated to Pandamium (politics, religion, etc.) should be avoided. These topics aren't completely forbidden, but can easily lead to fights and insults, which is why they should be kept to a minimum.`).setColor('#D02FB7')

        const embed9 = new EmbedBuilder().setTitle(`10 - GLITCH USING`)
        .setDescription(`Using any gameplay glitches that result in an unfair advantage or hinder other players' gameplay, especially, but not limited to, dupe glitching and server crashing, is forbidden. Known glitches have to be reported to a staff member.`).setColor('#D02FB7')

        const embed10 = new EmbedBuilder().setTitle(`11 - RUINING OTHERS' GAMEPLAY`)
        .setDescription(`Anything that hasn't been mentioned yet and that ruins the fun for other players on the server in any way, or by causing lag, is forbidden. `).setColor('#D02FB7')

        const embed11 = new EmbedBuilder().setTitle(`12 - HELPING RULE BREAKERS`)
        .setDescription(`Intentionally helping other players break the rules, even if you don't directly break any rules yourself, is forbidden. This includes but is not limited to providing items needed for an exploit, lying to staff when questioned about other players' offenses or even simply not reporting known offenses of other player.`).setColor('#D02FB7')

        const embed12 = new EmbedBuilder().setTitle(`13 - CLAIMING TO BREAK RULES`)
        .setDescription(`If a player claims to have broken the rules, that is enough reason for staff members to assume the player is telling the truth. You will not get unbanned because it was "just a joke".`).setColor('#D02FB7')

        const embed13 = new EmbedBuilder().setTitle(`14 - CIRCUMVENTING BANS/PUNISHMENTS`)
        .setDescription(`Using secondary accounts or any other means to circumvent bans or other punishments is not allowed. Doing so will result in at least the punishment that was circumvented. The only exception to this is for appealing as stated in rule 1.`).setColor('#D02FB7')

        const embed14 = new EmbedBuilder().setTitle(`15 - AFKING`)
        .setDescription(`The use auto clickers, auto reconnect mods or similar tools to get around the afk kick is NOT allowed. The reasoning for this is that it strains the mob cap, decreases server performance in general, and makes the playtime counter useless.`).setColor('#D02FB7')

        const embed15 = new EmbedBuilder()
        .setDescription(`**These rules apply to the Pandamium Minecraft servers and the official Pandamium Discord. They also extend to direct messages if these messages are related to Pandamium.**\n\n**The rules may be edited by the Owner (Sundroid) at any time.**`).setColor('#D02FB7')

        module.exports.embed = embed
        module.exports.embed1 = embed1
        module.exports.embed2 = embed2
        module.exports.embed3 = embed3
        module.exports.embed4 = embed4
        module.exports.embed5 = embed5
        module.exports.embed6 = embed6
        module.exports.embed7 = embed7
        module.exports.embed8 = embed8
        module.exports.embed9 = embed9
        module.exports.embed10 = embed10
        module.exports.embed11 = embed11
        module.exports.embed12 = embed12
        module.exports.embed13 = embed13
        module.exports.embed14 = embed14
        module.exports.embed15 = embed15