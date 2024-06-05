import {Checkbox} from 'common/form/checkbox'
import {Radio} from 'common/form/radio'
import {Select} from 'common/form/select'
import {Text} from 'common/text'
import ArrayUtils from 'Pages/facebookManament/utils/array'
import {FacebookLivestreamScriptSingle__SelectOption} from '../__selectOption'

export const FacebookLivestreamScriptSingle_ConfigGroupItem = ({
  data,
  defaultValue,
  activeValue,
  isLastMultipleRow,
  onChange,
  ...props
}) => {
  const optionList = ArrayUtils.getQualifiedArray(data?.values)

  switch (data?.type) {
    case 'selectbox':
      return (
        <div {...props}>
          <Text as="b" style={{marginBottom: 8, display: 'block'}}>
            {data?.title || '---'}
          </Text>
          <SelectBoxType
            {...props}
            list={optionList.map(item => ({
              name: item?.title || '---',
              value: item?.value || '',
            }))}
            value={`${
              activeValue ? activeValue : defaultValue || optionList[0]?.value
            }`}
            isReverse={isLastMultipleRow}
            onChange={opt => onChange && onChange(data?.field, opt)}
            inputProps={{
              placeholder: `Chọn ${
                typeof data?.title === 'string'
                  ? data.title.toLowerCase()
                  : '---'
              }`,
            }}
          />
        </div>
      )

    case 'radio':
      return (
        <div {...props}>
          <Text as="b" style={{marginBottom: 8, display: 'block'}}>
            {data?.title || '---'}
          </Text>
          {optionList.map((item, i) => (
            <OptionType
              key={i}
              data={item}
              type="radio"
              name={data?.field}
              inputProps={{
                checked:
                  `${
                    activeValue || activeValue === ''
                      ? activeValue
                      : defaultValue || optionList[0]?.value
                  }` === item?.value,
                name: data?.field,
                value: item?.value,
              }}
              data-fluid={optionList.length <= 2}
              onClick={() =>
                onChange &&
                onChange(data?.field, {type: 'single', value: item?.value})
              }
            />
          ))}
        </div>
      )

    case 'checkbox':
      return (
        <div {...props}>
          <Text as="b" style={{marginBottom: 8, display: 'block'}}>
            {data?.title || '---'}
          </Text>
          {optionList.map((item, i) => (
            <OptionType
              key={i}
              data={item}
              type="checkbox"
              inputProps={{
                checked: activeValue
                  ? activeValue.includes(item?.value)
                  : [`${defaultValue}`].includes(item?.value) ||
                    [`${optionList[0]?.value}`].includes(item?.value),
                disabled:
                  data?.field === 'partsign' && `${defaultValue}` === '0',
                name: data?.field,
                value: item?.value,
              }}
              data-fluid={optionList.length <= 2}
              onClick={() =>
                onChange &&
                onChange(data?.field, {type: 'multiple', value: item?.value})
              }
            />
          ))}
        </div>
      )

    default:
      return <></>
  }
}

const SelectBoxType = ({list, value, name, isReverse, onChange, ...props}) => {
  return (
    <Select
      {...props}
      value={list.find(item => item.value === value)?.name}
      style={{width: '100%'}}
      menuProps={{
        style: isReverse
          ? {top: 'unset', bottom: 'calc(100% + 4px)'}
          : undefined,
      }}
    >
      {list.length > 0 &&
        list.map(item => (
          <FacebookLivestreamScriptSingle__SelectOption
            key={`${name}-${item.value}`}
            data-active={item.value === value}
            onClick={() =>
              onChange && onChange({type: 'single', value: item.value})
            }
          >
            {item.name}
          </FacebookLivestreamScriptSingle__SelectOption>
        ))}
    </Select>
  )
}

const OptionType = ({data, type, inputProps, ...props}) => {
  const Optioner = type === 'radio' ? Radio : Checkbox

  return (
    <div
      style={{
        width: '100%',
        marginBottom: 16,
        display: 'flex',
        alignItems: 'center',
      }}
      {...props}
    >
      <Optioner {...inputProps} />
      <Text
        style={{
          marginLeft: 8,
          cursor: inputProps?.disabled ? 'no-drop' : 'pointer',
        }}
      >
        {data?.title || '---'}
      </Text>
    </div>
  )
}
