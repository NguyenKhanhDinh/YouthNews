import { videos } from '../data/videos'
import { categories } from '../data/categories.js'
import { ApiError, request } from './client'

const byDateDesc = (list) =>
    [...list].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))

const withMeta = (v) => ({
    ...v,
    thumbnail: `https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`,
    categoryName: categories.find((c) => c.slug === v.categorySlug)?.name ?? '',
    date: new Date(v.publishedAt).toLocaleDateString('vi-VN'),
})

export function getVideos({ category } = {}) {
    return request(() => {
        const filters = categories
            .map((c) => ({ slug: c.slug, name: c.name, count: videos.filter((v) => v.categorySlug === c.slug).length }))
            .filter((c) => c.count > 0)
        const list = category ? videos.filter((v) => v.categorySlug === category) : videos
        return { items: byDateDesc(list).map(withMeta), categories: filters, total: list.length }
    })
}

export function getVideoBySlug(slug) {
    return request(() => {
        const video = videos.find((v) => v.slug === slug)
        if (!video) throw new ApiError('Không tìm thấy video', 404)
        return withMeta(video)
    })
}

export function getRelatedVideos(slug, limit = 4) {
    return request(() => {
        const current = videos.find((v) => v.slug === slug)
        if (!current) return []
        const others = byDateDesc(videos.filter((v) => v.slug !== slug))
        const same = others.filter((v) => v.categorySlug === current.categorySlug)
        const rest = others.filter((v) => v.categorySlug !== current.categorySlug)
        return [...same, ...rest].slice(0, limit).map(withMeta)
    })
}
