import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { Field, SocialLogin } from '../authShared'
import { EMAIL_RE, focusFirstError } from '../authUtils'

function validate({ email, password }) {
    const errors = {}
    if (!email.trim()) errors.email = 'Vui lòng nhập email'
    else if (!EMAIL_RE.test(email.trim())) errors.email = 'Email không đúng định dạng'
    if (!password) errors.password = 'Vui lòng nhập mật khẩu'
    else if (password.length < 6) errors.password = 'Mật khẩu tối thiểu 6 ký tự'
    return errors
}

export default function Login() {
    const [values, setValues] = useState({ email: '', password: '' })
    const [touched, setTouched] = useState({})
    const [showPassword, setShowPassword] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [formError, setFormError] = useState('')

    const errors = validate(values)
    const showError = (name) => (touched[name] ? errors[name] : '')

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target
        setValues((v) => ({ ...v, [name]: type === 'checkbox' ? checked : value }))
        setFormError('')
    }

    const handleBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        setTouched({ email: true, password: true })
        if (Object.keys(errors).length > 0) {
            focusFirstError(errors)
            return
        }

        setSubmitting(true)
        setFormError('')
        try {
            // TODO: thay bằng lệnh gọi fake API đăng nhập.
            console.log('Đăng nhập:', { email: values.email.trim() })
        } catch (err) {
            setFormError(err.message || 'Không thể đăng nhập, vui lòng thử lại')
        } finally {
            setSubmitting(false)
        }
    }

    const handleGoogle = () => {
        // TODO: nối với fake API / luồng OAuth Google.
        console.log('Đăng nhập bằng Google')
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
            <h1 className="sr-only">Đăng nhập</h1>

            <SocialLogin onGoogle={handleGoogle} />

            {formError && <div className="auth__alert" role="alert">{formError}</div>}

            <form className="auth__form" onSubmit={handleSubmit} noValidate>
                <Field id="email" label="Email" error={showError('email')}>
                    <input type="email" autoComplete="email" placeholder="Nhập email" {...inputProps('email')} />
                </Field>

                <Field id="password" label="Mật khẩu" error={showError('password')}>
                    <div className="field__password">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            placeholder="Nhập mật khẩu"
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

                <div className="auth__forgot">
                    <Link to="/quen-mat-khau">Quên mật khẩu?</Link>
                </div>

                <button type="submit" className="auth__submit" disabled={submitting}>
                    {submitting && <span className="auth__spinner" aria-hidden="true" />}
                    {submitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </button>
            </form>
        </>
    )
}
