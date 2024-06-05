import styled from 'styled-components'
import ExtraSortDropDown from "./_dropDownSort"
import OrderAutoScript from "./_orderAutoScript"
export const ExtraSort = () => {
  return (
    <StyledTypeConversation>
          <ExtraSortDropDown/>
       <OrderAutoScript/>
    </StyledTypeConversation>
  )
}

const StyledTypeConversation = styled.div`
  display: flex;
  margin: 8px 0;
  justify-content: space-between;
  align-items: center;
  height: 24px;
  .tab-liveStream{
    display: flex;
    align-items: center;
    border-radius: 6px;
    padding: 7px 0;
    justify-content: center;
    width: 33.33%;
    :hover{
      cursor: pointer;
    }
    &[data-active='true']{
      background: #EFF3FB;
      .tab-liveStream__label-type{
        color: #1e9a98!important;
        font-weight: 600!important;
      }
      svg{
        color: #1e9a98;
        path[stroke] {
          stroke: #1e9a98;
        }
        path[fill] {
          fill: #1e9a98;
        }
      }
    }
    :hover{
      background: #EFF3FB;
      .tab-liveStream__label-type{
        color: #1e9a98!important;
      }
      svg{
        color: #1e9a98;
        path[stroke] {
          stroke: #1e9a98;
        }
        path[fill] {
          fill: #1e9a98;
        }
      }
    }
  }

`