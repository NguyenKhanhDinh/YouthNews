import * as articlesApi from './articlesApi'
import * as authApi from './authApi'
import * as videosApi from './videosApi'
import * as adsApi from './adsApi'
import * as podcastsApi from './podcastsApi'
import * as magazinesApi from './magazinesApi'

export { ApiError, API_CONFIG } from './client'
export { useApi } from './useApi'
export const api = { ...articlesApi, ...authApi, ...videosApi, ...adsApi, ...podcastsApi, ...magazinesApi }