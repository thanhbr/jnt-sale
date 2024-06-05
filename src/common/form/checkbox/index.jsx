import {THEME_COLORS} from 'common/theme/_colors'
import styled from 'styled-components'

export const Checkbox = ({checked, disabled, indeterminate, ...props}) => {
  const handleChange = event => {
    if (disabled) return
    if (props?.onChange) props.onChange(event)
  }

  return (
    <StyledCheckbox
      {...props}
      data-checked={checked}
      data-disabled={disabled}
      data-indeterminate={indeterminate}
    >
      <input
        {...props}
        type="checkbox"
        className="checkbox__input"
        checked={checked}
        onChange={handleChange}
      />
    </StyledCheckbox>
  )
}

const StyledCheckbox = styled.div`
  position: relative;

  width: 18px;
  height: 18px;

  background: #f5f5fa;
  border: 1px solid #dddde3;
  border-radius: 4px;

  transition: all 0.25s;

  cursor: pointer;

  &[data-checked='true'] {
    background: ${THEME_COLORS.green};
    border-color: ${THEME_COLORS.green}!important;

    &::before {
      opacity: 1;
    }
  }

  &[data-disabled='true'] {
    border-color: transparent !important;

    cursor: no-drop;

    &[data-checked='true'] {
      background: #8fcccb !important;
    }

    .checkbox__input {
      cursor: no-drop;
    }
  }

  &[data-indeterminate='true'] {
    &::before {
      width: 10px;
      height: 2px;

      background: #fff;
      border: none;

      transform: translate(-50%, -50%);
    }
  }

  &::before {
    position: absolute;
    top: 50%;
    left: 50%;

    width: 10px;
    height: 5px;

    border: 2px solid #fff;
    border-top: none;
    border-right: none;
    opacity: 0;

    content: '';

    transition: opacity 0.25s;
    transform: translate(-50%, -65%) rotate(-45deg);

    pointer-events: none;
  }

  &:hover {
    border-color: ${THEME_COLORS.green};
  }

  .checkbox__input {
    width: 100%;
    height: 100%;

    opacity: 0;

    cursor: pointer;
  }
`
