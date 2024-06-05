import React from 'react';
import {Input} from "../../../../../common/form/input";
import useCreateReceiptBody from "../../../hooks/useCreateReceiptBody";

const ReceiptStore = () => {
  const {data} = useCreateReceiptBody()

  return (
    <>
      <Input
        label={
          <>
            Cửa hàng
          </>
        }
        value={data?.currentShopInfo?.store_name}
        disabled={true}
      />
    </>
  )
}

export default ReceiptStore;