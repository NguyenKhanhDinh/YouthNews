import { Link } from 'react-router-dom'
import '../educationPage/EducationPage.css'

export default function NotFoundPage() {
    return (
        <div className="education-page">
            <div className="education-page__container">
                <div className="education-page__breadcrumb">
                    <Link to="/">Trang chủ</Link>
                    <span>/</span>
                    <span>Không tìm thấy trang</span>
                </div>

                <section className="education-page__heading" aria-labelledby="not-found-title">
                    <div>
                        <p className="education-page__eyebrow">Lỗi 404</p>
                        <h1 id="not-found-title">Không tìm thấy trang</h1>
                    </div>
                </section>

                <div className="search-page__empty" role="status">
                    <p>Trang bạn truy cập không tồn tại hoặc đã được di chuyển.</p>
                    <p className="search-page__hint">
                        <Link to="/">Quay về trang chủ</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}