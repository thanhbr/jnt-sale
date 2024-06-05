import { Text } from '../../../../common/text'
import { usePosQuickProduct } from '../../hooks/usePosQuickProduct'
import React, { useRef } from 'react'
import GroupProduct from '../filter/_productGroup'
import { KeyboardShortCut } from '../keyboardShortcut'
import { QuickProductSort } from '../filter/_quickProductSort'
import { StyledQuickProduct } from './styled'
import { QuickProductItem } from './productItem'
import { POS_ICON } from '../../constants/icons'
import { Tooltip } from '../../../../common/tooltip'

export const QuickProduct = () => {

  const { data, func, typeView } = usePosQuickProduct()
  const { products } = data

  const quickProductRef = useRef(null)
  const handleQuickProductScroll = () => {
    const clientHeight = quickProductRef.current.clientHeight
    const scrollHeight = quickProductRef.current.scrollHeight
    const scrollTop = quickProductRef.current.scrollTop

    if (clientHeight + scrollTop > scrollHeight - 30) {
      if (func.onLoadMore) {
        func.onLoadMore()
      }
    }
  }
  return (
    <StyledQuickProduct>
      <div className={'content-quick-product'} data-active={products.show}>
        <div className={'content-quick-product__title'} onClick={func.handleShowQuickProduct}>
          <Text color={'#fff'} >Chọn nhanh sản phẩm</Text>
          <svg width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 8.94176L10 4.94176L9.05957 4L6 7.06156L2.9411 4L2 4.9411L6 8.94176Z" fill="white"/>
          </svg>
        </div>
        <div className={'content-quick-product__table'}>
          <div className={'content-quick-product__table-header'}>
            {!!products.show && <div className={'content-quick-product__table-header-left'}>
              <GroupProduct/>
              {/*<QuickProductSort/>*/}
            </div>}
            <div></div>
            <div className={'content-quick-product__table-header-right'}>
              {!!products.show && <Tooltip title={typeView.value == 1 ? 'Xem dạng danh sách' : 'Xem dạng lưới'}>
                <div className={'header-right__type-view'}
                     onClick={() => typeView.onChange(typeView.value == 1 ? 2 : 1)}>
                  {typeView.value == 1 ? POS_ICON.listView : POS_ICON.gridView}
                </div>
              </Tooltip>}
              <KeyboardShortCut/>
            </div>
          </div>
          <div ref={quickProductRef} className={'content-quick-product__table-body  common-scrollbar'} onScroll={handleQuickProductScroll}>
            {!!products.show && products.list.length > 0
            && products.list.map(product => {
              return (
                <QuickProductItem product={product} typeView={typeView.value}/>
              )
            })
            }
            {products.list.length == 0 &&
            <div className="content-quick-product__empty">
              <img src="/img/product/empty-quickproduct.png" alt="empty"/>
              <Text as={'p'} color={'#7C88A6'}>Không tìm thấy sản phẩm phù hợp</Text>
            </div>
            }
          </div>
        </div>
      </div>
    </StyledQuickProduct>
  )
}
