import React from 'react';
import {Option} from "../../../../common/form/autoComplete/_option";
import {AlternativeAutoComplete} from "../../../../common/form/autoComplete/_alternativeAutoComplete";
import useFilterCapitalAdjustment from "../../hooks/useFilterCapitalAdjustment";
import {Text} from "../../../../common/text";
import {Tooltip} from "../../../../common/tooltip";

const EmployeeCreate = () => {
  const {employeeCreate} = useFilterCapitalAdjustment()

  return (
    <AlternativeAutoComplete
      className="capital-adjustment-form__input-wide"
      // main input
      inputProps={{
        categoryList: [{name: 'Người tạo phiếu', value: ''}], // menu list in category dropdown
        categoryWidth: 120,
        placeholder: 'Chọn người tạo phiếu',
        readOnly: true,
        value:
          employeeCreate?.value?.length > 0
            ? `Đã chọn ${employeeCreate?.value?.length}`
            : '',
        onIconClick: employeeCreate.onInputReset,
      }}
      // menu
      menuProps={{
        empty:
          employeeCreate?.list?.length <= 0
            ? employeeCreate?.tab === 'all'
            ? 'Không tìm thấy người tạo phiếu'
            : 'Bạn chưa chọn người tạo phiếu nào'
            : '',
        multipleChoices: true,
        onReset: employeeCreate.onInputReset, // only use this prop for multiple choice
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: 'Tìm kiếm người tạo phiếu',
        value: employeeCreate.keyword,
        onChange: employeeCreate.onKeywordChange,
      }}
      // tab list <only use this prop for multiple choices>
      tabProps={{
        active: employeeCreate.tab,
        checkedNumber: employeeCreate.value.length,
        onChange: employeeCreate.onTabChange,
      }}
    >
      {employeeCreate.list.length > 0 &&
        employeeCreate.list.map(item => (
          <Option
            key={item.user_id}
            className="capital-adjustment-filter-form__option-text"
            checked={
              !!employeeCreate.value.find(find => +find.user_id === +item.user_id)
            }
            multipleChoices={true}
            onClick={() => employeeCreate.onChange(item)}
          >
            {item?.fullname?.length <= 45
              ? <Text>{item?.fullname}</Text>
              : <Tooltip
                placement="bottom-start"
                title={item?.fullname}
              >
                <Text>{item?.fullname?.substring(0, 45)+' ...'}</Text>
              </Tooltip>
            }
          </Option>
      ))}
    </AlternativeAutoComplete>
  )
}

export default EmployeeCreate;