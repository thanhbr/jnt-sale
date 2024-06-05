import {Input} from "./_input";
import {Text} from 'common/text'
import useOrderSingleProductInfo from 'Pages/orderSingle/hooks/useOrderSingleProductInfo'
import {ORDER_SINGLE_ICONS} from 'Pages/orderSingle/interface/_icons'
import {useState} from 'react'
import styled from 'styled-components'
import {OrderSingleProductSearchList as ProductSearchList} from '../../productSearchList'
import {OrderSingleProductTable as ProductTable} from '../../productTable'
import {OrderSingleProductInfoPriceType as PriceType} from './_priceType'
import {OrderSingleProductInfoWarehouse as Warehouse} from './_warehouse'

export const OrderSingleProductInfoInventoryContainer = ({...props}) => {
  const {data,payment, methods} = useOrderSingleProductInfo()
  const {discount, priceType, search} = data.withInventoryConfig

  const [canLoadMore, setCanLoadMore] = useState(true)

  const handleWithInventorySearchProductListScroll = _ => {
    if (!canLoadMore) return

    setCanLoadMore(false)

    const response = methods.onWithInventorySearchFetchMoreProductList()
    if (response) response.then(() => setCanLoadMore(true))
    else setCanLoadMore(true)
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
        <div
          className="order-single-product-info-inventory-container__form-input"
          data-size="sm"
        >
          <PriceType />
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
                      isLoadMore={!canLoadMore}
                      whole={priceType.value?.value === 2}
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
              canLoadMore,
              onLoadMore: handleWithInventorySearchProductListScroll,
            }}
            icon={ORDER_SINGLE_ICONS.searchMd}
            placeholder="Tìm sản phẩm"
            value={search.value}
            onChange={e => methods.onWithInventorySearchChange(e.target.value)}
          />
        </div>
      </div>
      <ProductTable
        discount={discount}
        inventory={true}
        list={search.selected}
        whole={priceType.value?.value === 2}
        onQuantityChange={methods.onWithInventorySearchSelect}
        onTotalDiscountChange={methods.onTotalDiscountChange}
        payment={payment}
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
      width: calc(50% - 16px);
      margin: 0 8px 16px 8px;

      &[data-size='sm'] {
        width: calc(25% - 16px);
      }
    }
  }
`
