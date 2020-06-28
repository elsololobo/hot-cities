import React, { useMemo } from 'react'
import { gameActions } from './reducer'
import Icon from './Icon'

const Setting = (props) =>
  useMemo(() => {
    const { unit, dispatch, history } = props
    return (
      <div className="container">
        <div className="row d-block">
          <h3 className="text-primary">Choose Temperature Measurement Unit:</h3>
          <div className="form-check">
            <label className="form-check-label" htmlFor="metric">
              <input
                className="form-check-input"
                type="radio"
                name="unit"
                id="metric"
                value="metric"
                checked={unit === 'metric'}
                onChange={(e) =>
                  dispatch({
                    type: gameActions.changeUnit,
                    payload: e.target.value
                  })
                }
              />
              Metric (Celsius)
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label" htmlFor="imperial">
              <input
                className="form-check-input"
                type="radio"
                name="unit"
                id="imperial"
                value="imperial"
                checked={unit === 'imperial'}
                onChange={(e) =>
                  dispatch({
                    type: gameActions.changeUnit,
                    payload: e.target.value
                  })
                }
              />
              Imperial (Fahrenheit)
            </label>
          </div>
        </div>
        {history && history.length > 0 && (
          <div className="row d-block">
            <h3 className="text-secondary">Game History:</h3>
            {history.map((item) => {
              return (
                <div
                  className="row w-50 zero-padding h6 d-flex justify-content-center custom-font-size"
                  key={item.id}
                >
                  <div className="col-md-1 align-middle text-center align-self-center">
                    <span className="text-secondary h4">{item.id}.</span>
                  </div>
                  <div className="col">
                    <div
                      className={
                        item.isCorrect === item.city1.selected
                          ? 'alert alert-success h-100'
                          : 'alert alert-danger h-100'
                      }
                    >{`${item.city1.name}, ${item.city1.country}, ${item.city1.temperature}`}</div>
                  </div>
                  <div className="col-md-auto align-middle text-center align-self-center custom-padding">
                    <Icon isCorrect={item.isCorrect} width={20} height={20} />
                  </div>
                  <div className="col">
                    <div
                      className={
                        item.isCorrect === item.city2.selected
                          ? 'alert alert-success h-100'
                          : 'alert alert-danger h-100'
                      }
                    >{`${item.city2.name}, ${item.city2.country}, ${item.city2.temperature}`}</div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }, [props])

export default Setting
