const fs = require('fs')

module.exports = {
    name: 'watch',
    aliases: ['w',],
    description: 'watch command',
    async execute(message, args, cmd, client, Discord){
        

        // if(message.member.roles.cache.has('949814214241964122')){
        
        //     message.reply(`Sorry this command is offline, errors found.\nError ID : 876321`)

        // message.react('👀')
        // function loadJSON(filename = '') {
        //     return JSON.parse(
        //         fs.existsSync(filename)
        //             ? fs.readFileSync(filename).toString()
        //             : '""'
        //     )
        //  }
         
        //  function saveJSON(filename = '', json = '""') {
        //     return fs.writeFileSync(filename,
        //         JSON.stringify(json, null, 2))
        //  }
        // const data = loadJSON('watchplayer.json')
        
        // ;[`${args[0]}`].forEach(userToWatch => data.files.push(userToWatch)
        //     )
        // saveJSON('watchplayer.json', data)
    }}