import {Checkbox} from "../../../../../common/form/checkbox";
import {Text} from "../../../../../common/text";
import usePurchaseExtraInfo from '../../../hooks/usePurchaseExtraInfo'
import React from "react";

export const PurchaseActive = () => {
  const {methods,statusInfo,productInventory} = usePurchaseExtraInfo()
  return (
    <div style={{

      position: 'absolute',
      top: '24px',
      right: '24px',
      display: 'flex',
      cursor: 'pointer'
    }}
         onClick={!statusInfo?.canEdit ? () => {} :methods.handleInventoryChange}
    >
      <Checkbox disabled={!statusInfo?.canEdit} checked={!!productInventory}/>
      <Text style={{marginLeft: '8px'}}> Nhập sản phẩm vào kho</Text>
    </div>
  )
}