import {Input} from 'common/form/input'
import {Switch} from 'common/switch'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {Tooltip} from 'common/tooltip'
import {FACEBOOK_ICONS} from 'Pages/facebookManament/interfaces/_icons'
import useFacebookLiveStreamScriptSingle from '../../hooks/useFacebookLivestreamScriptSingle'
import {FacebookLivestreamScriptSingle_FanpageLogoList} from '../_fanpageLogoList'
import {
  StyledFacebookLivestreamScriptSingleBasicInfo,
  StyledLiTooltipContent,
} from './_styled'

export const FacebookLivestreamScriptSingleBasicInfo = ({...props}) => {
  const {data, methods, basicInfoMethods} = useFacebookLiveStreamScriptSingle()
  const {name, fanpage, status} = data.form

  return (
    <StyledFacebookLivestreamScriptSingleBasicInfo {...props}>
      <div className="facebook-livestream-script-single-basic-info__group">
        <Input
          placeholder="Nhập tên kịch bản "
          label={
            <>
              Tên kịch bản <Text color={THEME_SEMANTICS.failed}>*</Text>
            </>
          }
          validateText={data.validate.name}
          validateType="danger"
          value={name.value}
          onChange={e =>
            basicInfoMethods.handleNameChange(e.target.value.substring(0, 80))
          }
          onFocus={() =>
            methods.handleRemoveValidate([{name: 'name', value: ''}])
          }
        />
      </div>
      <div className="facebook-livestream-script-single-basic-info__group">
        <div style={{marginBottom: 8}}>
          <Text>Trang áp dụng</Text>
          <Tooltip
            className="alert-address"
            placement="bottom-start"
            title={
              <ul style={{maxWidth: 433}}>
                <StyledLiTooltipContent>
                  Không bắt buộc phải chọn trang áp dụng, bạn vẫn có thể chọn
                  kịch bản sau khi bắt đầu livestream.
                </StyledLiTooltipContent>
                <StyledLiTooltipContent>
                  Trường hợp khi có chọn trang, mỗi trang tại 1 thời điểm chỉ
                  được áp dụng duy nhất cho 1 kịch bản ở trạng thái kích hoạt.
                </StyledLiTooltipContent>
              </ul>
            }
          >
            <i
              style={{
                marginLeft: 4,
                display: 'inline-block',
                transform: 'translateY(4px)',
              }}
            >
              {FACEBOOK_ICONS.question01}
            </i>
          </Tooltip>
        </div>
        <FacebookLivestreamScriptSingle_FanpageLogoList
          list={fanpage.list}
          value={fanpage.value}
          onChange={basicInfoMethods.handleFanpageChange}
        />
      </div>
      <div className="facebook-livestream-script-single-basic-info__group">
        <div style={{display: 'flex', alignItems: 'center'}}>
          <Switch
            checked={status.value}
            onClick={basicInfoMethods.handleStatusToggle}
          />
          <Text
            style={{marginLeft: 8, cursor: 'pointer'}}
            onClick={basicInfoMethods.handleStatusToggle}
          >
            Kích hoạt/Ngưng sử dụng kịch bản
          </Text>
        </div>
      </div>
    </StyledFacebookLivestreamScriptSingleBasicInfo>
  )
}
