import {Tag} from 'common/tag'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {ADDRESS_ICONS} from 'Pages/addressSeparationTool/_icons'
import {useContext} from 'react'
import {AddressSeparationSingleFileContext} from '../..'
import {SINGLE_ADDRESS_TABS} from '../../_singleConstants'
import {singleActions} from '../../_singleReducer'
import {StyledSingleAddressTabs} from './_styled'

export const SingleAddressTabs = ({...props}) => {
  const {pageState, pageDispatch} = useContext(
    AddressSeparationSingleFileContext,
  )
  const {failedData, successData, tab} = pageState

  const handleTabSwitch = tab => {
    pageDispatch({type: singleActions.TAB_SWITCH, payload: {tab}})
    pageDispatch({type: singleActions.ROW_EDIT_RESET})
  }

  const renderTag = type => {
    switch (type) {
      case 'failed':
        return (
          <Tag
            type={tab?.active === 'failed' ? 'danger' : 'important'}
            style={{marginLeft: 4}}
          >
            {failedData.length}
          </Tag>
        )

      case 'success':
        return (
          <Tag
            type={tab?.active === 'success' ? 'success' : 'progress'}
            style={{marginLeft: 4}}
          >
            {successData.length}
          </Tag>
        )

      default:
        return <></>
    }
  }

  return (
    <StyledSingleAddressTabs {...props}>
      <ul className="single-address-tabs__list">
        {SINGLE_ADDRESS_TABS.map(item => (
          <li
            key={item.id}
            className="single-address-tabs__item"
            data-active={tab?.active === item.value}
            onClick={() =>
              tab?.active !== item.value && handleTabSwitch(item.value)
            }
          >
            {item?.name} {renderTag(item.value)}
          </li>
        ))}
      </ul>
      {failedData.length > 0 && tab?.active === 'failed' && (
        <div className="single-address-tabs__hint">
          <i style={{marginRight: 4}}>{ADDRESS_ICONS.lightBulb}</i>
          <Text color={THEME_SEMANTICS.delivered}>
            <Text as="b" color={THEME_SEMANTICS.delivered}>
              Gợi ý:
            </Text>{' '}
            Hãy chọn vào 1 dòng để thực hiện chỉnh sửa địa chỉ tách thất bại
          </Text>
        </div>
      )}
    </StyledSingleAddressTabs>
  )
}
