import {Spinner} from 'common/spinner'
import {useRef} from 'react'
import styled from 'styled-components'
import {AutoCompleteSingleOption} from './__AutoCompleteSingleOption'

export const NoteList = ({
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
      scrollRef.current.scrollTo({top: scrollTop - 400})
      onLoadMore()
    }
  }

  return (
    <Container
      {...props}
      ref={scrollRef}
      className={`common-scrollbar ${props?.className}`}
      onScroll={handleDropdownScroll}
    >
      {list.map(item => (
        <AutoCompleteSingleOption
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
        </AutoCompleteSingleOption>
      ))}
      {!canLoadMore && (
        <StyledLoadMore>
          <Spinner size={48} thickness={4} />
        </StyledLoadMore>
      )}
    </Container>
  )
}

const StyledLoadMore = styled.div`
  padding: 16px 0;

  display: flex;
  align-items: center;
  justify-content: center;
`

const Container = styled.div`
  width: 424px;
  max-height: 240px;

  overflow: auto;
`
