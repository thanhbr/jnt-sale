import {sendRequestAuth} from 'api/api'
import {Button} from 'common/button'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import config from 'config'
import {FACEBOOK_ICONS} from 'Pages/facebookManament/interfaces/_icons'
import FacebookService from 'Pages/facebookManament/services'
import {StyledFacebookLoginWrapper} from './_styled'
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../../../const/display_name_menu";

export const FacebookLoginWrapper = ({...props}) => {
  const {t} = useTranslation()
  const handleLogin = async () => {
    FacebookService.login(async data => {
      if (
        data?.status === 'connected' &&
        data?.authResponse?.accessToken &&
        data?.authResponse?.userID
      ) {
        const response = await sendRequestAuth(
          'post',
          `${config.API}/fb/user/connect`,
          JSON.stringify({
            access_token: data.authResponse.accessToken,
            facebook_id: data.authResponse.userID,
          }),
        )
        if (response?.data?.success && props?.connect) {
          const sessionFacebook = sessionStorage.getItem(
            `fbssls_${config.REACT_APP_FACEBOOK_APP_ID}`,
          )
          localStorage.setItem(
            `fbssls_${config.REACT_APP_FACEBOOK_APP_ID}`,
            sessionFacebook,
          )

          props.connect(data?.authResponse)
        }
      }
    })
  }

  return (
    <StyledFacebookLoginWrapper {...props}>
      <div className="facebook-login-wrapper__container">
        <div className="facebook-login-wrapper__content">
          <Text
            as="h2"
            fontSize={32}
            lineHeight={45}
            style={{marginBottom: 16}}
          >
            {t(DISPLAY_NAME_MENU.FB.TITLE_1)}
            <br />
            {t(DISPLAY_NAME_MENU.FB.TITLE_2)}
          </Text>
          <Text as="h5" fontSize={15} lineHeight={22} style={{marginBottom: 8}}>
            {t(DISPLAY_NAME_MENU.FB.SUBTITLE_1)}
          </Text>
          <Text as="div" style={{maxWidth: 492, marginBottom: 32}}>
            {t(DISPLAY_NAME_MENU.FB.SUBTITLE_2)}
          </Text>
          <div>
            <Button
              className="facebook-login-wrapper__login-btn"
              onClick={handleLogin}
              icon={FACEBOOK_ICONS.facebook}
            >
              {t(DISPLAY_NAME_MENU.FB.LOGIN_WITH_FB)}
            </Button>
          </div>
          <Text>
            {t(DISPLAY_NAME_MENU.FB.PLEASE_REFER_TO)}{' '}
            <Text
              as="a"
              href="/policy/chinh-sach-bao-mat-thong-tin"
              target="_blank"
              color={THEME_SEMANTICS.delivering}
            >
              {t(DISPLAY_NAME_MENU.FB.PRIVACY_POLICY)}
            </Text>{' '}
            {t(DISPLAY_NAME_MENU.FB.AND)}{' '}
            <Text
              as="a"
              href="/policy/chinh-sach-va-quy-dinh-chung"
              target="_blank"
              color={THEME_SEMANTICS.delivering}
            >
              {t(DISPLAY_NAME_MENU.FB.RULES)}
            </Text>{' '}
            {t(DISPLAY_NAME_MENU.FB.BY_EVO)}.
          </Text>
        </div>
      </div>
      <img
        className="facebook-login-wrapper__background"
        src="/img/fb/backgrounds/login-background.png"
        alt="background"
      />
    </StyledFacebookLoginWrapper>
  )
}
