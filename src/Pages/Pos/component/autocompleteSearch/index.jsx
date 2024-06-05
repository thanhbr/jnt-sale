import { Option } from '../../../../common/form/autoComplete/_option'
import { SearchPosAutoComplete } from '../../../../common/form/autoComplete/_searchPosAutocomplete'
import { usePosSearchBox } from '../../hooks/usePosSearchBox'
import ReactImageFallback from 'react-image-fallback'
import { Text } from '../../../../common/text'
import { formatMoney } from '../../../../util/functionUtil'
import React from 'react'

export const AutocompleteSearch = () => {
  const { data } = usePosSearchBox()
  const { warehouses } = data
  const { productSearch } = data
  return (

    <SearchPosAutoComplete
      className="pos-order-filter-form__input-wide"
      // main input
      inputProps={{
        categoryList: warehouses?.list, // menu list in category dropdown
        categoryValue: warehouses.warehouseActiveValue, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 200,
        placeholder: 'Tìm tên/SKU/mã sản phẩm (F2)',
        readOnly: true,
        value: productSearch?.keyword || '',
        onChange: productSearch.onSearch,
        onIconClick: () => console.log(123),
        searchInput: true
      }}
      // menu
      menuProps={{
        empty:
          productSearch?.list?.length <= 0
            ? 'Không tìm thấy sản phẩm'
            : '',
        canLoadMore: !productSearch.loading,
        onLoadMore: productSearch.onLoadMore,
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: 'Tìm kiếm kho hàng',
        empty: 'Không tìm thấy kho hàng',
        value: warehouses?.keyword,
        onChange: warehouses.onChange,
        onSearch: warehouses.onKeywordChange,
      }}
    >
      {productSearch?.list?.length > 0 &&
      productSearch?.list.map(item => (
        <Option
          key={item.value}
          className="order-filter-form__option-text pos-product-search-list"
          data-active={item.value === productSearch?.value?.value}
          onClick={e => {
            // e.stopPropagation()
            productSearch?.onChange(item?.data, {
              type: 'increase',
              price: data.priceType == 1 ? item?.data?.price : item?.data?.wholesale_price,
            })
          }}
        >
          <div
            className={`pos-product-search-list__item`}
          >
            <div className="pos-product-search-list__banner">
              <ReactImageFallback
                src={item?.data?.image_thumb}
                fallbackImage='/img/product/default-product-thumbnail.png'
                alt={item?.data?.product_name || 'thumbnail'}
              />
            </div>
            <div className="pos-product-search-list__info">
              <div className="pos-product-search-list__name">
                <Text style={{ flex: 1 }}>{item?.data?.product_name || '---'}</Text>
              </div>
              <div className="pos-product-search-list__sku" style={{marginTop: '2px'}}>
                <Text color={'#7C88A6'} style={{ flex: 1, marginRight: '4px' }}>{item?.data?.sku || '---'}</Text>
                <Text fontWeight={500} fontSize={12} style={{
                  background: item?.data?.warehouse_quantity > 0 ? '#EFF3FB' : '#FF424E',
                  borderRadius: '50px',
                  padding: '1px 6px'
                }} color={item?.data?.warehouse_quantity > 0 ? '#00081D' : '#ffffff'}>{item?.data?.warehouse_quantity}</Text>
              </div>
            </div>
            <div className="pos-product-search-list__prive">
              <div className="pos-product-search-list__name">
                <Text style={{ flex: 1 }}>{formatMoney(data.priceType == 1 ? item?.data?.price : item?.data?.wholesale_price) || '---'}</Text>
              </div>
            </div>
          </div>
        </Option>
      ))}
    </SearchPosAutoComplete>
  )
}