import {Fragment, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api, useApi } from '../../api'
import { categories } from '../../data/categories'
import ArticleCard from '../../components/article/ArticleCard'
import AdSlot from '../../components/ads/AdSlot'
import './ArticleDetailPage.css'

export default function ArticleDetailPage() {
    const { slug } = useParams()
    const articleState = useApi(api.getArticleBySlug, slug)
    const relatedState = useApi(api.getRelatedArticles, slug)
    const article = articleState.data
    const relatedArticles = relatedState.data ?? []
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            const percent = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0
            setProgress(percent)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    if (articleState.loading) {
        return (
            <section className="article-detail article-detail--not-found">
                <p role="status" aria-busy="true">Đang tải bài viết…</p>
            </section>
        )
    }

    if (articleState.error && articleState.error.status !== 404) {
        return (
            <section className="article-detail article-detail--not-found">
                <h1>Không thể tải bài viết</h1>
                <p role="alert">{articleState.error.message || 'Đã có lỗi xảy ra.'}</p>
                <button type="button" onClick={articleState.refetch}>Thử lại</button>
            </section>
        )
    }

    if (!article) {
        return (
            <section className="article-detail article-detail--not-found">
                <h1>Không tìm thấy bài viết</h1>
                <p>Bài viết có thể đã được gỡ hoặc đường dẫn không chính xác.</p>
                <Link to="/">Quay về trang chủ</Link>
            </section>
        )
    }

    const category = categories.find((item) => item.slug === article.categorySlug)
    const categoryName = category?.name ?? article.category
    const categoryPath = `/chuyen-muc/${article.categorySlug}`

    return (
        <article className="article-detail">
            <div
                className="article-detail__progress"
                style={{ width: `${progress}%` }}
                aria-hidden="true"
            />
            <div className="article-detail__container">
                <nav className="article-detail__breadcrumb" aria-label="Đường dẫn">
                    <Link to="/">Trang chủ</Link>
                    <span aria-hidden="true">/</span>
                    <Link to={categoryPath}>{categoryName}</Link>
                    <span aria-hidden="true">/</span>
                    <span aria-current="page">{article.title}</span>
                </nav>

                <header className="article-detail__header">
                    <Link className="article-detail__category" to={categoryPath}>{categoryName}</Link>
                    <h1>{article.title}</h1>
                    <p className="article-detail__summary">{article.summary}</p>
                    <div className="article-detail__meta">
                        <span>{article.author}</span>
                        <time>{article.date}</time>
                        <span>{article.readTime}</span>
                    </div>
                </header>

                <figure className="article-detail__cover">
                    <img src={article.image} alt={article.imageAlt} />
                    <figcaption>{article.imageAlt}</figcaption>
                </figure>

                <div className="article-detail__layout">
                    <div className="article-detail__body">
                        {article.content.map((paragraph, index) => (
                            <Fragment key={`${article.slug}-${index}`}>
                                <p>{paragraph}</p>
                                {index === 1 && article.content.length > 3 && <AdSlot slot="leaderboard" index={2} />}
                            </Fragment>
                        ))}
                    </div>

                    {relatedArticles.length > 0 && (
                        <aside className="article-detail__related" aria-labelledby="related-title">
                            <h2 id="related-title">Bài viết liên quan</h2>
                            <div className="article-detail__related-list">
                                {relatedArticles.map((relatedArticle) => (
                                    <ArticleCard
                                        key={relatedArticle.slug}
                                        article={relatedArticle}
                                    />
                                ))}
                            </div>
                        </aside>
                    )}
                </div>

                <Link className="article-detail__back" to={categoryPath}>
                    ← Xem thêm tin {categoryName}
                </Link>
            </div>
        </article>
    )
}