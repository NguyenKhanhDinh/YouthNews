import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import './Login.css'

const benefits = [
    'Lưu bài viết để đọc lại khi cần',
    'Bình luận và trao đổi cùng bạn đọc',
    'Nhận tin theo chuyên mục bạn quan tâm',
]

const COPY = {
    login: {
        title: 'Chào mừng bạn quay lại',
        sub: 'Đăng nhập để tiếp tục đọc, lưu bài và bình luận.',
        submit: 'Đăng nhập',
        busy: 'Đang đăng nhập...',
    },
    register: {
        title: 'Tạo tài khoản YouthNews',
        sub: 'Chỉ mất chưa đến một phút.',
        submit: 'Tạo tài khoản',
        busy: 'Đang tạo tài khoản...',
    },
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate({ name, email, password }, mode) {
    const errors = {}
    if (mode === 'register' && name.trim().length < 2) errors.name = 'Vui lòng nhập họ và tên'
    if (!email.trim()) errors.email = 'Vui lòng nhập email'
    else if (!EMAIL_RE.test(email.trim())) errors.email = 'Email không đúng định dạng'
    const min = mode === 'register' ? 8 : 6
    if (!password) errors.password = 'Vui lòng nhập mật khẩu'
    else if (password.length < min) errors.password = `Mật khẩu tối thiểu ${min} ký tự`
    return errors
}

function GoogleIcon() {
    return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.5 17.7 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z" />
            <path fill="#FBBC05" d="M10.5 28.7c-.5-1.5-.8-3.1-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C.9 16.5 0 20.1 0 24s.9 7.5 2.6 10.8l7.9-6.1z" />
            <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.9 2.3-8.4 2.3-6.3 0-11.6-4-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
        </svg>
    )
}

function ZaloIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect width="24" height="24" rx="6" fill="#0068FF" />
            <text x="12" y="15.5" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="8.5" fill="#fff">Zalo</text>
        </svg>
    )
}

function BrandWatermark() {
    return (
        <svg className="login__watermark" viewBox="5 8 48 50" aria-hidden="true">
            <polygon points="7,10 18,10 27,27 21,35" />
            <rect x="21" y="10" width="10" height="46" />
            <polygon points="21,10 31,10 51,56 41,56" />
            <rect x="41" y="10" width="10" height="46" />
        </svg>
    )
}

function Field({ id, label, error, children }) {
    return (
        <div className="field">
            <label htmlFor={id}>{label}</label>
            {children}
            <p id={`${id}-error`} className="field__error">{error || ''}</p>
        </div>
    )
}

