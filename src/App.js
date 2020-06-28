import React, { useCallback, useEffect, useReducer, useState } from 'react'
import cityList from './cities.json'
import sampleSize from 'lodash.samplesize'
import Header from './components/Header'
import Game from './components/Game'
import reducer, { gameActions, initialState } from './components/reducer'
import fetchWeatherData from './api/weather.api'
import Setting from './components/Setting'

const navItems = [
  {
    name: 'game',
    text: 'Game',
    component: Game
  },
  {
    name: 'setting',
    text: 'Setting',
    component: Setting
  }
]
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
      const { cities, unit, count } = state
      setLoading(true)
      fetchWeatherData(cities[0].id, cities[1].id, unit).then(
        (res) => {
          const correctCity =
            res.list[0].main.temp > res.list[1].main.temp
              ? res.list[0].id
              : res.list[1].id
          const temps = [res.list[0].main.temp, res.list[1].main.temp]
          dispatch({
            type: gameActions.setTemperatures,
            payload: temps
          })
          setLoading(false)
          setSelection((city) => {
            return {
              ...city,
              correctCity: correctCity
            }
          })
          logMoves(
            cities,
            temps,
            unit,
            selection.chosenCity,
            correctCity,
            count
          )
        },
        (err) => {
          setLoading(false)
          console.log('error', err)
        }
      )
    }
  }, [submitted])

  useEffect(() => {
    if (selection && selection.chosenCity && selection.correctCity) {
      setIsCorrect(selection.chosenCity === selection.correctCity)
    }
  }, [selection])

  useEffect(() => {
    if (isCorrect) dispatch({ type: gameActions.addScore })
  }, [isCorrect])

  useEffect(() => {
    if (submitted) {
      const { cities, unit, count } = state
      setLoading(true)
      fetchWeatherData(cities[0].id, cities[1].id, unit).then(
        (res) => {
          const temps = [res.list[0].main.temp, res.list[1].main.temp]
          dispatch({
            type: gameActions.setTemperatures,
            payload: temps
          })
          setLoading(false)
        },
        (err) => {
          setLoading(false)
          console.log('error', err)
        }
      )
    }
  }, [state.unit])

  const logMoves = (cities, temps, unit, chosen, correct, id) => {
    const logItem = {
      id: id,
      city1: {
        name: cities[0].name,
        country: cities[0].country,
        temperature: `${temps[0]} ${unit === 'metric' ? '℃' : '℉'}`,
        selected: cities[0].id === chosen
      },
      city2: {
        name: cities[1].name,
        country: cities[1].country,
        temperature: `${temps[1]} ${unit === 'metric' ? '℃' : '℉'}`,
        selected: cities[1].id === chosen
      },
      isCorrect: chosen === correct
    }
    console.log('log', logItem)
    dispatch({ type: gameActions.logMove, payload: logItem })
  }

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
    <div className="App">
      <Header navItems={navItems} active={active} onClick={setActive} />
      <ActiveComponent
        {...state}
        loading={loading}
        makeGuess={makeGuess}
        submitted={submitted}
        isCorrect={isCorrect}
        nextCities={nextCities}
        dispatch={dispatch}
      />
    </div>
  )
}

export default App
