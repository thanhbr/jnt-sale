import {DndCol} from 'common/dndCol'
import useFacebookResponseContentScript from '../../hooks/useFacebookResponseContentScript'
import {FacebookResponseContentScriptEmpty} from '../empty'
import {FacebookResponseContentScript_Tbody} from '../_tbody'
import {FacebookResponseContentScript_Thead} from '../_thead'
import {StyledFacebookResponseContentScriptTable} from './_styled'

export const FacebookResponseContentScriptTable = ({rows, ...props}) => {
  const {data, methods} = useFacebookResponseContentScript()

  return (
    <StyledFacebookResponseContentScriptTable {...props}>
      <FacebookResponseContentScript_Thead />
      {data.script.loading ? (
        <>
          {Array.from(Array(20), (e, i) => (
            <FacebookResponseContentScript_Tbody
              key={i}
              data={null}
              loading={data.script.loading}
            />
          ))}
        </>
      ) : (
        <>
          {rows.length > 0 ? (
            <DndCol
              initial={rows.map(item => ({
                id: item?.id,
                content: <FacebookResponseContentScript_Tbody data={item} />,
              }))}
              onChange={methods.handleRowPositionUpdate}
            />
          ) : (
            <FacebookResponseContentScriptEmpty />
          )}
        </>
      )}
    </StyledFacebookResponseContentScriptTable>
  )
}
