import React from 'react';
import {Input} from "../../../../common/form/input";
import useTBoyTypeOfReceipt from "../../hooks/useTBoyTypeOfReceipt";
import {ICONS_TYPE_OF_RECEIPT} from "../../interfaces/_icons"
const SearchHeader = () => {
  const {filter, functions} = useTBoyTypeOfReceipt()

  return (
    <Input
      className={"product-filter-form__input-wide"}
      icon={ICONS_TYPE_OF_RECEIPT.searchMd}
      placeholder={'Tìm kiếm theo mã/tên loại phiếu thu'}
      value={filter?.keyword || ''}
      // defaultValue={searchParams.get('search')}
      onChange={e => functions?.searchHeader(e?.target?.value)}
      style={{maxWidth: '24.5rem'}}
    />
  )
}

export default SearchHeader;