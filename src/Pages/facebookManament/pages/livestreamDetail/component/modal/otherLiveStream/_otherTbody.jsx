import React, {useRef} from "react";
import {Tr} from "../../../../../../../layouts/tableLayout/_tr";
import {Td} from "../../../../../../../layouts/tableLayout/_td";
import styled from 'styled-components'
import ReactImageFallback from "react-image-fallback";
import {Text} from "../../../../../../../common/text";
import {Radio} from "../../../../../../../common/form/radio";
import {Tooltip} from "../../../../../../../common/tooltip";
import {useOtherLiveStream} from "../../../hooks/useOtherLiveStream";
import { fDateTimeSuffix } from "util/formatTime";

const Index = ({...props}) => {
    const {list} = props
    const {func, other} = useOtherLiveStream()
    const {data} = other
    const menuRef = useRef(null)
    const handleMenuScroll = () => {
        const clientHeight = menuRef.current.clientHeight
        const scrollHeight = menuRef.current.scrollHeight
        const scrollTop = menuRef.current.scrollTop

        if (clientHeight + scrollTop > scrollHeight - 200) {
            if (func.load) {
                func.load()
            }
        }
    }
    const render = () => {
        return list?.map(item => {
            return (
                <Tr className={'other-live-stream-tr'}
                    onClick={()=>func.check(item)}
                >
                    <Td className={'other-live-stream-tbody'}>
                        <div className={'other-live-stream-tbody__avatar'}>
                            <ReactImageFallback
                              src={item.thumbnails}
                              fallbackImage="/img/facebook/no-post.png"
                              alt={item.page_name}
                              className="other-live-stream-image"
                            />
                        </div>

                    </Td>
                    <Td className={'other-live-stream-tbody'}>
                        <div>
                            <Tooltip title={'Bấm vào để xem bài viết gốc'} placement="bottom">
                                <a href={item.link || ''} target={'__blank'}>
                                    <Text lineHeight={'140%'}
                                          color={'#1A94FF'}
                                          fontWeight={600}>
                                        {!!item?.title ? item?.title : '---'}
                                    </Text>
                                </a>
                            </Tooltip>
                            <Text as={'p'} color="#7C88A6" fontWeight={400} fontSize={13}>Thời gian đăng: {!!item?.created_time ? fDateTimeSuffix(item?.created_time) : '---'}</Text>
                        </div>
                    </Td>
                    <Td className={'other-live-stream-tbody'}>
                        <Radio
                            checked={item.video_id === data.video_id}
                            name="payer"
                            // value={item.value}
                            style={{transform: 'translateY(2px)'}}
                        />
                    </Td>
                </Tr>
            )
        })
    }
    return (
        <StyleOtherLiveStreamTBody
            ref={menuRef}
            onScroll = {handleMenuScroll}
        >{render()}</StyleOtherLiveStreamTBody>
    )
}

export default Index;
const StyleOtherLiveStreamTBody = styled.div`
    height: 386px;
     overflow: auto;
    .other-live-stream{
    &-tr{
       height: 78px;
       .tr__container{
       height: 100%;
       }
    }
      &-tbody{
          width: 79px;
        height: 54px;
        border-radius: 4px; 
        &:nth-child(1){
          width:79px;
        }  
        &:nth-child(2){
          width: 589px;
        }   
        &__avatar{
          width: 54px;
          height: 42px;
          background: #000000;
          display: flex;
          justify-content: center;
          img{
            max-width: 100%;
            max-height: 100%;
          }
        }   
      }
    }
  ::-webkit-scrollbar {
  width: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  //display: none !important;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #EBEEF5; 
  border-radius: 60px;
}

`