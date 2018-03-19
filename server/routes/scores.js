'use strict'


const express       = require('express')
const scoresRoutes  = express.Router()

module.exports = function(DataHelpers) {

  scoresRoutes.get("/", function(req, res) {
    DataHelpers.getScores((err, scores) => {
      if (err) {
        res.status(500).json({ error: err.message })
      } else {
        res.json(scores)
      }
    })
  })

  scoresRoutes.post('/', function(req, res) {
    console.log("scores", req.body)
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'})
      return
    }

    const score = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now()
    }

    DataHelpers.saveScores(score, (err) => {
      if (err) {
        res.status(500).json({ error: err.message })
      } else {
        res.status(201).send()
      }
    })
  })

  return scoresRoutes

}