function AuthForm({ mode }) {
    const isLogin = mode === 'login'
    const copy = COPY[mode]
    const [values, setValues] = useState({ name: '', email: '', password: '', remember: true })
    const [touched, setTouched] = useState({})
    const [showPassword, setShowPassword] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [formError, setFormError] = useState('')

    const errors = validate(values, mode)
    const showError = (name) => (touched[name] ? errors[name] : '')

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target
        setValues((v) => ({ ...v, [name]: type === 'checkbox' ? checked : value }))
        setFormError('')
    }

    const handleBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        setTouched({ name: true, email: true, password: true })
        if (Object.keys(errors).length > 0) return

        setSubmitting(true)
        setFormError('')
        try {
            // TODO: thay bằng lệnh gọi API đăng nhập / đăng ký của hệ thống.
            console.log(isLogin ? 'Đăng nhập:' : 'Đăng ký:', { email: values.email.trim() })
        } catch (err) {
            setFormError(err.message || 'Không thể hoàn tất, vui lòng thử lại')
        } finally {
            setSubmitting(false)
        }
    }

    const handleSocial = (provider) => {
        // TODO: nối với luồng OAuth (Google / Facebook / Zalo).
        console.log('Đăng nhập bằng', provider)
    }

    const inputProps = (name) => ({
        id: name,
        name,
        value: values[name],
        onChange: handleChange,
        onBlur: handleBlur,
        'aria-invalid': Boolean(showError(name)),
        'aria-describedby': showError(name) ? `${name}-error` : undefined,
    })

    return (
        <>
            <div className="login__social">
                <button type="button" onClick={() => handleSocial('google')}>
                    <GoogleIcon /><span>Google</span>
                </button>
                <button type="button" onClick={() => handleSocial('facebook')}>
                    <FontAwesomeIcon icon={faFacebook} className="login__fb" /><span>Facebook</span>
                </button>
                <button type="button" onClick={() => handleSocial('zalo')}>
                    <ZaloIcon /><span>Zalo</span>
                </button>
            </div>

            <div className="login__or"><span>hoặc dùng email</span></div>

            {formError && <div className="login__alert" role="alert">{formError}</div>}

            <form className="login__form" onSubmit={handleSubmit} noValidate>
                {!isLogin && (
                    <Field id="name" label="Họ và tên" error={showError('name')}>
                        <input type="text" autoComplete="name" placeholder="Nguyễn Minh Anh" {...inputProps('name')} />
                    </Field>
                )}

                <Field id="email" label="Email" error={showError('email')}>
                    <input type="email" autoComplete="email" placeholder="ban@example.com" {...inputProps('email')} />
                </Field>

                <Field id="password" label="Mật khẩu" error={showError('password')}>
                    <div className="field__password">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            autoComplete={isLogin ? 'current-password' : 'new-password'}
                            placeholder={isLogin ? 'Nhập mật khẩu' : 'Tối thiểu 8 ký tự'}
                            {...inputProps('password')}
                        />
                        <button
                            type="button"
                            className="field__toggle"
                            onClick={() => setShowPassword((s) => !s)}
                            aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                            aria-pressed={showPassword}
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                </Field>

                {isLogin && (
                    <div className="login__row">
                        <label className="login__check">
                            <input type="checkbox" name="remember" checked={values.remember} onChange={handleChange} />
                            <span>Ghi nhớ đăng nhập</span>
                        </label>
                        <Link to="/quen-mat-khau" className="login__link">Quên mật khẩu?</Link>
                    </div>
                )}

                <button type="submit" className="login__submit" disabled={submitting}>
                    {submitting && <span className="login__spinner" aria-hidden="true" />}
                    {submitting ? copy.busy : copy.submit}
                </button>
            </form>
        </>
    )
}

export default function Login() {
    const { pathname } = useLocation()
    const mode = pathname === '/dang-ky' ? 'register' : 'login'
    const copy = COPY[mode]

    return (
        <div className="login-page">
            <div className="login" data-mode={mode}>
                <aside className="login__aside">
                    <BrandWatermark />
                    <h2 className="login__aside-title">Một tài khoản để đọc, lưu và bình luận.</h2>
                    <p className="login__aside-text">Đăng nhập để có trải nghiệm đọc tin trọn vẹn hơn trên YouthNews.</p>
                    <ul className="login__benefits">
                        {benefits.map((b, i) => (
                            <li key={b}>
                                <b>{String(i + 1).padStart(2, '0')}</b>
                                <span>{b}</span>
                            </li>
                        ))}
                    </ul>
                </aside>

                <section className="login__panel">
                    <nav className="login__tabs" aria-label="Đăng nhập hoặc đăng ký" data-mode={mode}>
                        <Link to="/dang-nhap" aria-current={mode === 'login' ? 'page' : undefined}>Đăng nhập</Link>
                        <Link to="/dang-ky" aria-current={mode === 'register' ? 'page' : undefined}>Đăng ký</Link>
                    </nav>

                    <h1 className="login__title">{copy.title}</h1>
                    <p className="login__sub">{copy.sub}</p>

                    {/* key: đổi tab thì form được tạo mới, không giữ lại lỗi/dữ liệu cũ */}
                    <AuthForm key={mode} mode={mode} />

                    <p className="login__legal">
                        Khi tiếp tục, bạn đồng ý với <Link to="/dieu-khoan">Điều khoản sử dụng</Link> và{' '}
                        <Link to="/chinh-sach-bao-mat">Chính sách bảo mật</Link> của YouthNews.
                    </p>
                </section>
            </div>
        </div>
    )
}