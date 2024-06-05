import { Button } from 'common/button'
import { Text } from 'common/text'
import { THEME_COLORS } from 'common/theme/_colors'
import { Td } from 'layouts/tableLayout/_td'
import { Tr } from 'layouts/tableLayout/_tr'
import { ORDER_ICONS } from 'Pages/refactorOrder/interfaces/_icons'
import { Unit } from 'Pages/UnitsManage'
import { tableHeader } from 'Pages/UnitsManage/interFace'
import { useContext, useState } from 'react'
import CheckboxAll from '../CheckboxAll'
import { useCheckBox } from './useCheckbox'
export default function TableHeader() {
  const {state, dispatch} = useContext(Unit)
  const {checkAll, isCheckAll, handleActive, checkedLess, setIschekcAll} = useCheckBox()
  const [open, setOpen] = useState(false)
  const {isCheck, list} = state
  const show = () => {
    if (tableHeader) {
      return tableHeader.map((item, index) => {
        return (
          <Td key={index} className={'table__unit' + item.class}>
            <div>
              <Text
                color={THEME_COLORS.secondary_100}
                fontSize={14}
                fontWeight={600}
                lineHeight={20}
              >
                {item.title}
              </Text>
            </div>
          </Td>
        )
      })
    }
  }

  const selectOption = action => {
    let value = action.value
    let ids = state.isCheck
    if (value == 1) {
      handleActive({id: ids, status: 1})
    } else handleActive({id: ids, status: -1})
  }

  const showActive = () => {
    return (
      <Td className="unit__td">
        <Text as="b">{isCheck.length > 9 ? isCheck.length : `0${isCheck.length}`} đơn vị tính được chọn</Text>
        <div className="unit__td__selected-action-dropdown">
          <Button
            className="unit__td__selected-action-toggle"
            size="xs"
            onClick={() => setOpen(true)}
          >
            Thao tác {ORDER_ICONS.caretRight}
          </Button>
          {open && (
            <>
              <div
                className="unit__td__selected-action-backdrop"
                onClick={() => setOpen(false)}
              ></div>
              <ul className="unit__td__selected-action-menu common-popover">
                <li
                  className="unit__td__selected-action-menu-item"
                  onClick={() => {
                    setOpen(false)
                    handleActive({id: state.isCheck, status: 1})
                  }}
                >
                  Kích hoạt
                </li>
                <li
                  className="unit__td__selected-action-menu-item"
                  onClick={() => {
                    setOpen(false)
                    handleActive({id: state.isCheck, status: -1})
                  }}
                >
                  Ngưng sử dụng
                </li>
              </ul>
            </>
          )}
        </div>
      </Td>
    )
  }
  return (
    <Tr type="tHead" className="table__unit-header">
      <Td className="table__unit-checkbox">
        <CheckboxAll allChecked={isCheckAll} checkedLess={checkedLess} setAllChecked={setIschekcAll} />
      </Td>
      {isCheck.length == 0 ? show() : showActive()}
      <Td className="table__unit-option"></Td>
    </Tr>
  )
}
