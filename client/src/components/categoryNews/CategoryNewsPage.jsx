import { useState } from 'react'
import { Link } from 'react-router-dom'
import ArticleCard from '../article/ArticleCard'
import AdSlot from '../ads/AdSlot'
import './CategoryNewsPage.css'

export default function CategoryNewsPage({ name, eyebrow, intro, topics, articles }) {
    const [selectedTopic, setSelectedTopic] = useState('Tất cả')
    const [featuredStory, ...remainingStories] = articles
    const secondaryStories = remainingStories.slice(0, 2)
    const popularStories = remainingStories.slice(2, 5)

    const filteredArticles =
        selectedTopic === 'Tất cả'
            ? articles
            : articles.filter((article) => article.category === selectedTopic)

    const latestArticles =
        selectedTopic === 'Tất cả' ? filteredArticles.slice(3) : filteredArticles

    return (
        <div className="category-news">
            <div className="category-news__container">
                <div className="category-news__breadcrumb">
                    <Link to="/">Trang chủ</Link>
                    <span aria-hidden="true">/</span>
                    <span>{name}</span>
                </div>

                <section className="category-news__heading" aria-labelledby="category-title">
                    <div>
                        <p className="category-news__eyebrow">{eyebrow}</p>
                        <h1 id="category-title">{name}</h1>
                    </div>
                    <p className="category-news__intro">{intro}</p>
                </section>

                <nav className="category-news__topics" aria-label={`Chủ đề ${name.toLowerCase()}`}>
                    {['Tất cả', ...topics].map((topic) => (
                        <button
                            type="button"
                            className={selectedTopic === topic ? 'is-selected' : ''}
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
                        <article className="category-news__featured">
                            <Link
                                className="category-news__featured-image"
                                to={`/bai-viet/${featuredStory.slug}`}
                            >
                                <img src={featuredStory.image} alt={featuredStory.imageAlt} />
                            </Link>
                            <div className="category-news__featured-content">
                                <span className="category-news__label">{featuredStory.category}</span>
                                <h2>
                                    <Link to={`/bai-viet/${featuredStory.slug}`}>
                                        {featuredStory.title}
                                    </Link>
                                </h2>
                                <p>{featuredStory.summary}</p>
                                <span className="category-news__meta">
                                    {featuredStory.date} · {featuredStory.readTime}
                                </span>
                            </div>
                        </article>

                        <section
                            className="category-news__secondary"
                            aria-label={`Tin ${name.toLowerCase()} đáng chú ý`}
                        >
                            {secondaryStories.map((story) => (
                                <article className="category-news__card" key={story.slug}>
                                    <Link
                                        className="category-news__card-image"
                                        to={`/bai-viet/${story.slug}`}
                                    >
                                        <img src={story.image} alt={story.imageAlt} loading="lazy" />
                                    </Link>
                                    <div className="category-news__card-content">
                                        <span className="category-news__label">{story.category}</span>
                                        <h2>
                                            <Link to={`/bai-viet/${story.slug}`}>{story.title}</Link>
                                        </h2>
                                        <span className="category-news__meta">
                                            {story.date} · {story.readTime}
                                        </span>
                                    </div>
                                </article>
                            ))}
                        </section>
                    </>
                )}

                <div className="category-news__content-grid">
                    <section className="category-news__latest" id="tin-moi" aria-labelledby="latest-title">
                        <div className="category-news__section-heading">
                            <h2 id="latest-title">
                                {selectedTopic === 'Tất cả' ? 'Tin mới' : selectedTopic}
                            </h2>
                            {selectedTopic !== 'Tất cả' && (
                                <button type="button" onClick={() => setSelectedTopic('Tất cả')}>
                                    Xem tất cả
                                </button>
                            )}
                        </div>

                        {latestArticles.length > 0 ? (
                            <div className="category-news__article-list">
                                {latestArticles.map((article) => (
                                    <ArticleCard article={article} key={article.slug} />
                                ))}
                            </div>
                        ) : (
                            <p className="category-news__empty" role="status">
                                Chưa có bài viết nào thuộc chủ đề “{selectedTopic}”.
                            </p>
                        )}
                    </section>

                    <div className="ad-side">
                        <aside className="category-news__popular" aria-labelledby="popular-title">
                            <div className="category-news__section-heading">
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
                        <AdSlot slot="rectangle" index={1} />
                    </div>
                </div>
            </div>
        </div>
    )
}
