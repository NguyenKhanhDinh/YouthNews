import { useState } from 'react'
import { Link } from 'react-router-dom'
import ArticleCard from '../../components/article/ArticleCard'
import { technologyArticles } from '../../data/technologyArticles'
import './TechnologyPage.css'

const topics = [
    'Tất cả',
    'AI',
    'Điện thoại',
    'Máy tính',
    'An ninh mạng',
    'Khoa học',
    'Khởi nghiệp',
]

const featuredStory = technologyArticles[0]
const secondaryStories = technologyArticles.slice(1, 3)
const popularStories = technologyArticles.slice(3, 6)

export default function TechnologyPage() {
    const [selectedTopic, setSelectedTopic] = useState('Tất cả')

    const filteredArticles =
        selectedTopic === 'Tất cả'
            ? technologyArticles
            : technologyArticles.filter((article) => article.category === selectedTopic)

    const latestArticles =
        selectedTopic === 'Tất cả' ? filteredArticles.slice(3) : filteredArticles

    return (
        <div className="technology-page">
            <div className="technology-page__container">
                <div className="technology-page__breadcrumb">
                    <Link to="/">Trang chủ</Link>
                    <span aria-hidden="true">/</span>
                    <span>Công nghệ</span>
                </div>

                <section className="technology-page__heading" aria-labelledby="technology-title">
                    <div>
                        <p className="technology-page__eyebrow">Sáng tạo · Kết nối · Tương lai</p>
                        <h1 id="technology-title">Công nghệ</h1>
                    </div>
                    <p className="technology-page__intro">
                        Cập nhật xu hướng công nghệ, sản phẩm số, khoa học và những đổi mới đang
                        thay đổi cuộc sống.
                    </p>
                </section>

                <nav className="technology-topics" aria-label="Chủ đề công nghệ">
                    {topics.map((topic) => (
                        <button
                            type="button"
                            className={selectedTopic === topic ? 'technology-topics__item is-selected' : 'technology-topics__item'}
                            key={topic}
                            onClick={() => setSelectedTopic(topic)}
                            aria-pressed={selectedTopic === topic}
                        >
                            {topic}
                        </button>
                    ))}
                </nav>

                {selectedTopic === 'Tất cả' && (
                    <>
                        <article className="technology-featured">
                            <Link
                                className="technology-featured__image"
                                to={`/bai-viet/${featuredStory.slug}`}
                            >
                                <img src={featuredStory.image} alt={featuredStory.imageAlt} />
                            </Link>
                            <div className="technology-featured__content">
                                <span className="technology-label">{featuredStory.category}</span>
                                <h2>
                                    <Link to={`/bai-viet/${featuredStory.slug}`}>
                                        {featuredStory.title}
                                    </Link>
                                </h2>
                                <p>{featuredStory.summary}</p>
                                <span className="technology-meta">
                                    {featuredStory.date} · {featuredStory.readTime}
                                </span>
                            </div>
                        </article>

                        <section className="technology-secondary" aria-label="Tin công nghệ đáng chú ý">
                            {secondaryStories.map((story) => (
                                <article className="technology-card" key={story.slug}>
                                    <Link
                                        className="technology-card__image"
                                        to={`/bai-viet/${story.slug}`}
                                    >
                                        <img src={story.image} alt={story.imageAlt} loading="lazy" />
                                    </Link>
                                    <div className="technology-card__content">
                                        <span className="technology-label">{story.category}</span>
                                        <h2>
                                            <Link to={`/bai-viet/${story.slug}`}>{story.title}</Link>
                                        </h2>
                                        <span className="technology-meta">
                                            {story.date} · {story.readTime}
                                        </span>
                                    </div>
                                </article>
                            ))}
                        </section>
                    </>
                )}

                <div className="technology-content-grid">
                    <section className="technology-latest" id="tin-moi" aria-labelledby="latest-title">
                        <div className="technology-section-heading">
                            <h2 id="latest-title">
                                {selectedTopic === 'Tất cả' ? 'Tin mới' : selectedTopic}
                            </h2>
                            {selectedTopic !== 'Tất cả' && (
                                <button
                                    type="button"
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
                            <p className="technology-empty" role="status">
                                Chưa có bài viết nào thuộc chủ đề “{selectedTopic}”.
                            </p>
                        )}
                    </section>

                    <aside className="technology-popular" aria-labelledby="popular-title">
                        <div className="technology-section-heading">
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
