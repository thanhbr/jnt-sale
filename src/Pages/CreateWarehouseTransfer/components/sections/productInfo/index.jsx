import {Text} from 'common/text'
import useWarehouseTSProductInfo from 'Pages/CreateWarehouseTransfer/hooks/useWarehouseTSProductInfo'
import {StyledWarehouseTSProductInfo} from './_styled'
import {WAREHOUSE_TS_ICONS} from 'Pages/CreateWarehouseTransfer/interface/_icons'
import {Input} from 'common/form/input'
import {TooltipError} from 'common/tooltipError'
import React, {useEffect, useState} from 'react'
import {WarehouseTSProductSearchList} from '../../productSearchList'
import {Tooltip as TooltipV2} from 'common/tooltipv2'
import {Tooltip} from 'common/tooltip'
import ReactImageFallback from 'react-image-fallback'

export const WarehouseTSProductInfo = ({...props}) => {
  const {data, validate, methods} = useWarehouseTSProductInfo()
  const {list, loading, value, selected} = data

  const [canLoadMore, setCanLoadMore] = useState(true)

  const handleAutoProductListScroll = () => {
    if (!canLoadMore) return

    setCanLoadMore(false)

    const response = methods.handleListLoadMore()
    if (response) response.then(() => setCanLoadMore(true))
    else setCanLoadMore(true)
  }

  return (
    <StyledWarehouseTSProductInfo {...props}>
      <Input
        dropdown={
          list.length > 0
            ? ({onClose}) => (
                <WarehouseTSProductSearchList
                  data={list}
                  isExistOriginData={true}
                  isLoading={loading}
                  isLoadMore={!canLoadMore}
                  onClose={onClose}
                  onSelect={methods.handleProductSelected}
                />
              )
            : () => (
                <div className="warehouse-transfer-product-info-container__not-found">
                  <img src="/img/product/empty.png" alt="Empty" />
                  <Text
                    style={{
                      display: 'block',
                      color: '#7C88A6',
                      fontWeight: '600',
                    }}
                  >
                    {value.trim()
                      ? 'Không tìm thấy sản phẩm nào'
                      : 'Chưa có sản phẩm nào đủ điều kiện chuyển kho'}
                  </Text>
                </div>
              )
        }
        icon={WAREHOUSE_TS_ICONS.searchMd}
        placeholder="Tìm sản phẩm"
        value={value}
        onChange={e => methods.handleKeywordChange(e.target.value)}
        dropdownProps={{
          canLoadMore,
          onLoadMore: handleAutoProductListScroll,
        }}
      />
      <div className="warehouse-transfer-filter-form__info-product">
        Số lượng chuyển kho:{' '}
        <span>
          {selected.reduce((curr, next) => curr + Number(next.transferQuantity), 0)}
        </span>
      </div>

      <div className="row-tab-detail__table">
        <div className="row-tab-detail__thead">
          <div className="row-tab-detail__tr">
            <div className="row-tab-detail__th">Tên sản phẩm/SKU</div>
            <div className="row-tab-detail__th">Đơn vị</div>
            <div className="row-tab-detail__th">Tồn kho</div>
            <div className="row-tab-detail__th">Số lượng chuyển</div>
            <div className="row-tab-detail__th"></div>
          </div>
        </div>
        <div className="row-tab-detail__tbody">
          {data.selected.length > 0 &&
            data.selected?.map(item => <Item item={item} methods={methods} />)}
          {data.selected.length <= 0 && (
            <Empty validate={validate.productList} />
          )}
        </div>
      </div>
    </StyledWarehouseTSProductInfo>
  )
}

const Empty = ({validate}) => {
  return (
    <div className="warehouse-transfer-filter-form__empty">
      <img src="/img/createWarehouseTransfer/empty.png" alt="empty" />
      <span style={validate ? {color: 'rgb(255, 66, 78)'} : {}}>
        Chưa có sản phẩm nào được chọn
      </span>
    </div>
  )
}

