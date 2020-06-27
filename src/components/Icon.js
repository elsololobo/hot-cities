import React, { useMemo } from 'react'
import correct from '../images/correct.svg'
import wrong from '../images/wrong.svg'

const Icon = (props) =>
  useMemo(() => {
    const { isCorrect, width, height } = props
    return (
      <img
        src={isCorrect ? correct : wrong}
        width={width}
        height={height}
        alt={isCorrect ? 'correct' : 'wrong'}
      />
    )
  }, [props])
export default Icon
