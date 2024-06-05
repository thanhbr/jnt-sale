import {Button} from 'common/button'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {useEffect, useRef} from 'react'
import {useState} from 'react'
import {StyledTagInput} from './_styled'

export const TagInput = ({
  warningTags = [],
  warningTagsValidate,
  defaultValue,
  validate,
  length = 0,
  disabled,
  duplicate,
  triggerDefault,
  onChange,
  onDelete,
  inputProps,
  ...props
}) => {
  const [tags, setTags] = useState(defaultValue || [])
  const [value, setValue] = useState('')

  const [isFocus, setIsFocus] = useState(false)

  const inputRef = useRef(null)

  const handleAddTag = () => {
    let skip = value.trim() === ''
    tags.map(item => {
      if (item === value.trim()) skip = true
    })

    if (!skip && (length == 0 || (length > 0 && tags.length <= length))) {
      const newValue = [...tags, value.trim()]
      setTags(newValue)
      if (onChange) onChange(newValue)
    }

    setValue('')
  }

  const handleDeleteTag = index => {
    const newValue = tags.filter((item, i) => i !== index)

    setTags(newValue)

    if (onChange) onChange(newValue)
    if (onDelete) onDelete(newValue)
  }

  useEffect(() => {
    setTags(defaultValue || [])
  }, [triggerDefault])

  return (
    <StyledTagInput
      {...props}
      data-disabled={disabled}
      data-focus={isFocus}
      data-validate={
        !!validate || tags.filter(item => warningTags.includes(item)).length > 0
      }
    >
      {tags.map((item, i) => (
        <Button
          key={`${item}-${i}`}
          className="tag-input__button"
          size="xxs"
          disabled={disabled}
          icon={
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => handleDeleteTag(i)}
            >
              <path
                d="M8.5 3.5L3.5 8.5M3.5 3.5L8.5 8.5"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          iconPosition="back"
          data-danger={warningTags.includes(item)}
        >
          {item}
        </Button>
      ))}
      <input
        ref={inputRef}
        className="tag-input__input"
        placeholder="Nhập và nhấn Enter để thêm từ khóa"
        value={value}
        onBlur={() => {
          setIsFocus(false)
          setValue('')
          if (inputProps?.onBlur) inputProps?.onBlur(tags)
        }}
        onChange={e => setValue(e.target.value)}
        onFocus={() => {
          setIsFocus(true)
          if (inputProps?.onFocus) inputProps.onFocus()
        }}
        onKeyUp={e => e.keyCode === 13 && handleAddTag()}
      />
      {/* {!!validate ||
        (tags.filter(item => warningTags.includes(item)).length > 0 &&
          warningTagsValidate && (
            <Text
              className="tag-input__validate"
              color={THEME_SEMANTICS.failed}
              fontSize={12}
              lineHeight={17}
            >
              {warningTagsValidate || validate}
            </Text>
          ))} */}
    </StyledTagInput>
  )
}
