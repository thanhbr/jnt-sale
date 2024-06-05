import React from 'react';
import {Input} from "../../../../common/form/input";
import useReceiptFilter from "../../hooks/useReceiptFilter";
import {useSearchParams} from "react-router-dom";
import {RECEIPT_ICONS} from "../../interfaces/icon";

const ReceiptSearch = () => {
  const {search} = useReceiptFilter()
  const [searchParams] = useSearchParams()

  return (
    <Input
      className={"product-filter-form__input-wide"}
      icon={RECEIPT_ICONS.search}
      placeholder={'Tìm kiếm theo mã phiếu thu'}
      value={search.value}
      defaultValue={searchParams.get('search')}
      onChange={search.onChange}
      style={{maxWidth: '24.5rem'}}
    />
  )
}

export default ReceiptSearch;