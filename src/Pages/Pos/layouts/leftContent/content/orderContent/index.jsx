import styled from 'styled-components'
import { usePosSearchBox } from '../../../../hooks/usePosSearchBox'
import { Text } from '../../../../../../common/text'
import React, { useEffect, useRef } from 'react'
import { THEME_COLORS } from '../../../../../../common/theme/_colors'
import { QuickProduct } from '../../../../component/quickProduct'
import { ProductContent } from './productTable'

export const OrderContent = () => {

  const { data } = usePosSearchBox()
  const { orders, products } = data
  const { productSearch } = data
  const { activeOrder } = orders

  const tableProductRef = useRef()
  const hoverInputRef = useRef()

  const handleActiveItem = (n, isUp) => {
    const menuListItem = tableProductRef.current.querySelectorAll(
      '.order-content__table-row',
    )
    if (isUp) tableProductRef.current.scrollTop -= 40
    else if (isUp === false) tableProductRef.current.scrollTop += 40

    menuListItem.forEach(item => item.setAttribute('data-hover', 'false'))
    const findItem = menuListItem[n] || null
    if (!!findItem) {
      findItem.setAttribute('data-hover', 'true')
      const inputAmount = findItem.querySelectorAll('input')
      const barcode = document.querySelector('.pos-barcode-active')
      if (!barcode)
        inputAmount[0].focus()
      inputAmount[0].click()
    }

    if (hoverInputRef?.current)
      hoverInputRef.current.value = Math.max(
        0,
        Math.min(n, menuListItem.length - 1),
      )
  }

  const handleWindowBtnClick = e => {

    const hoverValue = hoverInputRef?.current
      ? hoverInputRef.current.value
      : null
    if (hoverValue === null) return
    const menuListItem = tableProductRef.current.querySelectorAll(
      '.order-content__table-row',
    ) || []

    menuListItem.forEach(item => {
      if (!!item.contains(document.activeElement)) {
        if (e.keyCode === 16) handleActiveItem(Number(hoverValue) - 1, true)
        if (e.keyCode === 13) handleActiveItem(Number(hoverValue) + 1, false)
      }
    })
    handleRowClick()
  }

  const handleRowClick = _ => {
    const menuListItem = tableProductRef.current.querySelectorAll(
      '.order-content__table-row',
    ) || []

    menuListItem.forEach((item, index) => {
      if (!!item.contains(document.activeElement) && hoverInputRef?.current) {
        hoverInputRef.current.value = index
      }
    })
  }

  useEffect(() => {
    if (!!!tableProductRef?.current) return
    const items = tableProductRef.current.querySelectorAll('.order-content__table-row')
    const activeIndex = [...items].findIndex(
      item =>
        item.getAttribute('data-active') === 'true' ||
        !!item.querySelector('[data-checked="true"]'),
    )

    handleActiveItem(activeIndex !== -1 ? activeIndex : 0)

    window.addEventListener('keyup', handleWindowBtnClick)

    return () => {
      window.removeEventListener('keyup', handleWindowBtnClick)
    }
  }, [activeOrder.product])
  return (
    <StyleOrderContent>
      <div className={'order-content__header'}>
        <div className={'order-content__header-cell'}>
          Tên/Mã SP
        </div>
        <div className={'order-content__header-cell'}>
          Số lượng
        </div>
        <div className={'order-content__header-cell'}>
          Đơn giá (VNĐ)
        </div>
        <div className={'order-content__header-cell'}>
          Giảm giá
        </div>
        <div className={'order-content__header-cell'}>
          Tổng tiền
        </div>
        <div className={'order-content__header-cell'}>
        </div>
      </div>
      <div className={'order-content__table common-scrollbar'}
           data-full={!products.show}
           data-value={activeOrder?.product?.length > 0}
           ref={tableProductRef}
      >
        <input type="hidden" ref={hoverInputRef}/>
        {
          activeOrder?.product?.length > 0 ?
            activeOrder.product.map((product, index) =>
              <ProductContent
                key={index}
                data={product?.data}
                rawData={product}
                quantity={product?.quantity || 0}
                onQuantityChange={productSearch.onChange}
                onRowClick={handleRowClick}
              />
            )
            : <Empty validate={data?.errorSubmit}/>
        }
      </div>

      <QuickProduct/>
    </StyleOrderContent>
  )
}

