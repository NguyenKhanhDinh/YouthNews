export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function focusFirstError(errors) {
    const first = Object.keys(errors)[0]
    if (first) document.getElementById(first)?.focus()
}