import createPersistedState from 'use-persisted-state'

export const useToken = createPersistedState('access_token')
export const useRedirectUrl = createPersistedState('redirect_url')