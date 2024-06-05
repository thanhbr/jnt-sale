import {Button} from 'common/button'
import {StyledActionFormBtnList} from './_styled'
import {SuccessfulOrder} from '../successfulOrderModal'
import {useEffect, useState} from 'react'
import {Loading} from '../../../../common/loading'
import useOrderSingle from "../../hooks/useOrderSingle";
import {useParams} from "react-router-dom";

export const ActionFormBtnList = ({...props}) => {
  const {methods,validateTable} =  useOrderSingle()
  const createOrder = opt => {
    methods.onSubmit(opt)
  }

  return (
    <>
      <StyledActionFormBtnList {...props}>
        <Button appearance="ghost" href="/warehouse/inventory-management">
          Hủy
        </Button>
            <Button
                appearance="ghost"
                style={{minwidth: 107, marginLeft: 12}}
                disabled={!validateTable}
                onClick={() => createOrder({is_balance: 0})}
            >
              Lưu
            </Button>
        <Button
            style={{minWidth: 168, marginLeft: 12}}
            disabled={!validateTable}
            onClick={() =>
                 createOrder({is_balance: 1})
            }
        >
          Lưu và cân bằng kho
        </Button>
      </StyledActionFormBtnList>
      {/*{loading && <Loading />}*/}
    </>
  )
}
