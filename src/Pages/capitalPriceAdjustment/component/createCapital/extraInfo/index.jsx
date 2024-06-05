import {Input} from 'common/form/input'
import {Textarea} from 'common/form/textarea'
import React, {useContext, useEffect, useState} from "react";
import {StyledCapitalAdjustmentExtraInfo} from "./_styled";
import useGlobalContext from "../../../../../containerContext/storeContext";
import {Tooltip} from "../../../../../common/tooltip";
import {Text} from "../../../../../common/text";
import {ICON} from "../../../../supplierManagement/interfaces/_icon";
import {useCreateCapitalExtraInfo} from "../../../hooks/useCreateCapitalExtraInfo";

export const CapitalAdjustmentExtraInfo = ({...props}) => {
  const [state] = useGlobalContext()
  const fullNameAccount = state?.user?.fullname || '---'
    const {extraInfo, validate, method} = useCreateCapitalExtraInfo()
  return (
    <StyledCapitalAdjustmentExtraInfo {...props}>
      <div className="capital-adjustment-extra-info__input-group">
        <div className="capital-adjustment-extra-info__input" data-size="lg">
          <Input
              label={
                <>
                  Mã phiếu điều chỉnh  <Tooltip placement={'right'} title={'Trường hợp bạn không nhập mã phiếu điều chỉnh, evoshop sẽ tự động sinh theo mã hệ thống'}>
                  <Text>{ICON.question}</Text>
                </Tooltip>
                </>
              }
              value={extraInfo.code || ''}
              onChange={e => method.onChangeCode(e)}
              onBlur={e => method.onBlurCode(e)}
              validateText={validate?.code?.status ? validate?.code?.message : null}
              validateType={!validate?.code?.status ? 'success' : 'danger'}
              placeholder="Nhập mã phiếu điều chỉnh"
              maxLength={51}
          />
        </div>
        <div className="capital-adjustment-extra-info__input" data-size="lg">
          <Input disabled={true} label="Người tạo phiếu"  value={extraInfo?.user_name || fullNameAccount}/>
        </div>
        <div className="capital-adjustment-extra-info__input" data-size="lg">
          <Textarea
            label="Ghi chú"
            placeholder="Nhập ghi chú"
            value={extraInfo.note || ''}
            onChange={e => method.onChangeNote(e)}
            onBlur={e => method.onBlurNote(e)}
            validateText={validate?.note?.status ? validate?.note?.message : null}
            validateType={!validate?.note?.status ? 'success' : 'danger'}
            style={{resize: 'none'}}
            maxLength={256}
          />
        </div>
      </div>
    </StyledCapitalAdjustmentExtraInfo>
  )
}
