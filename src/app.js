const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlbars engin and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Mike'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page',
    message: "Go away, I'm not helping you",
    name: 'Mike'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Mike'
  })
})

app.get('/weather', (req, res) => {
  const address = req.query.address
  if (!address) {
    return res.send({
      error: 'You must provide an address'
    })
  }

  geocode(address, (error, response) => {
    if (error) {
      return res.send({
        error
      })
    }

    const { location, longitude, latitude } = response
    forecast(longitude, latitude, (error, response) => {
      if (error) {
        return res.send({
          error
        })
      }

      res.send({
        location,
        forecast: response,
        address
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide search term'
    })
  }

  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help',
    name: 'Mike',
    errorMsg: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Mike',
    errorMsg: 'Page not found'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000 🚀')
})