import {Text} from 'common/text'
import styled from 'styled-components'
import {THEME_COLORS} from '../../../../../../common/theme/_colors'
import { ORDER_SINGLE_ICONS } from '../../../../../orderSingle/interface/_icons'
import React from 'react'

export const OrderFacebookDeliveryNoteList = ({
  data,
  isExistOriginData,
  value,
  onClose,
  onSelect,
  ...props
}) => {
  const handleSelect = opt => {
    if (onClose) onClose()

    if (onSelect)
      onSelect(opt.content)
  }
  return (
    <StyledOrderSingleDeliveryNoteList {...props}>
      <div className="order-single-delivery-list__list">
        {data.map(item => (
          <div
            key={item?.id}
            className="order-single-delivery-list__item"
            onClick={() => handleSelect(item)}
          >
            <div className="order-single-delivery-list__info">
              <Text as="p">{item?.content}</Text>
            </div>
          </div>
        ))}
        <Text color={'rgb(26, 148, 255)'} style={{width: '100%'}} as={'a'}
              href={'/setting/delivery'} target={'_blank'}
              className={'btn-create-delivery-note'}
              style={{height: 'auto', display: 'flex', alignItems: 'center'}}
        ><i style={{margin: '4px 4px 0 0'}}>{ORDER_SINGLE_ICONS.plus}</i> Thêm mẫu ghi chú giao hàng</Text>
      </div>
    </StyledOrderSingleDeliveryNoteList>
  )
}

const StyledOrderSingleDeliveryNoteList = styled.div`
  position: relative;

  .order-single-delivery-list {
    &__item {
      margin-bottom: 16px;

      display: flex;

      cursor: pointer;

      &:last-child {
        margin-bottom: 0;
      }
    }
    &__info{
      :hover{
        p{
          color: #1e9a98!important;
        }
      }
      p{
          max-width: 100%;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
      }
    }
    &__avatar {
      width: 32px;
      height: 32px;
      margin: 4px 12px 0 0;

      display: flex;
      align-items: center;
      justify-content: center;

      background: ${THEME_COLORS.primary_300};
      border-radius: 50%;
    }

    &__info {
      flex: 1;
    }

    &__empty {
      min-height: 150px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    &__footer {
      position: sticky;
      bottom: 0;

      width: 100% !important;
      height: 48px;
      padding: 0 4px;

      display: flex;
      align-items: center;

      background: #fff;

      transform: translateY(12px);

      cursor: pointer;
    }
  }
  .btn-create-delivery-note{
      height: 34px;
      position: sticky;
      bottom: -12px;
      z-index: 1;
      height: 48px;
      display: block;
      background: #fff;
      cursor: pointer;
    }
`
