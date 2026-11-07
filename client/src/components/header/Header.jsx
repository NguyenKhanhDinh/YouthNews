import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { categories } from '../../data/categories'
import Logo from '../Logo'
import './Header.css'

const NAV_VISIBLE = 4

const trending = [
    'Tuyển sinh đại học 2027: những điều thí sinh cần biết',
    'Sinh viên khởi nghiệp công nghệ gây quỹ thành công',
    'Giải bóng đá sinh viên toàn quốc khởi tranh',
]

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

    const today = new Date().toLocaleDateString('vi-VN', {
        weekday: 'long',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })

    useEffect(() => {
        const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [])

    const closeMenu = () => setMenuOpen(false)

    const handleSearch = (e) => {
        e.preventDefault()
        const q = keyword.trim()
        if (!q) return
        navigate(`/tim-kiem?q=${encodeURIComponent(q)}`)
        closeMenu()
    }

    const activeClass = ({ isActive }) => (isActive ? 'is-active' : '')

    return (
        <header className="header">
            <div className="header__topbar">
                <div className="header__container header__topbar-inner">
                    <span className="header__date">{today}</span>
                    <ul className="header__quick">
                        <li><Link to="/">Mới nhất</Link></li>
                        <li><a href="#">Đọc nhiều</a></li>
                        <li><a href="#">Video</a></li>
                        <li><a href="#">Liên hệ</a></li>
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

            {/* Thanh chuyên mục + mega menu */}
            <div className="header__navwrap">
                <nav className="header__nav" aria-label="Chuyên mục">
                    <ul className="header__container">
                        <li>
                            <NavLink to="/" end className={({ isActive }) => `header__home ${isActive ? 'is-active' : ''}`} aria-label="Trang chủ" onClick={closeMenu}>
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                    <path d="M12 3l9 8h-2.5v9h-5v-6h-3v6h-5v-9H3z" />
                                </svg>
                            </NavLink>
                        </li>
                        {categories.slice(0, NAV_VISIBLE).map((c) => (
                            <li key={c.slug}>
                                <NavLink to={`/chuyen-muc/${c.slug}`} className={activeClass} onClick={closeMenu}>
                                    {c.name}
                                </NavLink>
                            </li>
                        ))}
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
                    </ul>
                </nav>

                {menuOpen && (
                    <div className="header__mega" id="mega-menu">
                        <div className="header__container header__mega-inner">
                            {categories.map((c) => (
                                <Link key={c.slug} to={`/chuyen-muc/${c.slug}`} onClick={closeMenu}>
                                    {c.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Dòng tin nóng */}
            <div className="header__ticker">
                <div className="header__container header__ticker-inner">
                    <span className="header__ticker-label">Tin nóng</span>
                    <div className="header__ticker-list">
                        {trending.map((t) => (
                            <a href="#" key={t}>{t}</a>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    )
}