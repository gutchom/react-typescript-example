import React from 'react'

export interface LoggedInputHintProps {
  name: string
  hint: string
  position: number
  selecting: number
  handleSelect: (chosen: HTMLInputElement) => void
}

const LoggedInputHint: React.SFC<LoggedInputHintProps> = props => {
  let radioInput: HTMLInputElement

  const handleRadioClick = () => {
    props.handleSelect(radioInput)
  }

  return (
    <li className="hint">
      <input className="radio-input"
             type="radio"
             id={`radio-${props.name}-${props.position}`}
             name={props.name}
             value={props.position}
             checked={(props.position === props.selecting)}
             onChange={handleRadioClick}
             ref={(radio: HTMLInputElement) => radioInput = radio} />
      <label htmlFor={`radio-${props.name}-${props.position}`}>
        <span>{props.hint}</span>
      </label>
    </li>
  )
}

export default LoggedInputHint