import { jsonRequest } from './apiRequest'

const baseUrl = 'http://api.openweathermap.org/data/2.5/group?'
const appId = 'e08925f8c257a60bae572679dfbda08e'
export default function fetchWeatherData(city1Id, city2Id, unit) {
  return jsonRequest(
    `${baseUrl}id=${city1Id},${city2Id}&units=${unit}&appid=${appId}`,
    null,
    'GET'
  )
}
