import {Text} from "../../../../../common/text";
import {ORDER_SINGLE_ICONS} from "../../../../orderSingle/interface/_icons";
import {Input} from "../../../../../common/form/input";
import styled from "styled-components";
import usePurchaseProductInfo from "../../../hooks/usePurchaseProductInfo";
import {ProductSearchList} from "../../productSearchList";
import {PurchaseProductTable} from "../../productTable";

export const ProductPurchase = ({...props}) => {
  const {data, statusInfo, methods} = usePurchaseProductInfo()
  const handleProductProductListScroll = () => {
    if (!data.canLoadMore) return
    methods.onProductFetchMoreProductList()
  }
  return (
    <div>
      <StyledNoInventoryContainer {...props}>
        <div className="order-single-product-info-no-inventory-container__auto">
          {
            !!statusInfo?.canEdit &&
            <Input
              dropdown={
                data.list.length > 0
                  ? ({onClose}) => (
                    <ProductSearchList
                      data={data.list}
                      isExistOriginData={true}
                      isLoading={data.loading}
                      // isLoadMore={!canLoadMore}
                      onClose={onClose}
                      onSelect={methods.onProductSelect}
                    />
                  )
                  : () => (
                    <div className="order-single-product-info-no-inventory-container__not-found">
                      <img src="/img/product/empty.png" alt="Empty"/>
                      <Text>
                        {data.value.trim()
                          ? 'Không tìm thấy sản phẩm nào'
                          : 'Chưa có sản phẩm nào'}
                      </Text>
                    </div>
                  )
              }
              icon={ORDER_SINGLE_ICONS.searchMd}
              placeholder="Tìm sản phẩm"
              value={data.value}
              onChange={e => methods.onProductSearchChange(e.target.value)}
              dropdownProps={{
                canLoadMore : data.canLoadMore,
                onLoadMore: handleProductProductListScroll,
              }}
              heightContent={296}
            />
          }
          <PurchaseProductTable
            list={data.selected}
            vat={data.vat}
            totalPayment={data.totalPayment}
            totalReturn={data.totalReturn}
            canEdit={!!statusInfo?.canEdit}
            onChangeVAT={methods.onChangeVAT}
            onQuantityChange={methods.onProductSelect}
          />
        </div>
      </StyledNoInventoryContainer>
    </div>
  )
}

const StyledNoInventoryContainer = styled.div`
  .order-single-product-info-no-inventory-container {
    &__not-found {
      min-height: 260px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    &__radio-list {
      display: flex;
      flex-wrap: wrap;
    }

    &__radio-item {
      margin-right: 70px;
      margin-bottom: 16px;

      display: flex;

      cursor: pointer;
    }

    &__manual,
    &__auto {
      margin-bottom: 24px;
    }
  }
`
