import config from '../../../config'

class FACEBOOK_SERVICE {
  //  ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  //  INITIALIZE
  //  ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  asyncInit() {
    window.FB.init({
      appId: config.REACT_APP_FACEBOOK_APP_ID,
      secret: config.REACT_APP_FACEBOOK_APP_SECRET,
      version: 'v12.0',
      autoLogAppEvents: true,
      cookie: true,
      localStorage: true,
      xfbml: true,
    })
  }

  initFacebookSdk(callback) {
    return new Promise(() => {
      window.fbAsyncInit = () => {
        this.asyncInit()
        this.getLoginStatus(callback)
      }
      ;((d, s, id) => {
        var js,
          fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) {
          return
        }
        js = d.createElement(s)
        js.id = id
        js.src =
          'https://connect.facebook.net/en_US/sdk.js?hash=00dece20b44747945d346e7eb24a0f0b'
        fjs.parentNode.insertBefore(js, fjs)
      })(document, 'script', 'facebook-jssdk')
    })
  }

  //  ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  //  AUTHENTICATION
  //  ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  getLoginStatus(callback) {
    const localFacebook = localStorage.getItem(`fbssls_${config.REACT_APP_FACEBOOK_APP_ID}`)
    if (localFacebook)
      sessionStorage.setItem(`fbssls_${config.REACT_APP_FACEBOOK_APP_ID}`, localFacebook)
    window.FB.getLoginStatus(
      response =>
        localFacebook &&
        response?.status === 'connected' &&
        callback?.getAuthData &&
        callback.getAuthData(response?.authResponse),
    )
  }

  login(callback) {
    const permissions = [
      'public_profile',
      'email',
      'pages_messaging',
      'pages_manage_instant_articles',
      'pages_manage_engagement',
      'pages_read_engagement',
      'pages_manage_ads',
      'pages_manage_metadata',
      'pages_read_user_content',
      'pages_show_list',
    ]
    window.FB.login(response => callback && callback(response), {
      scope: permissions.join(','),
    })
  }

  logout(callback) {
    localStorage.removeItem(`fbssls_${config.REACT_APP_FACEBOOK_APP_ID}`)
    sessionStorage.removeItem(`fbssls_${config.REACT_APP_FACEBOOK_APP_ID}`)
    window.FB.logout(response => callback && callback(response))
  }
}
const FakeComment = [
  {
    id: '2768',
    page: '445382456284046',
    type: '2',
    post: '445382456284046_870925746878986',
    code: '870925746878986_870927060212188',
    from: '3073174889466638',
    avatar:
      'https://platform-lookaside.fbsbx.com/platform/profilepic/?psid=3073174889466638&width=100&ext=1632026065&hash=AeSdnVxVJVpCR5nl7jw',
    name: 'Harry Nguy\u1ec5n',
    snippet: 'ch\u00e0o mn',
    time: '2021-08-03 09:16:21',
    is_done: '1',
    is_read: '2',
    is_delete: '1',
    is_hidden: '0',
    phones: ' ',
    network: null,
  },
  {
    id: '2766',
    page: '445382456284046',
    type: '2',
    post: '445382456284046_870925746878986',
    code: '870925746878986_870927173545510',
    from: '3073174889466638',
    avatar:
      'https://platform-lookaside.fbsbx.com/platform/profilepic/?psid=3073174889466638&width=100&ext=1632026065&hash=AeSdnVxVJVpCR5nlogg',
    name: 'Harry Nguy\u1ec5n',
    snippet: 'h\u00f4m nay mn th\u1ebf n\u00e0o',
    time: '2021-08-03 09:16:34',
    is_done: '1',
    is_read: '2',
    is_delete: '1',
    is_hidden: '0',
    phones: ' ',
    network: null,
  },
]
export function getFbMessage({id = '', cb = () => {}, access_token = ''}) {
  try {
    const FB = window.FB
    if (!FB || !id) return
    FB.api(
      `/${id}/messages?fields=shares{link,description,name,template,id},attachments,message,created_time,id,to,from`,
      function (response) {
        cb(response)
      },
      {access_token},
    )
  } catch (error) {}
}
export function getConversations({id = '', cb = () => {}, access_token = ''}) {
  try {
    const FB = window.FB
    if (!FB || !id || !access_token) return
    FB.api(
      `/${id}/conversations?fields=id,link,message_count,unread_count,senders,messages,snippet,participants,former_participants,can_reply,shares,picture`,
      function (response) {
        cb(response)
      },
      {access_token},
    )
  } catch (error) {}
}
export function getStatus({id = '', cb = () => {}, access_token = ''}) {
  try {
    const FB = window.FB
    FB.getLoginStatus(function (response) {
      cb(response)
    })
  } catch (error) {}
}
export function logOut({cb = () => {}}) {
  try {
    const FB = window.FB
    FB.logout(function (response) {
      cb(response)
    })
  } catch (error) {}
}
export function getListFanpage({id = '', cb = () => {}, access_token = ''}) {
  try {
    const FB = window.FB
    FB.api(
      `/${id}/accounts?fields=picture,name,access_token,link`,
      function (response) {
        cb(response)
      },
    )
  } catch (error) {}
}
export function getAvatarLagre({id = '', cb = () => {}, access_token = ''}) {
  try {
    const FB = window.FB
    FB.api(
      `/${id}?fields=id,name,picture.width(120).height(120)`,
      function (response) {
        cb(response)
      },
    )
  } catch (error) {}
}
export function getLiveVideos({id = '', cb = () => {}, access_token = ''}) {
  try {
    const FB = window.FB
    FB.api(
      `/${id}/live_videos?fields=from,embed_html,description,title,comments,status,permalink_url,overlay_url`,
      function (response) {
        cb(response)
      },
      {access_token},
    )
  } catch (error) {}
}
export function getPagePost({id = '', cb = () => {}, access_token = ''}) {
  try {
    cb(FakeComment)
    // const FB = window.FB
    // FB.api(
    //   `/${id}/posts`,
    //   function (response) {
    //     cb(response)
    //   },
    //   {access_token},
    // )
  } catch (error) {}
}


const FacebookService = new FACEBOOK_SERVICE()

export default FacebookService
