export function formatMinutes(seconds) {
    return `${Math.max(1, Math.round(seconds / 60))} phút`
}