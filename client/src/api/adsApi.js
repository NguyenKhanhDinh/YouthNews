import { ads } from '../data/ads'
import { ApiError, request } from './client'

export function getAd({ slot, index = 0 } = {}) {
    return request(() => {
        const list = ads.filter((a) => a.slot === slot)
        if (list.length === 0) throw new ApiError('Không có quảng cáo cho vị trí này', 404)
        return list[index % list.length]
    })
}