const Item = ({item, methods}) => {
  const [error, setError] = useState(
    +item.transferQuantity > +item.info.warehouse_quantity,
  )
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  useEffect(() => {
    setOpen(error)
  }, [error])

  const handleItemChange = (item, value) => {
    setError(
      Number(value) <= 0 ||
        Number(value) > Number(item.info.warehouse_quantity),
    )
    methods.handleQuantityChange(item, {value})
  }

  const handleIncrease = () => {
    const value = +item.transferQuantity + 1
    setError(
      Number(value) <= 0 ||
        Number(value) > Number(item.info.warehouse_quantity),
    )
    methods.handleQuantityIncrease(item)
  }

  const handleDecrease = () => {
    const value = +item.transferQuantity - 1
    setError(
      Number(value) <= 0 ||
        Number(value) > Number(item.info.warehouse_quantity),
    )
    item.transferQuantity > 0 && methods.handleQuantityDecrease(item)
  }
  const [imgSrc, setImgSrc] = useState(item.info?.image_thumb)
  const handleImgError = () =>
    setImgSrc('/img/product/default-product-thumbnail.png')
  return (
    <div key={item.info.id} className="row-tab-detail__tr">
      <div
        className="row-tab-detail__td"
        style={{
          display: 'flex',
        }}
      >
        <ReactImageFallback
          className="row-tab-detail__img-thumbnail"
          src={imgSrc}
          fallbackImage='/img/product/default-product-thumbnail.png'
          alt={item.info?.product_name || 'thumbnail'}
        />
        <div className="row-tab-detail__product">
          <TooltipV2
            className="tooltipv2-sku"
            title={item.info?.product_name}
            baseOn={'width'}
          >
            {item.info?.product_name || '---'}
          </TooltipV2>
          <Text color="#7C88A6" style={{display: 'block'}}>
            SKU: {item.info?.sku}
          </Text>
        </div>
      </div>

      <div className="row-tab-detail__td">
        <TooltipV2
          className="tooltipv2-sku"
          title={item.info?.unit_name}
          baseOn={'width'}
        >
          {item.info?.unit_name}
        </TooltipV2>
      </div>
      <div className="row-tab-detail__td">{item.info?.warehouse_quantity}</div>
      <div className="row-tab-detail__td">
        <Tooltip
          className="--danger"
          placement="bottom-end"
          open={open}
          onOpen={handleOpen}
          onClose={handleClose}
          title={
            Number(item.transferQuantity) <=
            Number(item.info?.warehouse_quantity)
              ? Number(item.transferQuantity) > 0
                ? ''
                : 'Số lượng chuyển cần > 0'
              : 'Số lượng chuyển cần <= Tồn kho'
          }
          disableHoverListener={!error}
          disableFocusListener={!error}
        >
          <Input
            icon={
              <div className="warehouse-transfer-filter-form__number-arrow">
                <i 
                  data-disabled={item.transferQuantity >= Number(item.info?.warehouse_quantity)}
                  onClick={item.transferQuantity >= Number(item.info?.warehouse_quantity) ? ()=>{} :handleIncrease}>{WAREHOUSE_TS_ICONS.caretUp}</i>
                <i
                  data-disabled={item.transferQuantity <= 0}
                  onClick={handleDecrease}
                >
                  {WAREHOUSE_TS_ICONS.caretUp}
                </i>
              </div>
            }
            min={0}
            max={Number(item.warehouse_quantity)}
            type="number"
            validateText={
              item.transferQuantity > Number(item.info?.warehouse_quantity) ||
              item.transferQuantity <= 0
                ? ' '
                : ''
            }
            validateType={'danger'}
            value={item.transferQuantity}
            onChange={e => handleItemChange(item, e.target.value)}
            onIconClick={() => {}}
          />
        </Tooltip>
      </div>
      <div
        className="row-tab-detail__td"
        onClick={() => methods.handleDeleteItem(item)}
      >
        <div className="delete-item">{WAREHOUSE_TS_ICONS.delete}</div>
      </div>
    </div>
  )
}
