'use strict'

// Defines helper functions for saving and getting scores, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a score to `db`
    saveScores: function(newScore, callback) {
      db.collection('leaderboard').insertOne(newScore, callback)
    },

    // Get all scores in `db`, sorted by newest first
    getScores: function(callback) {
      db.collection('leaderboard').find().sort({ score: -1 }).toArray(callback)
    }
  }
}