import {Button} from 'common/button'
import {StyledActionFormBtnList} from './_styled'
import {Loading} from '../../../../common/loading'
import useRefundPurchase from '../../hooks/useRefundPurchase'

export const ActionRefundBtnList = ({...props}) => {
  const {methods,statusInfo} = useRefundPurchase()
  return (
    <>
      <StyledActionFormBtnList {...props}>
        <Button appearance="ghost" href="/purchases" style={{minWidth: 74}}>
          Hủy
        </Button>
        <Button
          style={{marginLeft: 12}}
          disabled={!statusInfo?.canEdit}
          onClick={methods.onSubmitRefundPurchase}
        >Xác nhận hoàn trả</Button>
      </StyledActionFormBtnList>
      {/*{loading && <Loading />}*/}
    </>
  )
}
