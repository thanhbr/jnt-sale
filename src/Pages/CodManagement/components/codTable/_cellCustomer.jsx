import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {Tooltip} from 'common/tooltip'
import {COD_ICONS} from '../../interfaces/_icons'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {useTranslation} from "react-i18next";

export const CellCustomer = ({name, phone, report, ...props}) => {
  const { t } = useTranslation()
  return (
    <div {...props}>
      {name && (
        <Text
          color={THEME_SEMANTICS.delivering}
          fontSize={14}
          fontWeight={600}
          lineHeight={20}
          style={{display: 'block'}}
        >
           <Link
              to={`/partner-management/customer?keyword=${phone}&group=&city=&district=&ward=&per_page=20&start=0`}
              target="_blank"
              className="row-tab-detail__link-hover" 
              style={{color: '#1a94ff'}}
            >
          {name}{' '} </Link>
          {report ? (
            <Tooltip
              placement="bottom"
              title={`${t("tooltip_sos")}: ${report} ${t("no.time")}`}
            >
              <StyledReportIcon onClick={(e) => e.stopPropagation()}>{COD_ICONS.alertTriangle}</StyledReportIcon>
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
