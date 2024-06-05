import {Button} from 'common/button'
import {StyledActionFormBtnList} from './_styled'
import useCreateFacebookAutoResponses from '../../hooks/useCreateFacebookAutoResponses'

export const ActionFormBtnList = ({...props}) => {

  const { methods } = useCreateFacebookAutoResponses()
  return (
    <>
      <StyledActionFormBtnList {...props}>
        <Button appearance="ghost" href="/facebook/auto-responses" style={{minWidth: 74}}>
          Hủy
        </Button>
        <Button
          style={{minWidth: 168, marginLeft: 12}}
          onClick={methods.onSubmitCreate}
        >
          Lưu
        </Button>
      </StyledActionFormBtnList>
    </>
  )
}
