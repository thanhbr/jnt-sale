import styled from 'styled-components'
import { PanelProductReport } from './panelReport'
import { TopProductReport } from './topProductReport'

export const ProductOverview = () => {

  return (
    <StyleProductOverview>
        <PanelProductReport/>
        <TopProductReport/>
    </StyleProductOverview>
  )

}

const StyleProductOverview = styled.div`
  display: flex;
  margin: 24px -16px;
`