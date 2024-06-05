import {Button} from 'common/button'
import {StyledActionFormBtnList} from './_styled'
import {useState} from 'react'
import {Loading} from '../../../../common/loading'
import useWarehouseTS from 'Pages/CreateWarehouseTransfer/hooks/useWarehouseTS'
import { ConfirmModal } from '../ConfirmModal/_confirmModal'
import { Text } from 'common/text'

export const ActionFormBtnList = ({...props}) => {
  const {methods, loading, properties} = useWarehouseTS()

  return (
    <>
      <StyledActionFormBtnList {...props}>
        <Button appearance="ghost" href="/warehouse/transfer" style={{minWidth: 74}}>
          Hủy
        </Button>
        <Button
          style={{minWidth: 168, marginLeft: 12}}
          // disabled={!properties.isValid}
          onClick={methods.onSubmit}
        >
         Xác nhận chuyển kho
        </Button>
      </StyledActionFormBtnList>
      {!!properties.confirmDeleteModalData && (
        <ConfirmModal {...properties.confirmDeleteModalData} />
      )}
      {loading && <Loading />}
    </>
  )
}
