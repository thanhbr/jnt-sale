import {Button} from 'common/button'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {Tooltip} from 'common/tooltip'
import {FACEBOOK_ICONS} from 'Pages/facebookManament/interfaces/_icons'
import {FacebookFanpage__Checkbox} from '../__checkbox'
import {StyledFacebookFanpage_Card} from './_styled'

export const FacebookFanpage_Card = ({
  checked,
  disabled,
  data,
  onDeleteLink,
  onToggle,
  ...props
}) => {
  return (
    <StyledFacebookFanpage_Card
      {...props}
      onClick={() => !disabled && onToggle && onToggle()}
      data-checked={checked}
      data-disabled={disabled}
    >
      <div className="facebook-fanpage-card__actions">
        <Tooltip title={disabled ? '' : 'Hủy liên kết trang'}>
          <i
            style={{cursor: disabled ? 'no-drop' : 'pointer'}}
            onClick={e => {
              e.stopPropagation()
              if (!disabled && !!onDeleteLink) onDeleteLink()
            }}
          >
            {FACEBOOK_ICONS.signOut}
          </i>
        </Tooltip>
        <FacebookFanpage__Checkbox
          checked={checked}
          disabled={disabled}
          onClick={e => {
            e.stopPropagation()
            if (!disabled && !!onToggle) onToggle()
          }}
        />
      </div>
      <div className="facebook-fanpage-card__container">
        <img
          className="facebook-fanpage-card__logo"
          src={data?.page_avatar}
          alt={data?.page_name}
        />
        <Tooltip
          placement="bottom"
          title={
            data?.page_name && data.page_name.length > 20 ? data.page_name : ''
          }
        >
          <Text
            as="div"
            fontWeight={600}
            style={{
              width: '100%',
              textAlign: 'center',
              pointerEvents: 'all',
            }}
          >
            {data?.page_name
              ? data.page_name.length > 20
                ? `${data.page_name.substring(0, 20)}...`
                : data.page_name
              : '---'}
          </Text>
        </Tooltip>
        <Button
          size="xxs"
          style={{
            marginTop: 8,
            background: data?.connected ? '#E6FFF2' : '#EFF3FB',
            borderColor: data?.connected ? '#E6FFF2' : '#EFF3FB',
            color: data?.connected ? '#00AB56' : '#7C88A6',
            fontWeight: 500,
            pointerEvents: 'none',
          }}
        >
          {data?.connected ? 'Đã kết nối' : 'Chưa kết nối'}
        </Button>
        {data.connected && !data?.manage_permission && (
          <Text
            color={THEME_SEMANTICS.failed}
            fontSize={10}
            lineHeight={17}
            style={{marginTop: 4, textAlign: 'center'}}
          >
            Bạn không có quyền quản trị trang này
          </Text>
        )}
      </div>
    </StyledFacebookFanpage_Card>
  )
}
