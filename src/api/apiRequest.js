const handleResponse = (response) => {
  return new Promise((resolve, reject) => {
    if (response.ok) {
      let contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        response.json().then((json) => resolve(json))
      } else {
        resolve(response)
      }
    } else {
      response.text().then((text) => reject(text))
    }
  })
}

const handleError = (error) => {
  return Promise.reject(error && error.message)
}

export const jsonRequest = (url, body, method = 'GET') => {
  const headers = new Headers()

  headers.append('Accept', 'application/json')
  let options = { headers, mode: 'cors', method: method }
  if (body) {
    options.method = method
    options.body = JSON.stringify(body)
    headers.append('Content-Type', 'application/json')
  }
  return fetch(url, options).then(handleResponse, handleError)
}
