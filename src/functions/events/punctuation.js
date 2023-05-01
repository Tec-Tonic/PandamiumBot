module.exports = (client) => {
  
  // removes punctuation from messages (used by ip_ask & playerlist(int))
    var punctuation = "!\"#$%&'’()*+-./:;<=>@[\\]^`{|}~";
    function Punctuation(string) {
      return string
        .split("")
        .filter(function (letter) {
          return punctuation.indexOf(letter) === -1;
        })
        .join("");
    }
    module.exports.Punctuation = Punctuation
};
