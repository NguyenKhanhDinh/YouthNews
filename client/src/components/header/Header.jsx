import { useEffect , useMemo, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { categories } from '../../data/categories'
import { allArticles } from '../../data/seed'
import { videos } from '../../data/videos'
import { podcasts } from '../../data/podcasts'
import { magazines } from '../../data/magazines'
import Logo from '../Logo'
import './Header.css'

const MEGA_ARTICLES = 3
const EXTRA_ENTRIES = [
    { slug: 'video', name: 'Video', to: '/video' },
    { slug: 'podcast', name: 'Podcast', to: '/podcast' },
    { slug: 'magazine', name: 'Magazine', to: '/magazine' },
]
const NAV_ENTRIES = [
    ...categories.map((c) => ({ slug: c.slug, name: c.name, to: `/chuyen-muc/${c.slug}` })),
    ...EXTRA_ENTRIES,
]
const NAV_VISIBLE = NAV_ENTRIES.length

const newest = (list) => [...list].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))

function buildMegaData() {
    const byDate = newest(allArticles)
    const data = {}
    for (const c of categories) {
        const list = byDate.filter((a) => a.categorySlug === c.slug)
        data[c.slug] = {
            subs: [...new Set(list.map((a) => a.category))].map((sub) => ({
                label: sub,
                to: `/chuyen-muc/${c.slug}?muc=${encodeURIComponent(sub)}`,
            })),
            latest: list.slice(0, MEGA_ARTICLES).map((a) => ({
                to: `/bai-viet/${a.slug}`,
                title: a.title,
                image: a.image,
                alt: a.imageAlt,
            })),
        }
    }

    const videoCats = [...new Set(videos.map((v) => v.categorySlug))]
    data.video = {
        subs: videoCats.map((slug) => ({
            label: categories.find((c) => c.slug === slug)?.name ?? slug,
            to: `/video?chuyen-muc=${slug}`,
        })),
        latest: newest(videos).slice(0, MEGA_ARTICLES).map((v) => ({
            to: `/video/${v.slug}`,
            title: v.title,
            image: `https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`,
            alt: v.title,
        })),
    }

    data.podcast = {
        subs: [...new Set(podcasts.map((p) => p.show))].map((show) => ({
            label: show,
            to: `/podcast?chuong-trinh=${encodeURIComponent(show)}`,
        })),
        latest: newest(podcasts).slice(0, MEGA_ARTICLES).map((p) => ({
            to: `/podcast/${p.slug}`,
            title: p.title,
            theme: p.theme,
            label: `${p.show} · Tập ${p.episode}`,
        })),
    }

    data.magazine = {
        subs: [],
        latest: newest(magazines).slice(0, MEGA_ARTICLES).map((m) => ({
            to: `/magazine/${m.slug}`,
            title: m.title,
            image: m.cover,
            alt: m.title,
        })),
    }
    return data
}
function useTheme() {
    const [theme, setTheme] = useState(() => {
        try {
            return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
        } catch {
            return 'light'
        }
    })
    useEffect(() => {
        document.documentElement.dataset.theme = theme
        try {
            localStorage.setItem('theme', theme)
        } catch {
            /* bỏ qua (chế độ riêng tư) */
        }
    }, [theme])

    const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))
    return { theme, toggleTheme }
}

