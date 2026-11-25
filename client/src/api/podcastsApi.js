import { podcasts } from '../data/podcasts'
import { categories } from '../data/categories.js'
import { ApiError, request } from './client'

const byDateDesc = (list) =>
    [...list].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))

const withMeta = (p) => ({
    ...p,
    categoryName: categories.find((c) => c.slug === p.categorySlug)?.name ?? '',
    date: new Date(p.publishedAt).toLocaleDateString('vi-VN'),
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
