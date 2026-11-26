import { magazines } from '../data/magazines'
import { categories } from '../data/categories.js'
import { ApiError, request } from './client'

const byDateDesc = (list) =>
    [...list].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))

const wordCount = (m) =>
    m.sections.reduce((n, s) => n + s.paragraphs.join(' ').split(/\s+/).length, 0)

const withMeta = (m) => ({
    ...m,
    categoryName: categories.find((c) => c.slug === m.categorySlug)?.name ?? '',
    date: new Date(m.publishedAt).toLocaleDateString('vi-VN'),
    readTime: Math.max(1, Math.ceil(wordCount(m) / 200)),
})

export function getMagazines() {
    return request(() => byDateDesc(magazines).map(withMeta))
}

export function getMagazineBySlug(slug) {
    return request(() => {
        const m = magazines.find((x) => x.slug === slug)
        if (!m) throw new ApiError('Không tìm thấy bài Magazine', 404)
        return withMeta(m)
    })
}

export function getRelatedMagazines(slug, limit = 2) {
    return request(() =>
        byDateDesc(magazines.filter((m) => m.slug !== slug)).slice(0, limit).map(withMeta),
    )
}