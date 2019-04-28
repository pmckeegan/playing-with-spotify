import React, { Component } from 'react'
import axios from 'axios'

export default class App extends Component {
  state = {
    token: null,
  }

  async componentDidMount() {
    this.getSpotifyToken()
  }

  render() {
    return <button onClick={() => this.getArtist('dog')}>get beyonce</button>
  }

  getArtist = async artistName => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/search/?q=name:${artistName}&type=artist`,
        {
          headers: { Authorization: `Bearer ${this.state.token}` },
        }
      )
      const items = response.data.artists.items
      const firstItem = items.find(({ id }) => !!id) // get the first artist returned from the request

      if (!firstItem) {
        console.log('no artists found')
        return
      }

      const id = firstItem.id // get the id of the first artist returned
      // do something with the atist id
      // https://api.spotify.com/v1/artists/{id}/top-tracks
    } catch (e) {
      this.getSpotifyToken()
    }
  }

  getSpotifyToken = async () => {
    try {
      const response = await axios.get('/spotify_token')
      const token = response.data.token

      this.setState({ token })
    } catch (error) {
      console.log(error)
    }
  }
}
