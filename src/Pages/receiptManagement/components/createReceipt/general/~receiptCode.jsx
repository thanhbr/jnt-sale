import React from 'react';
import {Tooltip} from "../../../../../common/tooltip";
import {PRODUCT_ICONS} from "../../../../product/interfaces/~icon";
import {Input} from "../../../../../common/form/input";
import useCreateReceiptBody from "../../../hooks/useCreateReceiptBody";

const ReceiptCode = () => {
  const {form, methods, validateState} = useCreateReceiptBody()

  return (
    <>
      <Input
        label={
          <>
            Mã phiếu thu
            <Tooltip
              title={<div style={{fontSize: 13, padding: '1px 4px'}}>Trường hợp bạn không nhập mã phiếu thu, evoshop sẽ tự động sinh theo mã hệ thống</div>}
              placement={'bottom-start'}
            >
              <i
                style={{
                  marginLeft: 4,
                  display: 'inline-block',
                  transform: 'translateY(4px)',
                  cursor: 'pointer',
                  position: 'absolute',
                  top: '-6px'
                }}
                onClick={e => e.stopPropagation()}
              >
                {PRODUCT_ICONS.question}
              </i>
            </Tooltip>
          </>
        }
        value={form?.receipt_code}
        onChange={e => methods.handleChangeReceiptCode(e.target?.value)}
        onBlur={() => methods.handleBlurFormCreate('code')}
        validateText={validateState?.receiptCode?.message}
        validateType={validateState?.receiptCode?.status ? 'danger' : 'success'}
        placeholder={'Nhập mã phiếu thu'}
        maxLength={51}
      />
    </>
  )
}

export default ReceiptCode;