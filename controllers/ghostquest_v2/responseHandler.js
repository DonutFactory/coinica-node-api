exports.responseHandler = (response, functionName="") => {
  if (response.isError) {
    return {
      code: 500,
      responseData: {
        code: 500,
        error: true,
        data: null,
        message: `ERROR_${functionName || 'FUNCTION_CALL'}`,
      }
    }
  } else {
    return {
      code: 200,
      responseData: {
        code: 200,
        error: false,
        data: response,
        message: `SUCCESS_${functionName || 'FUNCTION_CALL'}`,
      }
    }
  }
}

exports.errorHandler = (error, isMissingParams = false, params = "") => {
  if (isMissingParams) {
    return {
      code: 400,
      error: true,
      data: null,
      message: `Parameters required: ${params}`
    }
  } else {
    return {
      code: 500,
      error: true,
      data: error.message || error.msg || error || null,
      message: 'Internal Server Error'
    }
  }
}
