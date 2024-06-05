import './index.scss'
import SettingItem from './SettingItem'
import settingItemList, { breadcrumbSetting } from './interfaces/settingItemList'
import { settingUserList, settingDeliveryList } from './interfaces/settingItemList'
import { PageHeader } from 'layouts/pageHeader'
import { Text } from 'common/text'
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../const/display_name_menu";

export default function Setting(className = '', style = '') {
  const {t} = useTranslation()
  const itemList = settingItemList

  const title = t(DISPLAY_NAME_MENU.CONFIG_AND_SETTING_PAGE.HEADER)
  return (
    <div className={`p-setting ${className}`}>
      <div className='p-setting__container'>
        <PageHeader
          breadcrumbLinks={breadcrumbSetting}
          breadcrumbTitle={title}
        />
        <div className="p-setting__about">
          <Text
            fontSize={18}
            fontWeight={600}
          >{t(DISPLAY_NAME_MENU.GENERAL.USER_MANAGEMENT)} {'&'} {t(DISPLAY_NAME_MENU.GENERAL.ROLE)}</Text>
          <div className='p-setting__about-group'>
            {settingUserList.map((item, index) =>
              <SettingItem key={index} title={t(item.title)} url={item.url} imageURL={item.imageURL} description={t(item.description)} />)
            }
          </div>
        </div>
        <div className="p-setting__about">
          <Text
            fontSize={18}
            fontWeight={600}
          >{t(DISPLAY_NAME_MENU.CONFIG_AND_SETTING_PAGE.INFO)}</Text>
          {/* <p className='p-setting__about-title' >Cấu hình thông tin quản lý</p> */}
          <div className='p-setting__about-group'>
            {itemList.map((item, index) => <SettingItem key={index} title={t(item.title)} url={item.url} imageURL={item.imageURL} description={t(item.description)} />)}
          </div>
        </div>
        <div className="p-setting__about">
          <Text
            fontSize={18}
            fontWeight={600}
          >{t(DISPLAY_NAME_MENU.CONFIG_AND_SETTING_PAGE.OTHER_CONFIG)}</Text>
          {/* <p className='p-setting__about-title' >Cấu hình khác</p> */}
          <div className='p-setting__about-group'>
            {settingDeliveryList.map((item, index) => <SettingItem key={index} title={t(item.title)} url={item.url} imageURL={item.imageURL} description={t(item.description)} />)}
          </div>
        </div>
      </div>
    </div>
  )
}