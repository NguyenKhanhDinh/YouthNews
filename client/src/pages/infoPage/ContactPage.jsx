import { useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../api'
import '../educationPage/EducationPage.css'
import './InfoPage.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate({ name, email, message }) {
    const errors = {}
    if (!name.trim()) errors.name = 'Vui lòng nhập họ tên.'
    if (!email.trim()) errors.email = 'Vui lòng nhập email.'
    else if (!EMAIL_RE.test(email.trim())) errors.email = 'Email chưa đúng định dạng.'
    if (message.trim().length < 10) errors.message = 'Nội dung cần ít nhất 10 ký tự.'
    return errors
}

export default function ContactPage() {
    const [values, setValues] = useState({ name: '', email: '', message: '' })
    const [errors, setErrors] = useState({})
    const [status, setStatus] = useState('idle') // idle | sending | sent | failed

    const onChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }))

    const onSubmit = async (e) => {
        e.preventDefault()
        const found = validate(values)
        setErrors(found)
        if (Object.keys(found).length > 0) return
        setStatus('sending')
        try {
            await api.sendContact(values)
            setStatus('sent')
            setValues({ name: '', email: '', message: '' })
        } catch {
            setStatus('failed')
        }
    }

    const field = (name, label, props = {}) => (
        <div className="info-form__field">
            <label htmlFor={`contact-${name}`}>{label}</label>
            {name === 'message' ? (
                <textarea id="contact-message" name={name} rows={6} value={values[name]} onChange={onChange}
                          aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `err-${name}` : undefined} />
            ) : (
                <input id={`contact-${name}`} name={name} value={values[name]} onChange={onChange}
                       aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `err-${name}` : undefined} {...props} />
            )}
            {errors[name] && <p className="info-form__error" id={`err-${name}`}>{errors[name]}</p>}
        </div>
    )

    return (
        <div className="education-page">
            <div className="education-page__container">
                <div className="education-page__breadcrumb">
                    <Link to="/">Trang chủ</Link>
                    <span>/</span>
                    <span>Liên hệ</span>
                </div>

                <article className="info-page">
                    <p className="education-page__eyebrow">Kết nối với chúng tôi</p>
                    <h1>Liên hệ</h1>
                    <p className="info-page__intro">Gửi góp ý, thắc mắc hoặc đề nghị hợp tác. Thông tin dưới đây là minh họa.</p>

                    <div className="info-contact">
                        <form className="info-form" onSubmit={onSubmit} noValidate>
                            {field('name', 'Họ và tên', { autoComplete: 'name' })}
                            {field('email', 'Email', { type: 'email', autoComplete: 'email' })}
                            {field('message', 'Nội dung')}
                            <button type="submit" disabled={status === 'sending'}>
                                {status === 'sending' ? 'Đang gửi…' : 'Gửi liên hệ'}
                            </button>
                            {status === 'sent' && (
                                <p className="info-form__ok" role="status">Cảm ơn bạn! Chúng tôi đã nhận được tin nhắn (giả lập, chưa gửi đi đâu).</p>
                            )}
                            {status === 'failed' && (
                                <p className="info-form__error" role="alert">Chưa gửi được, vui lòng thử lại.</p>
                            )}
                        </form>

                        <aside className="info-contact__side" aria-label="Thông tin liên hệ">
                            <h2>Thông tin</h2>
                            <p>123 Đường Mẫu, Quận 1, TP. Hồ Chí Minh</p>
                            <p><a href="tel:0900000000">0900 000 000</a></p>
                            <p><a href="mailto:contact@youthnews.vn">contact@youthnews.vn</a></p>
                        </aside>
                    </div>
                </article>
            </div>
        </div>
    )
}
