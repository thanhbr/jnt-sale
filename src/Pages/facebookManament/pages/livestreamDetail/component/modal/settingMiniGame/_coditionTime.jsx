import React from "react";
import styled from "styled-components";
import {Text} from "../../../../../../../common/text";
import {Radio} from "../../../../../../../common/form/radio";
import {useLiveStreamMiniGame} from "../../../hooks/useLiveStreamMiniGame";
import CategoryTimePicker from "./_timePicker"
import './index.scss'
import {format} from "date-fns";
const Index = ({...props})=>{
    const {functions, data} = useLiveStreamMiniGame();
    const {time} = data;
    const getTimeFormDate = (date) =>{
       let newTime = format(new Date(date), 'dd/MM/yyyy HH:mm')
        return newTime;
    }
    return(
        <StyleConditionTime>
            <div style={{marginBottom:'16px'}} >
                <Text fontWeight={600} fontSize={15}>Điều kiện thời gian</Text>
            </div>

            <div>
                <div
                    {...props}
                    onClick={() => functions.checkTime({type:'full time', cond:0})}
                    style={{display:'flex',marginBottom:'14px'}}
                >
                    <Radio
                        checked={time?.type === 'full time'}
                        style={{transform: 'translateY(2px)'}}
                        className='check-condition-mini-game'
                    />
                    <Text style={{marginLeft:'10px',cursor:'pointer'}}>Toàn thời gian diễn ra livestream</Text>
                </div>
                <div
                    {...props}
                    onClick={() => functions.checkTime({type:'period time', cond:1})}
                    style={{display:'flex',marginBottom:'14px'}}
                >
                    <Radio
                        checked={time?.type === 'period time'}
                        style={{transform: 'translateY(2px)'}}
                        className='check-condition-mini-game'
                    />
                    <Text style={{marginLeft:'10px',cursor:'pointer'}}>Chỉ áp dụng các bình luận được gửi trong một khoảng thời gian</Text>
                </div>
                {time?.type === 'period time' && (
                    <div className={'setting-mini-game-choose-time'}>
                        <CategoryTimePicker
                            categoryWidth={220}
                            dateStart={time?.start}
                            dateEnd={time?.end || ''}
                            onChange={functions.setTime}
                        />
                        <ul  className={'setting-mini-game-choose-time-ul_time'}>
                            <li className={'setting-mini-game-choose-time-li_time'}>
                                <Text fontWeight={400} fontSize={13} color={'#7C88A6'}>Thời gian bắt đầu livestream: {time?.start ? getTimeFormDate(time?.start) : '---'}</Text>
                            </li>
                            <li className={'setting-mini-game-choose-time-li_time'}>
                                <Text fontWeight={400} fontSize={13} color={'#7C88A6'}>Thời gian ghi nhận bình luận cuối: {time?.end ? getTimeFormDate(time?.end) : '---'}</Text>
                            </li>
                        </ul>
                    </div>
                )}

            </div>
        </StyleConditionTime>
    )
}
export default Index;

const StyleConditionTime = styled.div`
  margin-bottom: 32px;
  .setting-mini-game-choose-time{
  padding-left: 28px;
    &-ul_time{
       margin-top: 16px;
      list-style: inside !important;
    }
    &-li_time{
      &::marker{
        font-size: 12px;
      }
    }
  }
 .check-condition-mini-game{
    &:hover{
      border-color: #00AB56 !important;
    }
     &[data-checked='true']{
          background: #fff;
        border-color: #00AB56!important;
    }
     
    &::before{
      border: 2px solid #00AB56;
      border-radius: 24px;
      background: #00AB56 !important;
    }
 }
`
