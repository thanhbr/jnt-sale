import React from 'react';
import {SelectOption} from "../../orderSingle/components/selectSingleOption";
import {Select} from "../../../common/form/select";
import usePrintBarcode from "../hooks/usePrintBarcode";
import {useTranslation} from "react-i18next";

const ProductPriceType = () => {
  const { t } = useTranslation()
  const {data, functions} = usePrintBarcode()
  const withInventoryData = data?.priceType

  return (
    <Select value={t(withInventoryData?.value?.name)}>
      {withInventoryData?.list?.length > 0 &&
      withInventoryData?.list?.map(item => (
        <SelectOption
          key={item?.value}
          data-active={
            item.value === withInventoryData?.value?.value
          }
          onClick={() => functions.onPriceTypeChange(item)}
        >
          {t(item.name)}
        </SelectOption>
      ))}
    </Select>
  )
}

export default ProductPriceType;