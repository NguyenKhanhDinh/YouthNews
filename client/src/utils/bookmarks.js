const STORAGE_KEY = 'youthnews:saved-articles'

function readSlugs() {
    let value
    try {
        value = localStorage.getItem(STORAGE_KEY)
    } catch (error) {
        throw new Error('Không thể truy cập bộ nhớ lưu tin trên thiết bị.', { cause: error })
    }

    if (!value) return []

    let slugs
    try {
        slugs = JSON.parse(value)
    } catch (error) {
        throw new Error('Danh sách tin đã lưu bị lỗi dữ liệu.', { cause: error })
    }

    if (!Array.isArray(slugs) || slugs.some((slug) => typeof slug !== 'string')) {
        throw new Error('Danh sách tin đã lưu không đúng định dạng.')
    }

    return [...new Set(slugs)]
}

export function getSavedArticleSlugs() {
    return readSlugs()
}

export function isArticleSaved(slug) {
    return readSlugs().includes(slug)
}

export function toggleSavedArticle(slug) {
    const slugs = readSlugs()
    const isSaved = slugs.includes(slug)
    const updatedSlugs = isSaved ? slugs.filter((item) => item !== slug) : [...slugs, slug]

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSlugs))
    } catch (error) {
        throw new Error('Không thể cập nhật danh sách tin đã lưu trên thiết bị.', { cause: error })
    }

    return !isSaved
}

export function removeSavedArticle(slug) {
    const updatedSlugs = readSlugs().filter((item) => item !== slug)

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSlugs))
    } catch (error) {
        throw new Error('Không thể bỏ lưu bài viết trên thiết bị.', { cause: error })
    }
}

export function clearSavedArticles() {
    try {
        localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
        throw new Error('Không thể xóa danh sách tin đã lưu trên thiết bị.', { cause: error })
    }
}