import * as articlesApi from './articlesApi'
import * as authApi from './authApi'

export { ApiError, API_CONFIG } from './client'
export { useApi } from './useApi'
export const api = { ...articlesApi, ...authApi }