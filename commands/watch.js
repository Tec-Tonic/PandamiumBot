const fs = require('fs')

module.exports = {
    name: 'watch',
    aliases: ['w',],
    description: 'watch command',
    async execute(message, args, cmd, client, Discord){
        message.react('👀')
        function loadJSON(filename = '') {
            return JSON.parse(
                fs.existsSync(filename)
                    ? fs.readFileSync(filename).toString()
                    : '""'
            )
         }
         
         function saveJSON(filename = '', json = '""') {
            return fs.writeFileSync(filename,
                JSON.stringify(json, null, 2))
         }
        const data = loadJSON('watchplayer.json')
        
        ;[`${args[0]}`].forEach(userToWatch => data.files.push(userToWatch)
            )
        saveJSON('watchplayer.json', data)
    }}