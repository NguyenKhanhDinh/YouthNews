import {Fragment, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api, useApi } from '../../api'
import { categories } from '../../data/categories'
import { slugify } from '../../data/seed'
import ArticleCard from '../../components/article/ArticleCard'
import AdSlot from '../../components/ads/AdSlot'
import { isArticleSaved, toggleSavedArticle } from '../../utils/bookmarks'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import './ArticleDetailPage.css'

export default function ArticleDetailPage() {
    const { slug } = useParams()
    return <ArticleDetailContent key={slug} slug={slug} />
}

function ArticleDetailContent({ slug }) {
    const articleState = useApi(api.getArticleBySlug, slug)
    const relatedState = useApi(api.getRelatedArticles, slug)
    const article = articleState.data
    const relatedArticles = relatedState.data ?? []
    const [progress, setProgress] = useState(0)
    const [shareMessage, setShareMessage] = useState('')
    const [bookmarkState, setBookmarkState] = useState(() => {
        try {
            return { isSaved: isArticleSaved(slug), error: null }
        } catch (error) {
            return { isSaved: false, error }
        }
    })
    const { isSaved, error: bookmarkError } = bookmarkState

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

    useDocumentTitle(article?.title)

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
    const tags = [...new Set(article.tags ?? [])]

    const handleToggleSaved = () => {
        try {
            setBookmarkState({ isSaved: toggleSavedArticle(article.slug), error: null })
        } catch (error) {
            setBookmarkState((current) => ({ ...current, error }))
        }
    }

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href)
            setShareMessage('Đã sao chép liên kết bài viết.')
        } catch {
            setShareMessage('Không thể sao chép tự động. Hãy sao chép đường dẫn trên thanh địa chỉ.')
        }
    }

    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        window.location.href,
    )}`

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
                    <button
                        className={`article-detail__save${isSaved ? ' is-saved' : ''}`}
                        type="button"
                        onClick={handleToggleSaved}
                        aria-pressed={isSaved}
                    >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M6 4.75A1.75 1.75 0 0 1 7.75 3h8.5A1.75 1.75 0 0 1 18 4.75V21l-6-4-6 4z" />
                        </svg>
                        {isSaved ? 'Đã lưu' : 'Lưu tin'}
                    </button>
                    {bookmarkError && (
                        <p className="article-detail__bookmark-error" role="alert">
                            {bookmarkError.message}
                        </p>
                    )}
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
                        {tags.length > 0 && (
                            <nav className="article-detail__tags" aria-label="Chủ đề bài viết">
                                <span className="article-detail__tags-label">Chủ đề:</span>
                                {tags.map((tag) => (
                                    <Link
                                        className="article-detail__tag"
                                        key={tag}
                                        to={tag === article.category
                                            ? `${categoryPath}/${slugify(tag)}`
                                            : categoryPath}
                                    >
                                        {tag}
                                    </Link>
                                ))}
                            </nav>
                        )}
                    </div>

                    <div className="article-detail__share" role="group" aria-label="Chia sẻ bài viết">
                        <span className="article-detail__share-label">Chia sẻ bài viết</span>
                        <button type="button" onClick={handleCopyLink}>
                            Sao chép liên kết
                        </button>
                        <a href={facebookShareUrl} target="_blank" rel="noreferrer">
                            Chia sẻ Facebook
                        </a>
                        {shareMessage && (
                            <span className="article-detail__share-message" role="status">
                                {shareMessage}
                            </span>
                        )}
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