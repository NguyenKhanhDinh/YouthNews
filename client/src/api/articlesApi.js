import { allArticles, slugify } from '../data/seed'
import { categories } from '../data/categories'
import { normalizeText } from '../utils/text'
import { ApiError, request } from './client'
import { byDateDesc } from './helpers'

const byViewsDesc = (list) => [...list].sort((a, b) => b.views - a.views)

function pickDistinctCategories(list, count, excludeSlugs = [], excludeCategories = []) {
    const seen = new Set(excludeCategories)
    const picked = []
    for (const a of list) {
        if (excludeSlugs.includes(a.slug) || seen.has(a.categorySlug)) continue
        seen.add(a.categorySlug)
        picked.push(a)
        if (picked.length === count) break
    }
    return picked
}

function paginate(list, page, limit) {
    const total = list.length
    const totalPages = Math.max(1, Math.ceil(total / limit))
    const start = (page - 1) * limit
    return {
        items: list.slice(start, start + limit),
        page,
        limit,
        total,
        totalPages,
        hasMore: page < totalPages,
    }
}

export function getCategories() {
    return request(() =>
        categories.map((c) => ({
            ...c,
            subCategories: [
                ...new Set(
                    allArticles
                        .filter((a) => a.categorySlug === c.slug)
                        .map((a) => a.category),
                ),
            ].map((name) => ({
                name,
                slug: slugify(name),
                count: allArticles.filter((a) => a.categorySlug === c.slug && a.category === name).length,
            })),
        })),
    )
}

export function getArticles({ category, sub, sort = 'latest', page = 1, limit = 8, exclude = [] } = {}) {
    return request(() => {
        let list = allArticles
        if (category) list = list.filter((a) => a.categorySlug === category)
        if (sub) list = list.filter((a) => slugify(a.category) === sub || a.category === sub)
        if (exclude.length) list = list.filter((a) => !exclude.includes(a.slug))
        list = sort === 'views' ? byViewsDesc(list) : byDateDesc(list)
        return paginate(list, page, limit)
    })
}

export function getArticleBySlug(slug) {
    return request(() => {
        const article = allArticles.find((a) => a.slug === slug)
        if (!article) throw new ApiError('Không tìm thấy bài viết', 404)
        return article
    })
}

export function getArticlesBySlugs(slugs = []) {
    return request(() => {
        const bySlug = new Map(allArticles.map((a) => [a.slug, a]))
        return slugs.map((slug) => bySlug.get(slug)).filter(Boolean)
    })
}

export function getRelatedArticles(slug, limit = 3) {
    return request(() => {
        const current = allArticles.find((a) => a.slug === slug)
        if (!current) throw new ApiError('Không tìm thấy bài viết', 404)
        return byDateDesc(
            allArticles.filter((a) => a.categorySlug === current.categorySlug && a.slug !== slug),
        ).slice(0, limit)
    })
}

export function getMostRead(limit = 5) {
    return request(() => byViewsDesc(allArticles).slice(0, limit))
}

export function searchArticles({ q = '', sort = 'latest', page = 1, limit = 10 } = {}) {
    return request(() => {
        const keyword = normalizeText(q.trim())
        if (!keyword) return paginate([], page, limit)
        const matched = allArticles.filter((a) =>
            [a.title, a.summary, a.category, ...a.tags].some((v) => normalizeText(v).includes(keyword)),
        )
        return paginate(sort === 'views' ? byViewsDesc(matched) : byDateDesc(matched), page, limit)
    })
}

export function getHome() {
    return request(() => {
        const sorted = byDateDesc(allArticles)

        const main = sorted[0]
        const side = pickDistinctCategories(sorted, 3, [main.slug], [main.categorySlug])
        const heroSlugs = [main.slug, ...side.map((a) => a.slug)]

        const focus = byViewsDesc(sorted.filter((a) => !heroSlugs.includes(a.slug))).slice(0, 4)
        const used = [...heroSlugs, ...focus.map((a) => a.slug)]

        const latest = paginate(
            sorted.filter((a) => !used.includes(a.slug)),
            1,
            8,
        )

        const sectionSlugs = ['cong-nghe', 'the-thao', 'doi-song', 'kinh-te']
        const sections = sectionSlugs.map((slug) => ({
            category: categories.find((c) => c.slug === slug),
            articles: sorted.filter((a) => a.categorySlug === slug).slice(0, 4),
        }))

        return {
            hero: { main, side },
            focus,
            latest,
            mostRead: byViewsDesc(allArticles).slice(0, 5),
            sections,
            usedSlugs: used,
        }
    })
}