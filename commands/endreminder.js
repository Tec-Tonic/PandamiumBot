module.exports = {
    name: 'remind',
    aliases: ['r',],
    description: 'End reset reminder command',
    async execute(message, args, cmd, client, Discord){
    
        // 797498295815503942 -> @me role (panda-help server)
        const topicChannelName1 = "End-Reset"
        const logToServer1 = '948990457201975308'
        if(message.member.roles.cache.has('797498295815503942')){

            message.channels.cache.get(logToServer1).send(`[${topicChannelName1}] <@546277533138550786> Reminder about the End reset.`)

        } else {
            return;
        }
    }}