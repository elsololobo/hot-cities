import React, { useMemo } from 'react'

const City = (props) =>
  useMemo(() => {
    const { city, isCorrect, onClick, submitted, loading } = props
    return (
      <div className="col" onClick={() => (!submitted ? onClick(city.id) : {})}>
        <div
          className={`card ${
            submitted && !loading
              ? isCorrect
                ? 'alert-success'
                : 'alert-danger'
              : 'alert-secondary'
          }`}
        >
          <div className="card-body">
            <h5 className="card-title">City Name: {(city || {}).name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              Country: {(city || {}).country}
            </h6>
            <p className="card-text">
              Temperature: {city.temperature.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    )
  }, [props])
export default City
