import React from 'react'
import styled from "styled-components";
import {Button} from "../../../../common/button";
import {Text} from "../../../../common/text";
import {PRICE_ADJUSTMENT_ICONS} from "../../interfaces/_icon";
import useTBodyCapitalAdjustment from "../../hooks/useTBodyCapitalAdjustment";

const EmptyPage = ({...props}) => {
  const {display, keyword} = useTBodyCapitalAdjustment()
  return (
    <StyledTHeadEmptyCapitalAdjustment {...props}>
      <img
        className={"product-empty__banner"}
        src={"/img/order/order-empty.png"}
        alt="empty"
      />
      <Text as="b" color="#7C88A6" style={{marginBottom: 12}}>
        {(display?.listOrigin?.length === 0 && keyword?.length === 0)
          ? 'Bạn chưa có phiếu điều chỉnh giá vốn nào'
          : 'Không tìm thấy dữ liệu phù hợp'}
      </Text>
      {(display?.listOrigin?.length === 0 && keyword?.length === 0) && (
        <Button
          href={`/accountant/price-adjustment/create`}
          icon={PRICE_ADJUSTMENT_ICONS.plus}
          style={{padding: '0 9px 0 10px'}}
        >Tạo mới phiếu điều chỉnh</Button>
      )}
    </StyledTHeadEmptyCapitalAdjustment>
  )
}

export default EmptyPage

const StyledTHeadEmptyCapitalAdjustment = styled.div`
  min-height: calc(100vh - 300px);
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  background: rgb(255, 255, 255);
  .giveback-product-empty--text {
    color: #7C88A6;
    font-weight: 600;
    font-size: 14px;
    margin: 16px 0 16px -24px;
  }
`