'use strict'


// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveScores: function(newScore, callback) {
        db.collection('leaderboard').insertOne(newScore, callback)
    },

    // Get all tweets in `db`, sorted by newest first
    getScores: function(callback) {
      db.collection('leaderboard').find().toArray(callback)
    }
  }
}