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
  text.split(" ").forEach(function(word) {
    if (colorList[`${word.toLowerCase()}`] && !colorsToAppend.includes(word.toLowerCase())) {
      colorsToAppend.push(word.toLowerCase())
    }
  })
  colorsToAppend.forEach(function(color) {
    $('.colorized-text').append(`<div class="swatch" style="background-color:${colorList[color]};">${color}</div>`)
    postColors(color)
  })
})

const postColors = color => {
  fetch(`https://color-swatch-api.herokuapp.com/api/v1/colors?color[value]=${color}`, {
    method: 'POST'
  })
  .catch((error) => console.error({ error }))
}

$('.paste-text-area').keypress(function (event) {
  if (event.which == 13) {
    $('.colorize-button').click();
    return false;
  }
});

findTopColor()

module.exports = findTopColor
