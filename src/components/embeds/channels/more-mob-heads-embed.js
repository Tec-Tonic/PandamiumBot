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
  
  const mmh1 = new EmbedBuilder().setDescription(`
        **TAXIDERMIST ADVANCEMENT GUIDE**

**How can I obtain these mob heads?**
The mob heads drop from mobs that are killed by charged creepers (creepers which have been struck by lightning).

**How many mobs drop their heads?**
There are 179 unique heads that you can obtain (not including the vanilla heads).
All heads (except the Wither, Wolf and Vex heads) drop from mobs with specific data values.

**Wither ** - Will drop 1 to 3 random wither heads when killed by a Charged Creeper.
**↳** Wither
**↳** Armoured Wither
**↳** Invulnerable Wither
**↳** Armoured Invulnerable Wither

**Wolf **- Have a 50/50 chance of dropping a Wolf head or an Angry Wolf head.

**Vex **- Have a 50/50 chance of dropping a Vex head or a Charging Vex head. 

**Is there a limit to the number of mob heads that drop per explosion?**
No, as long as a mob is killed by a charged creeper's explosion, it will drop a head.

**Is the mob head drop rate 100%?**
Yes.

**Will the charged creeper definitely kill a mob, or do I need to take into consideration a mobs health?**
For most mobs, they're a one-shot from a charged creeper explosion, but some mobs (such as ravagers, withers and wardens) are not, so you will have to weaken these mobs first.

**What size of slime/magma cube drop heads?**
All sizes of the mob drop their respective mob heads.

**How can I preview what the mob heads look like?**
You can view all of the mob heads on our [**website**](https://www.pandamium.com/info/more-mob-heads). There you will find images of every obtainable head, a pastebin to use as a personal list, and a data pack download link so you can easily view them in-game.
`).setColor('#FE5453')

module.exports.mmh1 = mmh1