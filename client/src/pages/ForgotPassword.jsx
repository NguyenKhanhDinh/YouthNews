import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShieldHalved } from '@fortawesome/free-solid-svg-icons'
import { Field } from './authShared'
import { EMAIL_RE } from './authUtils'
import './Auth.css'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
function FakeCaptcha({ verified, onVerified, error }) {
    const [checking, setChecking] = useState(false)

    const handleChange = async (e) => {
        if (!e.target.checked) return
        setChecking(true)
        await wait(700)
        setChecking(false)
        onVerified()
    }

    return (
        <div className="captcha-wrap">
            <div className="captcha">
                <span className="captcha__box">
                    <input
                        id="captcha"
                        type="checkbox"
                        checked={verified}
                        disabled={checking || verified}
                        onChange={handleChange}
                        aria-describedby={error ? 'captcha-error' : undefined}
                    />
                    {checking && <span className="auth__spinner captcha__spinner" aria-hidden="true" />}
                </span>
                <label htmlFor="captcha">Tôi không phải người máy</label>
                <span className="captcha__brand" aria-hidden="true">
                    <FontAwesomeIcon icon={faShieldHalved} />
                    <small>Bảo vệ</small>
                </span>
            </div>
            <p id="captcha-error" className="field__error" aria-live="polite">{error || ''}</p>
        </div>
    )
}

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [touched, setTouched] = useState(false)
    const [captchaOk, setCaptchaOk] = useState(false)
    const [captchaTouched, setCaptchaTouched] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [sentTo, setSentTo] = useState('')

    const emailError = !email.trim()
        ? 'Vui lòng nhập email'
        : !EMAIL_RE.test(email.trim())
            ? 'Email không đúng định dạng'
            : ''
    const captchaError = captchaOk ? '' : 'Vui lòng xác nhận bạn không phải người máy'

    const handleSubmit = async (e) => {
        e.preventDefault()
        setTouched(true)
        setCaptchaTouched(true)
        if (emailError) {
            document.getElementById('email')?.focus()
            return
        }
        if (captchaError) {
            document.getElementById('captcha')?.focus()
            return
        }

        setSubmitting(true)
        try {
            // TODO: thay bằng lệnh gọi fake API "quên mật khẩu".
            await wait(800)
            console.log('Yêu cầu lấy lại mật khẩu:', email.trim())
            setSentTo(email.trim())
        } finally {
            setSubmitting(false)
        }
    }

    const reset = () => {
        setSentTo('')
        setCaptchaOk(false)
        setCaptchaTouched(false)
        setTouched(false)
    }

    return (
        <div className="auth">
            <div className="auth__inner auth__inner--forgot">
                <h1 className="sr-only">Quên mật khẩu</h1>

                {sentTo ? (
                    <div className="auth__notice" role="status">
                        <p className="auth__notice-title">Đã gửi hướng dẫn lấy lại mật khẩu</p>
                        <p>
                            Chúng tôi vừa gửi email tới <strong>{sentTo}</strong>. Vui lòng kiểm tra hộp thư
                            (kể cả mục thư rác) và làm theo hướng dẫn.
                        </p>
                        <div className="auth__notice-actions">
                            <Link to="/dang-nhap" className="auth__submit auth__submit--link">Quay lại đăng nhập</Link>
                            <button type="button" className="auth__textbtn" onClick={reset}>Dùng email khác</button>
                        </div>
                    </div>
                ) : (
                    <form className="auth__form" onSubmit={handleSubmit} noValidate>
                        <Field id="email" label="Nhập email của bạn để lấy lại mật khẩu" error={touched ? emailError : ''}>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder="Nhập email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={() => setTouched(true)}
                                aria-invalid={Boolean(touched && emailError)}
                                aria-describedby={touched && emailError ? 'email-error' : undefined}
                            />
                        </Field>

                        <FakeCaptcha
                            verified={captchaOk}
                            onVerified={() => setCaptchaOk(true)}
                            error={captchaTouched ? captchaError : ''}
                        />

                        <button type="submit" className="auth__submit" disabled={submitting}>
                            {submitting && <span className="auth__spinner" aria-hidden="true" />}
                            {submitting ? 'Đang gửi...' : 'Lấy lại mật khẩu'}
                        </button>

                    </form>
                )}
            </div>
        </div>
    )
}
