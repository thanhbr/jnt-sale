import React from "react";
import {ORDER_SINGLE_ICONS} from "../../../../../orderSingle/interface/_icons";
import {Text} from "../../../../../../common/text";
import {Button} from "../../../../../../common/button";
import styled from "styled-components";

export const EmptyShippingPartner = () => {
  return (
    <StyledEmptyShipping>
      <div className={'shipping-partner-empty-container'}>
        <div className="shipping-partner-empty-container__img">
          {ORDER_SINGLE_ICONS.emptyShipping}
        </div>
        <div className="shipping-partner-empty-container__title">
          <Text color={'#7C88A6'}>
            Bạn chưa kết nối với đơn vị vận chuyển nào,<br/> hãy thực hiện kết nối để
            nhập thông tin giao hàng.
          </Text>
        </div>
        <div className="shipping-partner-empty-container__btn">
          <Button
            appearance="secondary"
            href={'/shipping/shipping-partners'}
            target={'_plank'}
            iconPosition={'front'}
            icon={ORDER_SINGLE_ICONS.plus}
            size={'sm'}
          >
            Kết nối đơn vị vận chuyển
          </Button>
        </div>
      </div>
    </StyledEmptyShipping>
  )
}

const StyledEmptyShipping = styled.div`
  .shipping-partner-empty-container {
    text-align: center;
    &__img {
      svg{
        width: 120px;
        height: 120px;
      }
    }
    &__title {
      margin-bottom: 16px;
    }
    &__btn {
      margin-bottom: 16px;
    }
  }
`
