import {Spinner} from 'common/spinner'
import {useRef} from 'react'
import styled from 'styled-components'
import {FacebookLivestreamScriptSingle__AutocompleteSingleOption} from '../__autocompleteSingleOption'
import {StyledFacebookLivestreamScriptSingle_OrderRequestSearchList} from './_styled'

export const FacebookLivestreamScriptSingle_OrderRequestSearchList = ({
  list,
  activeValue,
  canLoadMore,
  onClose,
  onLoadMore,
  onItemClick,
  ...props
}) => {
  const scrollRef = useRef(null)

  const handleDropdownScroll = () => {
    if (!canLoadMore || !onLoadMore || !scrollRef?.current) return

    const clientHeight = scrollRef.current.clientHeight
    const scrollHeight = scrollRef.current.scrollHeight
    const scrollTop = scrollRef.current.scrollTop

    if (clientHeight + scrollTop >= scrollHeight) {
      // scrollRef.current.scrollTo({top: scrollTop - 400})
      onLoadMore()
    }
  }

  return (
    <StyledFacebookLivestreamScriptSingle_OrderRequestSearchList
      {...props}
      ref={scrollRef}
      className={`common-scrollbar ${props?.className}`}
      onScroll={handleDropdownScroll}
    >
      {list.map(item => (
        <FacebookLivestreamScriptSingle__AutocompleteSingleOption
          key={item?.value}
          data-active={item.value === activeValue}
          onClick={() => {
            if (onItemClick) onItemClick(item)
            if (onClose) onClose()
          }}
        >
          <div
            style={{
              maxWidth: 416,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {item?.name || '---'}
          </div>
        </FacebookLivestreamScriptSingle__AutocompleteSingleOption>
      ))}
      {!canLoadMore && (
        <StyledLoadMore>
          <Spinner size={48} thickness={4} />
        </StyledLoadMore>
      )}
    </StyledFacebookLivestreamScriptSingle_OrderRequestSearchList>
  )
}

const StyledLoadMore = styled.div`
  padding: 16px 0;

  display: flex;
  align-items: center;
  justify-content: center;
`