export default function Header() {
    const navigate = useNavigate()
    const { theme, toggleTheme } = useTheme()
    const [menuOpen, setMenuOpen] = useState(false)
    const [keyword, setKeyword] = useState('')
    const [hoverSlug, setHoverSlug] = useState(null)
    const megaData = useMemo(() => buildMegaData(), [])
    const trending = useMemo(
        () => [...allArticles].sort((a, b) => b.views - a.views).slice(0, 3),
        [],
    )
    const hoverEntry = NAV_ENTRIES.find((e) => e.slug === hoverSlug)
    const hoverData = hoverSlug ? megaData[hoverSlug] : null

    const today = new Date().toLocaleDateString('vi-VN', {
        weekday: 'long',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') {
                setMenuOpen(false)
                setHoverSlug(null)
            }
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [])

    useEffect(() => {
        const mq = window.matchMedia('(min-width: 641px)')
        const onChange = (e) => {
            if (e.matches) setMenuOpen(false)
        }
        mq.addEventListener('change', onChange)
        return () => mq.removeEventListener('change', onChange)
    }, [])

    const closeMenu = () => {
        setMenuOpen(false)
        setHoverSlug(null)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        const q = keyword.trim()
        if (!q) return
        navigate(`/tim-kiem?q=${encodeURIComponent(q)}`)
        closeMenu()
    }

    const activeClass = ({ isActive }) => (isActive ? 'is-active' : '')

    const renderHover = (inline = false) =>
        hoverEntry && hoverData && (
            <div
                className={`header__hover${inline ? ' header__hover--inline' : ''}`}
                role="region"
                aria-label={`Nội dung ${hoverEntry.name}`}
            >
                <div className="header__container header__hover-inner">
                    <div className="header__hover-left">
                        <Link to={hoverEntry.to} className="header__hover-title" onClick={closeMenu}>
                            {hoverEntry.name}
                        </Link>
                        {hoverData.subs.length > 0 && (
                            <ul className="header__hover-subs">
                                {hoverData.subs.map((sub) => (
                                    <li key={sub.to}>
                                        <Link to={sub.to} onClick={closeMenu}>
                                            {sub.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="header__hover-articles">
                        {hoverData.latest.map((a) => (
                            <Link key={a.to} to={a.to} className="header__hover-card" onClick={closeMenu}>
                                {a.image ? (
                                    <img src={a.image} alt={a.alt} loading="lazy" />
                                ) : (
                                    <div className={`header__hover-cover header__hover-cover--${a.theme}`}>{a.label}</div>
                                )}
                                <span>{a.title}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        )

    return (
        <header className="header">
            <div className="header__topbar">
                <div className="header__container header__topbar-inner">
                    <span className="header__date">{today}</span>
                    <ul className="header__quick">
                        <li><Link to="/">Mới nhất</Link></li>
                        <li><Link to="/#doc-nhieu">Đọc nhiều</Link></li>
                        <li><Link to="/video">Video</Link></li>
                        <li><Link to="/lien-he">Liên hệ</Link></li>
                    </ul>
                </div>
            </div>

            <div className="header__main">
                <div className="header__container header__main-inner">
                    <button
                        className="header__burger"
                        aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}
                        aria-expanded={menuOpen}
                        aria-controls="mega-menu"
                        onClick={() => setMenuOpen((v) => !v)}
                    >
                        <span /><span /><span />
                    </button>

                    <Link to="/" className="header__logo" aria-label="YouthNews - Trang chủ" onClick={closeMenu}>
                        <Logo />
                    </Link>
                    <form className="header__search" onSubmit={handleSearch} role="search">
                        <input
                            type="search"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="Tìm kiếm tin tức..."
                            aria-label="Tìm kiếm"
                        />
                        <button type="submit" aria-label="Tìm">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                                <circle cx="11" cy="11" r="7" />
                                <path d="M20 20l-3.5-3.5" />
                            </svg>
                        </button>
                    </form>

                    <Link to="/dang-nhap" className="header__login">Đăng nhập</Link>

                    <button
                        className="header__theme"
                        onClick={toggleTheme}
                        aria-label={theme === 'light' ? 'Bật chế độ tối' : 'Bật chế độ sáng'}
                        title={theme === 'light' ? 'Chế độ tối' : 'Chế độ sáng'}
                    >
                        <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} />
                    </button>
                </div>
            </div>

            <div className="header__navwrap" onMouseLeave={() => setHoverSlug(null)}>
                <nav className="header__nav" aria-label="Chuyên mục">
                    <ul className="header__container">
                        <li>
                            <NavLink to="/" end className={({ isActive }) => `header__home ${isActive ? 'is-active' : ''}`} aria-label="Trang chủ" onClick={closeMenu}>
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                    <path d="M12 3l9 8h-2.5v9h-5v-6h-3v6h-5v-9H3z" />
                                </svg>
                            </NavLink>
                        </li>
                        {NAV_ENTRIES.slice(0, NAV_VISIBLE).map((e) => (
                            <li
                                key={e.slug}
                                className={hoverSlug === e.slug ? 'is-hover' : ''}
                                onMouseEnter={() => setHoverSlug(e.slug)}
                                onFocus={() => setHoverSlug(e.slug)}
                            >
                                <NavLink to={e.to} className={activeClass} onClick={closeMenu}>
                                    {e.name}
                                </NavLink>
                            </li>
                        ))}
                        {NAV_ENTRIES.length > NAV_VISIBLE && (
                            <li className="header__nav-extra">
                                <button
                                    className="header__menu-btn"
                                    onClick={() => setMenuOpen((v) => !v)}
                                    aria-expanded={menuOpen}
                                    aria-controls="mega-menu"
                                >
                                    {menuOpen ? 'Đóng' : 'Menu'}
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>
                {!menuOpen && renderHover()}
                {menuOpen && (
                    <div className="header__mega" id="mega-menu">
                        <div className="header__container header__mega-inner">
                            {NAV_ENTRIES.map((e) => (
                                <Link
                                    key={e.slug}
                                    to={e.to}
                                    className={hoverSlug === e.slug ? 'is-hover' : ''}
                                    onMouseEnter={() => setHoverSlug(e.slug)}
                                    onFocus={() => setHoverSlug(e.slug)}
                                    onClick={closeMenu}
                                >
                                    {e.name}
                                </Link>
                            ))}
                        </div>
                        {renderHover(true)}
                    </div>
                )}
            </div>


            <div className="header__ticker">
                <div className="header__container header__ticker-inner">
                    <span className="header__ticker-label">Tin nóng</span>
                    <div className="header__ticker-list">
                        {trending.map((a) => (
                            <Link key={a.slug} to={`/bai-viet/${a.slug}`}>{a.title}</Link>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    )
}