import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import './Login.css'

const benefits = [
    'Lưu bài viết để đọc sau',
    'Bình luận và trao đổi cùng bạn đọc',
    'Nhận tin theo chuyên mục bạn quan tâm',
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate({ email, password }) {
    const errors = {}
    if (!email.trim()) errors.email = 'Vui lòng nhập email'
    else if (!EMAIL_RE.test(email.trim())) errors.email = 'Email không đúng định dạng'
    if (!password) errors.password = 'Vui lòng nhập mật khẩu'
    else if (password.length < 6) errors.password = 'Mật khẩu tối thiểu 6 ký tự'
    return errors
}

export default function Login() {
    const [values, setValues] = useState({ email: '', password: '', remember: true })
    const [touched, setTouched] = useState({})
    const [showPassword, setShowPassword] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [formError, setFormError] = useState('')

    const errors = validate(values)

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target
        setValues((v) => ({ ...v, [name]: type === 'checkbox' ? checked : value }))
        setFormError('')
    }

    const handleBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        setTouched({ email: true, password: true })
        if (Object.keys(errors).length > 0) return

        setSubmitting(true)
        setFormError('')
        try {
            console.log('Dữ liệu đăng nhập:', { email: values.email.trim(), remember: values.remember })
        } catch (err) {
            setFormError(err.message || 'Không thể đăng nhập, vui lòng thử lại')
        } finally {
            setSubmitting(false)
        }
    }

    const showError = (name) => touched[name] && errors[name]

    return (
        <div className="container page">
            <div className="login">
                <aside className="login__aside">
                    <h2 className="login__aside-title">Chào mừng bạn đến với YouthNews</h2>
                    <p className="login__aside-text">Đăng nhập để có trải nghiệm đọc tin trọn vẹn hơn.</p>
                    <ul className="login__benefits">
                        {benefits.map((b) => (
                            <li key={b}>
                                <FontAwesomeIcon icon={faCircleCheck} />
                                <span>{b}</span>
                            </li>
                        ))}
                    </ul>
                </aside>

                <section className="login__panel">
                    <h1 className="login__title">Đăng nhập</h1>
                    <p className="login__sub">Nhập thông tin tài khoản của bạn để tiếp tục.</p>

                    {formError && <div className="login__alert" role="alert">{formError}</div>}

                    <form className="login__form" onSubmit={handleSubmit} noValidate>
                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder="ban@example.com"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                aria-invalid={Boolean(showError('email'))}
                                aria-describedby={showError('email') ? 'email-error' : undefined}
                            />
                            <p id="email-error" className="field__error">{showError('email') || ''}</p>
                        </div>

                        <div className="field">
                            <label htmlFor="password">Mật khẩu</label>
                            <div className="field__password">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    placeholder="Nhập mật khẩu"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    aria-invalid={Boolean(showError('password'))}
                                    aria-describedby={showError('password') ? 'password-error' : undefined}
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
                            <p id="password-error" className="field__error">{showError('password') || ''}</p>
                        </div>

                        <div className="login__row">
                            <label className="login__check">
                                <input type="checkbox" name="remember" checked={values.remember} onChange={handleChange} />
                                <span>Ghi nhớ đăng nhập</span>
                            </label>
                            <Link to="/quen-mat-khau" className="login__link">Quên mật khẩu?</Link>
                        </div>

                        <button type="submit" className="login__submit" disabled={submitting}>
                            {submitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
                        </button>
                    </form>

                    <p className="login__switch">
                        Chưa có tài khoản? <Link to="/dang-ky" className="login__link">Đăng ký ngay</Link>
                    </p>
                </section>
            </div>
        </div>
    )
}