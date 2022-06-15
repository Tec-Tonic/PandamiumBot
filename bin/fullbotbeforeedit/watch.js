// const fs = require('fs')
// const prefix = '!'

// module.exports = {
//     name: 'watch',
//     execute(message,Discord,client){
       
//     const args = message.content.slice(prefix.length).split(/ +/);
//     args.shift()
    
//     message.react('👀')
//         function loadJSON(filename = '') {
//             return JSON.parse(
//                 fs.existsSync(filename)
//                     ? fs.readFileSync(filename).toString()
//                     : '""'
//             )
//          }
         
//          function saveJSON(filename = '', json = '""') {
//             return fs.writeFileSync(filename,
//                 JSON.stringify(json, null, 2))
//          }
//         const data = loadJSON('data.json')
        
//         ;[`${args[0]}`].forEach(letters =>
//             data.files.push(letters)
//             )
//         saveJSON('data.json', data)
//     }}