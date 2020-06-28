import React, { useMemo } from 'react'
import Icon from './Icon'
import City from './City'
const Game = (props) =>
  useMemo(() => {
    const {
      score,
      count,
      cities,
      loading,
      submitted,
      makeGuess,
      isCorrect,
      nextCities,
      unit
    } = props
    return (
      <div className="container">
        <div className="justify-content-center question">
          <h3 className="text-primary text-center">
            Guess Which City Is Hotter Right Now!
          </h3>
          <h6 className="text-secondary text-center">
            Only Correct Answer Gives You A Point
          </h6>
        </div>
        <div className="row d-flex justify-content-center mx-auto">
          {cities && cities.length > 0 && (
            <City
              city={cities[0]}
              isCorrect={
                cities[0].temperature !== null &&
                cities[1].temperature &&
                cities[0].temperature > cities[1].temperature
              }
              submitted={submitted}
              onClick={makeGuess}
              loading={loading}
              unit={unit}
            />
          )}
          <div className="col-md-auto align-middle text-center align-self-center">
            {loading ? (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <h4 className="text-primary">OR</h4>
            )}
          </div>
          {cities && cities.length > 0 && (
            <City
              city={cities[1]}
              isCorrect={
                cities[0].temperature !== null &&
                cities[1].temperature &&
                cities[0].temperature < cities[1].temperature
              }
              submitted={submitted}
              onClick={makeGuess}
              loading={loading}
              unit={unit}
            />
          )}
        </div>
        <div className="row justify-content-center">
          {submitted && !loading && (
            <h4 className={`${isCorrect ? 'text-success' : 'text-danger'}`}>
              {isCorrect ? 'Correct!' : 'Wrong!'}{' '}
              <Icon isCorrect={isCorrect} width={25} height={25} />
            </h4>
          )}
        </div>
        <div className="row justify-content-center">
          <span className="text-primary">
            Your Score: {score + '/' + count}
          </span>
        </div>
        <div className="row justify-content-center">
          <button
            id={'next-btn'}
            type="button"
            className="btn btn-primary btn-lg"
            disabled={!submitted || loading}
            onClick={() => nextCities()}
          >
            Next Cities
          </button>
        </div>
      </div>
    )
  }, [props])
export default Game
