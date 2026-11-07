import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFacebookF,
    faYoutube,
    faTiktok,
    faInstagram,
} from '@fortawesome/free-brands-svg-icons'
import {
    faEnvelope,
    faPhone,
    faLocationDot,
    faArrowUp,
} from '@fortawesome/free-solid-svg-icons'
import { categories } from '../data/categories'
import Logo from './Logo'
import './Footer.css'

const socials = [
    { name: 'Facebook', icon: faFacebookF, href: 'https://facebook.com' },
    { name: 'YouTube', icon: faYoutube, href: 'https://youtube.com' },
    { name: 'TikTok', icon: faTiktok, href: 'https://tiktok.com' },
    { name: 'Instagram', icon: faInstagram, href: 'https://instagram.com' },
]

const aboutLinks = [
    { to: '/gioi-thieu', label: 'Giới thiệu' },
    { to: '/lien-he', label: 'Liên hệ' },
    { to: '/quang-cao', label: 'Quảng cáo' },
    { to: '/tuyen-dung', label: 'Tuyển dụng' },
    { to: '/dieu-khoan', label: 'Điều khoản sử dụng' },
    { to: '/bao-mat', label: 'Chính sách bảo mật' },
]

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="footer">
            <div className="footer__container footer__top">
                {/* Cột 1: giới thiệu */}
                <div className="footer__about">
                    <Link to="/" className="footer__logo" aria-label="YouthNews - Trang chủ">
                        <Logo />
                    </Link>
                    <p>
                        Trang tin điện tử dành cho giới trẻ: cập nhật nhanh, thông tin chính xác về
                        giáo dục, công nghệ, đời sống và nhiều lĩnh vực khác.
                    </p>
                    <ul className="footer__social">
                        {socials.map((s) => (
                            <li key={s.name}>
                                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name}>
                                    <FontAwesomeIcon icon={s.icon} />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Cột 2: chuyên mục */}
                <nav aria-label="Chuyên mục">
                    <h3 className="footer__title">Chuyên mục</h3>
                    <ul className="footer__links footer__links--two-col">
                        {categories.map((c) => (
                            <li key={c.slug}>
                                <Link to={`/chuyen-muc/${c.slug}`}>{c.name}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Cột 3: về chúng tôi */}
                <nav aria-label="Về YouthNews">
                    <h3 className="footer__title">Về YouthNews</h3>
                    <ul className="footer__links">
                        {aboutLinks.map((l) => (
                            <li key={l.to}>
                                <Link to={l.to}>{l.label}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Cột 4: liên hệ */}
                <div>
                    <h3 className="footer__title">Liên hệ</h3>
                    <ul className="footer__contact">
                        <li>
                            <FontAwesomeIcon icon={faLocationDot} />
                            <span>123 Đường Mẫu, Quận 1, TP. Hồ Chí Minh</span>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faPhone} />
                            <a href="tel:0900000000">0900 000 000</a>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <a href="mailto:contact@youthnews.vn">contact@youthnews.vn</a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Thanh bản quyền */}
            <div className="footer__bottom">
                <div className="footer__container footer__bottom-inner">
                    <p>© {year} YouthNews. Dự án học tập, thông tin chỉ mang tính minh họa.</p>
                    <button
                        type="button"
                        className="footer__totop"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        Lên đầu trang <FontAwesomeIcon icon={faArrowUp} />
                    </button>
                </div>
            </div>
        </footer>
    )
}