import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {ForControlCODContext} from 'Pages/ForControlCOD/Tab1/provider/_context'
import useForControlCODFilterForm from 'Pages/ForControlCOD/Tab1/hooks/useForControlCODFilterForm'
import {useContext} from 'react'
import {useSearchParams} from 'react-router-dom'
import {ForControlCODInitialState} from '../../provider/initState'
import {StyledForControlCODTags} from './_styled'
import {ForControlCODTag} from './_tag'
import {useTranslation} from "react-i18next";

export const ForControlCODTags = ({...props}) => {
  const {pageState} = useContext(ForControlCODContext)
  const {table} = pageState
  const {dateTime, functions} = useForControlCODFilterForm()
  const { t } = useTranslation();
  const shouldShowResetAll = [
    JSON.stringify(dateTime?.activeValue) !==
      JSON.stringify(ForControlCODInitialState.filter.dateTime.activeValue),
  ].includes(true)

  const [searchParams] = useSearchParams()
  const querySearch = searchParams.get('search') || ''

  const handleDeleteAll = () => {
    if (!table.loading) return
    functions.filterTagDeleteAll()
  }
  return (
    <StyledForControlCODTags
      {...props}
      style={{display: querySearch ? 'block' : 'block'}}
    >
      {dateTime?.activeValue?.value && dateTime?.activeValue?.type?.name && (
        <ForControlCODTag>
          {t(dateTime.activeValue.type.name)}: {dateTime.activeValue.value}
        </ForControlCODTag>
      )}
      {shouldShowResetAll && (
        <Text
          color={table.loading ? THEME_SEMANTICS.delivering : 'gray'}
          fontSize={14}
          fontWeight={600}
          lineHeight={28}
          style={{marginBottom: 12, cursor: 'pointer'}}
          onClick={handleDeleteAll}
        >
          {t("general_reset_to_default")}
        </Text>
      )}
    </StyledForControlCODTags>
  )
}
