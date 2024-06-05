import {Input} from 'common/form/input'
import {Text} from 'common/text'
import {ORDER_SINGLE_ICONS} from 'Pages/orderSingle/interface/_icons'
import {useState} from 'react'
import styled from 'styled-components'
import {OrderSingleProductSearchList as ProductSearchList} from '../productSearchList'
import {OrderSingleProductTable as ProductTable} from '../productTable'
import {OrderSingleProductInfoWarehouse as Warehouse} from './_warehouse'
import useOrderSingleProductInfo from "../../hooks/useOrderSingleProductInfo";

export const OrderSingleProductInfoInventoryContainer = ({...props}) => {
  const {data, methods} = useOrderSingleProductInfo()
  const {discount, priceType, search} = data.withInventoryConfig

  const [canLoadMore, setCanLoadMore] = useState(true)

  const handleWithInventorySearchProductListScroll = _ => {
      if (!data.canLoadMore) return
      methods.onWithInventorySearchFetchMoreProductList()

  }
  return (
    <StyledInventoryContainer {...props}>
      <div className="order-single-product-info-inventory-container__form-group">
        <div
          className="order-single-product-info-inventory-container__form-input"
          data-size="sm"
        >
          <Warehouse />
        </div>
        <div className="order-single-product-info-inventory-container__form-input">
          <Input
            dropdown={
              search.list.length > 0
                ? ({onClose}) => (
                    <ProductSearchList
                      data={search.list}
                      inventory={true}
                      isExistOriginData={true}
                      isLoading={search.loading}
                      // isLoadMore={!canLoadMore}
                      onClose={onClose}
                      onSelect={methods.onWithInventorySearchSelect}
                    />
                  )
                : () => (
                    <div className="order-single-product-info-inventory-container__not-found">
                      <img src="/img/product/empty.png" alt="Empty" />
                      <Text>
                        {search.value.trim()
                          ? 'Không tìm thấy sản phẩm nào'
                          : 'Chưa có sản phẩm nào'}
                      </Text>
                    </div>
                  )
            }
            dropdownProps={{
                canLoadMore : data.canLoadMore,
              onLoadMore: handleWithInventorySearchProductListScroll,
            }}
            icon={ORDER_SINGLE_ICONS.searchMd}
            placeholder="Tìm sản phẩm"
            value={search.value}
            onChange={e => methods.onWithInventorySearchChange(e.target.value)}
            heightContent={344}
          />
        </div>
      </div>
      <ProductTable
        discount={discount}
        inventory={true}
        list={search.selected}
        onQuantityChange={methods.onWithInventorySearchSelect}
        onTotalDiscountChange={methods.onTotalDiscountChange}
      />
    </StyledInventoryContainer>
  )
}

const StyledInventoryContainer = styled.div`
  .order-single-product-info-inventory-container {
    &__not-found {
      min-height: 260px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    &__form-group {
      width: calc(100% + 16px);
      margin: 0 -8px;

      display: flex;
      flex-wrap: wrap;
    }

    &__form-input {
      width: calc(63% - 15px);
      margin: 0 8px 16px 8px;
      .input__dropdown{
        max-height: 344px !important;
        z-index: 23;
      }
      &[data-size='sm'] {
        width: calc(37% - 17px);
      }
    }
  }
`
