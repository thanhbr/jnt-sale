import {useRef} from "react";
import {Text} from "../../common/text";
import {THEME_COLORS} from "../../common/theme/_colors";
import {Tooltip} from "../../common/tooltip";
import {INPUT_VALIDATE_TYPE_COLORS, INPUT_VALIDATE_TYPES} from "../../common/form/input/_constants";
import {INPUT_ICONS} from "../../common/form/input/_icons";
import {StyledInput} from '../../common/form/input/_styled'

export const Input = ({
    className,
    defaultValue,
    icon,
    label,
    labelTooltip,
    validateText,
    validateType,
    value,
    onChange,
    onKeyDown,
    onIconClick,
    ...props
  }) => {
  const inputRef = useRef()

  const validate = validateText
    ? {
      content: validateText,
      type: INPUT_VALIDATE_TYPES.includes(validateType)
        ? validateType
        : 'success',
    }
    : null

  return (
    <StyledInput className={className} {...props}>
      {label && (
        <Text as="label" className="input__label" color={THEME_COLORS.gray_900}>
          {label}{' '}
          {labelTooltip && (
            <Tooltip title={labelTooltip}>{INPUT_ICONS.question}</Tooltip>
          )}
        </Text>
      )}
      <input
        ref={inputRef}
        {...props}
        className="input__input"
        value={value}
        data-icon={!!icon}
        data-validate={validate?.type}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {!!icon && (
        <div
          className="input__icon"
          style={{
            cursor: 'pointer',
            pointerEvents: onIconClick ? 'all' : 'none',
          }}
          onClick={e => {
            if (onIconClick) {
              e.stopPropagation()
              onIconClick()
            } else {
              if (inputRef?.current) inputRef.current.focus()
            }
          }}
        >
          {icon}
        </div>
      )}
      {validate && (
        <Text
          className="input__validate"
          color={INPUT_VALIDATE_TYPE_COLORS[validate.type]}
          fontSize={12}
          lineHeight={17}
        >
          {validate.content}
        </Text>
      )}
    </StyledInput>
  )
}
