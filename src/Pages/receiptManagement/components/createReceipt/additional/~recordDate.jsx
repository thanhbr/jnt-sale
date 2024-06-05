import React from 'react';
import {CategoryDatePicker} from "../../../../../common/form/datePicker";
import useCreateReceiptBody from "../../../hooks/useCreateReceiptBody";

const RecordDate = () => {
  const {form, methods} = useCreateReceiptBody()

  return (
    <CategoryDatePicker
      datePickerProps={{defaultValue: form?.dt_record}}
      inputProps={{label: 'Ngày ghi sổ'}}
      onChange={methods.handleChangeDateTime}
      trigger={form?.dt_record}
      // disabledTime={'isAfter'}
      onTab={false}
    />
  )
}

export default RecordDate;