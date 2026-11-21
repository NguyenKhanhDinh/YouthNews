import * as articlesApi from './articlesApi'
import * as authApi from './authApi'
import * as videosApi from './videosApi'

export { ApiError, API_CONFIG } from './client'
export { useApi } from './useApi'
export const api = { ...articlesApi, ...authApi, ...videosApi}