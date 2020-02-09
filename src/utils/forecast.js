const axios = require('axios')

const forecast = (longitude, latitude, callback) => {
  const url = `https://api.darksky.net/forecast/570aa4729e067d9c788c3b1abcb079bb/${latitude},${longitude}?units=si`

  axios
    .get(url)
    .then(response => {
      const { data } = response

      callback(
        undefined,
        `${data.daily.data[0].summary} It's currently ${data.currently.temperature} degrees out. There's a ${data.currently.precipProbability}% chance of rain.`
      )
    })
    .catch(error => {
      if (!error.response) {
        callback('Unable to connect to weather service')
      } else if (error.response.data.error === 'Poorly formatted request') {
        callback('Unable to find location')
      }
    })
}

module.exports = forecast
