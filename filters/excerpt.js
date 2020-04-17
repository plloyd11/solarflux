module.exports = function(templateContent, characterCount) {
  let count = 0
  const excerpt = []
  const plainText = templateContent.replace(/<[^>]+>/g, '')
  const textArr = plainText.split(' ').slice(0, characterCount)
  // Ensure words aren't broken on excerpts
  for (let n = 0; n < textArr.length; n += 1) {
    if (count < characterCount - 1) {
      excerpt.push(textArr[n])
      count = count + textArr[n].length + 1
    } else {
      break
    }
  }
  return `${excerpt.join(' ')}...`
};