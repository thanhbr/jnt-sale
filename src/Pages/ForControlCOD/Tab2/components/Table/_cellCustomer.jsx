import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {Tooltip} from 'common/tooltip'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ReportCustomerModal } from './_reportCustomerModal'
import {useTranslation} from "react-i18next";

export const CellCustomer = ({name, phone, report, ...props}) => {
  // const [reportCustomerModalData, setReportCustomerModalData] = useState(null)
  const { t } = useTranslation()

  const handleReportClick = (e) => {
    // setReportCustomerModalData({
    //   customer: {
    //     name: name,
    //     phone: phone,
    //   },
    //   mode: 'view',
    //   onClose: () => setReportCustomerModalData(null),
    // })
  }

  return (
    <div {...props} onClick={e => e.stopPropagation()}>
      {name && (
        <Text
          color={THEME_SEMANTICS.delivering}
          fontSize={14}
          fontWeight={600}
          lineHeight={20}
          style={{display: 'flex'}}
        >
          <Link
            to={`/partner-management/customer?keyword=${phone}&group=&city=&district=&ward=&per_page=20&start=0`}
            target="_blank"
            className="row-tab-detail__link-hover"
            style={{display: 'block', color: '#1A94FF'}}
          >
            {name}
          </Link>
          {report ? (
            <Tooltip placement="bottom" title={`${t("tooltip_sos")}: ${report} lần`}>
              <StyledReportIcon onClick={handleReportClick}>
                {ORDER_ICONS.alertTriangle}
              </StyledReportIcon>
            </Tooltip>
          ) : (
            <></>
          )}
        </Text>
      )}
      {phone && (
        <Text color="#7C88A6" fontSize={13} fontWeight={400} lineHeight={18}>
          {phone}
        </Text>
      )}
      {/* {!!reportCustomerModalData && (
        <ReportCustomerModal data={reportCustomerModalData} />
      )} */}
    </div>
  )
}

const StyledReportIcon = styled.i`
  width: 16px;
  height: 16px;
  margin-left: 4px;

  svg {
    width: 16px;
    height: 16px;

    transform: translateY(2px);

    cursor: pointer;
  }
`
