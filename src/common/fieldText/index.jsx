import {Tooltip} from '@mui/material'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {useState} from 'react'
import {FIELD_TEXT_ICONS} from './_icons'
import {StyledFieldText} from './_styled'

export const FieldText = ({
  icon,
  label,
  labelTooltip,
  type = 'text',
  validateText,
  validateType = 'success',
  value,
  onChange,
  containerProps,
  ...props
}) => {
  const [val, setVal] = useState(value || '')

  const validate = ['danger', 'success'].includes(validateType)
    ? validateType
    : 'success'

  const validateColors = {
    danger: THEME_SEMANTICS.failed,
    success: THEME_SEMANTICS.delivered,
  }

  const handleChange = e => {
    const currentValue = e.target.value
    setVal(currentValue)
  }

  return (
    <StyledFieldText {...containerProps}>
      {label && (
        <label className="field-text__label">
          <span>{label}</span>
          {labelTooltip && (
            <Tooltip
              id="global-tooltip"
              placement="top-start"
              title={labelTooltip}
              arrow
            >
              {FIELD_TEXT_ICONS.question}
            </Tooltip>
          )}
        </label>
      )}
      <input
        {...props}
        className={`field-text__input ${props?.className || ''}`}
        type={type}
        data-exist-icon={!!icon}
        data-validate={validateText ? validateType : undefined}
        value={val}
        onChange={e => handleChange(e)}
      />
      {icon && <div className="field-text__icon">{icon}</div>}
      {validateText && (
        <Text
          className="field-text__validate"
          color={validateColors[validate]}
          fontSize={12}
          lineHeight={17}
        >
          {validateText}
        </Text>
      )}
    </StyledFieldText>
  )
}
