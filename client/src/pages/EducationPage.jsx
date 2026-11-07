import { Link } from 'react-router-dom'
import './EducationPage.css'

const topics = [
    'Tuyển sinh',
    'Chọn nghề - Chọn trường',
    'Du học',
    'Nhà trường',
    'Phụ huynh',
    'Tư vấn điểm thi',
    'Cẩm nang tuyển sinh 2026',
]

export default function EducationPage() {
    return (
        <div className="education-page">
            <div className="education-page__container">
                <div className="education-page__breadcrumb">
                    <Link to="/">Trang chủ</Link>
                    <span>/</span>
                    <span>Giáo dục</span>
                </div>

                <section className="education-page__heading" aria-labelledby="education-title">
                    <div>
                        <p className="education-page__eyebrow">Tri thức · Học đường · Tương lai</p>
                        <h1 id="education-title">Giáo dục</h1>
                    </div>
                    <p className="education-page__intro">
                        Tin tức giáo dục, tuyển sinh và những câu chuyện truyền cảm hứng học tập.
                    </p>
                </section>

                <nav className="education-topics" aria-label="Chủ đề giáo dục">
                    {topics.map((topic, index) => (
                        <a className={index === 0 ? 'is-selected' : ''} href="#tin-moi" key={topic}>
                            {topic}
                        </a>
                    ))}
                </nav>
            </div>
        </div>
    )
}
