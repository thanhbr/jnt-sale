import { Browser } from './browser'
import { FacebookPrint } from './facebookPrint'
import { Installation } from './Installation'
import styled from 'styled-components'

export const PrintSection = () => {
  return(
    <StyledPrintSection>
      <div className={'print-container common-scrollbar'}>
        <Browser title={"Trình duyệt khuyến nghị"}/>
        <FacebookPrint title={"In đơn tự động từ Facebook"}/>
        <Installation title={"Hướng dẫn cài đặt Webapp Hardware Bridge\n"}/>
      </div>
    </StyledPrintSection>
  )
}


export const StyledPrintSection = styled.div`

  .print-container{
    height: calc(100vh - 214px);
    overflow: auto;
  }
  #content-wrap{
    padding: 0!important;
  }

`