import { podcasts } from '../data/podcasts'
import { ApiError, request } from './client'
import { byDateDesc, formatDate, getCategoryName } from './helpers'

const withMeta = (p) => ({
    ...p,
    categoryName: getCategoryName(p.categorySlug),
    date: formatDate(p.publishedAt),
})

export function getPodcasts({ show } = {}) {
    return request(() => {
        const shows = [...new Set(podcasts.map((p) => p.show))]
        const list = show ? podcasts.filter((p) => p.show === show) : podcasts
        return { items: byDateDesc(list).map(withMeta), shows, total: list.length }
    })
}

export function getPodcastBySlug(slug) {
    return request(() => {
        const ep = podcasts.find((p) => p.slug === slug)
        if (!ep) throw new ApiError('Không tìm thấy tập podcast', 404)
        return withMeta(ep)
    })
}

export function getRelatedPodcasts(slug, limit = 4) {
    return request(() => {
        const current = podcasts.find((p) => p.slug === slug)
        if (!current) return []
        const others = byDateDesc(podcasts.filter((p) => p.slug !== slug))
        const same = others.filter((p) => p.show === current.show)
        const rest = others.filter((p) => p.show !== current.show)
        return [...same, ...rest].slice(0, limit).map(withMeta)
    })
}