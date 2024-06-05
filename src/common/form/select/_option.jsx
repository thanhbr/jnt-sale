import {Checkbox} from '../checkbox'

export const Option = ({multipleChoices, ...props}) => {
  return (
    <div {...props} className={`select__option ${props?.className || ''}`}>
      {multipleChoices ? (
        <div className="select__option-container">
          <Checkbox checked={props?.checked} />
          <div style={{marginLeft: 12}}>{props?.children}</div>
        </div>
      ) : (
        props?.children
      )}
    </div>
  )
}
