const { default: mongoose } = require("mongoose");
const watchlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  staff: {
    type: String,
    required: true
  }

})

module.exports = mongoose.model('watchlist', watchlistSchema, 'watchlist')