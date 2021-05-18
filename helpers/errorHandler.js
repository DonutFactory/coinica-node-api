module.exports = (response) => {
  return {
    status: response.status || 500,
    error: true,
    message: response.message || 'Internal server error',
    data: response.data || null
  }
}
