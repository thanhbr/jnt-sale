import {Button} from 'common/button'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {useState} from 'react'
import './_orderAdvancedSearch.scss'
import {Input} from 'common/form/input'
import {Popover} from '@mui/material'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import useOrderFilterForm from 'Pages/refactorOrder/hooks/useOrderFilterForm'
import {Tooltip} from 'common/tooltip'

export const OrderAdvancedSearch = ({...props}) => {
  const {advancedSearch, badge} = useOrderFilterForm()

  const [anchorEl, setAnchorEl] = useState(null)
  const [id, setId] = useState(advancedSearch.liveVideoId)
  const [value, setValue] = useState(advancedSearch.customer.keyword)

  const shouldOpenPopover = Boolean(anchorEl)
  const popoverId = shouldOpenPopover ? 'order-advanced-search' : undefined

  const handleIdChange = e => setId(e.target.value)

  const handlePopoverClose = () => {
    handleReset()

    setAnchorEl(null)
  }

  const handlePopoverOpen = e => {
    e.stopPropagation()
    setAnchorEl(e.currentTarget)
  }

  const handleReset = () => {
    setId(advancedSearch.liveVideoId)
    setValue(advancedSearch.customer.keyword)
  }

  const handleResetOrigin = () => {
    setId('')
    setValue('')

    advancedSearch.onChange('', '')
  }

  const handleSubmit = () => {
    advancedSearch.onChange(value, id)

    setAnchorEl(null)
  }

  const handleValueChange = e => setValue(e.target.value)

  return (
    <>
      <Tooltip placement="bottom" title="Tìm kiếm nâng cao">
        <Button
          badge={badge.advanced ? true : undefined}
          badgeType="danger"
          icon={ORDER_ICONS.searchMore}
          size="md-"
          aria-describedby={popoverId}
          onClick={handlePopoverOpen}
        />
      </Tooltip>
      {shouldOpenPopover && (
        <Popover
          {...props}
          id={popoverId}
          className="order-advanced-search__popover common-popover"
          open={true}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          sx={{top: 4}}
        >
          <div className="order-advanced-search__header">
            <Text
              as="h4"
              color={THEME_COLORS.gray_900}
              fontSize={16}
              lineHeight={22}
            >
              Tìm kiếm nâng cao
            </Text>
          </div>
          <div className="order-advanced-search__body">
            <div className="order-advanced-search__form-group">
              <Input
                label="Tìm kiếm khách hàng"
                placeholder="Số điện thoại / Tên khách hàng"
                value={value}
                onChange={handleValueChange}
              />
            </div>
            <div className="order-advanced-search__form-group">
              <Input
                label="Tìm kiếm theo Live video ID"
                placeholder="VD: 420419822346533"
                value={id}
                onChange={handleIdChange}
              />
            </div>
          </div>
          <div className="order-advanced-search__footer">
            <Text
              color={THEME_COLORS.primary_300}
              style={{
                opacity: !!id || !!value ? 1 : 0.65,
                cursor: !!id || !!value ? 'pointer' : 'no-drop',
              }}
              onClick={() => (!!id || !!value) && handleResetOrigin()}
            >
              Đặt lại
            </Text>
            <div>
              <Button
                appearance="ghost"
                size="sm"
                style={{marginRight: 8}}
                onClick={handlePopoverClose}
              >
                Đóng
              </Button>
              <Button size="sm" onClick={handleSubmit}>
                Áp dụng
              </Button>
            </div>
          </div>
        </Popover>
      )}
    </>
  )
}
