import {Checkbox} from 'common/form/checkbox'
import {Radio} from 'common/form/radio'
import {Select} from 'common/form/select'
import {Option} from 'common/form/select/_option'
import {Text} from 'common/text'
import useBulkOrderCreateForm from 'Pages/bulkOrder/hooks/useBulkOrderCreateForm'
import {getArrayFromValue} from 'Pages/bulkOrder/utils/array'
import {StyledBulkOrderCreateFormOptionGroup} from './_styled'

export const BulkOrderCreateFormOptionGroup = ({
  data,
  defaultValue,
  ...props
}) => {
  const optionList = getArrayFromValue(data?.values)

  const {shippingPartner} = useBulkOrderCreateForm()
  const activeOptionValue = shippingPartner.data.options[`${data?.field}`]

  const handleInputChange = val => {
    let optionValue =
      data?.type === 'radio'
        ? val
        : activeOptionValue.includes(val)
        ? activeOptionValue.filter(item => item !== val)
        : [...activeOptionValue, val]

    shippingPartner.methods.onOptionChange(data?.field, {
      type: data?.type === 'radio' ? 'single' : 'multiple',
      value: optionValue,
    })
  }

  return (
    <StyledBulkOrderCreateFormOptionGroup {...props}>
      <Text as="h5">{data?.title || '---'}</Text>
      <div className="bulk-order-create-form-option-group__option-list">
        {data?.type === 'selectbox' && (
          <SelectBox
            list={optionList.map(item => ({
              name: item?.title || '---',
              value: item?.value || '',
            }))}
            name={data?.field}
            value={activeOptionValue || optionList[0]?.value}
            inputProps={{
              placeholder: `Chọn ${
                typeof data?.title === 'string'
                  ? data.title.toLowerCase()
                  : '---'
              }`,
            }}
            onChange={shippingPartner.methods.onOptionChange}
          />
        )}
        {['checkbox', 'radio'].includes(data?.type) &&
          optionList.map((item, i) => (
            <Item
              key={i}
              data={item}
              type={data?.type}
              inputProps={{
                checked:
                  data?.type === 'radio'
                    ? activeOptionValue === item?.value
                    : activeOptionValue.includes(item?.value),
                name: data?.field,
                value: item?.value,
                onClick: () => handleInputChange(item?.value),
              }}
              data-fluid={optionList.length <= 2}
            />
          ))}
      </div>
    </StyledBulkOrderCreateFormOptionGroup>
  )
}

const SelectBox = ({list, name, value, onChange, ...props}) => {
  return (
    <Select
      {...props}
      className="bulk-order-create-form-option-group__select"
      value={list.find(item => item.value === value)?.name}
    >
      {list.length > 0 &&
        list.map(item => (
          <Option
            key={`${name}-${item.value}`}
            className="bulk-order-create-form-option-group__select-item"
            data-active={item.value === value}
            onClick={() =>
              onChange && onChange(name, {type: 'single', value: item.value})
            }
          >
            {item.name}
          </Option>
        ))}
    </Select>
  )
}

const Item = ({data, type, inputProps, ...props}) => {
  const Optioner = type === 'radio' ? Radio : Checkbox

  return (
    <div
      {...props}
      className="bulk-order-create-form-option-group__option-item"
    >
      <Optioner
        {...inputProps}
        className="bulk-order-create-form-option-group__input"
      />
      <Text
        className="bulk-order-create-form-option-group__label"
        onClick={inputProps?.onClick}
      >
        {data?.title || '---'}
      </Text>
    </div>
  )
}
