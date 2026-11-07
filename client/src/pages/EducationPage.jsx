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

const featuredStory = {
    category: 'Tuyển sinh',
    title: 'Nhiều trường đại học công bố phương án tuyển sinh, thí sinh cần lưu ý gì?',
    summary: 'Cập nhật những thông tin đáng chú ý dành cho học sinh và phụ huynh trong mùa tuyển sinh.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Sinh viên trong lễ tốt nghiệp',
}

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

                <article className="education-featured">
                    <Link className="education-featured__image" to="/chuyen-muc/giao-duc">
                        <img src={featuredStory.image} alt={featuredStory.imageAlt} />
                    </Link>
                    <div className="education-featured__content">
                        <span className="education-label">{featuredStory.category}</span>
                        <h2>
                            <Link to="/chuyen-muc/giao-duc">{featuredStory.title}</Link>
                        </h2>
                        <p>{featuredStory.summary}</p>
                        <span className="education-meta">Tin mới · 5 phút đọc</span>
                    </div>
                </article>
            </div>
        </div>
    )
}
