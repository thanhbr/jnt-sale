import {Button} from 'common/button'
import {useEffect, useState} from 'react'
import './style.scss'
import WinnerDetail from '../modal/_winnerDetail'
import WinnerList from '../modal/_winnerList'
import {sendRequestAuth} from 'api/api'
import config from 'config'
import {useParams} from 'react-router-dom'
import {useMiniGameWinner} from "../../hooks/useMiniGameWinner";

export const ButtonMiniGame = ({spin, setSpin}) => {
    const { winnerDetail, winnerList, list, functions, customer} = useMiniGameWinner()
    const {meta} = customer
    const {totals} = meta
    const [activeResult, setActiveResult] = useState(false)
  const handleToggle = () => {
    setSpin(prev => !prev)
  }

  useEffect(()=>{
      if(spin){
          setActiveResult(true)
          setTimeout(()=>{
              setActiveResult(false)
          },3000)
      }
  },[spin])
  return (
    <div className="btn-mini-game">
        <div className={'btn-mini-game__button-group'}>
            <div>
                {
                    !spin ?  <Button
                        disabled={+totals <= 0 && true}
                        className={`btn-mini-game__button btn--start`}
                        onClick={handleToggle}
                        data-meta={+totals === 0}

                    >
                            Bắt đầu
                    </Button> :
                        <Button
                            disabled={activeResult}
                            className={`btn-mini-game__button btn--finish`}
                            onClick={handleToggle}
                            data-active={activeResult}

                        >
                            Dừng lại
                        </Button>

                }

            </div>
            {list?.length > 0 && <div className={`btn-mini-game__button btn_result`}>
                <Button  onClick={functions.openWinnerList} className={`btn-mini-game__button btn--result`}>Xem kết quả</Button>
            </div> }
        </div>
        {winnerDetail && <WinnerDetail />}
        {winnerList && <WinnerList />}

    </div>
  )
}
