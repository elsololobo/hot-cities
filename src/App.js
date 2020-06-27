import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useState
} from 'react'
import cityList from './cities.json'
import sampleSize from 'lodash.samplesize'
import Header from './components/Header'
import Game from './components/Game'
import reducer, { gameActions, initialState } from './components/reducer'
import fetchWeatherData from './api/weather.api'

const navItems = [
  {
    name: 'game',
    text: 'Game',
    component: Game
  },
  {
    name: 'setting',
    text: 'Setting',
    component: ''
  }
]
export const DispatcherContext = createContext((val) => val)
const App = () => {
  const defaultState = initialState()
  const [active, setActive] = useState('game')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [selection, setSelection] = useState({
    chosenCity: null,
    correctCity: null
  })
  const [state, dispatch] = useReducer(reducer, defaultState)
  const ActiveComponent = navItems.find((item) => item.name === active)
    .component

  useEffect(() => {
    if (!submitted) {
      setSelection(null)
      dispatch({
        type: gameActions.setCities,
        payload: sampleSize(cityList, 2)
      })
    } else {
      const cities = state.cities
      setLoading(true)
      fetchWeatherData(cities[0].id, cities[1].id).then(
        (res) => {
          dispatch({
            type: gameActions.setTemperatures,
            payload: [res.list[0].main.temp, res.list[1].main.temp]
          })
          setLoading(false)
          setSelection((city) => {
            return {
              ...city,
              correctCity:
                res.list[0].main.temp > res.list[1].main.temp
                  ? res.list[0].id
                  : res.list[1].id
            }
          })
        },
        (err) => {
          setLoading(false)
          console.log('error', err)
        }
      )
    }
  }, [submitted])

  useEffect(() => {
    if (selection && selection.chosenCity && selection.correctCity)
      setIsCorrect(selection.chosenCity === selection.correctCity)
  }, [selection])

  useEffect(() => {
    if (isCorrect) dispatch({ type: gameActions.addScore })
  }, [isCorrect])

  const makeGuess = useCallback((cityId) => {
    setLoading(true)
    setSubmitted(true)
    setSelection((city) => {
      return {
        ...city,
        chosenCity: cityId
      }
    })
  }, [])

  const nextCities = useCallback(() => {
    dispatch({ type: gameActions.addCount })
    setSubmitted(false)
    setIsCorrect(false)
  }, [])

  return (
    <DispatcherContext.Provider value={dispatch}>
      <div className="App">
        <Header navItems={navItems} active={active} onClick={setActive} />
        <ActiveComponent
          loading={loading}
          {...state}
          makeGuess={makeGuess}
          submitted={submitted}
          isCorrect={isCorrect}
          nextCities={nextCities}
        />
      </div>
    </DispatcherContext.Provider>
  )
}

export default App
