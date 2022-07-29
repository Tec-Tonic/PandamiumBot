//const log = require(`../logtoserver.json`).toString('')

const personalLog = '963436191426957352'
const joinFilter = require(`../filters/joingamefilter.json`);

module.exports = {
    name: 'joinSnapshot',
    execute(message,Discord,client){
      if (message.author == client.user) return;

        //add code here
    }
}
