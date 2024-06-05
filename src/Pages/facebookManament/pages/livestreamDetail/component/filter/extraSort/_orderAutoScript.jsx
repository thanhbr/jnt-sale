import React from "react";
import styled from "styled-components";
import {Text} from "../../../../../../../common/text";
import {ICON_FILTER} from "../../../interface/icon";
import {Tooltip} from "../../../../../../../common/tooltip";
import useFacebookLiveStreamDetail from "../../../hooks/useFacebookLiveStreamDetail";

const Index = () => {
  const {data, methods} = useFacebookLiveStreamDetail()

  return (
    <StyledOrderAutoScript>
      {data?.configLiveStream?.settingDetail?.order_script_id
        ?
        <div className={'script-action_pause'}>
          {/*<Tooltip className={'tooltip-status'}*/}
          {/*         title={'Bấm vào để ngưng áp dụng kịch bản'}*/}
          {/*         onClick={methods.handlePauseOrderScript}*/}
          {/*         placement={'top'}>{ICON_FILTER.pauseCircle}*/}
          {/*</Tooltip>*/}
          {ICON_FILTER.pauseCircle}
          <Text fontSize={12} color={'#00AB56'} onClick={methods.handleOpenConfigLiveStream}>
            Đang áp dụng kịch bản lên đơn tự động
          </Text>
          <Text className="show-setting" onClick={methods.handleOpenConfigLiveStream}>{ICON_FILTER.chevron}</Text>
        </div>
        :
        <div className={'script-action_add'}>
          <Tooltip className={'tooltip-status'}
                   title={'Bấm vào để thêm kịch bản lên đơn tự động'}
                   onClick={methods.handleAddOrderScript}
                   placement={'top'}>{ICON_FILTER.addScript}</Tooltip>
          <Text fontSize={12} color={'#0088FF'} onClick={methods.handleOpenConfigLiveStream}>
            Áp dụng thêm kịch bản lên đơn tự động
          </Text>
          <Text onClick={methods.handleOpenConfigLiveStream}>{ICON_FILTER.chevron}</Text>
        </div>
      }
    </StyledOrderAutoScript>
  )
}

export default Index;

const StyledOrderAutoScript = styled.div`
  .script-action_add{
    width: 254px;
    background:  rgba(0, 136, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 24px;
    span{
      cursor: pointer;
    }
  }
  .script-action_pause{
    width: 254px;
    background: rgba(0, 171, 86, 0.1);;
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 24px;
    .show-setting{
      svg{
        path{
          stroke: #00AB56;
        }
      }
    }
    span{
      cursor: pointer;
    }
  }
  
  .tooltip-status{
    display: flex;
    align-items: center;
  }
`