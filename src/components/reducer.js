export const initialState = () => ({
  score: 0,
  count: 1,
  history: [],
  cities: [],
  unit: 'metric'
})

export const gameActions = {
  addScore: 'addScore',
  addCount: 'addCount',
  logMove: 'logMove',
  setCities: 'setCities',
  setTemperatures: 'setTemperatures',
  changeUnit: 'changeUnit',
  resetState: 'resetState'
}

export default function reducer(state, action) {
  let newState = { ...state }
  switch (action.type) {
    case gameActions.addScore:
      return { ...newState, score: state.score + 1 }
    case gameActions.addCount:
      return { ...newState, count: state.count + 1 }
    case gameActions.logMove:
      newState.history.push(action.payload)
      return { ...newState }
    case gameActions.setCities:
      newState.cities = [...action.payload]
      return { ...newState }
    case gameActions.changeUnit:
      return { ...newState, unit: action.payload }
    case gameActions.setTemperatures:
      let cities = newState.cities
      cities &&
        cities.forEach((city, index) => {
          city.temperature = action.payload[index]
        })
      return { ...newState, cities: cities }
    case gameActions.resetState:
      return initialState()
    default:
      return state
  }
}
