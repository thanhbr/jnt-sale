import React from 'react';
import {Textarea} from "../../../../../common/form/textarea";
import useCreateReceiptBody from "../../../hooks/useCreateReceiptBody";

const ReceiptDescription = () => {
  const {form, methods, validateState} = useCreateReceiptBody()

  return (
    <Textarea
      placeholder="Nhập mô tả"
      value={form?.description}
      onChange={e => methods?.handleChangeDescription(e.target.value)}
      onBlur={() => methods?.handleBlurFormCreate('description')}
      validateText={validateState?.description?.message}
      validateType={validateState?.description?.status ? 'danger' : 'success'}
      maxLength={256}
      label={'Mô tả'}
      style={{resize: 'none'}}
    />
  )
}

export default ReceiptDescription;