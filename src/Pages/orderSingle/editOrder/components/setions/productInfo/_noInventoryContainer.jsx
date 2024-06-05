import {Input} from 'common/form/input'
import {Radio} from 'common/form/radio'
import {Textarea} from 'common/form/textarea'
import {Text} from 'common/text'
import {Tooltip} from 'common/tooltip'
import useOrderSingleProductInfo from 'Pages/orderSingle/hooks/useOrderSingleProductInfo'
import {ORDER_SINGLE_CONSTANTS} from 'Pages/orderSingle/interface/_constants'
import {ORDER_SINGLE_ICONS} from 'Pages/orderSingle/interface/_icons'
import styled from 'styled-components'
import {OrderSingleProductSearchList as ProductSearchList} from '../../../../components/productSearchList'
import {OrderSingleProductTable as ProductTable} from '../../../../components/productTable'
import {formatMoney} from "../../../../../../util/functionUtil";
import {useState} from "react";

const largeBlank = Array.from(Array(300), () => ' ').join('')

export const OrderSingleProductInfoNoInventoryContainer = ({...props}) => {
  const statusOrder = location.pathname.split('/')[2]
  const {data, methods, field_paid} = useOrderSingleProductInfo()
  const {auto, manual, type} = data.inventoryConfig

  const [canLoadMore, setCanLoadMore] = useState(true)

  const handleinventoryAutoProductListScroll = () => {
    if (!canLoadMore) return

    setCanLoadMore(false)

    const response = methods.onInventoryAutoFetchMoreProductList()
    if (response) response.then(() => setCanLoadMore(true))
    else setCanLoadMore(true)
  }

  return (
    <StyledNoInventoryContainer {...props}>
      <div className="order-single-product-info-no-inventory-container__radio-list">
        {ORDER_SINGLE_CONSTANTS.form.productInfo.inventoryType.map(item => (
          <div
            key={item?.id}
            className="order-single-product-info-no-inventory-container__radio-item"
            onClick={() => methods.onInventoryTypeChange(item?.value)}
          >
            <Radio
              checked={type === item?.value}
              name="product-info"
              value={item?.value}
              style={{transform: 'translateY(2px)'}}
            />
            <Text style={{marginLeft: 8}}>
              {item?.name}{' '}
              <Tooltip title={item?.tooltip}>
                <i
                  style={{
                    marginLeft: 4,
                    display: 'inline-block',
                    transform: 'translateY(4px)',
                    cursor: 'pointer',
                  }}
                  onClick={e => e.stopPropagation()}
                >
                  {ORDER_SINGLE_ICONS.question}
                </i>
              </Tooltip>
            </Text>
          </div>
        ))}
      </div>
      {type === 'manual' && (
        <>
          <div className="order-single-product-info-no-inventory-container__manual">
            <Textarea
              placeholder={`Tên sản phẩm | số lượng.${largeBlank}Mỗi dòng 1 sản phẩm. VD: Sản phẩm ABC | 2`}
              value={manual.value}
              style={{minHeight: 100, resize: 'none'}}
              onChange={e => methods.onInventoryManualChange(e.target.value)}
              validateText = {props.validate?.productManual}
              validateType = {"danger"}
            />
          </div>
          {statusOrder !== 'copy' && (
            <div style={{display: 'flex', justifyContent: 'end', margin: '-5px 0px 24px 0'}}>
              <div className="order-single-product-table__checkout-label">
                <Text color={'#00AB56'}>Đã thanh toán:  </Text>
              </div>
              <div className="order-single-product-table__checkout-value">
                <Text color={'#00AB56'}>{formatMoney(field_paid)} </Text>
              </div>
            </div>
            )}
        </>
      )}
      {type === 'auto' && (
        <div className="order-single-product-info-no-inventory-container__auto">
          <Input
            dropdown={
              auto.list.length > 0
                ? ({onClose}) => (
                  <ProductSearchList
                    data={auto.list}
                    isExistOriginData={true}
                    isLoading={auto.loading}
                    isLoadMore={!canLoadMore}
                    onClose={onClose}
                    onSelect={methods.onInventoryAutoSelect}
                  />
                )
                : () => (
                  <div className="order-single-product-info-no-inventory-container__not-found">
                    <img src="/img/product/empty.png" alt="Empty" />
                    <Text>
                      {auto.value.trim()
                        ? 'Không tìm thấy sản phẩm nào'
                        : 'Chưa có sản phẩm nào'}
                    </Text>
                  </div>
                )
            }
            icon={ORDER_SINGLE_ICONS.searchMd}
            placeholder="Tìm kiếm theo tên sản phẩm"
            value={auto.value}
            onChange={e => methods.onInventoryAutoChange(e.target.value)}
            dropdownProps={{
              canLoadMore,
              onLoadMore: handleinventoryAutoProductListScroll,
            }}
          />
          <ProductTable
            list={auto.selected}
            onQuantityChange={methods.onInventoryAutoSelect}
          />
        </div>
      )}
    </StyledNoInventoryContainer>
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
