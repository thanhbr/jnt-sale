import {Button} from 'common/button'
import {StyledActionFormBtnList} from './_styled'
import {useLocation} from "react-router-dom";
import {useCreateCapitalActionBtn} from "../../../hooks/useCreateCapitalActionBtn";

export const ActionFormBtnList = ({...props}) => {
    const {data, confirm} = useCreateCapitalActionBtn()
    const {modal, validate, canSubmit} = data
    const location = useLocation();
    const fromPage = location.state?.from || '/accountant/price-adjustment'
  return (
    <>
      <StyledActionFormBtnList {...props}>
        <Button appearance="ghost" href={fromPage}>
          Hủy
        </Button>
            <Button
                appearance="ghost"
                style={{minwidth: 107, marginLeft: 12, width : '72px'}}
                disabled={canSubmit}
                onClick={() => confirm.accept(0)}
            >
              Lưu
            </Button>
        <Button
            style={{minWidth: 168, marginLeft: 12}}
            disabled={canSubmit}
            onClick={() => confirm.accept(1)}
        >
            Lưu và Điều chỉnh giá
        </Button>
      </StyledActionFormBtnList>
    </>
  )
}
