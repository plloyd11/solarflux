const categories = require('../site/globals/categories.json')

const categoryMap = {}
categories.forEach((category) => {
  categoryMap[category.name] = category.style
})

module.exports = function(category) {
  return categoryMap[category]
}
