import {FacebookLivestreamScriptEmpty} from '../empty'
import {FacebookLivestreamScript_Tbody} from '../_tbody'
import {FacebookLivestreamScript_Thead} from '../_thead'
import {StyledFacebookLivestreamScriptTable} from './_styled'

export const FacebookLivestreamScriptTable = ({list, loading, ...props}) => {
  return (
    <StyledFacebookLivestreamScriptTable {...props}>
      <FacebookLivestreamScript_Thead />
      <div
        style={{
          height: 'calc(100vh - 325px)',
          overflow: 'auto',
          background: 'rgb(255, 255, 255)',
        }}
      >
        {loading ? (
          <>
            {Array.from(Array(20), (e, i) => (
              <FacebookLivestreamScript_Tbody
                rawListData={[]}
                data={null}
                loading={true}
              />
            ))}
          </>
        ) : (
          <>
            {list.length > 0 ? (
              <>
                {list.map(item => (
                  <FacebookLivestreamScript_Tbody
                    rawListData={list}
                    data={item}
                  />
                ))}
              </>
            ) : (
              <FacebookLivestreamScriptEmpty />
            )}
          </>
        )}
      </div>
    </StyledFacebookLivestreamScriptTable>
  )
}
