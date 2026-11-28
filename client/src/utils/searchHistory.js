const STORAGE_KEY = 'youthnews:search-history'
const MAX_ITEMS = 5

export function getSearchHistory() {
    try {
        const value = localStorage.getItem(STORAGE_KEY)
        if (!value) return []

        const items = JSON.parse(value)
        if (!Array.isArray(items)) return []

        return items.filter((item) => typeof item === 'string').slice(0, MAX_ITEMS)
    } catch {
        return []
    }
}

export function addSearchHistory(keyword) {
    const text = keyword.trim()
    if (!text) return

    const others = getSearchHistory().filter(
        (item) => item.toLocaleLowerCase('vi') !== text.toLocaleLowerCase('vi'),
    )

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([text, ...others].slice(0, MAX_ITEMS)))
    } catch {
        // Lịch sử chỉ là tiện ích nên bỏ qua nếu không lưu được
    }
}

export function clearSearchHistory() {
    try {
        localStorage.removeItem(STORAGE_KEY)
    } catch {
        // Bỏ qua nếu không truy cập được bộ nhớ
    }
}