const Empty = ({ validate, ...props }) => {
  return (
    <div className="order-content__table__empty">
      <img src="/img/product/empty.png" alt="empty" width={164} height={164}/>
      <Text color={!!validate ? 'red' : '#7C88A6'}
            fontWeight={!!validate ? 600 : 400}
      >Bấm vào thanh tìm kiếm ở trên hoặc Sử dụng phím F2 để <br/> chọn sản
        phẩm thêm vào đơn hàng</Text>
    </div>
  )
}

const StyleOrderContent = styled.div`
   background: #ffffff;
   height: calc(100vh - 100px);
   position: relative;
   .order-content__table{
    margin: 0 12px 0 16px;
    padding-right: 4px;
    max-height: calc(100% - 128px);
    overflow: auto;
    &[data-full=false]{
      max-height: calc(100% - 364px);
    }
     border-radius: 8px 8px 0px 0px;
     
    &__empty {
      min-height: 450px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      span{
      text-align: center;
      }
    }
     &-row{
      display:flex;
      align-items: center;
      padding: 22px 0;
      border: 1px solid #DEE1E8;
      border-bottom: none;
      :focus,:visited,:focus-within{
        border: 1px solid #1A94FF!important;
      }
      &:first-child{
        border-radius: 8px 8px 0px 0px;
      }
      &:last-child{
        border-bottom: 1px solid #DEE1E8;
      }
    }
    &-cell{
      padding: 0 16px;
      font-weight: 400;
      font-size: 13px;
      line-height: 140%;
      /* or 18px */
      color: #7C88A6;
      
      width: 15%;
      display: flex;
      justify-content: end;
      &:nth-child(1){
        flex: 1;
        align-items: center;
        justify-content: start;
      }    
      &:nth-child(2){
        width: 10%;
        @media screen and (max-width : 1420px){
          width: 14%;
        }
      } 
      &:last-child{
        width: 30px;
      }
      &-sku{
        display: flex;
        align-items: center;
        margin-top: 4px;
        .pos-product-sku__tooltipV2 {
          max-width: 80%;
          color: #7C88A6;
          margin-right: 4px;
          display: -webkit-box;
          height: 100%;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          word-wrap: break-word;
          word-break: break-all;
        }
      }
    }
    
    &-thumbnail {
      width: 40px;
      height: 49px;
      margin-right: 12px;

      object-fit: cover;
      object-position: center;
      overflow: hidden;

      border-radius: 4px;
    }
    &-thumbnail {
      width: 48px;
      height: 48px;
      margin-right: 13px;

      object-fit: cover;
      object-position: center;
      overflow: hidden;

      border-radius: 4px;
    }

    &-number-arrow {
      position: relative;

      i {
        position: absolute;
        right: 0;

        &:nth-child(1) {
          top: calc(50% - 6px);
        }
        &:nth-child(2) {
          top: calc(50% + 6px);

          transform: rotate(180deg);
        }

        &[data-disabled='true'] {
          cursor: default;

          svg {
            color: #ebeef5;

            path {
              stroke: #ebeef5;
            }
          }
        }

        svg {
          width: 10px;
          height: 10px;
        }
      }
    }
    
    &-discount-type-dropdown-menu {
      width: 32px;
    }

    &-discount-type-dropdown-menu-item {
      margin-bottom: 8px;

      font-weight: 600;
      text-align: center;

      &:last-child {
        margin-bottom: 0;
      }
    }
    &-discount-type-dropdown-toggle {
      width: 32px;
      height: 20px;

      text-align: center;

      i {
        display: inline-block;

        transform: rotate(180deg);
        transform-origin: center;
        transition: transform 0.25s;

        &[data-active='true'] {
          transform: rotate(0);
        }
      }

      svg {
        width: 8px;
        height: 8px;

        path {
          stroke: ${THEME_COLORS.primary_300};
        }
      }
    }


   }
  .order-content__header{
    display:flex;
    align-items: center;
    padding: 11px 16px;
    &-cell{
      padding: 0 16px;
      font-weight: 400;
      font-size: 13px;
      line-height: 140%;
      /* or 18px */
      color: #7C88A6;
      
      display: flex;
      justify-content: end;
      width: 15%;
      &:nth-child(1){
        flex: 1;
        justify-content: start;
      }    
      &:nth-child(2){
        width: 10%;
      }      
      &:last-child{
        width: 30px;
      }

    }
  }
  .content-quick-product__tooltipv2 {
    display: -webkit-box;
    height: 100%;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`