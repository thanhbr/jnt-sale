import {MINIGAME_INFO} from '../../interface/_constants'
import './style.scss'
import {useContext} from "react";
import {MiniGameContext} from "../../provider/context";

export const FooterMiniGame = _ => {
    const {pageState} = useContext(MiniGameContext)
    const {customer} = pageState;
    const {meta} = customer
    const arrayValue = [meta?.totals,meta?.comments,meta?.phone]
    const miniGameFooter = MINIGAME_INFO?.map((item,i)=> ({
        ...item,total: arrayValue[i]
    }))
  return (
    <div className="footer-mini-game">
      <div className="footer-mini-game__group">
        {miniGameFooter.map((item, i) => (
          <div key={item?.id} style={{ background: item?.background , backgroundRepeat: 'no-repeat',width: '100%', height: '100%', paddingRight: '17px'}} >
            <div className='footer-mini-game__icon'><img className={item?.class} src={item?.icon} alt={item?.name} /></div>
            <div className='footer-mini-game__text'>{item?.name}</div>
            <div className='footer-mini-game__number'>{item?.total}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
