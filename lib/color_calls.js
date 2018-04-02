const colorList = require ('./data/colors')


const findTopColor = () => {
  fetch('https://color-swatch-api.herokuapp.com/api/v1/top_color')
    .then((response) => response.json())
    .then((parsedResponse) => {
      $('.top-color').html('')
      $('.top-color').append(parsedResponse.value)
    })
}

$('.colorize-button').click(function(event) {
  let text = $('.paste-text-area').val()
  let colorsToAppend = []
  parseAndPostColors(text)
  $('.colorized-text').html('')
  text.split(/[ ,.]+/).forEach(function(word) {
    if (colorList[`${word.toLowerCase()}`] && !colorsToAppend.includes(word.toLowerCase())) {
      colorsToAppend.push(word.toLowerCase())
    }
  })
  colorsToAppend.forEach(function(color) {
    $('.colorized-text').append(`<div class="swatch" style="background-color:${colorList[color]};">${color}</div>`)
  })
})

const parseAndPostColors = text => {
  text.split(/[ ,.]+/).forEach(function(word) {
    if (colorList[`${word.toLowerCase()}`]) {
      let postBody = { color: { value: word } }
      postColors(postBody)
    }
  })
}

const postColors = body => {
  fetch(`https://color-swatch-api.herokuapp.com/api/v1/colors`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  .catch((error) => console.error({ error }))
}

$('.paste-text-area').keypress(function (event) {
  if (event.which == 13) {
    $('.colorize-button').click();
    event.preventDefault()
  }
});

findTopColor()

module.exports = findTopColor
