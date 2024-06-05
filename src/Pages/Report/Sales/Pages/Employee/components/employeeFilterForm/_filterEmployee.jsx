import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {Option} from 'common/form/autoComplete/_option'
import useEmployeeFilterForm from '../../hooks/useEmployeeFilterForm'
import { useTranslation } from 'react-i18next'

export const FilterEmployee = () => {
  const {employee} = useEmployeeFilterForm()
  const {t} = useTranslation()
  return (
    <AlternativeAutoComplete
      id="employee"
      className="order-filter-form__input-wide"
      // main input
      inputProps={{
        categoryList: [{name: t('all'), value: ''}, ...employee.categoryList], // menu list in category dropdown
        categoryValue: employee.categoryValue, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 160,
        placeholder: t('team_of_employees'),
        readOnly: true,
        value:
          employee?.value?.length > 0 ? `${t('selected')} ${employee?.value?.length}` : '',
        onIconClick: employee.onInputReset,
      }}
      // menu
      menuProps={{
        empty:
          employee.list.length <= 0
            ? employee.tab === 'all'
              ? t('search_no_data_employee')
              : t('no_data_employee')
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
