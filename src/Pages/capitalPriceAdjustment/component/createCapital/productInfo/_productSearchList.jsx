import {Spinner} from 'common/spinner'
import {Text} from 'common/text'
import React, {useContext, useState} from 'react'
import ReactImageFallback from "react-image-fallback";
import styled from 'styled-components'
import {THEME_COLORS} from "../../../../../common/theme/_colors";
import {THEME_SEMANTICS} from "../../../../../common/theme/_semantics";
import {Tooltip} from "../../../../../common/tooltipv2";
import {formatMoney} from "../../../../../util/functionUtil";
import {PRICE_ADJUSTMENT_ICONS} from "../../../interfaces/_icon";
import {CustomToolTip} from "../../../../../Component/tooltip/CustomTooltip";
export const CapitalProductSearchList = ({
                                                 data,
                                                 inventory,
                                                 whole,
                                                 isExistOriginData,
                                                 isLoading,
                                                 isLoadMore,
                                                 onClose,
                                                 onSelect,
                                             selectedList,
                                                 ...props
                                             }) => {
    return (
        <StyledCapitalProductSearchList {...props}>
            {!isLoading ? (
                <div className="order-single-product-search-list__loading">
                    <Spinner size={54} thickness={5} />
                    <Text style={{marginTop: 5}}>Loading...</Text>
                </div>
            ) : (
                <div className="order-single-product-search-list__list">
                    {data.map(item => (
                        <Item
                            key={item?.id}
                            data={item}
                            inventory={inventory}
                            list={selectedList?.selected}
                            whole={whole}
                            onClick={() => {
                                  onSelect(item, {type: 'increase'})
                                if (onClose) onClose()
                            }}
                        />
                    ))}
                    {/*{isLoadMore && (*/}
                    {/*    <div className="order-single-product-search-list__load-more">*/}
                    {/*        <Spinner size={48} thickness={4} />*/}
                    {/*    </div>*/}
                    {/*)}*/}
                </div>
            )}
        </StyledCapitalProductSearchList>
    )
}

const Item = ({data, inventory, whole, ...props}) => {
    const [imgSrc, setImgSrc] = useState(data?.image_thumb)
    const handleImgError = () =>
        setImgSrc('/img/product/default-product-thumbnail.png')
    return (
        <div
            {...props}
            className={`order-single-product-search-list__item ${
                props?.className || ''
            }`}
        >
            <div className="order-single-product-search-list__banner">
                <ReactImageFallback
                    src={imgSrc}
                    fallbackImage="/img/facebook/no-post.png"
                    alt={data?.name || 'thumbnail'}
                />
            </div>
            {!!props.list?.find(find => find?.data?.id === data?.id) ?
                <CustomToolTip
                    title={!!props.list?.find(find => find?.data?.id === data?.id) && 'Sản phẩm đã được chọn'}
                    placement="left-start"
                >
                    <div
                        className={!!props.list?.find(find => find?.data?.id === data?.id) ?
                            "order-single-product-search-list__info_selected" :
                            "order-single-product-search-list__info"
                        }
                    >
                        <div className="order-single-product-search-list__name" style={{display:'flex',justifyContent:'space-between',alignItem:'center'}}>
                            <div style={{display:'flex', alignItems:'center',justifyContent:'space-between'}}>
                                <Text  style={{flex: 1}}>
                                    {data?.product_name.length > 50 ? (data?.product_name.substring(0, 50)+' ...') :data?.product_name}
                                </Text>
                                {!!props.list?.find(find => find?.data?.id === data?.id) && <Text lineHeight={0} style={{marginLeft:'8px'}}>{PRICE_ADJUSTMENT_ICONS.tickIcon}</Text>}
                            </div>
                            <Text>
                                {formatMoney(data?.cost_price) || '---'}
                            </Text>
                        </div>
                        {!!inventory && (
                            <>
                                <div style={{display:'flex',justifyContent:'space-between'}}>
                                    <Text color={'#7C88A6'}>SKU:{' '}
                                        {data?.sku.length > 50 ? (data?.sku.substring(0, 30)+' ...') :data?.sku}
                                    </Text>
                                    <Text color={'#7C88A6'}>
                                        Giá vốn
                                    </Text>
                                </div>

                            </>

                        )}
                    </div>
                </CustomToolTip>
                :
                <div
                    className={!!props.list?.find(find => find?.data?.id === data?.id) ?
                        "order-single-product-search-list__info_selected" :
                        "order-single-product-search-list__info"
                    }
                >
                    <div className="order-single-product-search-list__name" style={{display:'flex',justifyContent:'space-between',alignItem:'center'}}>
                        <div style={{display:'flex', alignItems:'center',justifyContent:'space-between'}}>
                            <Text  style={{flex: 1}}>
                                {data?.product_name.length > 50 ? (data?.product_name.substring(0, 50)+' ...') :data?.product_name}
                            </Text>
                            {!!props.list?.find(find => find?.data?.id === data?.id) && <Text lineHeight={0} style={{marginLeft:'8px'}}>{PRICE_ADJUSTMENT_ICONS.tickIcon}</Text>}
                        </div>
                        <Text>
                            {formatMoney(data?.cost_price) || '---'}
                        </Text>
                    </div>
                    {!!inventory && (
                        <>
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <Text color={'#7C88A6'}>SKU:{' '}
                                    {data?.sku.length > 50 ? (data?.sku.substring(0, 30)+' ...') :data?.sku}
                                </Text>
                                <Text color={'#7C88A6'}>
                                    Giá vốn
                                </Text>
                            </div>

                        </>

                    )}
                </div>
            }


        </div>
    )
}


const StyledCapitalProductSearchList = styled.div`
  .order-single-product-search-list {
    &__loading {
      min-height: 260px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    &__load-more {
      padding: 16px 0;

      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__item {
      margin-bottom: 16px;

      display: flex;
      align-items: center;

      cursor: pointer;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__banner {
      width: 48px;
      height: 48px;
      margin-right: 16px;

      overflow: hidden;

      border-radius: 4px;

      img {
        width: 100%;
        height: 100%;

        object-fit: cover;
        object-position: center;
      }
    }

    &__info {
      flex: 1;
      .tooltip_sku{
      display: -webkit-box;
      height: 100%;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 75%;
    }
   
    }
 &__info_selected{
      flex: 1;
      opacity: 0.5;
      cursor: not-allowed !important;
    }
    &__name {
      display: flex;
      .tooltip{
      display: -webkit-box;
      height: 100%;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    }

    &__empty {
      min-height: 300px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
`
