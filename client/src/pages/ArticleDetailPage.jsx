import { Link, useParams } from 'react-router-dom'
import { articles } from '../data/articles'
import { categories } from '../data/categories'
import './ArticleDetailPage.css'

export default function ArticleDetailPage() {
    const { slug } = useParams()
    const article = articles.find((item) => item.slug === slug)

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
    const relatedArticles = articles
        .filter((item) => item.categorySlug === article.categorySlug && item.slug !== article.slug)
        .slice(0, 3)

    return (
        <article className="article-detail">
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
                            <p key={`${article.slug}-${index}`}>{paragraph}</p>
                        ))}
                    </div>

                    {relatedArticles.length > 0 && (
                        <aside className="article-detail__related" aria-labelledby="related-title">
                            <h2 id="related-title">Bài viết liên quan</h2>
                            <ul>
                                {relatedArticles.map((relatedArticle) => (
                                    <li key={relatedArticle.slug}>
                                        <Link to={`/bai-viet/${relatedArticle.slug}`}>
                                            {relatedArticle.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
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
