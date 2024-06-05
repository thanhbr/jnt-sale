import {Button} from 'common/button'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {useState} from 'react'
import './ForControlCODAdvancedSearch.scss'
import {Input} from 'common/form/input'
import {Popover} from '@mui/material'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import useForControlCODFilterForm from 'Pages/ForControlCOD/Tab2/hooks/useForControlCODFilterForm'
import {Tooltip} from 'common/tooltip'
import {useTranslation} from "react-i18next";

export const ForControlCODAdvancedSearch = ({...props}) => {
  const {advancedSearch, badge, loading} = useForControlCODFilterForm()

  const [anchorEl, setAnchorEl] = useState(null)
  const [itemDetails, setItemDetails] = useState(advancedSearch.itemDetails)
  const [value, setValue] = useState(advancedSearch.customer.keyword)
  const { t } = useTranslation()

  const shouldOpenPopover = Boolean(anchorEl)
  const popoverId = shouldOpenPopover ? 'order-advanced-search' : undefined

  const handleIdChange = e => {
    if(e.target.value == " ") e.target.value = ''
    setItemDetails(e.target.value)
  }

  const handlePopoverClose = () => {
    handleReset()

    setAnchorEl(null)
  }

  const handlePopoverOpen = e => {
    e.stopPropagation()
    setAnchorEl(e.currentTarget)
  }

  const handleReset = () => {
    setItemDetails(advancedSearch.itemDetails)
    setValue(advancedSearch.customer.keyword)
  }

  const handleResetOrigin = () => {
    setItemDetails('')
    setValue('')

    advancedSearch.onChange('', '')
  }

  const handleSubmit = () => {
    advancedSearch.onChange(value, itemDetails)

    setAnchorEl(null)
  }

  const handleValueChange = e => {
    if(e.target.value == " ") e.target.value = ''
    setValue(e.target.value)
  }

  return (
    <>
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
              {t("search_advance")}
            </Text>
          </div>
          <div className="order-advanced-search__body">
            <div className="order-advanced-search__form-group">
              <Input
                label={t("customer_search")}
                placeholder={t("phone_or_customer_name")}
                value={value}
                onChange={handleValueChange}
              />
            </div>
            <div className="order-advanced-search__form-group">
              <Input
                  label={t("search_by_item_content")}
                  placeholder={t("enter_item_content")}
                value={itemDetails}
                onChange={handleIdChange}
              />
            </div>
          </div>
          <div className="order-advanced-search__footer">
            <Text
              color={THEME_COLORS.primary_300}
              style={{
                opacity: !!itemDetails || !!value ? 1 : 0.65,
                cursor: !!itemDetails || !!value ? 'pointer' : 'no-drop',
              }}
              onClick={() => (!!itemDetails || !!value) && handleResetOrigin()}
            >
              {t("general_reset")}
            </Text>
            <div>
              <Button
                appearance="ghost"
                size="sm"
                style={{marginRight: 8}}
                onClick={handlePopoverClose}
              >
                {t("general_close")}
              </Button>
              <Button disabled={!loading} size="sm" onClick={handleSubmit}>
                {t("apply")}
              </Button>
            </div>
          </div>
        </Popover>
      )}
    </>
  )
}
