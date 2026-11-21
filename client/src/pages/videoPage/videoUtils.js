export function formatDuration(seconds) {
    const m = Math.floor(seconds / 60)
    const s = String(seconds % 60).padStart(2, '0')
    return `${m}:${s}`
}

export const formatViews = (n) => `${n.toLocaleString('vi-VN')} lượt xem`
