import { Link } from 'react-router-dom'
import {HEADER_QUICK_ACCESSES} from './_constants'
import {StyledQuickAccesses} from './_styled'
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../const/display_name_menu";

export const QuickAccesses = ({...props}) => {
  const {t} = useTranslation()
  return (
    <StyledQuickAccesses {...props}>
      <h5 className="quick-accesses__heading">{t(DISPLAY_NAME_MENU.QUICK_ACTION)}</h5>
      <ul className="quick-accesses__list">
        {HEADER_QUICK_ACCESSES.map(item => (
          <li
            key={item.id}
            className="quick-accesses__item"
            // onClick={item?.action}
          >
            <Link
              to={item?.path ?? '#'}
            >
              {item.displayIcon}
              <span>{t(item.name)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </StyledQuickAccesses>
  )
}
