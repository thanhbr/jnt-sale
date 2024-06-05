import {useRef, useState} from "react";
import {Button} from "../../../../../common/button";
import styled from "styled-components";
import {THEME_SEMANTICS} from "../../../../../common/theme/_semantics";
import {THEME_COLORS} from "../../../../../common/theme/_colors";

export const TagInput = ({
                           warningTags = [],
                           warningTagsValidate,
                           defaultValue,
                           validate,
                           length = 0,
                           disabled,
                           duplicate,
                           onChange,
                           onDelete,
                           inputProps,
                           placeholder,
                           ...props
                         }) => {
  const [tags, setTags] = useState(defaultValue || [])
  const [attributes, setAttributes] = useState('')

  const [isFocus, setIsFocus] = useState(false)
  const STATUS_DEFAULT_ATTR = 'create'

  const inputRef = useRef(null)

  const handleAddTag = () => {
    let skip = attributes.trim() === ''
    tags.map(item => {
      if (item?.value === attributes?.trim()) skip = true
    })
    if (!skip && (length === 0 || (length > 0 && tags?.length <= length))) {
      const newValue = [...tags, {value: attributes?.trim(), status: STATUS_DEFAULT_ATTR}]
      setTags(newValue)
      if (onChange) onChange(newValue)
    }
    setAttributes('')
  }

  const handleDeleteTag = index => {
    const newValue = tags.filter((item, i) => i !== index)

    setTags(newValue)

    if (onChange) onChange(newValue)
    if (onDelete) onDelete(newValue)
  }

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
          disabled={item?.status === 'create' ? disabled : true}
          icon={item?.status === 'create' ? (
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
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : null
          }
          iconPosition="back"
          data-danger={warningTags.includes(item?.value)}
          style={{height: '24.5px', lineHeight: '100%'}}
        >
          {item?.value}
        </Button>
      ))}
      <input
        ref={inputRef}
        className="tag-input__input"
        placeholder={placeholder || "Nhập và nhấn Enter để thêm từ khóa"}
        value={attributes}
        onBlur={() => {
          setIsFocus(false)
          setAttributes('')
          if (inputProps?.onBlur) inputProps?.onBlur(tags)
        }}
        onChange={e => setAttributes(e.target.value)}
        onFocus={() => {
          setIsFocus(true)
          if (inputProps?.onFocus) inputProps.onFocus()
        }}
        maxLength={20}
        onKeyUp={e => e.keyCode === 13 && handleAddTag()}
      />
      {/*{!!validate ||*/}
      {/*  (tags.filter(item => warningTags.includes(item)).length > 0 &&*/}
      {/*    warningTagsValidate && (*/}
      {/*      <Text*/}
      {/*        className="tag-input__validate"*/}
      {/*        color={THEME_SEMANTICS.failed}*/}
      {/*        fontSize={12}*/}
      {/*        lineHeight={17}*/}
      {/*      >*/}
      {/*        {warningTagsValidate || validate}*/}
      {/*      </Text>*/}
      {/*    ))}*/}
    </StyledTagInput>
  )
}

export const StyledTagInput = styled.div`
  position: relative;

  width: 100%;
  min-height: 36px;
  padding: 10px 16px;

  display: flex;
  flex-wrap: wrap;

  background: #fff;
  border: 1px solid #ebeef5;
  border-radius: 6px;

  transition: border 0.25s;

  &[data-disabled='true'] {
    background: linear-gradient(
        0deg,
        rgba(244, 247, 252, 0.98),
        rgba(244, 247, 252, 0.98)
      ),
      #00081d;
    border-color: #ebeef5 !important;

    cursor: no-drop;

    * {
      pointer-events: none !important;
    }
  }

  &[data-validate='true'] {
    border-color: ${THEME_SEMANTICS.failed} !important;
  }

  &[data-focus='true'],
  &:hover {
    border-color: ${THEME_COLORS.primary_300};
  }

  .tag-input {
    &__button {
      margin-right: 4px;
      margin-bottom: 4px;
      padding: 0 8px !important;

      background: rgba(30, 154, 152, 0.16);
      border-color: rgba(30, 154, 152, 0.16);
      color: black;

      font-weight: 400;

      cursor: default;

      &[data-danger='true'] {
        background: ${THEME_SEMANTICS.failed};
        border-color: ${THEME_SEMANTICS.failed};

        .button__container {
          svg {
            path {
              stroke: #fff !important;
            }
          }
        }
      }

      &:disabled {
        background: #d9e0ed !important;
        color: #717483 !important;

        .button__container {
          svg {
            path {
              stroke: #717483 !important;
            }
          }
        }
      }

      .button__container {
        svg {
          width: 14px;
          height: 14px;
          margin-left: 4px;

          cursor: pointer;
          pointer-events: all;

          &:hover {
            path {
              stroke: ${THEME_SEMANTICS.failed};
            }
          }

          path {
            transition: stroke 0.25s;
            stroke: black;
          }
        }
      }
    }

    &__input {
      min-width: 220px;
      height: 24px;

      flex: 1;

      background: transparent;
      border: none;

      font-size: 14px;
      font-weight: 400;

      &::placeholder {
        color: #9ca0ab;
      }
    }

    &__validate {
      position: absolute;
      bottom: -19px;
      left: 0;
    }
  }
`
