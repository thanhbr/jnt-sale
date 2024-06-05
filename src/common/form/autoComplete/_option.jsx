import {Checkbox} from '../checkbox'

export const Option = ({multipleChoices, ...props}) => {
  return (
    <li
      {...props}
      className={`auto-complete__option ${props?.className || ''}`}
    >
      {multipleChoices ? (
        <div className="auto-complete__option-container">
          <Checkbox checked={props?.checked} />
          <div style={{marginLeft: 12}}>{props?.children}</div>
        </div>
      ) : (
        <div className="auto-complete__option-container" data-sm="true">
          {props?.children}
        </div>
      )}
    </li>
  )
}
