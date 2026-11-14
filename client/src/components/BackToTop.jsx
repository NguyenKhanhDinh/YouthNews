import { useEffect, useState } from 'react'
import './BackToTop.css'

export default function BackToTop() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 400)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    if (!visible) return null

    return (
        <button
            type="button"
            className="back-to-top"
            onClick={scrollToTop}
            aria-label="Quay lại đầu trang"
        >
            ↑
        </button>
    )
}