import {Button} from 'common/button'
import {StyledActionFormBtnList} from './_styled'
import useCreateReceiptBody from "../../../hooks/useCreateReceiptBody";

export const ActionFormBtnList = ({...props}) => {
  const {methods, canSubmitForm} = useCreateReceiptBody()

  return (
    <StyledActionFormBtnList {...props}>
      <Button appearance="ghost"
              href={'/accountant/receipts'}
      >
        Hủy
      </Button>
      <Button
        style={{ marginLeft: 12 }}
        disabled={canSubmitForm}
        onClick={() => methods.submitCreate()}
      >
        Lưu
      </Button>
    </StyledActionFormBtnList>
  )
}
