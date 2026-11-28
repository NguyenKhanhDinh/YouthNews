import { normalizeText } from '../../utils/text'

function findRanges(text, keyword) {
    const needle = normalizeText(keyword.trim())
    if (!needle) return []

    let normalized = ''
    const indexMap = []
    for (let i = 0; i < text.length; i++) {
        const piece = normalizeText(text[i])
        for (let j = 0; j < piece.length; j++) indexMap.push(i)
        normalized += piece
    }

    const ranges = []
    let from = 0
    while (from <= normalized.length - needle.length) {
        const found = normalized.indexOf(needle, from)
        if (found === -1) break
        ranges.push([indexMap[found], indexMap[found + needle.length - 1] + 1])
        from = found + needle.length
    }
    return ranges
}

export default function Highlight({ text = '', keyword = '' }) {
    const ranges = findRanges(text, keyword)
    if (ranges.length === 0) return text

    const parts = []
    let cursor = 0
    ranges.forEach(([start, end], index) => {
        if (start > cursor) parts.push(text.slice(cursor, start))
        parts.push(
            <mark className="highlight" key={index}>
                {text.slice(start, end)}
            </mark>,
        )
        cursor = end
    })
    if (cursor < text.length) parts.push(text.slice(cursor))

    return parts
}