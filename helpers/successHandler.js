module.exports = (response) => {
  return {
    status: response.status || 200,
    error: false,
    message: response.message || 'sucess',
    data: response.data || null
  }
}
