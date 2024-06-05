import React from 'react';
import {Text} from "../../../../common/text";
import {Button} from "../../../../common/button";
import {PRODUCT_ICONS} from "../../../product/interfaces/~icon";
import styled from "styled-components";
import useCreateTypeOrReceipt from "../../hooks/useCreateTypeOrReceipt";

const EmptyPage = ({...props}) => {
  const {method, boolSearch, displayList} = useCreateTypeOrReceipt()
  return (
    <StyledEmptyPage {...props}>
      <img
        className={"product-empty__banner"}
        src={"/img/product/empty.png"}
        alt="empty"
      />
      <Text as="b" color="#7C88A6" style={{marginBottom: 12}}>
        {(!!!boolSearch && displayList?.length > 0) ?
        'Bạn chưa có loại phiếu thu nào.'
        : 'Không tìm thấy dữ liệu phù hợp'}
      </Text>
      {(!!!boolSearch && displayList?.length > 0) && (
      <Button onClick={() => method?.handleToggleModal()}
              icon={PRODUCT_ICONS.plus}
      >Tạo mới loại phiếu thu</Button>
      )}
    </StyledEmptyPage>
  );
};

export default EmptyPage;


export const StyledEmptyPage = styled.div`
  min-height: calc(100vh - 300px);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: #fff;

  .product-empty__banner {
    width: 133px;
    height: 133px;
    margin-bottom: 16px;

    object-fit: contain;
    object-position: center;
  }
`
