console.log('Client side javascript is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', e => {
  e.preventDefault()

  const address = search.value

  messageOne.textContent = 'Fetching data...'
  messageTwo.textContent = ''

  fetch(`http://localhost:3000/weather?address=${address}`).then(response => {
    response.json().then(data => {
      const { error, location, forecast } = data
      if (error) {
        messageOne.textContent = error
      } else {
        messageOne.textContent = location
        messageTwo.textContent = forecast
      }
    })
  })
})