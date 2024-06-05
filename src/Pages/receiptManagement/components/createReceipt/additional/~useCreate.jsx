import React from 'react';
import {Input} from "../../../../../common/form/input";
import useCreateReceiptBody from "../../../hooks/useCreateReceiptBody";

const UseCreate = () => {
  const {data} = useCreateReceiptBody()

  return (
    <>
      <Input
        label={
          <>
            Người tạo
          </>
        }
        value={data?.currentUser?.fullname}
        disabled={true}
      />
    </>
  )
}

export default UseCreate;