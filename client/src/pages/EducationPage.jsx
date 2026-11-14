import { Link } from 'react-router-dom'
import ArticleCard from '../components/article/ArticleCard'
import { articles } from '../data/articles'
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

const featuredStory = articles[0]
const secondaryStories = articles.slice(1, 3)
const popularStories = articles.slice(5, 8)

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
                    <Link className="education-featured__image" to={`/bai-viet/${featuredStory.slug}`}>
                        <img src={featuredStory.image} alt={featuredStory.imageAlt} />
                    </Link>
                    <div className="education-featured__content">
                        <span className="education-label">{featuredStory.category}</span>
                        <h2>
                            <Link to={`/bai-viet/${featuredStory.slug}`}>{featuredStory.title}</Link>
                        </h2>
                        <p>{featuredStory.summary}</p>
                        <span className="education-meta">{featuredStory.date} · {featuredStory.readTime}</span>
                    </div>
                </article>

                <section className="education-secondary" aria-label="Tin giáo dục đáng chú ý">
                    {secondaryStories.map((story) => (
                        <article className="education-card" key={story.title}>
                            <Link className="education-card__image" to={`/bai-viet/${story.slug}`}>
                                <img src={story.image} alt={story.imageAlt} loading="lazy" />
                            </Link>
                            <div className="education-card__content">
                                <span className="education-label">{story.category}</span>
                                <h2>
                                    <Link to={`/bai-viet/${story.slug}`}>{story.title}</Link>
                                </h2>
                                <span className="education-meta">{story.date} · {story.readTime}</span>
                            </div>
                        </article>
                    ))}
                </section>

                <div className="education-content-grid">
                    <section className="education-latest" id="tin-moi" aria-labelledby="latest-title">
                        <div className="education-section-heading">
                            <h2 id="latest-title">Tin mới</h2>
                            <a href="#tin-moi">Xem tất cả</a>
                        </div>
                        <div className="article-list">
                            {articles.slice(3).map((article) => (
                                <ArticleCard article={article} key={article.slug} />
                            ))}
                        </div>
                    </section>

                    <aside className="education-popular" aria-labelledby="popular-title">
                        <div className="education-section-heading">
                            <h2 id="popular-title">Đọc nhiều</h2>
                        </div>
                        <ol>
                            {popularStories.map((article) => (
                                <li key={article.slug}>
                                    <Link to={`/bai-viet/${article.slug}`}>{article.title}</Link>
                                </li>
                            ))}
                        </ol>
                    </aside>
                </div>
            </div>
        </div>
    )
}
