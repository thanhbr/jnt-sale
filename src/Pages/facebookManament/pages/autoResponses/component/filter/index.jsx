import React  from 'react'
import {FacebookAutoResponse__SearchInput} from "../__searchInput";
import { PageSelected } from './_pageSelected'
import styled from 'styled-components'

export default () => {

  return (
    <StyledFilter className={'filter__content'} style={{display: 'flex',marginBottom: '24px'}}>
      <div className={'filter__content_search'}>
         <FacebookAutoResponse__SearchInput/>
      </div>
      <div className={'filter__content_page'}>
         <PageSelected/>
      </div>
    </StyledFilter>
  )
}
const StyledFilter = styled.div`
  .filter__content_search{
    width: 30%;
    margin-right: 12px;
  }
  .filter__content_page{
    width: 30%;
  }
  @media screen and (max-width: 1366px) {
      
    .filter__content_search{
      width: 40%;
    }
    .filter__content_page{
      width: 40%;
    }
  }
`