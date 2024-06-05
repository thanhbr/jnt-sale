import { Grid } from '@mui/material'
import {Option} from "../../../../../common/form/autoComplete/_option";
import useCustomerFilterForm from "../../hooks/useCustomerFilterForm";
import { useContext } from 'react';
import { CustomerContext } from 'Pages/customer';
import {AlternativeAutoComplete} from "../../../../../common/form/autoComplete/_alternativeAutoComplete";

export default () => {
  const {state, dispatch} = useContext(CustomerContext)
  const {groupCustomer, groupCity, groupDistrict, groupWard, ref} = useCustomerFilterForm({state, dispatch})

  return (
    <Grid container className="customer-filter__collapse-group">
      <Grid xs={3} sm={3} md={3} lg={3} item>
        <AlternativeAutoComplete
          className="customer-filter-collapse__input-wide"
          // main input
          inputProps={{
            categoryList: [], // menu list in category dropdown
            categoryValue: {name: 'Nhóm khách hàng', value: ''}, // if not exist this value -> default category: categoryList[0]
            categoryWidth: 140,
            placeholder: 'Chọn nhóm khách hàng',
            readOnly: true,
            value: groupCustomer?.name || '',
            // onIconClick: () => groupCustomer.onChange(null),
          }}
          // menu
          menuProps={{
            empty:
              groupCustomer?.list?.length <= 0
                ? 'Không tìm thấy nhóm khách hàng'
                : '',
          }}
          // search input in dropdown menu
          searchInputProps={{
            placeholder: 'Tìm kiếm nhóm khách hàng',
            value: groupCustomer?.keyword,
            onChange: groupCustomer?.onKeywordChange,
          }}
        >
          {groupCustomer?.list?.length > 0 &&
          groupCustomer?.list?.map((item, index) => (
            <Option
              key={index}
              className="customer-filter-form__option-text"
              data-active={+groupCustomer.value === +item?.id}
              onClick={() => groupCustomer.onSelected(item)}
            >
              {item?.name}
            </Option>
          ))}
        </AlternativeAutoComplete>
      </Grid>
      <Grid xs={3} sm={3} md={3} lg={3} item>
        <AlternativeAutoComplete
          className="customer-filter-collapse__input-wide"
          // main input
          inputProps={{
            categoryList: [], // menu list in category dropdown
            categoryValue: {name: 'Tỉnh/Thành phố', value: ''}, // if not exist this value -> default category: categoryList[0]
            categoryWidth: 140,
            placeholder: 'Chọn Tỉnh/Thành phố',
            readOnly: true,
            value: groupCity?.name || '',
            // onIconClick: () => groupCity.onChange(null),
          }}
          // menu
          menuProps={{
            empty:
              groupCity?.list?.length <= 0
                ? 'Không tìm thấy tỉnh/thành phố'
                : '',
          }}
          // search input in dropdown menu
          searchInputProps={{
            placeholder: 'Tìm kiếm tỉnh/thành phố',
            value: groupCity?.keyword,
            onChange: groupCity?.onKeywordChange,
          }}
        >
          {groupCity.list.length > 0 &&
          groupCity.list.map((item, index) => (
            <Option
              key={index}
              className="customer-filter-form__option-text"
              data-active={item === groupCity.name}
              onClick={() => groupCity.onSelected(item)}
            >
              {item}
            </Option>
          ))}
        </AlternativeAutoComplete>
      </Grid>
      <Grid xs={3} sm={3} md={3} lg={3} item>
        <AlternativeAutoComplete
          className="customer-filter-collapse__input-wide"
          // main input
          inputProps={{
            categoryList: [], // menu list in category dropdown
            categoryValue: {name: 'Quận/Huyện', value: ''}, // if not exist this value -> default category: categoryList[0]
            categoryWidth: 140,
            placeholder: 'Chọn Quận/Huyện',
            readOnly: true,
            value: groupDistrict?.name || '',
            disabled: !!!groupCity.value && true
            // onIconClick: () => groupCity.onChange(null),
          }}
          // menu
          menuProps={{
            empty:
              groupDistrict?.list?.length <= 0
                ? 'Không tìm thấy quận/huyện'
                : '',
          }}
          // search input in dropdown menu
          searchInputProps={{
            placeholder: 'Tìm kiếm quận/huyện',
            value: groupDistrict?.keyword,
            onChange: groupDistrict?.onKeywordChange,
          }}
        >
          {groupDistrict?.list?.length > 0 &&
          groupDistrict?.list?.map((item, index) => (
            <Option
              key={index}
              className="customer-filter-form__option-text"
              data-active={item === groupDistrict.name}
              onClick={() => groupDistrict.onSelected(item)}
            >
              {item}
            </Option>
          ))}
        </AlternativeAutoComplete>
      </Grid>
      <Grid xs={3} sm={3} md={3} lg={3} item>
        <AlternativeAutoComplete
          className="customer-filter-collapse__input-wide"
          // main input
          inputProps={{
            categoryList: [], // menu list in category dropdown
            categoryValue: {name: 'Phường/xã', value: ''}, // if not exist this value -> default category: categoryList[0]
            categoryWidth: 140,
            placeholder: 'Chọn phường/xã',
            readOnly: true,
            value: groupWard?.name || '',
            disabled: !!!groupDistrict.value && true
            // onIconClick: () => groupCity.onChange(null),
          }}
          // menu
          menuProps={{
            empty:
              groupWard?.list?.length <= 0
                ? 'Không tìm thấy phường/xã'
                : '',
          }}
          // search input in dropdown menu
          searchInputProps={{
            placeholder: 'Tìm kiếm phường/xã',
            value: groupWard?.keyword,
            onChange: groupWard?.onKeywordChange,
          }}
        >
          {groupWard?.list?.length > 0 &&
          groupWard?.list?.map((item, index) => (
            <Option
              key={index}
              className="customer-filter-form__option-text"
              data-active={item === groupWard.name}
              onClick={() => groupWard?.onSelected(item)}
            >
              {item}
            </Option>
          ))}
        </AlternativeAutoComplete>
      </Grid>
    </Grid>
  )
}