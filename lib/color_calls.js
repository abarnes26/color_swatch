
const findTopColor = () => {
  fetch('https://color-swatch-api.herokuapp.com/api/v1/top_color')
    .then((response) => response.json())
    .then((parsedResponse) => {
      $('.top-color').html('')
      $('.top-color').append(parsedResponse.value)
    })
}

findTopColor()

module.exports = findTopColor
