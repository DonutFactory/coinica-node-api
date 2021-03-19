module.exports = (arr) => {
  if (Array.isArray(arr)) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === undefined) {
        return true
      }
    }
    return false
  }
}
