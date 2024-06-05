import {Input} from 'common/form/input'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {ORDER_SINGLE_ICONS} from 'Pages/orderSingle/interface/_icons'
import React, {useContext, useEffect, useState} from 'react'
import {StyledOrderSingleProductTable} from './_styled'
import ReactImageFallback from 'react-image-fallback'
import {formatMoney} from "../../../../../util/functionUtil";
import {CurrencyInput} from "./_currentInput";
import {useCreateCapitalAdjustment} from "../../../hooks/useCreateCapitalAdjustment";
import {Tooltip} from "../../../../../common/tooltip";
import {Tooltip as TooltipV2}  from "../../../../../common/tooltipv2";
export const CapitalProductTable = ({
                                            discount,
                                            inventory,
                                            list,
                                            whole,
                                            onQuantityChange,
                                            onTotalDiscountChange,
                                            onDeleteProduct,
                                            validate,
                                            onBlurCapital,
                                            ...props
                                        }) => {

    return (
        <StyledOrderSingleProductTable {...props}>
            {list?.length > 0 ? (
                <>
                    <div
                        className="order-single-product-table__table"
                        data-inventory={inventory}
                    >
                        <div className="order-single-product-table__thead">
                            <div className="order-single-product-table__tr">
                                <div className="order-single-product-table__th">
                                    Tên sản phẩm/SKU
                                </div>
                                <div className="order-single-product-table__th">Giá vốn hiện tại</div>
                                <div className="order-single-product-table__th">
                                    Giá vốn điều chỉnh
                                </div>
                                <div className="order-single-product-table__th">
                                    Chênh lệch
                                </div>
                                <div className="order-single-product-table__th"></div>
                            </div>
                        </div>
                        {list.length <= 4 ?
                            <>
                                {list.map(item => (
                                    <Row
                                        key={item?.data?.id}
                                        data={item?.data}
                                        rawData={item}
                                        inventory={inventory}
                                        capital={ item?.after_adjustment}
                                        priceDifference = {item?.difference}
                                        whole={whole}
                                        onQuantityChange={onQuantityChange}
                                        onDeleteProduct={onDeleteProduct}
                                        validate={validate}
                                        onBlurCapital={onBlurCapital}
                                    />
                                ))}
                            </>
                                :
                            <div className="order-single-product-table__tbody common-scrollbar">
                                {list.map(item => (
                                    <Row
                                        key={item?.data?.id}
                                        data={item?.data}
                                        rawData={item}
                                        inventory={inventory}
                                        capital={ item?.after_adjustment}
                                        priceDifference = {item?.difference}
                                        whole={whole}
                                        onQuantityChange={onQuantityChange}
                                        onDeleteProduct={onDeleteProduct}
                                        validate={validate}
                                        onBlurCapital={onBlurCapital}
                                    />
                                ))}
                            </div>
                        }

                    </div>
                </>
            ) : (
                <Empty />
            )}
        </StyledOrderSingleProductTable>
    )
}

const Row = ({
                 data,
                 rawData,
                 inventory,
                 capital,
                 whole,
                 priceDifference,
                 onQuantityChange,
                 onDeleteProduct,
                 validate,
                 onBlurCapital,
                 ...props
             }) => {
    const [imgSrc, setImgSrc] = useState(data?.image_thumb)
    return (
        <div
            {...props}
            className={`order-single-product-table__tr ${props?.className || ''}`}
        >
            <div className="order-single-product-table__td">
                <ReactImageFallback
                    className="order-single-product-table__thumbnail"
                    src={imgSrc}
                    fallbackImage='/img/product/default-product-thumbnail.png'
                    alt={data?.product_name || 'thumbnail'}
                />
                <div style={{flex: 1}}>
                    <TooltipV2  title={data?.product_name} baseOn={'height'} className={'order-single-product-table__tooltip'}>
                        <Text as="h6" fontWeight={500}>
                            {data?.product_name || '---'}
                        </Text>
                    </TooltipV2>

                    {inventory && (
                        <TooltipV2 title={data?.sku}  baseOn={'height'} className={'order-single-product-table__tooltip-sku'}>
                            <Text color="#7C88A6" style={{marginTop: 4}}>
                                 SKU:&nbsp;{data?.sku || '---'}
                            </Text>
                        </TooltipV2>
                    )}
                </div>
            </div>
            <div className="order-single-product-table__td">
                <Text fontWeight={600}>{formatMoney(data.cost_price)}</Text>
            </div>
            <div className="order-single-product-table__td">
                <Tooltip
                    title={!!validate?.capital_price.find(find=> find?.data?.id === data?.id) && validate?.capital_price.find(find=> find?.data?.id === data?.id)?.status ? validate?.capital_price.find(find=> find?.data?.id === data?.id)?.message :''
                    }
                    className={
                        !!validate?.capital_price.find(find=> find?.data?.id === data?.id) && validate?.capital_price.find(find=> find?.data?.id === data?.id)?.status ? `--danger` : ''
                    }
                     placement={'bottom'}
                >
                <CurrencyInput
                    defaultValue={capital === 0 ? '' : capital}
                    // triggerDefault = {validate?.trigger}
                    onChange={value=>onQuantityChange(value,data)}
                    validateText={!!validate?.capital_price.find(find=> find?.data?.id === data?.id) && validate?.capital_price.find(find=> find?.data?.id === data?.id)?.status ? true : ''}
                    validateType={!!validate?.capital_price.find(find=> find?.data?.id === data?.id) && validate?.capital_price.find(find=> find?.data?.id === data?.id)?.status? 'danger' :'success'}
                    // disabled={!statusInfo?.canEdit}
                    placeHolder='Nhập giá vốn điều chỉnh'
                    style={{textAlign: 'right', ...props?.style}}
                    maxLength={10}
                    onBlur={e=>onBlurCapital(data, e.target.value)}
                />
                </Tooltip>
            </div>
            <div className="order-single-product-table__td">
                <Text
                    fontWeight={600}
                    color={+priceDifference < 0 ? '#FF424E' :+priceDifference > 0 ? '#00AB56' : ''}
                >
                    {priceDifference < 0  ? formatMoney(priceDifference) : priceDifference !== '' ? +priceDifference === 0 ? formatMoney(priceDifference) : `+ ${formatMoney(priceDifference)}`: '---'}
                </Text>
            </div>
            <div className="order-single-product-table__td">
                <Tooltip placement="bottom" title="Xóa">
                    <i
                        style={{cursor: 'pointer'}}
                        onClick={()=>onDeleteProduct(data)}
                    >
                        {ORDER_SINGLE_ICONS.trash}
                    </i>
                </Tooltip>
            </div>
        </div>
    )
}
const Empty = () => {
    const {data} = useCreateCapitalAdjustment()
    const {validate} = data
    return (
        <div className="order-single-product-table__empty">
            <img src="/img/product/empty.png" alt="empty" width={164} height={164} />
            <Text fontWeight={600} color={validate?.table ? '#FF424E' : '#7C88A6'}>Chưa có sản phẩm nào được chọn</Text>
        </div>
    )
}
