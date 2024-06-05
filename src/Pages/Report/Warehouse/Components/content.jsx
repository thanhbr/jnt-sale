import styled from 'styled-components'
import { Text } from '../../../../common/text'
import { REPORT_WAREHOUSE_CONTENT } from '../interfaces/_constants'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const ContentReportWarehouse = () => {
  return (
    <StyledContent>
      <ReportSaleStatistics/>
    </StyledContent>
  )
}

const ReportSaleStatistics = () => {
  const nav = useNavigate()
  const {t} = useTranslation()
  return (
    <>
      {
        REPORT_WAREHOUSE_CONTENT.map(item => {
          return (
            <div className={'content-report'} key={item.id}>
              <div className="content-report__title">
                <Text fontSize={16} fontWeight={600}>{t(item.title)}</Text>
              </div>
              <div className={'content-report__wrapper'}>
                {
                  item.page.map(page => (
                    <div className="content-report__wrapper-card"
                         onClick={() => nav(page.url)}
                         key={page.id}
                    >
                      <div className={'content-report__wrapper-images'}>
                        {page?.image}
                      </div>
                      <Text as={'p'} fontSize={15} fontWeight={600}>{t(page?.title)}</Text>
                      <Text as={'p'} color={'#7C88A6'}>{t(page?.content)}</Text>
                    </div>
                  ))
                }
              </div>
            </div>
          )
        })
      }
    </>
  )
}

const StyledContent = styled.div`
  width: 100%;
  background: #FFFFFF;
  padding: 16px 0 16px 16px;
  .content-report{
    margin-bottom: 8px;
    &__title{
      margin-bottom: 24px;
    }
    &__wrapper{
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      &-images{
        margin-bottom: 16px;
      }
      &-card{
        width: calc(20% - 16px);
        border: 1px solid #EBEEF5;
        border-radius: 8px;
        margin-right: 16px;
        padding: 16px;
        cursor: pointer;
        height: 177px;
        margin-bottom: 24px;
        &:hover{
          box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.15);
        }
        p{
          margin-bottom: 4px;
        }
      }
    }
    
  }
  @media (min-width: 1280px) and (max-width: 1919px){
    .content-report__wrapper{
      &-card{
        width: calc(25% - 16px);
      }
    }
  }
`