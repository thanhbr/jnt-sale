import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {Tooltip} from 'common/tooltipv2'
import {CASHBOOKS_LINK_OBJECT, CASHBOOKS_OBJECT_TYPE} from 'Pages/CashBooks/interfaces/_constants'
import { useRef } from 'react'

export const CellObject = ({name, type, icon, data, ...props}) => {
  const textElementRef = useRef()
  const currentData = CASHBOOKS_OBJECT_TYPE.find(x => x.value === type)

  return (
    <div {...props}>
      <Tooltip
        ref={textElementRef}
        className="cash-books-table__tooltipV2"
        title={name}
        placement="top"
        baseOn="height"
      >
        {(type === 'other' || !!!name) ? (
          <Text
            color={THEME_SEMANTICS.primary_500}
            fontSize={14}
            fontWeight={500}
            lineHeight={20}
          >
            {name  || '---'}
          </Text>
        ) : (
          <Text
            color={THEME_SEMANTICS.delivering}
            fontSize={14}
            fontWeight={500}
            lineHeight={20}
            as={'a'}
            href={`${currentData?.link}${CASHBOOKS_LINK_OBJECT(type, data)}`}
            target={'blank'}
          >
            {name  || '---'}
          </Text>
        )}
      </Tooltip>

      {type && (
        <>
          <div style={{display: 'flex'}}>
            {currentData?.icon || ''}
            <Text
              color="#7C88A6"
              fontSize={13}
              fontWeight={400}
              lineHeight={18}
              style={{marginLeft: '5px'}}
            >
              {currentData?.name || '---'}
            </Text>
          </div>
        </>
      )}
    </div>
  )
}
