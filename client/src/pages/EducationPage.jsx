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

const secondaryStories = [
    {
        category: 'Nhà trường',
        title: 'Đổi mới cách dạy học để học sinh chủ động khám phá kiến thức',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=720&q=85',
        imageAlt: 'Giáo viên hướng dẫn học sinh trong lớp',
        time: '3 giờ trước',
    },
    {
        category: 'Chọn nghề - Chọn trường',
        title: 'Học sinh cuối cấp cần chuẩn bị gì trước mùa chọn ngành?',
        image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=720&q=85',
        imageAlt: 'Học sinh học tập cùng nhau',
        time: '4 giờ trước',
    },
]

const latestStories = [
    {
        category: 'Tuyển sinh',
        title: 'Thí sinh nên tìm hiểu kỹ đề án tuyển sinh trước khi đăng ký nguyện vọng',
        time: '10 phút trước',
    },
    {
        category: 'Giáo dục',
        title: 'Tăng hoạt động trải nghiệm, giúp học sinh phát triển kỹ năng thực tế',
        time: '35 phút trước',
    },
    {
        category: 'Du học',
        title: 'Ngày hội tư vấn du học mang cơ hội học bổng đến gần hơn với học sinh',
        time: '1 giờ trước',
    },
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

                <section className="education-secondary" aria-label="Tin giáo dục đáng chú ý">
                    {secondaryStories.map((story) => (
                        <article className="education-card" key={story.title}>
                            <Link className="education-card__image" to="/chuyen-muc/giao-duc">
                                <img src={story.image} alt={story.imageAlt} loading="lazy" />
                            </Link>
                            <div className="education-card__content">
                                <span className="education-label">{story.category}</span>
                                <h2>
                                    <Link to="/chuyen-muc/giao-duc">{story.title}</Link>
                                </h2>
                                <span className="education-meta">{story.time}</span>
                            </div>
                        </article>
                    ))}
                </section>

                <section className="education-latest" id="tin-moi" aria-labelledby="latest-title">
                    <div className="education-section-heading">
                        <h2 id="latest-title">Tin mới</h2>
                        <a href="#tin-moi">Xem tất cả</a>
                    </div>
                    {latestStories.map((story) => (
                        <article className="education-latest__item" key={story.title}>
                            <div>
                                <span className="education-label">{story.category}</span>
                                <h3>
                                    <Link to="/chuyen-muc/giao-duc">{story.title}</Link>
                                </h3>
                                <span className="education-meta">{story.time}</span>
                            </div>
                            <Link
                                className="education-latest__arrow"
                                to="/chuyen-muc/giao-duc"
                                aria-label={`Đọc tin: ${story.title}`}
                            >
                                →
                            </Link>
                        </article>
                    ))}
                </section>
            </div>
        </div>
    )
}
