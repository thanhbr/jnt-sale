import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {Option} from 'common/form/autoComplete/_option'
import useShippingDifferenceEmployeeFilterForm from '../../hooks/useShippingDifferenceEmployeeFilterForm'
import { useTranslation } from 'react-i18next'

export const OrderEmployee = () => {
  const {employee} = useShippingDifferenceEmployeeFilterForm()
  const {t} = useTranslation()
  return (
    <AlternativeAutoComplete
      id="employee"
      className="order-filter-form__input-wide"
      // main input
      inputProps={{
        categoryList: [{name: t('all'), value: ''}, ...employee.categoryList], // menu list in category dropdown
        categoryValue: employee.categoryValue, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 140,
        placeholder: t('report__select_employee'),
        readOnly: true,
        value:
          employee.value.length > 0 ? `${t('selected')} ${employee.value.length}` : '',
        onIconClick: employee.onInputReset,
      }}
      // menu
      menuProps={{
        empty:
          employee.list.length <= 0
            ? employee.tab === 'all'
              ? t('report__find_no_employee')
              : t('report__havent_employee_yet')
            : '',
        multipleChoices: true,
        onReset: employee.onInputReset, // only use this prop for multiple choice
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: t('search_employee'),
        value: employee.keyword,
        onChange: employee.onKeywordChange,
      }}
      // tab list <only use this prop for multiple choices>
      tabProps={{
        active: employee.tab,
        checkedNumber: employee.value.length,
        onChange: employee.onTabChange,
      }}
    >
      {employee.list.length > 0 &&
        employee.list.map(item => (
          <Option
            key={item.value}
            className="order-filter-form__option-text"
            checked={!!employee.value.find(find => find.value === item.value)}
            multipleChoices={true}
            onClick={() =>{
              employee.onChange({
                id: item.value,
                category: employee.categoryValue,
                value: item.name,
              })
            }}
          >
            {item.name}
          </Option>
        ))}
    </AlternativeAutoComplete>
  )
}
