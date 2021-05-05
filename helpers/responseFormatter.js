module.exports = (response) => {
  if (!response.success) {
    const error = new Error(response.error || response.message || response.msg)
    error.code = response.code
    throw error
  }
  return response.data
}
