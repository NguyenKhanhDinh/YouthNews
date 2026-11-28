import { categories } from '../data/categories'

export const byDateDesc = (list) =>
    [...list].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))

export const formatDate = (isoDate) => new Date(isoDate).toLocaleDateString('vi-VN')

export const getCategoryName = (categorySlug) =>
    categories.find((c) => c.slug === categorySlug)?.name ?? ''