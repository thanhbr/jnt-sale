import {Input} from 'common/form/input'
import {Tooltip} from 'common/tooltip'
import {FACEBOOK_ICONS} from 'Pages/facebookManament/interfaces/_icons'
import styled from 'styled-components'
import useFacebookLiveStreamScriptSingle from '../../hooks/useFacebookLivestreamScriptSingle'

export const FacecbookLivestreamScriptSingle_Weight = ({...props}) => {
  const {data, shippingInfoMethods} = useFacebookLiveStreamScriptSingle()
  const {weight} = data.form

  const handleChange = val => {
    const regArray = val.split('.').map(item => item.replace(/[^0-9]/g, ''))
    const checkArray = regArray.map((item, i) =>
      i === 1
        ? `.${item === '' ? '' : Number(item || 0)}`
        : item === ''
        ? ''
        : Number(item || 0),
    )
    shippingInfoMethods.handleWeightChange(checkArray.join(''))
  }

  return (
    <Input
      {...props}
      value={weight.value}
      onChange={e => handleChange(e.target.value)}
      label={
        <>
          Trọng lượng (kg)
          <Tooltip
            className="alert-address"
            placement="bottom-start"
            title={
              <ul style={{maxWidth: 433}}>
                <StyledLiTooltipContent>
                  Mặc định được tính bằng trọng lượng của các sản phẩm trong đơn
                  hàng.
                </StyledLiTooltipContent>
                <StyledLiTooltipContent>
                  Nếu sản phẩm không có thông tin trọng lượng, giá trị trọng
                  lượng được đặt mặc định là 1 hoặc theo giá trị mà bạn thiết
                  lập (Nếu có).
                </StyledLiTooltipContent>
              </ul>
            }
          >
            <i
              style={{
                marginLeft: 4,
                display: 'inline-block',
                cursor: 'default',
              }}
            >
              {FACEBOOK_ICONS.question01}
            </i>
          </Tooltip>
        </>
      }
    />
  )
}

const StyledLiTooltipContent = styled.li`
  position: relative;

  margin-bottom: 8px;
  padding-left: 18px;

  &::before {
    position: absolute;
    top: 6px;
    left: 6px;

    width: 4px;
    height: 4px;

    background: #fff;
    border-radius: 50%;

    content: '';
  }
`
