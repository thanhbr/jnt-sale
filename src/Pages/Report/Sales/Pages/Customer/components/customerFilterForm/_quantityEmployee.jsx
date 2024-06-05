import { AlternativeAutoComplete } from 'common/form/autoComplete/_alternativeAutoComplete'
import { Option } from 'common/form/select/_option'
import { Text } from 'common/text'
import styled from 'styled-components'
import { THEME_COLORS } from 'common/theme/_colors'
import useCustomerFilterForm from '../../hooks/useCustomerFilterForm'
import { useTranslation } from 'react-i18next'

export const QuantityEmployee = () => {
  const {topEmployee} = useCustomerFilterForm()
  const {t} = useTranslation()
  return (
    <StyledQuantityEmployee>
      <AlternativeAutoComplete
        className="order-filter-form__input-wide"
        // main input
        inputProps={{
          categoryList: [], // menu list in category dropdown
          categoryValue: { name: t('Display'), value: '' }, // if not exist this value -> default category: categoryList[0]
          categoryWidth: 72,
          placeholder: ' ',
          readOnly: true,
          value: t(topEmployee?.name),
          // onIconClick: () => source.onChange(null),
        }}
        hideSearchBar={true}
      >
        {QuantityEmployeeOption.map(page => (
          <Option className={'option-report-type'}
                  onClick={() => topEmployee?.onchange(page)}
                  data-active={topEmployee?.value == page.value}>
            <Text as={'p'} >{t(page.name)}</Text>
          </Option>
        ))}
      </AlternativeAutoComplete>
    </StyledQuantityEmployee>

  )
}

export const QuantityEmployeeOption = [
  {
    value: 10,
    name: 'top_10_customer'
  },
  {
    value: 20,
    name: 'top_20_customer'
  },
]


const StyledQuantityEmployee = styled.div`
  width: 392px;
  margin-bottom: 16px;
  margin-left: 12px;
  .order-filter-form__input-wide{
    .alternative-auto-complete__menu-list{
      .option-report-type{
        min-height: 36px;
        display: flex;
        align-items: center;
        &[data-active='true'] {
          p{
            color: ${THEME_COLORS.primary_300}!important;
            cursor: default;
          }
        }
        &:hover{
          p{
            color: ${THEME_COLORS.primary_300}!important;
            cursor: pointer;
          }
        }
      }
    }
  }
`