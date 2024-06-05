import React from 'react';
import {Input} from "../../../../../common/form/input";
import useCreateReceiptBody from "../../../hooks/useCreateReceiptBody";

const ReferenceDocs = () => {
  const {form, methods} = useCreateReceiptBody()

  return (
    <Input
      label={
        <>
          Chứng từ tham chiếu
        </>
      }
      value={form?.reference_code}
      onChange={e => methods.handleChangeReferenceCode(e.target?.value)}
      // onBlur={() => validate.onBlurCode()}
      validateText={form?.reference_code?.length > 30 ? 'Chứng từ tham chiếu chỉ được phép nhập tối đa 30 ký tự' : ''}
      validateType={'danger'}
      placeholder={'Nhập chứng từ tham chiếu'}
      maxLength={31}
    />
  )
}

export default ReferenceDocs;