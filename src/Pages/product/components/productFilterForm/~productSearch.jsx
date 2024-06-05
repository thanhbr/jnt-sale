import {Input} from "../../../../common/form/input";
import {PRODUCT_ICONS} from "../../interfaces/~icon";
import useProductFilterForm from "../../hooks/useProductFilterForm";
import { useSearchParams } from "react-router-dom";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

export const ProductSearch = () => {
  const { t } = useTranslation()
  const {search} = useProductFilterForm()
  let [searchParams] = useSearchParams();
  return (
    <Input
      className={"product-filter-form__input-wide"}
      icon={PRODUCT_ICONS.searchMd}
      placeholder={t(DISPLAY_NAME_MENU.PRODUCT_PAGE.PLACEHOLDER_SEARCH)}
      // value={search.value}
      defaultValue={searchParams.get('search')}
      onChange={search.onChange}
      style={{maxWidth: '24.5rem'}}
    />
  )
}