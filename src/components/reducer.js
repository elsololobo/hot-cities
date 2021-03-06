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
      return { ...state, score: state.score + 1 }
    case gameActions.addCount:
      return { ...state, count: state.count + 1 }
    case gameActions.logMove:
      newState.history.push(action.payload)
      return newState
    case gameActions.setCities:
      newState.cities = [...action.payload]
      return newState
    case gameActions.changeUnit:
      return { ...state, unit: action.payload }
    case gameActions.setTemperatures:
      let cities = state.cities
      cities &&
        cities.forEach((city, index) => {
          city.temperature = action.payload[index]
        })
      return { ...state, cities: cities }
    case gameActions.resetState:
      return initialState()
    default:
      return state
  }
}
