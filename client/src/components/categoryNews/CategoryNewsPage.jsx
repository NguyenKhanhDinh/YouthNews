import { Link } from 'react-router-dom'
import ArticleCard from '../article/ArticleCard'
import AdSlot from '../ads/AdSlot'
import './CategoryNewsPage.css'

export default function CategoryNewsPage({
    categorySlug,
    name,
    eyebrow,
    intro,
    topics,
    articles,
    selectedSubCategory,
    onLoadMore,
    hasMore,
    loadingMore,
    loadMoreError,
}) {
    const [featuredStory, ...remainingStories] = articles
    const secondaryStories = remainingStories.slice(0, 2)
    const popularStories = remainingStories.slice(2, 5)
    const isSubCategoryPage = Boolean(selectedSubCategory)
    const latestArticles = isSubCategoryPage ? articles : articles.slice(3)
    const categoryPath = `/chuyen-muc/${categorySlug}`

    return (
        <div className="category-news">
            <div className="category-news__container">
                <div className="category-news__breadcrumb">
                    <Link to="/">Trang chủ</Link>
                    <span aria-hidden="true">/</span>
                    {isSubCategoryPage && (
                        <>
                            <Link to={categoryPath}>{name}</Link>
                            <span aria-hidden="true">/</span>
                        </>
                    )}
                    <span aria-current="page">{selectedSubCategory?.name ?? name}</span>
                </div>

                <section className="category-news__heading" aria-labelledby="category-title">
                    <div>
                        <p className="category-news__eyebrow">{eyebrow}</p>
                        <h1 id="category-title">{selectedSubCategory?.name ?? name}</h1>
                    </div>
                    <p className="category-news__intro">
                        {selectedSubCategory
                            ? `Tin ${selectedSubCategory.name.toLowerCase()} mới nhất thuộc chuyên mục ${name}.`
                            : intro}
                    </p>
                </section>

                <nav className="category-news__topics" aria-label={`Chủ đề ${name.toLowerCase()}`}>
                    <Link
                        className={!isSubCategoryPage ? 'is-selected' : ''}
                        to={categoryPath}
                        aria-current={!isSubCategoryPage ? 'page' : undefined}
                    >
                        Tất cả
                    </Link>
                    {topics.map((topic) => (
                        <Link
                            className={selectedSubCategory?.slug === topic.slug ? 'is-selected' : ''}
                            key={topic.slug}
                            to={`${categoryPath}/${topic.slug}`}
                            aria-current={selectedSubCategory?.slug === topic.slug ? 'page' : undefined}
                        >
                            {topic.name}
                        </Link>
                    ))}
                </nav>

                {!isSubCategoryPage && featuredStory && (
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
                                {isSubCategoryPage ? `Tin ${selectedSubCategory.name}` : 'Tin mới'}
                            </h2>
                            {isSubCategoryPage && (
                                <Link to={categoryPath}>Xem tất cả</Link>
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
                                Chưa có bài viết nào thuộc {selectedSubCategory ? `chủ đề “${selectedSubCategory.name}”` : `chuyên mục ${name}`}.
                            </p>
                        )}
                        {loadMoreError && (
                            <div className="category-news__load-error" role="alert">
                                <p>{loadMoreError.message || 'Không thể tải thêm bài viết.'}</p>
                                <button type="button" onClick={onLoadMore} disabled={loadingMore}>
                                    Thử lại
                                </button>
                            </div>
                        )}
                        {hasMore && (
                            <button
                                className="category-news__load-more"
                                type="button"
                                onClick={onLoadMore}
                                disabled={loadingMore}
                            >
                                {loadingMore ? 'Đang tải…' : 'Xem thêm bài viết'}
                            </button>
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
