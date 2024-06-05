import {Button} from 'common/button'
import {StyledActionFormBtnList} from './_styled'
import {Loading} from '../../../../common/loading'
import useCreatePurchase from '../../hooks/useCreatePurchase'

export const ActionFormBtnList = ({...props}) => {
  const {methods,statusInfo} = useCreatePurchase()
  return (
    <>
      <StyledActionFormBtnList {...props}>
        <Button appearance="ghost" href="/purchases" style={{minWidth: 74}}>
          Hủy
        </Button>
        <Button
          style={{marginLeft: 12}}
          disabled={!statusInfo?.canEdit}
          onClick={methods.onSubmitCreatePurchase}
        >Lưu</Button>
      </StyledActionFormBtnList>
      {/*{loading && <Loading />}*/}
    </>
  )
}
