import React, {useState, useEffect} from 'react'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

function Quote({quote, index}) {
  return (
    <Draggable draggableId={quote.id.toString()} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {quote.content}
        </div>
      )}
    </Draggable>
  )
}

const QuoteList = React.memo(({quotes}) => {
  return quotes.map((quote, index) => (
    <Quote quote={quote} index={index} key={quote.id} />
  ))
})

export const DndCol = ({initial, onChange, ...props}) => {
  const [state, setState] = useState({quotes: []})

  const onDragEnd = result => {
    if (!result.destination) {
      return
    }

    if (result.destination.index === result.source.index) {
      return
    }

    const quotes = reorder(
      state.quotes,
      result.source.index,
      result.destination.index,
    )

    if (onChange) onChange(quotes)

    setState({quotes})
  }

  useEffect(() => {
    setState({quotes: initial})
  }, [initial])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps} {...props} className={'common-scrollbar'}>
            <QuoteList quotes={state.quotes} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
