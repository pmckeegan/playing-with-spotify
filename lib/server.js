const express = require('express')
const app = express()
const getSpotifyToken = require('./getSpotifyToken')
const PORT = 5678

const SPOTIFY_CLIENT_ID = 'asdadasd'
const SPOTIFY_CLIENT_SECRET = 'asdadasd'

app.get('/healthcheck', (req, res) => {
  res.status(200).json({
    message: 'success!'
  })
})

app.get('/spotify_token', (req, res) => {
  getSpotifyToken({
      clientId: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
    },
    (_, token) => res.status(200).json({
      token
    })
  )
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})