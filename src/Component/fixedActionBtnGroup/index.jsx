import FIXED_ACTION_BTN_GROUP_COMPONENTS from './_components'
import {FIXED_ACTION_BTN_GROUP} from './_constants'
import { Link } from 'react-router-dom'
import {StyledFixedActionBtnGroup} from './_styled'
import useGlobalContext from '../../containerContext/storeContext'
import {useTranslation} from "react-i18next";

const {ActionBtn} = FIXED_ACTION_BTN_GROUP_COMPONENTS

export const FixedActionBtnGroup = ({...props}) => {
  const {t} = useTranslation()
  const [state, dispatch] = useGlobalContext()
  const handleClick = action => {
    if (action === 'feedback') dispatch({type: 'SET_SHOW_FEED_BACK'})
  }

  return (
    <>
      {state.isLogin && (
        <StyledFixedActionBtnGroup id="abc" {...props}>
          {FIXED_ACTION_BTN_GROUP.map(item => (
            <ActionBtn
              key={item.id}
              icon={item.icon}
              onClick={() => handleClick(item.action)}
            >
              {item?.path ? (
                <a href={item?.path ?? '#'} target={'_blank'}>
                  {t(item.name)}
                </a>
              ) : (
                <>
                  {t(item.name)}
                </>
              )}
            </ActionBtn>
          ))}
        </StyledFixedActionBtnGroup>
      )}
    </>
  )
}
