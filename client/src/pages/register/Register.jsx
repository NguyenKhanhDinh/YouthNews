import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { Field, SocialLogin } from '../authShared'
import { EMAIL_RE, focusFirstError } from '../authUtils'
import './Register.css'

const STRENGTH_LABELS = ['', 'Yếu', 'Trung bình', 'Khá', 'Mạnh']
const CHAR_CLASSES = [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/]

function getStrength(password) {
    if (!password) return 0
    if (password.length < 8) return 1
    const classes = CHAR_CLASSES.filter((re) => re.test(password)).length
    return Math.max(classes, 1)
}

function validate({ name, email, password, confirm, agree }) {
    const errors = {}
    if (name.trim().length < 2) errors.name = 'Vui lòng nhập họ và tên'
    if (!email.trim()) errors.email = 'Vui lòng nhập email'
    else if (!EMAIL_RE.test(email.trim())) errors.email = 'Email không đúng định dạng'
    if (!password.trim()) errors.password = 'Vui lòng nhập mật khẩu'
    else if (password.length < 8) errors.password = 'Mật khẩu tối thiểu 8 ký tự'
    if (!confirm) errors.confirm = 'Vui lòng nhập lại mật khẩu'
    else if (confirm !== password) errors.confirm = 'Mật khẩu nhập lại không khớp'
    if (!agree) errors.agree = 'Bạn cần đồng ý với điều khoản để tiếp tục'
    return errors
}

function PasswordInput({ show, onToggle, ...props }) {
    return (
        <div className="field__password">
            <input type={show ? 'text' : 'password'} {...props} />
            <button
                type="button"
                className="field__toggle"
                onClick={onToggle}
                aria-label={show ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                aria-pressed={show}
            >
                <FontAwesomeIcon icon={show ? faEyeSlash : faEye} />
            </button>
        </div>
    )
}

export default function Register() {
    const [values, setValues] = useState({ name: '', email: '', password: '', confirm: '', agree: false })
    const [touched, setTouched] = useState({})
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [formError, setFormError] = useState('')

    const errors = validate(values)
    const showError = (name) => (touched[name] ? errors[name] : '')
    const strength = getStrength(values.password)

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target
        setValues((v) => ({ ...v, [name]: type === 'checkbox' ? checked : value }))
        setFormError('')
    }

    const handleBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        setTouched({ name: true, email: true, password: true, confirm: true, agree: true })
        if (Object.keys(errors).length > 0) {
            focusFirstError(errors)
            return
        }

        setSubmitting(true)
        setFormError('')
        try {
            // TODO: thay bằng lệnh gọi fake API đăng ký.
            console.log('Đăng ký:', { name: values.name.trim(), email: values.email.trim() })
        } catch (err) {
            setFormError(err.message || 'Không thể hoàn tất, vui lòng thử lại')
        } finally {
            setSubmitting(false)
        }
    }

    const handleGoogle = () => {
        // TODO: nối với fake API / luồng OAuth Google.
        console.log('Đăng ký bằng Google')
    }

    const inputProps = (name, extraDescribedBy) => ({
        id: name,
        name,
        value: values[name],
        onChange: handleChange,
        onBlur: handleBlur,
        'aria-invalid': Boolean(showError(name)),
        'aria-describedby': [showError(name) && `${name}-error`, extraDescribedBy].filter(Boolean).join(' ') || undefined,
    })

    return (
        <>
            <h1 className="sr-only">Đăng ký tài khoản</h1>

            <SocialLogin onGoogle={handleGoogle} />

            {formError && <div className="auth__alert" role="alert">{formError}</div>}

            <form className="auth__form" onSubmit={handleSubmit} noValidate>
                <Field id="name" label="Họ và tên" error={showError('name')}>
                    <input type="text" autoComplete="name" placeholder="Nhập họ và tên" {...inputProps('name')} />
                </Field>

                <Field id="email" label="Email" error={showError('email')}>
                    <input type="email" autoComplete="email" placeholder="Nhập email" {...inputProps('email')} />
                </Field>

                <Field id="password" label="Mật khẩu" error={showError('password')}>
                    <PasswordInput
                        show={showPassword}
                        onToggle={() => setShowPassword((s) => !s)}
                        autoComplete="new-password"
                        placeholder="Tối thiểu 8 ký tự"
                        {...inputProps('password', 'password-strength')}
                    />
                    <div id="password-strength" className="strength" data-level={strength} aria-live="polite">
                        <div className="strength__bars" aria-hidden="true">
                            <i /><i /><i /><i />
                        </div>
                        <span className="strength__label">
                            {strength ? `Độ mạnh: ${STRENGTH_LABELS[strength]}` : 'Dùng chữ hoa, số và ký tự đặc biệt để mạnh hơn'}
                        </span>
                    </div>
                </Field>

                <Field id="confirm" label="Nhập lại mật khẩu" error={showError('confirm')}>
                    <PasswordInput
                        show={showConfirm}
                        onToggle={() => setShowConfirm((s) => !s)}
                        autoComplete="new-password"
                        placeholder="Nhập lại mật khẩu"
                        {...inputProps('confirm')}
                    />
                </Field>

                <div className="register__agree">
                    <label className="auth__check">
                        <input
                            id="agree"
                            type="checkbox"
                            name="agree"
                            checked={values.agree}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-invalid={Boolean(showError('agree'))}
                            aria-describedby={showError('agree') ? 'agree-error' : undefined}
                        />
                        <span>
                            Tôi đồng ý với <Link to="/dieu-khoan" className="auth__link">Điều khoản sử dụng</Link> và{' '}
                            <Link to="/chinh-sach-bao-mat" className="auth__link">Chính sách bảo mật</Link>
                        </span>
                    </label>
                    <p id="agree-error" className="field__error" aria-live="polite">{showError('agree')}</p>
                </div>

                <button type="submit" className="auth__submit" disabled={submitting}>
                    {submitting && <span className="auth__spinner" aria-hidden="true" />}
                    {submitting ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
                </button>
            </form>
        </>
    )
}
