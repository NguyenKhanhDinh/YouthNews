import { useState } from 'react'
import { Link } from 'react-router-dom'
import ArticleCard from '../components/article/ArticleCard'
import { articles } from '../data/articles'
import './EducationPage.css'

const topics = [
    'Tất cả',
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
    const [selectedTopic, setSelectedTopic] = useState('Tất cả')

    const filteredArticles =
        selectedTopic === 'Tất cả'
            ? articles
            : articles.filter((article) => article.category === selectedTopic)

    const latestArticles =
        selectedTopic === 'Tất cả' ? filteredArticles.slice(3) : filteredArticles

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
                    {topics.map((topic) => (
                        <button
                            type="button"
                            key={topic}
                            className={selectedTopic === topic ? 'is-selected' : ''}
                            onClick={() => setSelectedTopic(topic)}
                            aria-pressed={selectedTopic === topic}
                        >
                            {topic}
                        </button>
                    ))}
                </nav>

                {selectedTopic === 'Tất cả' && (
                    <>
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
                    </>
                )}

                <div className="education-content-grid">
                    <section className="education-latest" id="tin-moi" aria-labelledby="latest-title">
                        <div className="education-section-heading">
                            <h2 id="latest-title">
                                {selectedTopic === 'Tất cả' ? 'Tin mới' : selectedTopic}
                            </h2>
                            {selectedTopic !== 'Tất cả' && (
                                <button
                                    type="button"
                                    className="education-section-heading__reset"
                                    onClick={() => setSelectedTopic('Tất cả')}
                                >
                                    Xem tất cả
                                </button>
                            )}
                        </div>

                        {latestArticles.length > 0 ? (
                            <div className="article-list">
                                {latestArticles.map((article) => (
                                    <ArticleCard article={article} key={article.slug} />
                                ))}
                            </div>
                        ) : (
                            <p className="education-empty" role="status">
                                Chưa có bài viết nào thuộc chủ đề “{selectedTopic}”.
                            </p>
                        )}
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