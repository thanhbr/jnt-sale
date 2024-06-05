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
