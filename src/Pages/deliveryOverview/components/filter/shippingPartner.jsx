import React, {useContext, useEffect} from 'react';
import {AlternativeAutoComplete} from "../../../../common/form/autoComplete/_alternativeAutoComplete";
import {Option} from "../../../../common/form/autoComplete/_option";
import UseDeliveryOverviewFilter from "../../hooks/useDeliveryOverviewFilter";
import "./index.scss"
import {DeliveryOverviewContext} from "../../provider/~context";
const FilterShippingPartner = () => {
  const {shippingPartner, fetch} = UseDeliveryOverviewFilter()
    const {pageState,} = useContext(DeliveryOverviewContext)
    const list = shippingPartner.list.slice(0,6)
  return (
    <AlternativeAutoComplete
      className="order-filter-form__input-wide"
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: 'Đối tác vận chuyển', value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 140,
        placeholder: 'Chọn đối tác vận chuyển',
        readOnly: true,
        value: shippingPartner.activeValue || 'Tất cả',
        // onIconClick: () => shippingPartner.onChange(null),
      }}
      // menu
      menuProps={{
        empty:
          shippingPartner.list.length <= 0
            ? 'Không tìm thấy đối tác vận chuyển'
            : '',
      }}
      searchInputProps={{
        placeholder: 'Tìm kiếm đối tác vận chuyển',
        value: pageState.filter.shippingPartner.keyword,
        onChange: shippingPartner.onKeywordChange,
      }}
    >
      {shippingPartner.list.length > 0 &&
          <>
              {pageState.filter.shippingPartner.keyword==='' &&
              <Option
                  className="order-filter-form__option-text"
                  data-active={shippingPartner.activeValue === 'Tất cả'}
                  onClick={() => shippingPartner.onChange({name:'Tất cả',value:''})}
              >
                  Tất cả
              </Option>
              }

              {list?.map(item => {
                      if(item !== false && item.name !== 'SuperShip'){
                          return <Option
                              key={item.value}
                              className="order-filter-form__option-text"
                              data-active={item.name ===shippingPartner.activeValue}
                              onClick={() => shippingPartner.onChange(item)}
                          >
                              {item.name}
                          </Option>
                      }
              }
              )}
          </>
     }
    </AlternativeAutoComplete>
  )
};

export default FilterShippingPartner;