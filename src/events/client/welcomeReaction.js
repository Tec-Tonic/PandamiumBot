module.exports = {
    name: 'guildMemberAdd',
    async execute(user, client) {

        setTimeout(() => {
            const message =
              user.guild.channels.cache.get('531885643626971170').lastMessage;
            message.react("<:pandamium:797762197567832105>");
          }, 500);
    }
}