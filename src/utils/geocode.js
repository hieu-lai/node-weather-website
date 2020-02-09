const axios = require('axios')

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoic2lnbm1ldXAxMiIsImEiOiJjazY0aDJ2YTIwaXE4M3NwZ2FycXdjamo0In0.ekHlXX1a552sK9x31KWbYQ&limit=1`

  axios
    .get(url)
    .then(response => {
      if (response.data.features.length === 0) {
        callback('Unable to find location. Enter another serach term.')
      } else {
        callback(undefined, {
          longitude: response.data.features[0].center[0],
          latitude: response.data.features[0].center[1],
          location: response.data.features[0].place_name
        })
      }
    })
    .catch(error => {
      callback('Unable to connect to geolocation service')
    })
}

module.exports = geocode
